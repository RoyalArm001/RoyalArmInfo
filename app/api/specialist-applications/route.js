import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { isAdmin } from "../../../lib/admin-auth";
import { getRedis } from "../../../lib/redis";

const required = [
  "name",
  "phone",
  "location",
  "specialty",
  "experience",
  "skills",
  "workFormat",
];

const legacyApplicationKey = "royalarm:specialist-applications";
const applicationIndexKey = "royalarm:specialist-application-ids";
const reviewStatuses = new Set(["approved", "rejected"]);

function recordKey(id) {
  return `royalarm:specialist-application:${id}`;
}

function parseRecord(value) {
  try {
    return typeof value === "string" ? JSON.parse(value) : value;
  } catch {
    return null;
  }
}

async function loadApplications(redis, limit = 500) {
  const ids = await redis.lrange(applicationIndexKey, 0, limit - 1);
  const current = ids.length
    ? await redis.mget(...ids.map((id) => recordKey(id)))
    : [];
  const legacy = await redis.lrange(legacyApplicationKey, 0, limit - 1);
  const records = [...current, ...legacy].map(parseRecord).filter(Boolean);
  return records.filter((record, index) =>
    records.findIndex((candidate) => candidate.id === record.id) === index,
  );
}

function clean(value, maxLength) {
  return String(value || "").trim().slice(0, maxLength);
}

function cleanUrl(value) {
  const candidate = clean(value, 500);
  if (!candidate) return "";

  try {
    const url = new URL(candidate);
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : "";
  } catch {
    return "";
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (required.some((key) => !clean(body[key], 10_000))) {
      return NextResponse.json({ error: "Լրացրեք պարտադիր դաշտերը։" }, { status: 400 });
    }

    const redis = getRedis();
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const rateKey = `specialist-application-rate:${ip}`;
    const attempts = await redis.incr(rateKey);
    if (attempts === 1) await redis.expire(rateKey, 3600);
    if (attempts > 5) {
      return NextResponse.json(
        { error: "Շատ դիմումներ են ուղարկվել։ Փորձեք ավելի ուշ։" },
        { status: 429 },
      );
    }

    const record = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      status: "pending",
      name: clean(body.name, 120),
      phone: clean(body.phone, 50),
      email: clean(body.email, 180),
      location: clean(body.location, 120),
      specialty: clean(body.specialty, 180),
      experience: clean(body.experience, 100),
      skills: clean(body.skills, 2000),
      workFormat: clean(body.workFormat, 100),
      portfolio: cleanUrl(body.portfolio),
      details: clean(body.details, 3000),
    };

    await redis.set(recordKey(record.id), record);
    await redis.lpush(applicationIndexKey, record.id);
    await redis.ltrim(applicationIndexKey, 0, 9999);

    const { notifyAppUsers } = await import("../../../lib/push");
    await notifyAppUsers({
      title: "RoyalArm IT",
      body: `New specialist application from ${record.name}`,
      url: "https://it.royalarm.uk/",
    });

    return NextResponse.json({ ok: true, id: record.id });
  } catch {
    return NextResponse.json(
      { error: "Տվյալների բազան միացված չէ կամ ժամանակավորապես անհասանելի է։" },
      { status: 503 },
    );
  }
}

export async function GET(request) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const applications = await loadApplications(getRedis());
    return NextResponse.json({ applications });
  } catch {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}

export async function PATCH(request) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const id = clean(body.id, 100);
    const status = clean(body.status, 20);
    if (!id || !reviewStatuses.has(status)) {
      return NextResponse.json({ error: "Invalid review action" }, { status: 400 });
    }

    const redis = getRedis();
    const stored = parseRecord(await redis.get(recordKey(id)));
    let updated = null;

    if (stored) {
      updated = { ...stored, status, reviewedAt: new Date().toISOString() };
      await redis.set(recordKey(id), updated);
    } else {
      const legacy = await redis.lrange(legacyApplicationKey, 0, 9999);
      const legacyIndex = legacy.findIndex((item) => parseRecord(item)?.id === id);
      if (legacyIndex !== -1) {
        updated = {
          ...parseRecord(legacy[legacyIndex]),
          status,
          reviewedAt: new Date().toISOString(),
        };
        await redis.lset(legacyApplicationKey, legacyIndex, JSON.stringify(updated));
      }
    }

    if (!updated) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    if (status === "approved") {
      const { notifyAppUsers } = await import("../../../lib/push");
      await notifyAppUsers({
        title: "RoyalArm IT",
        body: `${updated.name} is now available as an IT specialist.`,
        url: "https://it.royalarm.uk/specialists",
      });
    }

    return NextResponse.json({
      ok: true,
      application: updated,
    });
  } catch {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}
