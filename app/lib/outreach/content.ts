export type Sector = "cannabis" | "stay" | "eat";
export type SequenceType = "cold" | "nurture";

export interface EmailContent {
  subject: string;
  headline: string;
  body: string[];
  ctaLabel: string;
  showMoreInfo: boolean;
}

export const STRIPE_CHECKOUT_PATH = "/api/outreach/stripe-checkout";
export const MORE_INFO_PATH = "/api/outreach/more-info";

const BRAND = "XRED EYEZ";

export const EMAIL_CONTENT: Record<Sector, Record<SequenceType, EmailContent[]>> = {
  stay: {
    cold: [
      {
        subject: `Your hotel, on the map that cannabis travelers use`,
        headline: "Cannabis-curious travelers plan trips differently.",
        body: [
          "They research which cities have the culture, the venues, and the local knowledge. Then they choose where to stay based on what's nearby.",
          `${BRAND} is the discovery platform those travelers use — covering cannabis-friendly city guides, curated venues, and neighborhood maps across Europe and beyond.`,
          "A featured hotel listing puts your property directly in front of high-intent visitors who are already choosing their destination.",
          "Featured listings include a premium map pin, city guide placement, booking CTA, and a monthly visibility report. £49/month.",
        ],
        ctaLabel: "Upgrade your listing",
        showMoreInfo: true,
      },
      {
        subject: `Featured hotels on ${BRAND} see 3× more profile clicks`,
        headline: "Your competitors are building a first-mover advantage.",
        body: [
          "Cannabis tourism is growing. The travelers it brings are high-spend, experience-led, and loyal to recommendations they trust.",
          `${BRAND} city guides are how they plan. Featured properties appear at the top — with a map pin, booking link, and curated placement in the stay section.`,
          "Free listings exist. Featured listings convert. The difference is visibility.",
          "Secure your featured spot before the inventory in your city fills.",
        ],
        ctaLabel: "Claim your featured spot — £49/month",
        showMoreInfo: true,
      },
      {
        subject: "Last call — your featured listing slot",
        headline: "This is the last time we'll reach out.",
        body: [
          `If now isn't the right moment to upgrade your listing on ${BRAND}, no problem — you can always claim it at redeyez.co.uk/partners/claim.`,
          "If you'd like to know how other hotels in your city are using the platform before committing, hit the button below.",
        ],
        ctaLabel: "Upgrade for £49/month",
        showMoreInfo: true,
      },
    ],
    nurture: [
      {
        subject: `What your featured hotel listing includes — full breakdown`,
        headline: "Here's exactly what you get.",
        body: [
          "Premium map pin — your property pinned at the top of the city map, visible to every traveler exploring that destination.",
          "City guide placement — featured in the 'Where to Stay' section with your description, highlights, and booking CTA.",
          "Referral link tracking — see exactly how many visitors clicked through to your booking page each month.",
          "Partner dashboard (coming Q3) — manage your listing, update photos, and track performance.",
          "Cannabis-curious traveler reach — the fastest-growing travel segment, actively looking for properties that understand the culture.",
          "All of this for £49/month. Cancel any time.",
        ],
        ctaLabel: "Complete setup — £49/month",
        showMoreInfo: false,
      },
      {
        subject: "Your spot on the XRED EYEZ map is waiting",
        headline: "Two minutes to set up. Ongoing reach.",
        body: [
          "Your featured listing is ready to go live. Click below to complete checkout via Stripe — £49/month, cancel any time.",
          "Once live, your property will appear on the city map and in the curated stay guide within 24 hours.",
          "Questions? Reply to this email — a real person will get back to you.",
        ],
        ctaLabel: "Complete your listing — £49/month",
        showMoreInfo: false,
      },
    ],
  },

  cannabis: {
    cold: [
      {
        subject: "Reach customers who are already searching for your space",
        headline: "Every week, thousands of visitors search for cannabis-friendly venues.",
        body: [
          "Most of them will never find yours — not because your space isn't great, but because discovery doesn't happen through Google for this audience.",
          `${BRAND} is where they search. Cannabis-specific city guides, curated venue maps, and culture-led recommendations built for people who know what they're looking for.`,
          "A featured listing puts your café or social club front and center — on the map, in the guide, and in front of the right people.",
          "Featured placement includes a premium map pin, venue profile, vibe tags, and a referral link. £49/month.",
        ],
        ctaLabel: "Get featured — £49/month",
        showMoreInfo: true,
      },
      {
        subject: "You've built the space. Let us help fill it.",
        headline: "Featured venues on XRED EYEZ see consistent new footfall.",
        body: [
          "Travelers who use cannabis plan their visits around where to consume. They check the map before they check in.",
          `${BRAND} is that map. Featured venues are the first recommendation — ahead of competitors, ahead of the algorithm, ahead of word of mouth alone.`,
          "Your city has limited featured slots. Once they're taken, they're taken.",
        ],
        ctaLabel: "Secure your featured slot — £49/month",
        showMoreInfo: true,
      },
      {
        subject: "One last note from us",
        headline: "We'll leave you to it after this.",
        body: [
          `If the timing isn't right, you can always upgrade at redeyez.co.uk/partners/claim whenever you're ready.`,
          "If you'd like more detail on how the platform works and what featured cannabis spaces actually get, hit the button below.",
        ],
        ctaLabel: "Get featured — £49/month",
        showMoreInfo: true,
      },
    ],
    nurture: [
      {
        subject: "What a featured cannabis space gets — the full picture",
        headline: "Built for venues that take culture seriously.",
        body: [
          "Premium map pin — the highest-visibility position on the city map, pinned above free listings.",
          "Vibe matching — your space tagged with the exact vibes your customers search for: lounge, social, creative, late-night, and more.",
          "Culture-led profile — a full venue page with your story, highlights, photos, and atmosphere guide.",
          "Referral tracking — a unique link so you can see how many visitors came from XRED EYEZ each month.",
          "Traveler reach — your space recommended to international visitors before they even land in your city.",
          "£49/month. No lock-in.",
        ],
        ctaLabel: "Complete your listing — £49/month",
        showMoreInfo: false,
      },
      {
        subject: "Your place at the top of the map is waiting",
        headline: "Ready when you are.",
        body: [
          "Click below to complete checkout. Your featured listing goes live within 24 hours.",
          "Cancel any time. No setup fees.",
          "Questions? Reply here — a real person responds.",
        ],
        ctaLabel: "Go live — £49/month",
        showMoreInfo: false,
      },
    ],
  },

  eat: {
    cold: [
      {
        subject: "The cannabis-curious diner is your next regular",
        headline: "A fast-growing audience is looking for where to eat.",
        body: [
          "Cannabis tourists and locals who consume are building new dining habits — they want restaurants that are relaxed, cultural, and close to the venues they visit.",
          `${BRAND} city guides already recommend where to stay and where to explore. The 'Where to Eat' section is the final piece of the trip — and featured restaurants own it.`,
          "A featured listing puts your restaurant in front of a high-spend, experience-driven audience. £49/month.",
        ],
        ctaLabel: "Feature your restaurant — £49/month",
        showMoreInfo: true,
      },
      {
        subject: "Be the restaurant recommendation, not the runner-up",
        headline: "Position your restaurant ahead of the culture curve.",
        body: [
          "Cannabis tourism is one of the fastest-growing segments in European travel. The restaurants in the know get the bookings.",
          `Featured on ${BRAND} means a map pin, a curated placement in the eat guide, and a direct link from the venues your guests are already visiting.`,
          "Limited featured slots per city. First-mover advantage is real here.",
        ],
        ctaLabel: "Claim your slot — £49/month",
        showMoreInfo: true,
      },
      {
        subject: "Final word before we close this off",
        headline: "No pressure — but here's a shortcut.",
        body: [
          `You can always upgrade your listing at redeyez.co.uk/partners/claim whenever the time is right.`,
          "If you'd like to see the full package breakdown and how other restaurants in similar cities are using the platform, tap below.",
        ],
        ctaLabel: "Feature your restaurant — £49/month",
        showMoreInfo: true,
      },
    ],
    nurture: [
      {
        subject: "What a featured restaurant listing actually delivers",
        headline: "More reach. More covers. Less guesswork.",
        body: [
          "Premium map placement — your restaurant pinned on the city eat map, the first recommendation for every visitor exploring that neighborhood.",
          "City guide feature — a full entry in the curated eat section with your description, highlights, and atmosphere.",
          "Cross-recommendation — featured in the guide pages of nearby cannabis venues, hotels, and city routes.",
          "Referral link — track exactly how many clicks came from XRED EYEZ each month.",
          "Ongoing visibility — as new cities launch and traveler numbers grow, your listing travels with the platform.",
          "£49/month. Cancel any time.",
        ],
        ctaLabel: "Complete setup — £49/month",
        showMoreInfo: false,
      },
      {
        subject: "Complete your listing setup in 2 minutes",
        headline: "Your featured spot is ready.",
        body: [
          "Checkout takes two minutes. Your listing goes live the same day.",
          "Questions or want to talk through the package first? Reply to this email.",
        ],
        ctaLabel: "Get listed — £49/month",
        showMoreInfo: false,
      },
    ],
  },
};

export function getSectorLabel(sector: Sector): string {
  const labels: Record<Sector, string> = {
    stay: "Hotel / Accommodation",
    cannabis: "Cannabis Café / Social Club",
    eat: "Restaurant / Dining",
  };
  return labels[sector];
}

export function layerToSector(layer: string): Sector | null {
  const map: Record<string, Sector> = {
    stay: "stay",
    cannabis: "cannabis",
    eat: "eat",
  };
  return map[layer] ?? null;
}
