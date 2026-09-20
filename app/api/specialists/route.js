import { NextResponse } from "next/server";
import { getRedis } from "../../../lib/redis";

const legacyApplicationKey = "royalarm:specialist-applications";
const applicationIndexKey = "royalarm:specialist-application-ids";

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

function toPublicProfile(record) {
  return {
    id: record.id,
    name: record.name,
    location: record.location,
    specialty: record.specialty,
    experience: record.experience,
    skills: record.skills,
    workFormat: record.workFormat,
    portfolio: record.portfolio || "",
    approvedAt: record.reviewedAt || record.createdAt,
  };
}

export async function GET() {
  try {
    const redis = getRedis();
    const ids = await redis.lrange(applicationIndexKey, 0, 999);
    const current = ids.length
      ? await redis.mget(...ids.map((id) => recordKey(id)))
      : [];
    const legacy = await redis.lrange(legacyApplicationKey, 0, 999);
    const records = [...current, ...legacy].map(parseRecord).filter(Boolean);
    const uniqueRecords = records.filter((record, index) =>
      records.findIndex((candidate) => candidate.id === record.id) === index,
    );
    const specialists = uniqueRecords
      .filter((record) => record?.status === "approved")
      .map(toPublicProfile);

    return NextResponse.json(
      { specialists },
      { headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  } catch {
    return NextResponse.json(
      { specialists: [], error: "Specialist directory is temporarily unavailable" },
      { status: 503, headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  }
}
