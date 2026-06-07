import Link from "next/link";
import PlatformShell from "../../components/PlatformShell";

export const metadata = {
  title: "List Your Business | XRED EYEZ",
  description: "Get your cannabis café, social club, hotel, restaurant or brand listed on XRED EYEZ. Reach cannabis travellers across Europe and beyond. From €49/month.",
};

const benefits = [
  {
    icon: "◉",
    title: "Reach cannabis travellers",
    desc: "Appear in front of visitors actively planning cannabis culture trips. These are warm leads — people looking for exactly what you offer.",
  },
  {
    icon: "◆",
    title: "Appear in city guides",
    desc: "Your venue sits inside the cannabis, stay, eat, or do layer of the guide for your city. Contextual, not just a directory.",
  },
  {
    icon: "◎",
    title: "Map visibility",
    desc: "Your pin appears on the city map with category filtering. Travellers browsing the map see you when they filter your layer.",
  },
  {
    icon: "✦",
    title: "Featured placement options",
    desc: "Upgrade to featured or premium to appear at the top of category sections, route cards, and homepage modules.",
  },
  {
    icon: "○",
    title: "Booking.com hotel layer",
    desc: "Hotels and accommodation can connect to the Booking.com affiliate layer embedded in every city guide.",
  },
  {
    icon: "◈",
    title: "Claim and manage your profile",
    desc: "Claim an existing unclaimed listing or submit your business directly. Dashboard access for premium partners.",
  },
];

const packages = [
  {
    id: "starter",
    name: "Starter",
    price: "€49",
    per: "/month",
    summary: "Get on the map and in the guide. Perfect for independent venues, cafés, social clubs and restaurants.",
    features: [
      "City guide listing",
      "Map pin",
      "Category tag",
      "One-line description",
      "Contact / website link",
      "Free to claim existing listing",
    ],
    cta: "Apply for Starter",
    highlight: false,
  },
  {
    id: "featured",
    name: "Featured",
    price: "€149",
    per: "/month",
    summary: "Priority placement in category sections, highlighted card, and route card inclusion.",
    features: [
      "Everything in Starter",
      "Featured card badge",
      "Top-of-section placement",
      "Route card inclusion",
      "Gallery image slot",
      "Know Before You Go details",
    ],
    cta: "Apply for Featured",
    highlight: true,
  },
  {
    id: "premium",
    name: "Premium Partner",
    price: "€299",
    per: "/month",
    summary: "Full brand room, homepage module eligibility, partner dashboard, and referral tracking.",
    features: [
      "Everything in Featured",
      "Brand room on venue page",
      "Homepage module eligibility",
      "Partner dashboard access",
      "Booking.com hotel layer (stays)",
      "Referral link + tracking",
    ],
    cta: "Apply for Premium",
    highlight: false,
  },
  {
    id: "city-sponsor",
    name: "City Sponsor",
    price: "POA",
    per: "",
    summary: "Exclusive city-level sponsorship. Hero banner, featured route slot, and priority map placement.",
    features: [
      "Exclusive city presence",
      "City hero / banner slot",
      "Featured route sponsorship",
      "Priority map pin",
      "Dedicated city partner page",
      "Custom commercial package",
    ],
    cta: "Enquire",
    highlight: false,
  },
];

const venueTypes = [
  "Cannabis Café", "Coffeeshop", "Social Club", "Lounge", "Dispensary",
  "Hotel", "Boutique Stay", "Restaurant", "Bar", "Wellness / Spa",
  "Gallery", "Event Space", "Cannabis Brand", "Travel Brand",
];

