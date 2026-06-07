import { timingSafeEqual } from "crypto";
import type { NextRequest } from "next/server";

export function adminGuard(req: NextRequest): boolean {
  const secret = process.env.OUTREACH_ADMIN_SECRET;
  if (!secret) return false;
  const provided = req.headers.get("x-admin-secret") ?? "";
  if (secret.length !== provided.length) return false;
  try {
    return timingSafeEqual(Buffer.from(secret, "utf8"), Buffer.from(provided, "utf8"));
  } catch {
    return false;
  }
}

export function cronGuard(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const auth = req.headers.get("authorization") ?? "";
  const provided = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (secret.length !== provided.length) return false;
  try {
    return timingSafeEqual(Buffer.from(secret, "utf8"), Buffer.from(provided, "utf8"));
  } catch {
    return false;
  }
}
