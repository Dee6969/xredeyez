import { NextResponse } from "next/server";
import { listSyncProducts } from "@/app/lib/printful";

export const revalidate = 300;

export async function GET() {
  try {
    const products = await listSyncProducts();
    return NextResponse.json({ products });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    if (msg.includes("PRINTFUL_API_KEY not set")) {
      return NextResponse.json({ error: "Store not configured", products: [] }, { status: 503 });
    }
    return NextResponse.json({ error: msg, products: [] }, { status: 500 });
  }
}
