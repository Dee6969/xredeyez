"use client";
import Link from "next/link";
import { useState } from "react";
import { trackEvent } from "../lib/analytics";

interface SaveButtonProps {
  itemType: "city" | "venue" | "vibe" | "collection";
  itemId: string;
  label?: string;
}

const storageKey = "xred-saved-items";

/** Free-tier save allowance. Premium members get unlimited saves. */
export const FREE_SAVE_LIMIT = 10;

function readSaved() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(storageKey) || "[]") as string[];
  } catch {
    return [];
  }
}

export default function SaveButton({ itemType, itemId, label = "Save" }: SaveButtonProps) {
  const key = `${itemType}:${itemId}`;
  const [saved, setSaved] = useState(() => readSaved().includes(key));
  const [limitHit, setLimitHit] = useState(false);

  const toggle = () => {
    const current = readSaved();
    const isSaved = current.includes(key);

    if (!isSaved && current.length >= FREE_SAVE_LIMIT) {
      // Free allowance reached — this is the premium moment.
      setLimitHit(true);
      trackEvent("save_limit_hit", { itemType });
      return;
    }

    const next = isSaved ? current.filter((item) => item !== key) : [...current, key];
    window.localStorage.setItem(storageKey, JSON.stringify(next));
    window.dispatchEvent(new Event("xred-saved-change"));
    setSaved(next.includes(key));
    if (!isSaved) {
      trackEvent("save_place", { itemType, itemId });
    }
  };

  if (limitHit) {
    return (
      <Link
        href="/premium"
        data-hover
        className="save-button is-limit"
        onClick={() => trackEvent("premium_click", { source: "save_limit" })}
      >
        <span>Limit reached — go Premium</span>
      </Link>
    );
  }

  return (
    <button
      type="button"
      data-hover
      onClick={toggle}
      className={`save-button ${saved ? "is-saved" : ""}`}
      aria-pressed={saved}
    >
      <span>{saved ? "Saved" : label}</span>
    </button>
  );
}
