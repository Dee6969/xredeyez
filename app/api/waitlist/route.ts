import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const sanitizedEmail = email.toLowerCase().trim().slice(0, 254);
    const webhookUrl = process.env.WAITLIST_WEBHOOK_URL;

    if (webhookUrl) {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: sanitizedEmail,
          source: "xred-eyez-vault",
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        return NextResponse.json({ error: "Waitlist unavailable" }, { status: 502 });
      }
    } else {
      console.log(`Vault entry: ${sanitizedEmail}`);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
