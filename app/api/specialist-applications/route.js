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
      status: "new",
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

    await redis.lpush("royalarm:specialist-applications", JSON.stringify(record));
    await redis.ltrim("royalarm:specialist-applications", 0, 9999);

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

    const items = await getRedis().lrange("royalarm:specialist-applications", 0, 499);
    return NextResponse.json({
      applications: items.map((item) => (typeof item === "string" ? JSON.parse(item) : item)),
    });
  } catch {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}
