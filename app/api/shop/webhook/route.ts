import { NextRequest, NextResponse } from "next/server";
import getStripe from "@/app/lib/stripe";
import { createOrder } from "@/app/lib/printful";

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !secret) {
    return NextResponse.json({ error: "Missing signature or secret" }, { status: 400 });
  }

  let event;
  try {
    event = getStripe().webhooks.constructEvent(payload, sig, secret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Webhook error";
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const pi = event.data.object;
    try {
      const items = JSON.parse(pi.metadata?.items ?? "[]");
      const shipping = JSON.parse(pi.metadata?.shipping ?? "{}");

      if (items.length > 0 && shipping.name) {
        await createOrder({ recipient: shipping, items });
      }
    } catch (err) {
      console.error("Printful order creation failed:", err);
    }
  }

  return NextResponse.json({ received: true });
}
