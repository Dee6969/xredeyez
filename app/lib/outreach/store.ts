import { put, list } from "@vercel/blob";
import type { Sector, SequenceType } from "./content";

export interface OutreachContact {
  id: string;
  email: string;
  businessName: string;
  venueName?: string;
  venueId?: string;
  sector: Sector;
  sequence: SequenceType;
  step: number;
  status: "active" | "complete" | "unsubscribed";
  scheduledAt?: string;
  lastSentAt?: string;
  coldEmailIds?: string[];
  createdAt: string;
}

const BLOB_PATHNAME = "outreach/contacts.json";

export async function readContacts(): Promise<OutreachContact[]> {
  try {
    const { blobs } = await list({ prefix: BLOB_PATHNAME });
    if (!blobs.length) return [];
    const res = await fetch(blobs[0].downloadUrl);
    if (!res.ok) return [];
    return await res.json() as OutreachContact[];
  } catch {
    return [];
  }
}

export async function writeContacts(contacts: OutreachContact[]): Promise<void> {
  await put(BLOB_PATHNAME, JSON.stringify(contacts), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export async function upsertContact(contact: OutreachContact): Promise<void> {
  const contacts = await readContacts();
  const idx = contacts.findIndex((c) => c.id === contact.id);
  if (idx >= 0) {
    contacts[idx] = contact;
  } else {
    contacts.push(contact);
  }
  await writeContacts(contacts);
}

export async function getContact(id: string): Promise<OutreachContact | null> {
  const contacts = await readContacts();
  return contacts.find((c) => c.id === id) ?? null;
}

export async function getContactByEmail(email: string): Promise<OutreachContact | null> {
  const contacts = await readContacts();
  return contacts.find((c) => c.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export function generateContactId(email: string): string {
  return Buffer.from(email.toLowerCase()).toString("base64url").slice(0, 16);
}

export const SEQUENCE_DELAYS: Record<SequenceType, Record<number, number>> = {
  cold: { 1: 0, 2: 3 * 24 * 60 * 60 * 1000, 3: 7 * 24 * 60 * 60 * 1000 },
  nurture: { 1: 0, 2: 3 * 24 * 60 * 60 * 1000 },
};

export function nextStepSchedule(sequence: SequenceType, step: number): Date | null {
  const delays = SEQUENCE_DELAYS[sequence];
  const nextStep = step + 1;
  if (!(nextStep in delays)) return null;
  return new Date(Date.now() + delays[nextStep]);
}
