import PlatformShell from "../components/PlatformShell";
import ExploreDirectory from "../components/ExploreDirectory";
import { cities, venues } from "../data/platform";

export const metadata = {
  title: "Find Cannabis Venues, Coffeeshops & Social Clubs | XRED EYEZ",
  description: "Search and filter 245+ cannabis culture venues across Amsterdam, Barcelona, Prague and more. Coffeeshops, social clubs, hotels, restaurants — all in one place.",
  alternates: {
    canonical: "https://www.redeyez.co.uk/explore",
  },
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
