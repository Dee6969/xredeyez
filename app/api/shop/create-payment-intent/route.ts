import { NextRequest, NextResponse } from "next/server";
import getStripe from "@/app/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const { items, shipping } = await req.json();

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "No items" }, { status: 400 });
    }

    const amount = Math.round(
      items.reduce(
        (sum: number, i: { price: number; quantity: number }) =>
          sum + i.price * i.quantity * 100,
        0
      )
    );

    if (amount < 50) {
      return NextResponse.json({ error: "Order total too low" }, { status: 400 });
    }

    const currency = (items[0]?.currency ?? "usd").toLowerCase();

    const paymentIntent = await getStripe().paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
      metadata: {
        items: JSON.stringify(
          items.map((i: { printfulVariantId: number; quantity: number }) => ({
            sync_variant_id: i.printfulVariantId,
            quantity: i.quantity,
          }))
        ),
        shipping: JSON.stringify(shipping),
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