export default function ListYourBusinessPage() {
  return (
    <PlatformShell>
      {/* Hero */}
      <section className="platform-hero" style={{ paddingTop: "clamp(56px, 8vw, 120px)" }}>
        <div className="eyebrow">Partners</div>
        <h1 className="platform-title" style={{ maxWidth: "820px" }}>
          Get listed where cannabis travellers search first.
        </h1>
        <p className="platform-lede">
          XRED EYEZ is the premium cannabis culture travel platform. We connect travellers with the best venues, stays, and experiences across Amsterdam, Barcelona, Tenerife, Berlin, Prague, Bangkok, and beyond.
        </p>
        <div className="platform-action-row" style={{ marginTop: "32px" }}>
          <a href="#packages" className="platform-primary-action">
            View listing packages
          </a>
          <Link href="/partners/claim" className="platform-secondary-action">
            Claim existing listing
          </Link>
        </div>
        <p style={{ marginTop: "20px", fontSize: "13px", color: "var(--text-muted)", fontFamily: "'Courier New', monospace", letterSpacing: "0.08em" }}>
          Listings from €49/month · No setup fee · Cancel anytime
        </p>
      </section>

      {/* Trust strip */}
      <section className="platform-section">
        <div className="platform-info-strip">
          <div>
            <span>Platform</span>
            <strong>Premium cannabis travel</strong>
          </div>
          <div>
            <span>Coverage</span>
            <strong>10+ cities worldwide</strong>
          </div>
          <div>
            <span>Starting price</span>
            <strong>From €49/month</strong>
          </div>
        </div>
      </section>

      {/* Who is this for */}
      <section className="platform-section">
        <div className="platform-section-head">
          <div>
            <div className="eyebrow">Who we list</div>
            <h2 className="platform-section-title">Built for cannabis-culture businesses.</h2>
          </div>
        </div>
        <div className="listing-venue-types">
          {venueTypes.map((type) => (
            <span key={type} className="listing-type-chip">{type}</span>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="platform-section">
        <div className="platform-section-head">
          <div>
            <div className="eyebrow">Why list</div>
            <h2 className="platform-section-title">What you get on the platform.</h2>
          </div>
        </div>
        <div className="listing-benefits-grid">
          {benefits.map((b) => (
            <div key={b.title} className="listing-benefit-card">
              <span className="listing-benefit-icon" aria-hidden="true">{b.icon}</span>
              <h3 className="listing-benefit-title">{b.title}</h3>
              <p className="listing-benefit-desc">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Packages */}
      <section className="platform-section" id="packages">
        <div className="platform-section-head">
          <div>
            <div className="eyebrow">Listing packages</div>
            <h2 className="platform-section-title">Choose your level of presence.</h2>
          </div>
        </div>
        <div className="listing-packages-grid">
          {packages.map((pkg) => (
            <div key={pkg.id} className={`listing-pkg-card${pkg.highlight ? " is-featured" : ""}`}>
              <div className="listing-pkg-badge">{pkg.name}</div>
              <div className="listing-pkg-price">
                {pkg.price}
                {pkg.per && <span className="listing-pkg-per">{pkg.per}</span>}
              </div>
              <p className="listing-pkg-summary">{pkg.summary}</p>
              <ul className="listing-pkg-features">
                {pkg.features.map((f) => (
                  <li key={f} className="listing-pkg-feature">
                    <span className="listing-pkg-dot" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={`/partners/claim?package=${pkg.id}`}
                className={`listing-pkg-cta${pkg.highlight ? " is-primary" : ""}`}
              >
                {pkg.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Enquiry CTA */}
      <section className="platform-section">
        <div className="listing-enquiry-panel">
          <div>
            <div className="eyebrow">Ready to get listed?</div>
            <h2 className="listing-enquiry-title">Apply now or claim an existing listing.</h2>
            <p className="listing-enquiry-copy">
              Fill in the enquiry form and we will confirm your listing tier, onboard your venue, and get you live within 48 hours. Already listed but unclaimed? Use the claim flow.
            </p>
          </div>
          <div className="listing-enquiry-actions">
            <Link href="/partners/claim" className="platform-primary-action">
              Apply to get listed
            </Link>
            <Link href="/cities" className="platform-secondary-action">
              Browse the platform
            </Link>
          </div>
        </div>
      </section>
    </PlatformShell>
  );
}
