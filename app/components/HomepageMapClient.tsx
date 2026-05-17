"use client";
import dynamic from "next/dynamic";
import type { Venue } from "../data/platform";

const HomepageMap = dynamic(() => import("./HomepageMap"), { ssr: false });

export default function HomepageMapClient({ venues }: { venues: Venue[] }) {
  return <HomepageMap venues={venues} />;
}
