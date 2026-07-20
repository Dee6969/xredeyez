import Link from "next/link";
import PlatformShell from "../../components/PlatformShell";
import Reveal from "../../components/Reveal";
import MedicalBriefingSignup from "../../components/MedicalBriefingSignup";
import { clinicsUk, clinicDirectoryNotes } from "../../data/clinics";
import { breadcrumbSchema, toJsonLd } from "../../lib/schema";

export const metadata = {
  title: "UK Medical Cannabis Clinics Compared — Fees & Access Schemes 2026 | XRED EYEZ",
  description:
    "Independent comparison of CQC-regulated UK medical cannabis clinics: initial consultation fees, follow-up costs, access schemes and what each clinic is noted for. Verified July 2026.",
  alternates: { canonical: "https://www.redeyez.co.uk/medical/clinics" },
  openGraph: {
    title: "UK Medical Cannabis Clinics, Compared Honestly | XRED EYEZ",
    description:
      "Consultation fees, access schemes and clinic focus areas — the independent, no-endorsement comparison. Verified 2026.",
    type: "article",
    url: "https://www.redeyez.co.uk/medical/clinics",
  },
};

const listSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "UK Medical Cannabis Clinics",
  itemListElement: clinicsUk.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    url: c.website,
  })),
};

export default function ClinicDirectoryPage() {
  return (
    <PlatformShell>
      <div className="medical-wing">
      <div className="medical-wallpaper" aria-hidden />
      <div className="med-scope">
      <div className="med-wallpaper" aria-hidden />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(listSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: toJsonLd(
            breadcrumbSchema([
              { name: "Home", href: "https://www.redeyez.co.uk/" },
              { name: "Medical Cannabis UK", href: "https://www.redeyez.co.uk/medical" },
              { name: "Clinics Compared", href: "https://www.redeyez.co.uk/medical/clinics" },
            ]),
          ),
        }}
      />

      <Reveal>
        <section className="platform-section medical-hero">
          <nav className="vlp-breadcrumb" style={{ padding: "0 0 18px" }} aria-label="Breadcrumb">
            <Link href="/medical">Medical Cannabis UK</Link>
            <span aria-hidden>/</span>
            <span aria-current="page">Clinics compared</span>
          </nav>
          <div className="eyebrow">CLINICS COMPARED</div>
          <h1 className="platform-section-title medical-hero-title">
            Every regulated clinic, one honest table.
          </h1>
          <p className="medical-lede">
            CQC-regulated clinics with GMC specialist prescribers — compared on the numbers that
            decide most patients&apos; choice: what the first consultation costs, what ongoing care
            costs, and which reduced-cost schemes exist. No rankings, no endorsements, no
            paid placement.
          </p>
          <p className="medical-reviewed">Verified July 2026 · Fees change — always confirm with the clinic</p>
        </section>
      </Reveal>

      <Reveal>
        <section className="platform-section">
          <div className="clinic-table-wrap">
            <table className="clinic-table">
              <thead>
                <tr>
                  <th>Clinic</th>
                  <th>Initial consultation</th>
                  <th>Ongoing costs</th>
                  <th>Reduced-cost schemes</th>
                  <th>Noted for</th>
                </tr>
              </thead>
              <tbody>
                {clinicsUk.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <strong className="clinic-name">{c.name}</strong>
                      <a className="clinic-site" href={c.website} target="_blank" rel="noopener noreferrer">
                        Visit site ↗
                      </a>
                      {c.reviewNote && <span className="clinic-reviews">{c.reviewNote}</span>}
                    </td>
                    <td className="clinic-fee" data-label="Initial consultation">{c.initialConsult}</td>
                    <td data-label="Ongoing costs">{c.followUps}</td>
                    <td data-label="Reduced-cost schemes">{c.accessScheme || "—"}</td>
                    <td data-label="Noted for">
                      <ul className="clinic-noted">
                        {c.notedFor.map((n) => (
                          <li key={n}>{n}</li>
                        ))}
                      </ul>
                      {c.claimStatus === "unclaimed" && (
                        <Link
                          href={`/partners/claim?package=launch&venue=`}
                          className="clinic-claim"
                        >
                          Run this clinic? Claim this profile →
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="platform-section">
          <div className="medical-twin">
            <div className="platform-panel medical-panel">
              <div className="eyebrow">How this table is built</div>
              <h3>Methodology</h3>
              <p>{clinicDirectoryNotes.methodology}</p>
            </div>
            <div className="platform-panel medical-panel">
              <div className="eyebrow">Independence</div>
              <h3>Who pays for this page</h3>
              <p>{clinicDirectoryNotes.independence}</p>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="platform-section">
          <div className="medical-twin">
            <div className="platform-panel medical-panel medical-cta-panel">
              <div className="eyebrow">Stay Current</div>
              <h3>Fee changes, tracked for you</h3>
              <p>
                Clinic pricing and access schemes shift constantly. Join the UK access briefing and
                we&apos;ll flag meaningful changes — no spam, no product promotion, ever.
              </p>
              <MedicalBriefingSignup />
            </div>
            <div className="platform-panel medical-panel">
              <div className="eyebrow">For Clinics</div>
              <h3>Keep your row accurate</h3>
              <p>
                Patients compare before they book — make sure what they compare is correct. Claim
                your profile to verify fees, schemes and focus areas, at the £9.99/month founding
                rate. Factual presentation never changes with payment.
              </p>
              <Link href="/partners/claim?package=launch" className="platform-secondary-action" style={{ justifySelf: "start" }}>
                Claim your clinic profile →
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="platform-section">
          <aside className="medical-disclaimer" aria-label="Disclaimer">
            <div className="eyebrow">The Honest Bit</div>
            <p>
              This page is editorial information, not medical or legal advice, and not a
              recommendation of any clinic. Whether any treatment is appropriate for you is a
              decision for you and a qualified clinician. Start with the{" "}
              <Link href="/medical">UK access guide</Link> if you&apos;re new to the pathway.
            </p>
          </aside>
        </section>
      </Reveal>
      </div>
      </div>
    </PlatformShell>
  );
}
