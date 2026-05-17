"use client";
import { useState } from "react";

interface SaveButtonProps {
  itemType: "city" | "venue" | "vibe" | "collection";
  itemId: string;
  label?: string;
}

const storageKey = "xred-saved-items";

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

  const toggle = () => {
    const current = readSaved();
    const next = current.includes(key) ? current.filter((item) => item !== key) : [...current, key];
    window.localStorage.setItem(storageKey, JSON.stringify(next));
    window.dispatchEvent(new Event("xred-saved-change"));
    setSaved(next.includes(key));
  };

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
