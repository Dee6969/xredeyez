"use client";
import Link from "next/link";
import { useState } from "react";

type SlimVenue = { id: string; name: string; city: string; slug: string };

interface PartnerClaimFormProps {
  venues: SlimVenue[];
  currentVenue?: SlimVenue;
}

export default function PartnerClaimForm({ venues, currentVenue: venue }: PartnerClaimFormProps) {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="claim-form platform-card"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <div className="eyebrow">LEAD FORM</div>
      <h2>Partner enquiry</h2>
      {sent ? (
        <div className="claim-success">
          <strong>Enquiry captured.</strong>
          <p>This MVP stores the partner flow in the interface. Backend CRM routing is stubbed for the next build pass.</p>
          <Link href="/cities/amsterdam/map" data-hover className="platform-primary-action">
            Back to Amsterdam
          </Link>
        </div>
      ) : (
        <>
          <label>
            Listing
            <select name="venue" defaultValue={venue?.slug || ""}>
              <option value="">New / not listed yet</option>
              {venues.map((item) => (
                <option key={item.id} value={item.slug}>
                  {item.name} - {item.city}
                </option>
              ))}
            </select>
          </label>
          <label>
            Business name
            <input name="businessName" defaultValue={venue?.name || ""} required />
          </label>
          <label>
            Contact name
            <input name="contactName" required />
          </label>
          <label>
            Email
            <input name="email" type="email" required />
          </label>
          <label>
            Phone / WhatsApp
            <input name="phone" />
          </label>
          <label>
            What do you want?
            <textarea name="message" rows={5} placeholder="Claim listing, featured profile, premium pin, city sponsorship, booking link, referral setup..." />
          </label>
          <button type="submit" data-hover className="platform-primary-action">
            Send Enquiry
          </button>
        </>
      )}
    </form>
  );
}
