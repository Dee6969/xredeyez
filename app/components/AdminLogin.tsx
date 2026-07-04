"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [key, setKey] = useState("");
  const [state, setState] = useState<"idle" | "checking" | "error">("idle");
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!key || state === "checking") return;
    setState("checking");
    const res = await fetch("/api/admin/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key }),
    });
    if (res.ok) {
      router.refresh();
    } else {
      setState("error");
    }
  }

  return (
    <form className="adm-login" onSubmit={submit}>
      <div className="adm-login-head">
        <span className="adm-brand-mark">XRED EYEZ</span>
        <h1>Control Room</h1>
        <p>Operations dashboard. Authorised access only.</p>
      </div>
      <label className="adm-login-label">
        Admin key
        <input
          type="password"
          value={key}
          onChange={(e) => { setKey(e.target.value); setState("idle"); }}
          autoFocus
          autoComplete="current-password"
          placeholder="••••••••••••"
        />
      </label>
      {state === "error" && <p className="adm-login-error" role="alert">Wrong key. Try again.</p>}
      <button type="submit" className="adm-btn-primary" disabled={state === "checking"}>
        {state === "checking" ? "Checking…" : "Enter"}
      </button>
    </form>
  );
}
