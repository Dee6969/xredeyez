import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, adminSecret, hashSecret } from "../../../lib/adminAuth";

export async function POST(req: NextRequest) {
  const secret = adminSecret();
  if (!secret) {
    return NextResponse.json({ error: "No admin secret configured" }, { status: 500 });
  }
  const { key } = await req.json().catch(() => ({ key: "" }));
  if (typeof key !== "string" || key !== secret) {
    return NextResponse.json({ error: "Wrong key" }, { status: 401 });
  }
  const res = NextResponse.json({ success: true });
  res.cookies.set(ADMIN_COOKIE, hashSecret(secret), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(ADMIN_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
