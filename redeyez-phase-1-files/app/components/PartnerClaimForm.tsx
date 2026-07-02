"use client";
import Link from "next/link";
import { useState } from "react";
import { trackEvent } from "../lib/analytics";

type SlimVenue = { id: string; name: string; city: string; slug: string };

interface PartnerClaimFormProps {
  venues: SlimVenue[];
  currentVenue?: SlimVenue;
  packageId?: string;
}

type FormState = "idle" | "sending" | "sent" | "error";

export default function PartnerClaimForm({ venues, currentVenue: venue, packageId }: PartnerClaimFormProps) {
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      venue: String(data.get("venue") || ""),
      businessName: String(data.get("businessName") || ""),
      contactName: String(data.get("contactName") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      message: String(data.get("message") || ""),
      packageId: packageId || "",
      sourcePage: typeof window !== "undefined" ? window.location.pathname + window.location.search : "",
    };

    setState("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/partners/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Something went wrong. Please try again.");
      }
      trackEvent("enquiry_submit", {
        hasVenue: Boolean(payload.venue),
        package: payload.packageId || "none",
      });
      setState("sent");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setState("error");
    }
  }

  return (
    <form className="claim-form platform-card" onSubmit={handleSubmit}>
      <div className="eyebrow">LEAD FORM</div>
      <h2>Partner enquiry</h2>
      {state === "sent" ? (
        <div className="claim-success">
          <strong>Enquiry received.</strong>
          <p>
            Thanks — the partnerships team has your details and will reply by email, usually within
            two working days.
          </p>
          <Link href="/cities" data-hover className="platform-primary-action">
            Back to the cities
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
          {state === "error" && (
            <p role="alert" className="claim-error">
              {errorMessage}
            </p>
          )}
          <button type="submit" data-hover className="platform-primary-action" disabled={state === "sending"}>
            {state === "sending" ? "Sending…" : "Send Enquiry"}
          </button>
        </>
      )}
    </form>
  );
}
