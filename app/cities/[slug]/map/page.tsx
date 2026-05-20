import Link from "next/link";
import { notFound } from "next/navigation";
import CityMapExperience from "../../../components/CityMapExperience";
import PlatformShell from "../../../components/PlatformShell";
import SaveButton from "../../../components/SaveButton";
import { cities, getCity, getFeaturedPlacements, getSortedVenuesByCity, vibes } from "../../../data/platform";

interface MapPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return cities.map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({ params }: MapPageProps) {
  const { slug } = await params;
  const city = getCity(slug);
  return {
    title: city ? `${city.name} Map | XRED EYEZ` : "Map | XRED EYEZ",
    description: `Map and venue discovery for ${city?.name || "X Red Eyez"}.`,
  };
}

export default async function CityMapPage({ params }: MapPageProps) {
  const { slug } = await params;
  const city = getCity(slug);

  if (!city) notFound();

  const cityVenues = getSortedVenuesByCity(city.id);
  const placements = getFeaturedPlacements(city.id).slice(0, 2);

  return (
    <PlatformShell>
      <section className="platform-map-layout">
        <header className="platform-map-header">
          <div>
            <div className="eyebrow">MAP MODE</div>
            <h1 className="font-display text-[44px] leading-[0.9] text-[var(--bone)] md:text-[72px]">
              {city.name}
            </h1>
            <p className="mt-3 text-[15px] leading-6 text-white/58">
              Tap a marker, filter by Cannabis, Stay, Eat, Do, or vibe, then save what matters. List and map stay connected.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href={`/cities/${city.slug}`} data-hover className="nav-button">
              Guide
            </Link>
            <SaveButton itemType="city" itemId={city.id} label="Save City" />
          </div>
        </header>

        <CityMapExperience city={city} venues={cityVenues} networkCities={cities} vibes={vibes} />

        <section className="platform-section px-0">
          <div className="platform-info-strip">
            <div>
              <span>Where am I?</span>
              <strong>{city.name} map</strong>
            </div>
            <div>
              <span>What can I do?</span>
              <strong>Filter layers, preview, save</strong>
            </div>
            <div>
              <span>Commercial layer</span>
              <strong>{placements.length} featured slots ready</strong>
            </div>
          </div>
        </section>
      </section>
    </PlatformShell>
  );
}
