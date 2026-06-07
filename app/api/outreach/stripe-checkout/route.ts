import { NextRequest, NextResponse } from "next/server";
import getStripe from "@/app/lib/stripe";
import { getContact } from "@/app/lib/outreach/store";

const BASE_URL = process.env.BASE_URL ?? "https://www.redeyez.co.uk";

export async function GET(req: NextRequest) {
  const contactId = req.nextUrl.searchParams.get("contact");
  const priceId = process.env.STRIPE_UPLIFT_PRICE_ID;

  if (!priceId) {
    return NextResponse.json({ error: "Stripe uplift price not configured" }, { status: 500 });
  }

  const contact = contactId ? await getContact(contactId) : null;

  const session = await getStripe().checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${BASE_URL}/partners/outreach/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${BASE_URL}/partners/claim`,
    ...(contact
      ? {
          customer_email: contact.email,
          metadata: {
            contactId: contact.id,
            venueName: contact.venueName ?? "",
            sector: contact.sector,
          },
        }
      : {}),
  });

  if (!session.url) {
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }

  return NextResponse.redirect(session.url);
}
