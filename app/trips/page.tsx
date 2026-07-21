import Link from "next/link";
import PlatformShell from "../components/PlatformShell";
import Reveal from "../components/Reveal";

export const metadata = {
  alternates: { canonical: "https://www.redeyez.co.uk/trips" },
  openGraph: { title: "Trip Builder | XRED EYEZ", description: "Build multi-stop cannabis culture routes across our cities.", type: "website", url: "https://www.redeyez.co.uk/trips" },
  title: "Trips | XRED EYEZ",
  description: "Build city routes from saved venues. Cannabis, food, culture, and recovery — one trip plan.",
};

const steps = [
  {
    num: "01",
    title: "Save as you explore.",
    copy: "Browse city guides, maps, and venue profiles. Save anything that fits your mood — coffeeshops, restaurants, hotels, galleries, walks.",
  },
  {
    num: "02",
    title: "Boards organise automatically.",
    copy: "Saved items group by city, vibe, and layer. Cannabis, Stay, Eat, Do — your saves become a structured board without manual sorting.",
  },
  {
    num: "03",
    title: "Turn boards into routes.",
    copy: "The route builder takes your saved board and sequences it — by timing, neighbourhood proximity, and day/night logic. One tap to a shareable city plan.",
  },
  {
    num: "04",
    title: "Travel with it, not before it.",
    copy: "Your trip opens on mobile with directions, hours, and guide notes. Offline-ready. No account needed for the free tier.",
  },
];

export default function TripsPage() {
  return (
    <PlatformShell>
      <Reveal>
        <section className="platform-hero">
          <div className="eyebrow">TRIPS</div>
          <h1 className="platform-title">Boards become routes.</h1>
          <p className="platform-lede">
            Save venues as you explore. The route builder turns your saved board into a sequenced city plan — cannabis, food, culture, and recovery stops in one trip.
          </p>
          <div className="platform-action-row">
            <Link href="/saved" className="platform-primary-action">
              Open Saved
            </Link>
            <Link href="/cities/amsterdam/map" className="platform-secondary-action">
              Build From Map
            </Link>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="platform-section">
          <div className="platform-section-head">
            <div>
              <div className="eyebrow">HOW IT WORKS</div>
              <h2 className="platform-section-title">Four steps to a real city plan.</h2>
            </div>
          </div>
          <div className="trips-step-grid">
            {steps.map((step) => (
              <div key={step.num} className="trips-step">
                <span className="trips-step-num">Step {step.num}</span>
                <h3 className="trips-step-title">{step.title}</h3>
                <p className="trips-step-copy">{step.copy}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="platform-section">
          <div className="platform-section-head">
            <div>
              <div className="eyebrow">EXAMPLE ROUTE</div>
              <h2 className="platform-section-title">Amsterdam: First Timer Loop.</h2>
            </div>
          </div>
          <div className="platform-legal-panel">
            <p>
              Start at a beginner-friendly coffeeshop in Centrum. Walk west along the canals to Jordaan — quieter, slower, more local. Food stop in De Pijp. Evening lounge in Oud-West. Recovery breakfast the next morning at a canal-side café. Two days, one board, four layers — all with guide notes and directions built in.
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="platform-section" style={{ textAlign: "center", padding: "48px 0 72px" }}>
          <p className="eyebrow" style={{ marginBottom: "20px" }}>Start building</p>
          <h2 className="platform-section-title" style={{ marginBottom: "32px" }}>
            Amsterdam is live.
          </h2>
          <div className="platform-action-row" style={{ justifyContent: "center" }}>
            <Link href="/cities/amsterdam/map" className="platform-primary-action">
              Open Amsterdam Map
            </Link>
            <Link href="/vault" className="platform-secondary-action">
              Join the Vault
            </Link>
          </div>
        </section>
      </Reveal>
    </PlatformShell>
  );
}
