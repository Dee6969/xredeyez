"use client";
import dynamic from "next/dynamic";
import type { City, Venue } from "../data/platform";

const HomepageMap = dynamic(() => import("./HomepageMap"), { ssr: false });

export default function HomepageMapClient({ venues, cities }: { venues: Venue[]; cities: City[] }) {
  return <HomepageMap venues={venues} cities={cities} />;
}
