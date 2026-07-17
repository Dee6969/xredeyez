import Link from "next/link";
import PlatformShell from "../components/PlatformShell";
import Reveal from "../components/Reveal";
import MedicalBriefingSignup from "../components/MedicalBriefingSignup";
import { medicalUk } from "../data/medical";
import { breadcrumbSchema, toJsonLd } from "../lib/schema";

export const metadata = {
  title: "Medical Cannabis UK — How Access Works in 2026 | XRED EYEZ",
  description:
    "Medical cannabis has been legal in the UK since 2018. The clear guide to how access actually works: specialist prescribing, private clinics, eligibility, costs, driving and travel law.",
  alternates: { canonical: "https://www.redeyez.co.uk/medical" },
  openGraph: {
    title: "Medical Cannabis in the UK, Explained Properly | XRED EYEZ",
    description:
      "Who can prescribe, who may be eligible, what it costs, and what the law expects of patients — the honest UK access guide.",
    type: "article",
    url: "https://www.redeyez.co.uk/medical",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: medicalUk.faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function MedicalUkPage() {
  const m = medicalUk;

  return (
    <PlatformShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: toJsonLd(
            breadcrumbSchema([
              { name: "Home", href: "https://www.redeyez.co.uk/" },
              { name: "Medical Cannabis UK", href: "https://www.redeyez.co.uk/medical" },
            ]),
          ),
        }}
      />

      {/* Hero */}
      <Reveal>
        <section className="platform-section medical-hero">
          <div className="eyebrow">{m.hero.eyebrow}</div>
          <h1 className="platform-section-title medical-hero-title">{m.hero.title}</h1>
          <p className="medical-lede">{m.hero.lede}</p>
          <p className="medical-reviewed">Reviewed {m.lastReviewed} · Editorial information, not medical advice</p>
        </section>
      </Reveal>

      {/* Key facts */}
      <Reveal>
        <section className="platform-section">
          <div className="medical-facts">
            {m.keyFacts.map((f) => (
              <div key={f.label} className="medical-fact">
                <strong>{f.value}</strong>
                <span>{f.label}</span>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Pathway */}
      <Reveal>
        <section className="platform-section" id="pathway">
          <div className="platform-section-head">
            <div>
              <div className="eyebrow">The Pathway</div>
              <h2 className="platform-section-title">How access actually works.</h2>
            </div>
          </div>
          <div className="medical-steps">
            {m.pathway.map((s) => (
              <article key={s.step} className="medical-step">
                <span className="medical-step-num">{s.step}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Eligibility + NHS */}
      <Reveal>
        <section className="platform-section">
          <div className="medical-twin">
            <div className="platform-panel medical-panel">
              <div className="eyebrow">Eligibility</div>
              <h3>Who specialists assess</h3>
              <p>{m.eligibilityNote}</p>
            </div>
            <div className="platform-panel medical-panel">
              <div className="eyebrow">NHS vs Private</div>
              <h3>Why nearly everyone goes private</h3>
              <p>{m.nhsNote}</p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Law essentials */}
      <Reveal>
        <section className="platform-section" id="law">
          <div className="platform-section-head">
            <div>
              <div className="eyebrow">Know the Law</div>
              <h2 className="platform-section-title">What the law expects of patients.</h2>
            </div>
          </div>
          <div className="medical-law-grid">
            {m.lawEssentials.map((l) => (
              <article key={l.title} className="medical-law-card">
                <h3>{l.title}</h3>
                <p>{l.body}</p>
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      {/* FAQ */}
      <Reveal>
        <section className="platform-section" id="faq">
          <div className="platform-section-head">
            <div>
              <div className="eyebrow">Questions</div>
              <h2 className="platform-section-title">Straight answers.</h2>
            </div>
          </div>
          <div className="medical-faq">
            {m.faqs.map((f) => (
              <details key={f.q} className="medical-faq-item">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Briefing capture + clinic partner CTA */}
      <Reveal>
        <section className="platform-section">
          <div className="medical-twin">
            <div className="platform-panel medical-panel medical-cta-panel">
              <div className="eyebrow">Stay Current</div>
              <h3>The UK access briefing</h3>
              <p>
                Guidance, costs and enforcement practice keep moving. Join the briefing and we&apos;ll
                keep you current as the landscape changes — no spam, no product promotion, ever.
              </p>
              <MedicalBriefingSignup />
            </div>
            <div className="platform-panel medical-panel">
              <div className="eyebrow">For Clinics</div>
              <h3>CQC-regulated clinic?</h3>
              <p>
                We&apos;re building the UK&apos;s most trusted patient-education layer. If you run a
                regulated clinic and want to be part of accurate, compliant patient information,
                talk to us.
              </p>
              <Link href="/partners/claim" className="platform-secondary-action" style={{ justifySelf: "start" }}>
                Partner enquiry →
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Disclaimer */}
      <Reveal>
        <section className="platform-section">
          <aside className="medical-disclaimer" aria-label="Medical disclaimer">
            <div className="eyebrow">The Honest Bit</div>
            <p>{m.disclaimer}</p>
          </aside>
        </section>
      </Reveal>
    </PlatformShell>
  );
}
