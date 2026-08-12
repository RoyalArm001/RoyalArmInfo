import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminToken, validAdminPassword } from "../../../../lib/admin-auth";

export async function POST(request) {
  try {
    const { password } = await request.json();
    if (!validAdminPassword(password)) {
      return NextResponse.json({ error: "Սխալ գաղտնաբառ։" }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_COOKIE, adminToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 12,
    });
    return response;
  } catch {
    return NextResponse.json({ error: "Մուտքը հնարավոր չեղավ կատարել։" }, { status: 400 });
  }
}
