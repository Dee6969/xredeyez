import MembershipTeaser from "../components/MembershipTeaser";
import PlatformShell from "../components/PlatformShell";
import SavedList from "../components/SavedList";

export const metadata = {
  title: "Saved | XRED EYEZ",
  description: "Your saved X Red Eyez places, cities, vibes, and routes.",
};

export default function SavedPage() {
  return (
    <PlatformShell>
      <section className="platform-hero">
        <div className="eyebrow">SAVED</div>
        <h1 className="platform-title">Your private map.</h1>
        <p className="platform-lede">
          Places, cities, and vibes you want to come back to. Local board now, member sync later.
        </p>
      </section>

      <section className="platform-section">
        <SavedList />
      </section>

      <section className="platform-section">
        <MembershipTeaser compact />
      </section>
    </PlatformShell>
  );
}
