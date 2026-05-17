import Link from "next/link";
import PlatformShell from "../components/PlatformShell";

export const metadata = {
  title: "Trips Preview | XRED EYEZ",
};

export default function TripsPage() {
  return (
    <PlatformShell>
      <section className="platform-hero">
        <div className="eyebrow">TRIPS STUB</div>
        <h1 className="platform-title">Boards become routes.</h1>
        <p className="platform-lede">
          Future trip boards will turn saved venues, food, culture, and recovery stops into shareable city plans.
        </p>
        <div className="platform-action-row">
          <Link href="/saved" data-hover className="platform-primary-action">
            Open Saved
          </Link>
          <Link href="/cities/amsterdam/map" data-hover className="platform-secondary-action">
            Build From Map
          </Link>
        </div>
      </section>
    </PlatformShell>
  );
}
