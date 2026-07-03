"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "../lib/analytics";

const DRAFT_KEY = "xred-route-draft";

interface RouteDraft {
  cityId: string;
  venueIds: string[];
}

function readDraft(): RouteDraft | null {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(window.localStorage.getItem(DRAFT_KEY) || "null");
  } catch {
    return null;
  }
}

function writeDraft(draft: RouteDraft | null) {
  if (draft && draft.venueIds.length > 0) {
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } else {
    window.localStorage.removeItem(DRAFT_KEY);
  }
  window.dispatchEvent(new Event("xred-route-draft-change"));
}

/**
 * Route Builder foundation: travellers assemble a draft route as they
 * browse. Stored locally for now; becomes a synced CuratedRoute once
 * accounts land. Starting a route in a different city resets the draft.
 */
export default function AddToRouteButton({
  venueId,
  cityId,
  accent,
}: {
  venueId: string;
  cityId: string;
  accent?: string;
}) {
  const [inRoute, setInRoute] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const sync = () => {
      const draft = readDraft();
      setInRoute(Boolean(draft && draft.cityId === cityId && draft.venueIds.includes(venueId)));
      setCount(draft && draft.cityId === cityId ? draft.venueIds.length : 0);
    };
    sync();
    window.addEventListener("xred-route-draft-change", sync);
    return () => window.removeEventListener("xred-route-draft-change", sync);
  }, [venueId, cityId]);

  const toggle = () => {
    const existing = readDraft();
    const draft: RouteDraft =
      existing && existing.cityId === cityId ? existing : { cityId, venueIds: [] };

    if (draft.venueIds.includes(venueId)) {
      draft.venueIds = draft.venueIds.filter((id) => id !== venueId);
    } else {
      draft.venueIds = [...draft.venueIds, venueId];
      trackEvent("route_build_click", { venue: venueId, city: cityId, stops: draft.venueIds.length });
    }
    writeDraft(draft);
  };

  return (
    <button
      type="button"
      data-hover
      onClick={toggle}
      className={`route-add-btn${inRoute ? " is-added" : ""}`}
      style={accent && inRoute ? { borderColor: accent, color: accent } : undefined}
      aria-pressed={inRoute}
    >
      {inRoute ? `✓ In your route${count > 1 ? ` (${count})` : ""}` : "+ Add to route"}
    </button>
  );
}
