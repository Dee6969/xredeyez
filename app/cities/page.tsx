import CityCard from "../components/CityCard";
import CityLightRail from "../components/CityLightRail";
import PlatformShell from "../components/PlatformShell";
import { cities } from "../data/platform";

export const metadata = {
  title: "Cities | XRED EYEZ",
  description: "Browse X Red Eyez cannabis culture city guides and market guides.",
};

export default function CitiesPage() {
  return (
    <PlatformShell>
      <section className="platform-hero">
        <div className="eyebrow">CITIES</div>
        <h1 className="platform-title">City guides that move with you.</h1>
        <p className="platform-lede">
          Start with Amsterdam, then follow the platform as Barcelona, Tenerife, Marbella, Thailand, Germany, Czech Republic, and South Africa open up.
        </p>
      </section>

      <CityLightRail />

      <section className="platform-section">
        <div className="platform-card-grid">
          {cities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>
      </section>
    </PlatformShell>
  );
}
