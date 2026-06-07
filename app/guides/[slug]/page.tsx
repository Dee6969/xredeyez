import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PlatformShell from "../../components/PlatformShell";
import Reveal from "../../components/Reveal";
import { guides, getGuide } from "../../data/guides";
import { articleSchema, breadcrumbSchema, toJsonLd } from "../../lib/schema";

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: "Guide | XRED EYEZ" };
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: {
      canonical: `https://www.redeyez.co.uk/guides/${guide.slug}`,
    },
    openGraph: {
      title: guide.title,
      description: guide.metaDescription,
      type: "article",
      publishedTime: guide.publishedAt,
      modifiedTime: guide.updatedAt,
      images: [{ url: guide.heroImage }],
    },
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const otherGuides = guides.filter((g) => g.slug !== guide.slug).slice(0, 3);

  const breadcrumb = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Guides", href: "/guides" },
    { name: guide.title, href: `/guides/${guide.slug}` },
  ]);

  return (
    <PlatformShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(articleSchema(guide)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumb) }} />

      {/* Hero */}
      <Reveal>
        <section className="guide-hero">
          <div className="guide-hero-img">
            <Image
              src={guide.heroImage}
              alt={guide.title}
              fill
              priority
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
            <div className="guide-hero-overlay" />
          </div>
          <div className="guide-hero-body">
            <Link href="/guides" className="guide-back">← All guides</Link>
            <div className="guide-hero-tags">
              {guide.tags.map((t) => (
                <span key={t} className="guide-hero-tag">{t}</span>
              ))}
            </div>
            <h1 className="guide-hero-title">{guide.title}</h1>
            <p className="guide-hero-sub">{guide.subtitle}</p>
            <div className="guide-hero-meta">
              <span>Updated {new Date(guide.updatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
              <span className="guide-hero-sep">·</span>
              <span>{guide.readTime}</span>
              <span className="guide-hero-sep">·</span>
              <span>XRED EYEZ</span>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Content + sidebar */}
      <Reveal>
        <section className="platform-section guide-content-section">
          <div className="guide-layout">

            {/* Main article */}
            <article className="guide-article">
              <p className="guide-intro">{guide.intro}</p>

              {guide.sections.map((section) => (
                <div key={section.heading} className="guide-section">
                  <h2 className="guide-section-heading">{section.heading}</h2>
                  {section.body.split("\n\n").map((para, i) => (
                    <p key={i} className="guide-para">{para}</p>
                  ))}
                </div>
              ))}

              {/* City guide CTA */}
              <div className="guide-city-cta">
                <div className="eyebrow" style={{ marginBottom: "10px" }}>{guide.city} on XRED EYEZ</div>
                <h3 className="guide-city-cta-title">See venues, map and routes for {guide.city}.</h3>
                <div className="platform-action-row" style={{ marginTop: "20px" }}>
                  <Link href={`/cities/${guide.relatedCitySlug}`} className="platform-primary-action" style={{ fontSize: "13px", minHeight: "42px" }}>
                    {guide.city} city guide
                  </Link>
                  <Link href={`/cities/${guide.relatedCitySlug}/map`} className="platform-secondary-action" style={{ fontSize: "13px", minHeight: "42px" }}>
                    Open map
                  </Link>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="guide-sidebar">
              <div className="guide-quickfacts">
                <div className="eyebrow" style={{ marginBottom: "14px" }}>Quick facts</div>
                {guide.quickFacts.map((fact) => (
                  <div key={fact.label} className="guide-fact">
                    <span className="guide-fact-label">{fact.label}</span>
                    <span className="guide-fact-val">{fact.value}</span>
                  </div>
                ))}
              </div>

              <div className="guide-sidebar-links">
                <div className="eyebrow" style={{ marginBottom: "12px" }}>Explore {guide.city}</div>
                <Link href={`/cities/${guide.relatedCitySlug}`} className="guide-sidebar-link">
                  City guide →
                </Link>
                <Link href={`/cities/${guide.relatedCitySlug}/map`} className="guide-sidebar-link">
                  Interactive map →
                </Link>
                <Link href={`/explore?city=${guide.cityId}`} className="guide-sidebar-link">
                  Browse venues →
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </Reveal>

      {/* More guides */}
      {otherGuides.length > 0 && (
        <Reveal>
          <section className="platform-section">
            <div className="platform-section-head">
              <div>
                <div className="eyebrow">More guides</div>
                <h2 className="platform-section-title">Keep exploring.</h2>
              </div>
              <Link href="/guides" className="platform-inline-link">All guides →</Link>
            </div>
            <div className="guides-grid guides-grid-sm">
              {otherGuides.map((g) => (
                <Link key={g.slug} href={`/guides/${g.slug}`} className="guide-card">
                  <div className="guide-card-img">
                    <Image src={g.heroImage} alt={g.title} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover" }} />
                    <div className="guide-card-img-overlay" />
                    <span className="guide-card-city">{g.city}</span>
                  </div>
                  <div className="guide-card-body">
                    <div className="guide-card-meta">
                      <span className="guide-card-tag">{g.tags[0]}</span>
                      <span className="guide-card-read">{g.readTime}</span>
                    </div>
                    <h3 className="guide-card-title">{g.title}</h3>
                    <span className="guide-card-cta">Read →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </Reveal>
      )}
    </PlatformShell>
  );
}
