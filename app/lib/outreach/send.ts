import { Resend } from "resend";
import { render } from "@react-email/components";
import OutreachEmail from "../../../emails/OutreachEmail";
import { EMAIL_CONTENT, type Sector, type SequenceType } from "./content";
import type { OutreachContact } from "./store";

const FROM = "XRED EYEZ Partners <noreply@redeyez.co.uk>";

function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY not set");
  return new Resend(key);
}

function getBaseUrl(): string {
  return process.env.BASE_URL ?? "https://www.redeyez.co.uk";
}

export async function sendOutreachEmail(
  contact: OutreachContact,
  sequence: SequenceType,
  step: number
): Promise<string> {
  const steps = EMAIL_CONTENT[contact.sector][sequence];
  const content = steps[step - 1];
  if (!content) throw new Error(`No content for ${contact.sector}/${sequence}/step${step}`);

  const html = await render(
    OutreachEmail({
      content,
      contactId: contact.id,
      businessName: contact.businessName,
      sector: contact.sector as Sector,
      baseUrl: getBaseUrl(),
    })
  );

  const resend = getResend();
  const { data, error } = await resend.emails.send({
    from: FROM,
    to: contact.email,
    subject: content.subject,
    html,
  });

  if (error || !data) {
    throw new Error(error?.message ?? "Resend send failed");
  }

  return data.id;
}
