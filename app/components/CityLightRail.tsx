import Image from "next/image";
import Link from "next/link";

const cities = [
  { title: "Amsterdam",  location: "Netherlands",    status: "Live now",    href: "/cities/amsterdam",  image: "/cities/amsterdam-canal-day.png" },
  { title: "Barcelona",  location: "Spain",          status: "Coming soon", href: "/cities/barcelona",  image: "/cities/barcelona-terrace.png" },
  { title: "Tenerife",   location: "Spain",          status: "Coming soon", href: "/cities/tenerife",   image: "/cities/tenerife-sunrise.png" },
  { title: "Marbella",   location: "Spain",          status: "Coming soon", href: "/cities/marbella",   image: "/cities/marbella-marina.png" },
  { title: "Bangkok",    location: "Thailand",       status: "Coming soon", href: "/cities/thailand",   image: "/cities/thailand-bangkok.png" },
  { title: "Berlin",     location: "Germany",        status: "Coming soon", href: "/cities/germany",    image: "/cities/germany-berlin.png" },
  { title: "Prague",     location: "Czech Republic", status: "Coming soon", href: "/cities/czech-republic", image: "/cities/czech-prague.png" },
  { title: "Cape Town",  location: "South Africa",   status: "Coming soon", href: "/cities/south-africa",   image: "/cities/south-africa-cape-town.png" },
];

export default function CityLightRail() {
  return (
    <section className="city-light-rail" aria-label="City discovery">
      {cities.map((city) => (
        <Link key={city.title} href={city.href} className="city-light-card">
          <Image
            src={city.image}
            alt={`${city.title} city guide`}
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
