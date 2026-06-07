import { NextRequest, NextResponse } from "next/server";
import { getContact, upsertContact } from "@/app/lib/outreach/store";
import { sendOutreachEmail } from "@/app/lib/outreach/send";

export async function GET(req: NextRequest) {
  const contactId = req.nextUrl.searchParams.get("contact");
  if (!contactId) {
    return NextResponse.redirect(new URL("/partners/claim", req.url));
  }

  const contact = await getContact(contactId);
  if (!contact || contact.status !== "active") {
    return NextResponse.redirect(new URL("/partners/claim", req.url));
  }

  // Already in nurture — just redirect
  if (contact.sequence === "nurture") {
    return NextResponse.redirect(new URL("/partners/outreach/info", req.url));
  }

  // Switch to nurture sequence
  const updated = {
    ...contact,
    sequence: "nurture" as const,
    step: 1,
    lastSentAt: new Date().toISOString(),
    scheduledAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
  };

  await sendOutreachEmail(updated, "nurture", 1);
  await upsertContact(updated);

  return NextResponse.redirect(new URL("/partners/outreach/info", req.url));
}
