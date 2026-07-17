"use client";

import { useState } from "react";
import { trackEvent } from "../lib/analytics";

/** Email capture for the UK medical access briefing. */
export default function MedicalBriefingSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@") || status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "uk-medical-briefing" }),
      });
      if (res.ok) {
        setStatus("success");
        trackEvent("waitlist_join", { source: "uk-medical-briefing" });
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="medical-signup-done">
        You&apos;re on the list — we&apos;ll send the UK access briefing as the landscape changes.
      </p>
    );
  }

  return (
    <form className="medical-signup" onSubmit={submit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        aria-label="Email for the UK medical briefing"
        required
      />
      <button type="submit" className="platform-primary-action" disabled={status === "loading"}>
        {status === "loading" ? "Joining…" : "Get the briefing"}
      </button>
      {status === "error" && <span className="medical-signup-error">Something went wrong — try again.</span>}
    </form>
  );
}
