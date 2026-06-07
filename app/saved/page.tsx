import MembershipTeaser from "../components/MembershipTeaser";
import PlatformShell from "../components/PlatformShell";
import SavedList from "../components/SavedList";
import { cities, venues, vibes } from "../data/platform";

export const metadata = {
  title: "Saved | XRED EYEZ",
  description: "Your saved X Red Eyez places, cities, vibes, and routes.",
};

export default function SavedPage() {
  return (
    <PlatformShell>
      <section className="platform-hero">
        <div className="eyebrow">SAVED</div>
        <h1 className="platform-title">Your private map.</h1>
        <p className="platform-lede">
          Places, cities, and vibes you want to come back to. Local board now, member sync later.
        </p>
      </section>

      <section className="platform-section">
        <SavedList
          venues={venues.map(({ id, name, city, neighborhood, slug }) => ({ id, name, city, neighborhood, slug }))}
          cities={cities.map(({ id, name, country, slug }) => ({ id, name, country, slug }))}
          vibes={vibes.map(({ id, name, slug }) => ({ id, name, slug }))}
        />
      </section>

      <section className="platform-section">
        <MembershipTeaser compact />
      </section>
    </PlatformShell>
  );
}
