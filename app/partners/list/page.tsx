import Link from "next/link";
import PlatformShell from "../../components/PlatformShell";

export const metadata = {
  title: "List Your Business — Reach Cannabis Travellers | XRED EYEZ",
  description: "Get your cannabis café, social club, hotel, restaurant or brand listed on XRED EYEZ. Reach cannabis travellers across Europe and beyond. From £9.99/month.",
  alternates: {
    canonical: "https://www.redeyez.co.uk/partners/list",
  },
  openGraph: {
    title: "List Your Business | XRED EYEZ",
    description: "City guide placement, map pins, featured cards and sponsorships. Reach travellers actively planning cannabis culture trips. From £9.99/month.",
    type: "website",
    url: "https://www.redeyez.co.uk/partners/list",
  },
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
    id: "launch",
    name: "Launch Partner",
    price: "£9.99",
    per: "/month",
    summary: "Your premium brand page, live on the platform. Founding rate while we build the network — locked in for as long as you stay.",
    features: [
      "Premium brand-room profile page",
      "Your brand colours, logo & scrolling brand ticker",
      "Partner photo gallery (verified imagery)",
      "Social links on your profile",
      "Verified partner trust badge",
      "Premium partner tile across the site",
      "Walk-there & Street View navigation",
      "Founding rate locked in",
    ],
    cta: "Claim launch rate",
    highlight: true,
  },
  {
    id: "featured",
    name: "Featured Partner",
    price: "£49.99",
    per: "/month",
    summary: "Everything in Launch, plus priority visibility: be the first venue travellers see in your city and category.",
    features: [
      "Everything in Launch Partner",
      "Top-of-section placement in your city guide",
      "Priority map pin ordering",
      "Curated route inclusion",
      "Featured placement in Explore",
      "Know Before You Go editorial detail",
    ],
    cta: "Apply for Featured",
    highlight: false,
  },
  {
    id: "premium",
    name: "Premium Partner",
    price: "£99.99",
    per: "/month",
    summary: "Everything in Featured, plus commerce and intelligence: bookings, referral tracking, and your own performance dashboard.",
    features: [
      "Everything in Featured Partner",
      "Homepage module eligibility",
      "Booking / referral link with tracking",
      "Partner dashboard access",
      "Monthly performance report",
      "Priority support & profile updates",
    ],
    cta: "Apply for Premium",
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
          Listings from £9.99/month · No setup fee · Cancel anytime
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
            <strong>From £9.99/month</strong>
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
