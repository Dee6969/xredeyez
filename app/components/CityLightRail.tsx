import Image from "next/image";
import Link from "next/link";

const cities = [
  { title: "Amsterdam",  location: "Netherlands",    status: "Live now", href: "/cities/amsterdam",     image: "/cities/amsterdam-canal-day.png" },
  { title: "Barcelona",  location: "Spain",          status: "Live now", href: "/cities/barcelona",     image: "/cities/barcelona-terrace.png" },
  { title: "Tenerife",   location: "Spain",          status: "Live now", href: "/cities/tenerife",      image: "/cities/tenerife-sunrise.png" },
  { title: "Marbella",   location: "Spain",          status: "Live now", href: "/cities/marbella",      image: "/cities/marbella-marina.png" },
  { title: "Bangkok",    location: "Thailand",       status: "Live now", href: "/cities/thailand",      image: "/cities/thailand-bangkok.png" },
  { title: "Berlin",     location: "Germany",        status: "Live now", href: "/cities/germany",       image: "/cities/germany-berlin.png" },
  { title: "Prague",     location: "Czech Republic", status: "Live now", href: "/cities/czech-republic", image: "/cities/czech-prague.png" },
  { title: "Cape Town",  location: "South Africa",   status: "Live now", href: "/cities/south-africa",  image: "/cities/south-africa-cape-town.png" },
  { title: "USA",        location: "Market Guide",   status: "Live now", href: "/cities/usa",           image: "/cities/usa-market-hero.png" },
  { title: "Canada",     location: "Market Guide",   status: "Live now", href: "/cities/canada",        image: "/cities/canada-market-hero.png" },
];

export default function CityLightRail() {
  return (
    <section className="city-light-rail" aria-label="Destination discovery">
      {cities.map((city) => (
        <Link key={city.title} href={city.href} className="city-light-card">
          <Image
            src={city.image}
            alt={`${city.title} guide`}
            fill
            sizes="(max-width: 768px) 80vw, 25vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <span className="city-light-glass">
            <small>{city.location} · {city.status}</small>
            <strong>{city.title}</strong>
          </span>
        </Link>
      ))}
    </section>
  );
}
