import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import type { EmailContent, Sector } from "../app/lib/outreach/content";
import { getSectorLabel } from "../app/lib/outreach/content";

interface OutreachEmailProps {
  content: EmailContent;
  contactId: string;
  businessName: string;
  sector: Sector;
  baseUrl: string;
}

export default function OutreachEmail({
  content,
  contactId,
  businessName,
  sector,
  baseUrl,
}: OutreachEmailProps) {
  const checkoutUrl = `${baseUrl}/api/outreach/stripe-checkout?contact=${contactId}`;
  const moreInfoUrl = `${baseUrl}/api/outreach/more-info?contact=${contactId}`;

  return (
    <Html>
      <Head />
      <Preview>{content.subject}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logo}>XRED EYEZ</Text>
            <Text style={tagline}>Cannabis Culture Discovery</Text>
          </Section>

          <Hr style={divider} />

          {/* Sector badge */}
          <Section style={{ paddingTop: "24px" }}>
            <Text style={badge}>{getSectorLabel(sector).toUpperCase()}</Text>
          </Section>

          {/* Main content */}
          <Section style={{ paddingTop: "8px" }}>
            <Heading style={h1}>{content.headline}</Heading>

            {content.body.map((paragraph, i) => (
              <Text key={i} style={para}>
                {paragraph}
              </Text>
            ))}
          </Section>

          {/* Primary CTA */}
          <Section style={ctaSection}>
            <Button style={primaryBtn} href={checkoutUrl}>
              {content.ctaLabel}
            </Button>
          </Section>

          {/* More info CTA */}
          {content.showMoreInfo && (
            <Section style={{ paddingTop: "8px", textAlign: "center" as const }}>
              <Link href={moreInfoUrl} style={moreInfoLink}>
                Send me more information first →
              </Link>
            </Section>
          )}

          <Hr style={divider} />

          {/* Footer */}
          <Section>
            <Text style={footer}>
              You received this because your business may be listed or eligible for a listing on XRED EYEZ.{" "}
              <Link href={`${baseUrl}/api/outreach/unsubscribe?contact=${contactId}`} style={footerLink}>
                Unsubscribe
              </Link>
            </Text>
            <Text style={footer}>
              XRED EYEZ · redeyez.co.uk
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main: React.CSSProperties = {
  backgroundColor: "#0a0a0a",
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

const container: React.CSSProperties = {
  maxWidth: "560px",
  margin: "0 auto",
  padding: "32px 24px",
};

const header: React.CSSProperties = {
  paddingBottom: "4px",
};

const logo: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: "700",
  color: "#ffffff",
  letterSpacing: "0.12em",
  margin: "0 0 4px",
};

const tagline: React.CSSProperties = {
  fontSize: "11px",
  color: "#84C51F",
  letterSpacing: "0.2em",
  textTransform: "uppercase" as const,
  margin: "0",
};

const divider: React.CSSProperties = {
  borderColor: "rgba(255,255,255,0.08)",
  margin: "20px 0",
};

const badge: React.CSSProperties = {
  display: "inline-block",
  fontSize: "9px",
  fontWeight: "600",
  letterSpacing: "0.22em",
  color: "#84C51F",
  margin: "0 0 8px",
};

const h1: React.CSSProperties = {
  fontSize: "28px",
  fontWeight: "700",
  color: "#f0ebe2",
  lineHeight: "1.18",
  margin: "0 0 20px",
};

const para: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: "1.7",
  color: "rgba(240,235,226,0.75)",
  margin: "0 0 16px",
};

const ctaSection: React.CSSProperties = {
  paddingTop: "20px",
  paddingBottom: "4px",
};

const primaryBtn: React.CSSProperties = {
  backgroundColor: "#84C51F",
  color: "#0a0a0a",
  fontSize: "13px",
  fontWeight: "700",
  letterSpacing: "0.06em",
  padding: "14px 28px",
  borderRadius: "4px",
  textDecoration: "none",
  display: "inline-block",
};

const moreInfoLink: React.CSSProperties = {
  fontSize: "13px",
  color: "rgba(240,235,226,0.5)",
  textDecoration: "underline",
};

const footer: React.CSSProperties = {
  fontSize: "11px",
  color: "rgba(240,235,226,0.3)",
  lineHeight: "1.6",
  margin: "4px 0",
};

const footerLink: React.CSSProperties = {
  color: "rgba(240,235,226,0.3)",
  textDecoration: "underline",
};
