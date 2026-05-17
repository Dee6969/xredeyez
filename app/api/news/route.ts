import { NextResponse } from "next/server";
import { getCannabisSignals } from "../../data/news";

export const revalidate = 86400;

export async function GET() {
  try {
    const signals = await getCannabisSignals(12);
    return NextResponse.json({
      updatedAt: new Date().toISOString(),
      signals,
    });
  } catch {
    return NextResponse.json({ error: "News unavailable" }, { status: 502 });
  }
}
