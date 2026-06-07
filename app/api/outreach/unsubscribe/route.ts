import { NextRequest, NextResponse } from "next/server";
import { getContact, upsertContact } from "@/app/lib/outreach/store";

export async function GET(req: NextRequest) {
  const contactId = req.nextUrl.searchParams.get("contact");
  if (contactId) {
    const contact = await getContact(contactId);
    if (contact) {
      await upsertContact({ ...contact, status: "unsubscribed" });
    }
  }
  return NextResponse.redirect(new URL("/partners/outreach/unsubscribed", req.url));
}
