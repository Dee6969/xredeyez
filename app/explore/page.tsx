import PlatformShell from "../components/PlatformShell";
import ExploreDirectory from "../components/ExploreDirectory";
import { cities, venues } from "../data/platform";

export const metadata = {
  title: "Explore | XRED EYEZ",
  description: "Browse cannabis culture venues, stays, restaurants and more across every XRED EYEZ city.",
};

export default function ExplorePage() {
  const liveCities = cities.filter(c => c.status === "flagship" || c.status === "live");

  return (
    <PlatformShell>
      <div className="xdir-page-head">
        <div className="eyebrow">Places</div>
        <h1 className="platform-title xdir-page-title">Every spot. Every city.</h1>
        <p className="platform-lede xdir-page-lede">
          {venues.length} venues across {liveCities.length} cities — filter by Cannabis, Stay, Eat, Do, search by name or neighbourhood.
        </p>
      </div>

      <ExploreDirectory venues={venues} cities={cities} />
    </PlatformShell>
  );
}
