"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [key, setKey] = useState("");
  const [state, setState] = useState<"idle" | "checking" | "wrong">("idle");
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("checking");
    const res = await fetch("/api/admin/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key }),
    });
    if (res.ok) {
      router.refresh();
    } else {
      setState("wrong");
    }
  }

  return (
    <form className="admin-leads-lock" onSubmit={submit}>
      <div className="eyebrow">XRED EYEZ ADMIN</div>
      <h1>Control room.</h1>
      <input
        type="password"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="Admin key"
        className="admin-login-input"
        autoFocus
      />
      {state === "wrong" && <p className="claim-error">Wrong key.</p>}
      <button type="submit" className="platform-primary-action" disabled={state === "checking"} style={{ marginTop: "12px" }}>
        {state === "checking" ? "Checking…" : "Enter"}
      </button>
    </form>
  );
}
