/**
 * UK Medical Cannabis Clinic Directory.
 *
 * Editorial rules (non-negotiable):
 *  - Factual comparison only. No rankings by "best", no endorsements,
 *    no efficacy claims, no medicine promotion.
 *  - Every fee figure carries lastVerified and must be re-checked on
 *    that cadence. Fees change; the page tells readers to confirm.
 *  - All listed clinics are CQC-regulated with GMC specialist prescribers.
 *  - claimStatus follows platform truth rules: "partner" only with a
 *    real commercial relationship.
 */

export interface Clinic {
  id: string;
  name: string;
  website: string;
  initialConsult: string;
  followUps: string;
  accessScheme?: string;
  notedFor: string[];
  reviewNote?: string;
  claimStatus: "unclaimed" | "claimed" | "partner";
  lastVerified: string;
}

export const clinicsUk: Clinic[] = [
  {
    id: "releaf",
    name: "Releaf",
    website: "https://releaf.co.uk",
    initialConsult: "£99.99 (refundable if ineligible)",
    followUps: "Included with Releaf+ subscription; PAYG options",
    accessScheme: "Releaf+ membership model; medication from £7.99/g for members",
    notedFor: ["Subscription model", "Integrated legal-guidance helpline", "Large review base"],
    reviewNote: "≈6,800 Trustpilot reviews · 4.7 (reported 2026)",
    claimStatus: "unclaimed",
    lastVerified: "2026-07",
  },
  {
    id: "curaleaf-clinic",
    name: "Curaleaf Clinic",
    website: "https://curaleafclinic.com",
    initialConsult: "£210 standard · £50 via Access Scheme",
    followUps: "Free follow-ups on Access Scheme",
    accessScheme: "Access Scheme (£50 initial, free follow-ups); veterans: four free appointments/year",
    notedFor: ["Formerly Sapphire Medical", "Research-led", "Epilepsy expertise incl. paediatric"],
    reviewNote: "≈2,500 Trustpilot reviews · 4.3 (reported 2026)",
    claimStatus: "unclaimed",
    lastVerified: "2026-07",
  },
  {
    id: "mamedica",
    name: "Mamedica",
    website: "https://mamedica.co.uk",
    initialConsult: "Standard market range; reduced-cost scheme available",
    followUps: "From £75/year clinic fees from year two",
    accessScheme: "£200 lifetime access scheme for students, veterans and benefits recipients",
    notedFor: ["Low long-term clinic fees", "Complex pain assessments"],
    reviewNote: "≈1,600 Trustpilot reviews · 4.7 (reported 2026)",
    claimStatus: "unclaimed",
    lastVerified: "2026-07",
  },
  {
    id: "alternaleaf",
    name: "Alternaleaf",
    website: "https://alternaleaf.co.uk",
    initialConsult: "From £99",
    followUps: "Competitive; telehealth throughout",
    notedFor: ["Accessibility focus", "Fast booking (typically 1–2 weeks)", "Streamlined telehealth"],
    reviewNote: "≈4,400 Trustpilot reviews · 4.5 (reported 2026)",
    claimStatus: "unclaimed",
    lastVerified: "2026-07",
  },
  {
    id: "cantourage-clinic",
    name: "Cantourage Clinic",
    website: "https://cantourage.clinic",
    initialConsult: "£99 (reduced from £149)",
    followUps: "Standard market range",
    notedFor: ["Guided onboarding", "Fast booking (typically 1–2 weeks)", "European Clinic of the Year 2025"],
    claimStatus: "unclaimed",
    lastVerified: "2026-07",
  },
  {
    id: "lyphe",
    name: "Lyphe",
    website: "https://lyphe.com",
    initialConsult: "From £99",
    followUps: "Standard market range",
    notedFor: ["Cost-competitive chronic pain pathway", "Established early clinic"],
    claimStatus: "unclaimed",
    lastVerified: "2026-07",
  },
  {
    id: "medicann",
    name: "Medicann",
    website: "https://medicann.co.uk",
    initialConsult: "Zero-fee clinic model",
    followUps: "£4.99 delivery per prescription; no clinic fees",
    notedFor: ["Zero-fee repeat model", "Suits established, stable patients"],
    claimStatus: "unclaimed",
    lastVerified: "2026-07",
  },
  {
    id: "elios-clinics",
    name: "Elios Clinics",
    website: "https://www.eliosclinics.com",
    initialConsult: "From £99 where eligible",
    followUps: "Varies by review schedule",
    notedFor: ["Chronic pain, psychiatric and neurological focus", "Online eligibility checking"],
    claimStatus: "unclaimed",
    lastVerified: "2026-07",
  },
];

export const clinicDirectoryNotes = {
  methodology:
    "Figures are compiled from clinics' published pricing and reputable 2026 comparison sources, last verified July 2026. Fees, schemes and availability change frequently — always confirm directly with the clinic before booking. Review counts and scores are third-party figures reported at the time of verification. Listing order is alphabetical by nothing more meaningful than our editorial layout; inclusion is not endorsement, and no clinic has paid for placement on this page.",
  independence:
    "XRED EYEZ is an independent editorial platform. We are not a clinic, do not prescribe, and do not receive commission from any clinic listed here. Clinics may claim their profile to keep information accurate; claimed status never changes how factual information is presented.",
};
