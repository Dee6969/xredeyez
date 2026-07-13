import { notFound } from "next/navigation";
import CityMapExperience from "../../../components/CityMapExperience";
import MapShell from "../../../components/MapShell";
import { cities, getCity, getSortedVenuesByCity } from "../../../data/platform";

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
    description: city ? `Discover ${city.name} — cannabis culture, stays, restaurants and more on the live map.` : "Cannabis culture map.",
  };
}

export default async function CityMapPage({ params, searchParams }: MapPageProps & { searchParams: Promise<{ venue?: string }> }) {
  const { slug } = await params;
  const { venue: venueParam } = await searchParams;
  const city = getCity(slug);
  if (!city) notFound();

  const cityVenues = getSortedVenuesByCity(city.id);

  return (
    <MapShell>
      <CityMapExperience city={city} venues={cityVenues} networkCities={cities} initialVenueId={venueParam} />
    </MapShell>
  );
}
