import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { Resend } from "resend";

/**
 * Partner enquiry capture.
 *
 * Every lead is worth money — this route is deliberately redundant:
 *   1. Persist to Vercel Blob (private) — always attempted.
 *   2. Email notification via Resend to PARTNER_LEADS_TO — if configured.
 *   3. Forward to PARTNER_LEADS_WEBHOOK_URL (CRM/Zapier/Sheet) — if configured.
 * The request succeeds if at least one capture path worked.
 */

interface EnquiryPayload {
  venue?: string;
  businessName: string;
  contactName: string;
  email: string;
  phone?: string;
  message?: string;
  packageId?: string;
  sourcePage?: string;
}

function clean(value: unknown, max = 500): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const enquiry: EnquiryPayload = {
    venue: clean(body.venue, 120),
    businessName: clean(body.businessName, 200),
    contactName: clean(body.contactName, 200),
    email: clean(body.email, 254).toLowerCase(),
    phone: clean(body.phone, 60),
    message: clean(body.message, 4000),
    packageId: clean(body.packageId, 40),
    sourcePage: clean(body.sourcePage, 200),
  };

  if (!enquiry.businessName || !enquiry.contactName || !enquiry.email.includes("@")) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const record = {
    ...enquiry,
    submittedAt: new Date().toISOString(),
    status: "new" as const,
  };

  let stored = false;
  let emailed = false;
  let forwarded = false;

  // 1. Persist to private blob storage (one file per lead — no race conditions,
  //    listable under the leads/partner/ prefix for a future admin dashboard).
  try {
    const stamp = record.submittedAt.replace(/[:.]/g, "-");
    await put(`leads/partner/${stamp}.json`, JSON.stringify(record, null, 2), {
      access: "private",
      addRandomSuffix: true,
      contentType: "application/json",
    });
    stored = true;
  } catch (err) {
    console.error("Partner enquiry: blob persistence failed", err);
  }

  // 2. Email notification.
  const resendKey = process.env.RESEND_API_KEY;
  const leadsTo = process.env.PARTNER_LEADS_TO;
  if (resendKey && leadsTo) {
    try {
      const resend = new Resend(resendKey);
      const lines = [
        `Business: ${record.businessName}`,
        `Contact: ${record.contactName}`,
        `Email: ${record.email}`,
        record.phone && `Phone: ${record.phone}`,
        record.venue && `Existing listing: ${record.venue}`,
        record.packageId && `Package interest: ${record.packageId}`,
        record.sourcePage && `Source page: ${record.sourcePage}`,
        "",
        record.message || "(no message)",
      ].filter(Boolean);
      const { error } = await resend.emails.send({
        from: "XRED EYEZ Partners <noreply@redeyez.co.uk>",
        to: leadsTo,
        replyTo: record.email,
        subject: `Partner enquiry — ${record.businessName}`,
        text: lines.join("\n"),
      });
      if (!error) emailed = true;
      else console.error("Partner enquiry: Resend error", error);
    } catch (err) {
      console.error("Partner enquiry: email failed", err);
    }
  }

  // 3. Optional CRM/webhook forward.
  const webhookUrl = process.env.PARTNER_LEADS_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });
      forwarded = res.ok;
    } catch (err) {
      console.error("Partner enquiry: webhook failed", err);
    }
  }

  if (!stored && !emailed && !forwarded) {
    console.error("Partner enquiry: ALL capture paths failed", record.email);
    return NextResponse.json(
      { error: "We couldn't save your enquiry. Please email partners@redeyez.co.uk directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true });
}
