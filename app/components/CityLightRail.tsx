import Image from "next/image";
import Link from "next/link";

const cities = [
  {
    title: "Amsterdam",
    location: "Netherlands",
    status: "Live now",
    href: "/cities/amsterdam",
    image: "/cities/amsterdam-canal-day.png",
  },
  {
    title: "Barcelona",
    location: "Spain",
    status: "Coming soon",
    href: "/cities/barcelona",
    image: "/cities/barcelona-terrace.png",
  },
  {
    title: "Tenerife",
    location: "Spain",
    status: "Coming soon",
    href: "/cities/tenerife",
    image: "/cities/tenerife-sunrise.png",
  },
  {
    title: "Marbella",
    location: "Spain",
    status: "Coming soon",
    href: "/cities/marbella",
    image: "/cities/marbella-marina.png",
  },
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
