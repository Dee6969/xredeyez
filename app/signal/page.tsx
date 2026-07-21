import Link from "next/link";
import PlatformShell from "../components/PlatformShell";
import { cities, vibes } from "../data/platform";

export const metadata = {
  alternates: { canonical: "https://www.redeyez.co.uk/signal" },
  openGraph: { title: "The Signal | XRED EYEZ", description: "The cannabis culture briefing.", type: "website", url: "https://www.redeyez.co.uk/signal" },
  title: "Signal | XRED EYEZ",
  description: "Daily X Red Eyez culture, city, and discovery prompts.",
};

export default function SignalPage() {
  const city = cities[0];
  const vibe = vibes.find((item) => item.id === "late") || vibes[0];

  return (
    <PlatformShell>
      <section className="platform-hero">
        <div className="eyebrow">DAILY SIGNAL</div>
        <h1 className="platform-title">Tonight: move slower, choose better.</h1>
        <p className="platform-lede">
          The daily layer keeps the platform useful without making it noisy. One city, one mood, one next move.
        </p>
        <div className="platform-action-row">
          <Link href={`/cities/${city.slug}/map`} data-hover className="platform-primary-action">
            Open {city.name} Map
          </Link>
          <Link href={`/vibes?vibe=${vibe.id}`} data-hover className="platform-secondary-action">
            Today&apos;s Vibe
          </Link>
        </div>
      </section>

      <section className="platform-section">
        <div className="platform-module-grid">
          <article className="platform-card p-6">
            <div className="eyebrow">CITY MOOD</div>
            <h2 className="mt-5 font-display text-[34px] leading-none text-[var(--text-primary)]">{city.name} after dark</h2>
            <p className="mt-5 text-[15px] leading-7 text-[var(--text-secondary)]">
              Start with a quieter canal route, keep food and water in the plan, and save one recovery stop before the night starts.
            </p>
          </article>
          <article className="platform-card p-6">
            <div className="eyebrow">VIBE</div>
            <h2 className="mt-5 font-display text-[34px] leading-none text-[var(--text-primary)]">{vibe.name}</h2>
            <p className="mt-5 text-[15px] leading-7 text-[var(--text-secondary)]">{vibe.description}</p>
          </article>
        </div>
      </section>
    </PlatformShell>
  );
}
