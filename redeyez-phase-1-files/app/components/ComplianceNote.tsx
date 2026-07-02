import Link from "next/link";

/**
 * Reusable compliance and etiquette module.
 * Keeps the platform's legal posture visible without killing the vibe:
 * age-aware, "where lawful" wording, local-law deference, no consumption
 * guidance. Pass a city's legalContext for the country-specific line.
 */
export default function ComplianceNote({
  legalContext,
  compact = false,
}: {
  legalContext?: string;
  compact?: boolean;
}) {
  return (
    <aside className={`compliance-note${compact ? " is-compact" : ""}`} aria-label="Local law and etiquette">
      <div className="eyebrow compliance-note-eyebrow">Know the rules</div>
      {legalContext && <p className="compliance-note-context">{legalContext}</p>}
      <p className="compliance-note-body">
        XRED EYEZ is an editorial travel guide for adults. Cannabis laws differ by country, region and
        venue — always check current local rules before you travel, and only visit spaces operating
        lawfully. We don&apos;t sell cannabis, facilitate purchases, or provide consumption or medical advice.
        Respect the venue, the neighbourhood, and the people who live there.
      </p>
      {!compact && (
        <Link href="/terms" className="compliance-note-link">
          Responsible travel &amp; terms →
        </Link>
      )}
    </aside>
  );
}
