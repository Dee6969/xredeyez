import { NextRequest, NextResponse } from "next/server";
import { adminGuard } from "@/app/lib/outreach/guard";
import { readContacts } from "@/app/lib/outreach/store";

export async function GET(req: NextRequest) {
  if (!adminGuard(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const contacts = await readContacts();
  return NextResponse.json({ contacts });
}
