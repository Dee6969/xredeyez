import { NextRequest, NextResponse } from "next/server";
import { adminGuard } from "@/app/lib/outreach/guard";
import { layerToSector, type Sector } from "@/app/lib/outreach/content";
import {
  generateContactId,
  getContact,
  nextStepSchedule,
  upsertContact,
  type OutreachContact,
} from "@/app/lib/outreach/store";
import { sendOutreachEmail } from "@/app/lib/outreach/send";

export async function POST(req: NextRequest) {
  if (!adminGuard(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json() as {
    email: string;
    businessName: string;
    venueName?: string;
    venueId?: string;
    layer?: string;
    sector?: Sector;
  };

  if (!body.email || !body.businessName) {
    return NextResponse.json({ error: "email and businessName required" }, { status: 400 });
  }

  const sector = body.sector ?? (body.layer ? layerToSector(body.layer) : null);
  if (!sector) {
    return NextResponse.json({ error: "sector required (cannabis | stay | eat)" }, { status: 400 });
  }

  const id = generateContactId(body.email);
  const existing = await getContact(id);

  if (existing && existing.status === "active") {
    return NextResponse.json({ error: "Contact already in active sequence" }, { status: 409 });
  }

  const contact: OutreachContact = {
    id,
    email: body.email,
    businessName: body.businessName,
    venueName: body.venueName,
    venueId: body.venueId,
    sector,
    sequence: "cold",
    step: 1,
    status: "active",
    createdAt: new Date().toISOString(),
    lastSentAt: new Date().toISOString(),
    scheduledAt: nextStepSchedule("cold", 1)?.toISOString(),
  };

  await sendOutreachEmail(contact, "cold", 1);
  await upsertContact(contact);

  return NextResponse.json({ ok: true, contactId: id, nextDue: contact.scheduledAt });
}
