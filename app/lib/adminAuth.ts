import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Admin session: the login form posts the admin secret once; a httpOnly
 * cookie carrying SHA-256(secret) authorises subsequent requests. Interim
 * scheme until real accounts land in Phase 2 — the secret itself is never
 * stored in the browser.
 */

export const ADMIN_COOKIE = "xred_admin";

export function adminSecret(): string | undefined {
  return process.env.ADMIN_DASH_SECRET || process.env.OUTREACH_ADMIN_SECRET;
}

export function hashSecret(secret: string): string {
  return createHash("sha256").update(secret).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

/** True when the request carries a valid admin cookie (or legacy ?key). */
export async function isAdminAuthed(legacyKey?: string): Promise<boolean> {
  const secret = adminSecret();
  if (!secret) return false;
  if (legacyKey && safeEqual(legacyKey, secret)) return true;
  const store = await cookies();
  const cookie = store.get(ADMIN_COOKIE)?.value;
  return Boolean(cookie && safeEqual(cookie, hashSecret(secret)));
}
