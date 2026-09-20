import { NextResponse } from "next/server";
import { getPushPublicKey, savePushSubscription } from "../../../lib/push";

export async function GET() {
  try {
    const publicKey = await getPushPublicKey();
    return NextResponse.json({ publicKey });
  } catch {
    return NextResponse.json({ error: "Push unavailable" }, { status: 503 });
  }
}

export async function POST(request) {
  try {
    const subscription = await request.json();
    await savePushSubscription(subscription);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not save subscription" }, { status: 503 });
  }
}
