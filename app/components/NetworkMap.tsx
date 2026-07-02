"use client";

import dynamic from "next/dynamic";
import type { City } from "../data/platform";

const NetworkMapInner = dynamic(() => import("./NetworkMapInner"), {
  ssr: false,
  loading: () => <div className="map-zen-loading network-map-loading">Loading the network…</div>,
});

/**
 * The network overview map: every XRED EYEZ city as a live pin.
 * Turns /map from a static city list into a map-first gateway.
 */
export default function NetworkMap({ cities }: { cities: City[] }) {
  return (
    <div className="network-map-frame">
      <NetworkMapInner cities={cities} />
    </div>
  );
}
