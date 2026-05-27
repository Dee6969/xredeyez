import { NextRequest, NextResponse } from "next/server";
import { getSyncProduct } from "@/app/lib/printful";

export const revalidate = 300;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const product = await getSyncProduct(id);
    return NextResponse.json({ product });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
