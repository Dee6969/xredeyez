import Link from "next/link";
import PlatformShell from "../components/PlatformShell";
import VenueCard from "../components/VenueCard";
import { getVenuesByVibe, vibes } from "../data/platform";

export const metadata = {
  title: "Vibes | XRED EYEZ",
  description: "Explore X Red Eyez places by mood, pace, and lifestyle need.",
};

export default async function VibesPage({
  searchParams,
}: {
  searchParams?: Promise<{ vibe?: string }>;
}) {
  const sp = (await searchParams) || {};
  const active = sp.vibe || "creative";
  const activeVibe = vibes.find((vibe) => vibe.id === active) || vibes[0];
  const matches = getVenuesByVibe(activeVibe.id);

  return (
    <PlatformShell>
      <section className="platform-hero">
        <div className="eyebrow">VIBES</div>
        <h1 className="platform-title">Choose the feeling first.</h1>
        <p className="platform-lede">
          Not every search starts with a place. Sometimes it starts with mood, pace, or what kind of night you want.
        </p>
      </section>

      <section className="platform-section">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {vibes.map((vibe) => (
            <Link
              key={vibe.id}
              href={`/vibes?vibe=${vibe.id}`}
              data-hover
              className={`vibe-chip shrink-0 ${vibe.id === activeVibe.id ? "is-active" : ""}`}
              style={{ borderColor: `${vibe.accent}88` }}
            >
              {vibe.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="platform-section">
        <div className="platform-panel">
          <div className="eyebrow" style={{ color: activeVibe.accent }}>
            ACTIVE VIBE
          </div>
          <h2 className="mt-4 font-display text-[42px] leading-none text-[var(--text-primary)] md:text-[72px]">
            {activeVibe.name}
          </h2>
          <p className="mt-5 max-w-2xl text-[16px] leading-7 text-[var(--text-secondary)]">{activeVibe.description}</p>
        </div>
      </section>

      <section className="platform-section">
        <div className="platform-section-head">
          <div>
            <div className="eyebrow">MATCHES</div>
            <h2 className="platform-section-title">Places and routes.</h2>
          </div>
        </div>
        {matches.length > 0 ? (
          <div className="platform-card-grid">
            {matches.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        ) : (
          <div className="platform-panel">
            <p>This vibe is being mapped. Save it now and come back as new city guides open.</p>
          </div>
        )}
      </section>
    </PlatformShell>
  );
}
