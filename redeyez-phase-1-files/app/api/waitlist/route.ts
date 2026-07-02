import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

/**
 * Premium waitlist capture.
 * Every email is persisted to private blob storage; the optional
 * WAITLIST_WEBHOOK_URL forward (ESP / sheet / CRM) runs on top.
 * Previously, emails were only console.logged when the webhook env
 * was missing — meaning silently lost.
 */
export async function POST(req: NextRequest) {
  try {
    const { email, source } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const sanitizedEmail = email.toLowerCase().trim().slice(0, 254);
    const record = {
      email: sanitizedEmail,
      source: typeof source === "string" ? source.slice(0, 100) : "xred-eyez-vault",
      submittedAt: new Date().toISOString(),
    };

    let stored = false;
    let forwarded = false;

    try {
      const stamp = record.submittedAt.replace(/[:.]/g, "-");
      await put(`leads/waitlist/${stamp}.json`, JSON.stringify(record), {
        access: "private",
        addRandomSuffix: true,
        contentType: "application/json",
      });
      stored = true;
    } catch (err) {
      console.error("Waitlist: blob persistence failed", err);
    }

    const webhookUrl = process.env.WAITLIST_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(record),
        });
        forwarded = response.ok;
      } catch (err) {
        console.error("Waitlist: webhook failed", err);
      }
    }

    if (!stored && !forwarded) {
      return NextResponse.json({ error: "Waitlist unavailable" }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
