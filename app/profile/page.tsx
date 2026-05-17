import Link from "next/link";
import MembershipTeaser from "../components/MembershipTeaser";
import PlatformShell from "../components/PlatformShell";

export const metadata = {
  title: "Profile Preview | XRED EYEZ",
};

export default function ProfilePage() {
  return (
    <PlatformShell>
      <section className="platform-hero">
        <div className="eyebrow">PROFILE STUB</div>
        <h1 className="platform-title">Your member layer.</h1>
        <p className="platform-lede">
          Auth comes later. For launch, saved places work locally and the profile explains what sync unlocks.
        </p>
        <div className="platform-action-row">
          <Link href="/saved" data-hover className="platform-primary-action">
            Open Saved
          </Link>
          <Link href="/vault" data-hover className="platform-secondary-action">
            Join Vault
          </Link>
        </div>
      </section>
      <section className="platform-section">
        <MembershipTeaser />
      </section>
    </PlatformShell>
  );
}
