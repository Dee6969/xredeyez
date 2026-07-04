import { get, list } from "@vercel/blob";

/**
 * Shared read layer for the admin control room.
 * All lead data lives as one-file-per-record private blobs written by
 * /api/partners/enquiry and /api/waitlist. Interim until Supabase.
 */

export interface PartnerLead {
  pathname: string;
  submittedAt?: string;
  businessName?: string;
  contactName?: string;
  email?: string;
  phone?: string;
  venue?: string;
  packageId?: string;
  sourcePage?: string;
  message?: string;
}

export interface WaitlistEntry {
  pathname: string;
  email?: string;
  source?: string;
  submittedAt?: string;
}

async function readJsonBlob<T>(pathname: string): Promise<T | null> {
  try {
    const result = await get(pathname, { access: "private", useCache: false });
    if (!result || result.statusCode !== 200) return null;
    const text = await new Response(result.stream).text();
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

export async function readLeadRecords<T>(
  prefix: string,
  limit: number,
): Promise<(T & { pathname: string })[]> {
  try {
    const { blobs } = await list({ prefix });
    const recent = blobs
      .sort((a, b) => b.pathname.localeCompare(a.pathname))
      .slice(0, limit);
    const loaded = await Promise.all(
      recent.map(async (blob) => {
        const data = await readJsonBlob<T>(blob.pathname);
        return data ? ({ ...data, pathname: blob.pathname } as T & { pathname: string }) : null;
      }),
    );
    return loaded.filter((item) => item !== null) as (T & { pathname: string })[];
  } catch {
    return [];
  }
}

export async function countBlobs(prefix: string): Promise<number> {
  try {
    const { blobs } = await list({ prefix });
    return blobs.length;
  } catch {
    return 0;
  }
}

export function formatAdminDate(iso?: string): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString("en-GB", {
      day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit",
    });
  } catch {
    return iso;
  }
}
