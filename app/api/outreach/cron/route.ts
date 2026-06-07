import { NextRequest, NextResponse } from "next/server";
import { cronGuard } from "@/app/lib/outreach/guard";
import { readContacts, upsertContact, nextStepSchedule, type OutreachContact } from "@/app/lib/outreach/store";
import { EMAIL_CONTENT, type SequenceType } from "@/app/lib/outreach/content";
import { sendOutreachEmail } from "@/app/lib/outreach/send";

export async function GET(req: NextRequest) {
  if (!cronGuard(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const contacts = await readContacts();
  const now = Date.now();
  const results: { id: string; action: string }[] = [];

  for (const contact of contacts) {
    if (contact.status !== "active") continue;
    if (!contact.scheduledAt) continue;
    if (new Date(contact.scheduledAt).getTime() > now) continue;

    const nextStep = contact.step + 1;
    const stepsInSequence = EMAIL_CONTENT[contact.sector][contact.sequence as SequenceType].length;

    if (nextStep > stepsInSequence) {
      await upsertContact({ ...contact, status: "complete", scheduledAt: undefined });
      results.push({ id: contact.id, action: "completed" });
      continue;
    }

    const updated: OutreachContact = {
      ...contact,
      step: nextStep,
      lastSentAt: new Date().toISOString(),
      scheduledAt: nextStepSchedule(contact.sequence as SequenceType, nextStep)?.toISOString(),
    };

    try {
      await sendOutreachEmail(updated, contact.sequence as SequenceType, nextStep);
      await upsertContact(updated);
      results.push({ id: contact.id, action: `sent_${contact.sequence}_step${nextStep}` });
    } catch {
      results.push({ id: contact.id, action: "send_failed" });
    }
  }

  return NextResponse.json({ processed: results.length, results });
}
