export type Sector = "cannabis" | "stay" | "eat" | "coffeeshop" | "social-club" | "clinic";
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
  clinic: {
    cold: [
      {
        subject: "Your clinic is already being compared. Own the row.",
        headline: "Patients compare before they book. Make sure it's accurate.",
        body: [
          "The UK market moved fast last year: private cannabis prescriptions rose from 283,000 in 2023 to 659,000 in 2024 (NHS Business Services Authority FOI data) — a patient base now estimated around 82,000, with 99% of prescribing private.",
          `${BRAND} runs an independent UK medical access hub and clinic comparison — consultation fees, follow-up costs and access schemes, verified and dated. Your clinic's row is already live, compiled from published sources.`,
          "A claimed profile lets you verify every figure patients see — fees, schemes, focus areas — before they choose. Factual presentation never changes with payment; accuracy is the product.",
          "Claimed clinic profiles are £9.99/month at the founding rate while we build the network.",
        ],
        ctaLabel: "Claim your clinic profile",
        showMoreInfo: true,
      },
      {
        subject: "659,000 prescriptions. One question: who do patients find first?",
        headline: "The access moment is a comparison moment.",
        body: [
          "Every new patient goes through the same sequence: is it legal, am I eligible, what does it cost, which clinic. Our UK access guide and clinic comparison sit exactly on that sequence — editorial, compliant, and independent.",
          "In a market growing 130%+ year on year, patient acquisition is the battle. An accurate, claimed profile on an independent comparison is the cheapest credibility a clinic can buy — because the information is verified, not advertised.",
          "We never make efficacy claims, never promote medicines, and never rank clinics by payment. That discipline is why the page is worth being accurate on.",
          "£9.99/month founding rate. Cancel anytime. Your row stays either way — claiming just makes it yours.",
        ],
        ctaLabel: "Verify your clinic's details",
        showMoreInfo: true,
      },
      {
        subject: "One last note from us",
        headline: "This is the last time we'll reach out.",
        body: [
          "If claiming your clinic profile isn't a priority now, no problem — the comparison stays editorial and we'll keep verifying figures from published sources on our own cadence.",
          "If you'd like your team to control that accuracy directly, the button below is the two-minute route.",
        ],
        ctaLabel: "Claim for £9.99/month",
        showMoreInfo: true,
      },
    ],
    nurture: [
      {
        subject: "What a claimed clinic profile includes",
        headline: "Accuracy, controlled by you.",
        body: [
          "Verified fees, access schemes and focus areas on the UK clinic comparison — updated by your team, dated for readers.",
          "A verified profile badge that reflects a real relationship — we never label anything 'partner' that isn't.",
          "Placement within the UK medical access hub: the guide patients read before they choose anyone.",
          "£9.99/month at the founding rate. No setup fee. Cancel anytime.",
        ],
        ctaLabel: "Set up — £9.99/month",
        showMoreInfo: false,
      },
      {
        subject: "Complete your clinic profile in 2 minutes",
        headline: "Two minutes and it's yours.",
        body: [
          "Hit the button, confirm your clinic's details, and your claimed profile goes live on the next publish — usually within 48 hours.",
          "Everything factual stays factual: claiming controls accuracy, not presentation.",
        ],
        ctaLabel: "Finish setup",
        showMoreInfo: false,
      },
    ],
  },
  coffeeshop: {
    cold: [
      {
        subject: "Tourists choose their first coffeeshop before they land",
        headline: "The planning happens weeks before the flight.",
        body: [
          "Travelers coming to the Netherlands research coffeeshop culture in advance — which neighbourhoods, which houses, what the etiquette is. By the time they arrive, the shortlist is made.",
          `${BRAND} is the travel guide they make it with: city guides, neighbourhood maps, and venue profiles built for people who want to do this properly.`,
          "A featured listing puts your house on that shortlist — premium pin on the live city map, top placement in the cannabis layer, verified hours, and your house rules stated your way.",
          "Launch Partner profiles are £9.99/month at the founding rate. Your basic profile already exists — this is about how it ranks and what it says.",
        ],
        ctaLabel: "Upgrade your listing",
        showMoreInfo: true,
      },
      {
        subject: "You can't advertise. You can be found.",
        headline: "A guide listing is visibility that respects the rules.",
        body: [
          "Dutch advertising restrictions leave coffeeshops with almost no compliant way to reach visitors. Editorial guide presence is the exception — travelers seek the information out themselves.",
          `${BRAND} readers arrive informed: they've read the etiquette guides, they know the norms, they respect the house. That's the customer worth having.`,
          "Featured houses get the top pin, accurate hours, a 'know before you go' module for your rules, and walking directions straight to your door.",
          "One neighbourhood, limited featured slots. £9.99/month founding rate, cancel anytime.",
        ],
        ctaLabel: "Claim your featured spot",
        showMoreInfo: true,
      },
      {
        subject: "One last note from us",
        headline: "This is the last time we'll reach out.",
        body: [
          `If a featured listing isn't right for you now, no problem — your profile stays live, and you can claim or upgrade it any time at redeyez.co.uk/partners/claim.`,
          "If you'd like to see how featured placement works on your city's map before deciding, the button below shows you.",
        ],
        ctaLabel: "Claim the £9.99 launch rate",
        showMoreInfo: true,
      },
    ],
    nurture: [
      {
        subject: "What a featured coffeeshop listing includes",
        headline: "The full picture, no surprises.",
        body: [
          "Premium map pin — top of your city's live cannabis layer, where every traveler starts.",
          "Verified profile — hours, house rules, and 'know before you go' notes written your way, so guests arrive informed and respectful.",
          "Guide placement — featured position in the city guide's coffeeshop section and eligibility for curated route inclusion.",
          "Walk-there directions and Street View from every profile, so people actually find the door.",
          "£9.99/month at the founding rate. No setup fee. Cancel anytime.",
        ],
        ctaLabel: "Set up — £9.99/month",
        showMoreInfo: false,
      },
      {
        subject: "Complete your listing setup in 2 minutes",
        headline: "Two minutes and it's live.",
        body: [
          "Hit the button, confirm your details, and your featured placement goes live on the next publish — usually within 48 hours.",
          "You control the profile: hours, house rules, photos, and how your house is described.",
        ],
        ctaLabel: "Finish setup",
        showMoreInfo: false,
      },
    ],
  },
  "social-club": {
    cold: [
      {
        subject: "Travelers arrive at your door misinformed",
        headline: "The problem isn't demand. It's expectations.",
        body: [
          "Visitors to Barcelona find club information from outdated blogs and street promoters. They arrive expecting a walk-in bar — and someone has to turn them away.",
          `${BRAND} works differently: our guides explain the association model before anyone travels — membership, ID, invitation norms, discretion. Readers arrive knowing how it works.`,
          "A verified profile lets you state your process your way: what your club is, how membership works, and what you expect from guests. Information, not promotion.",
          "Verified profiles are £9.99/month at the founding rate, presented discreetly within the city guide. You control every word.",
        ],
        ctaLabel: "Verify your profile",
        showMoreInfo: true,
      },
      {
        subject: "The tout economy is how tourists find clubs. Fix it.",
        headline: "Your reputation deserves better than street promoters.",
        body: [
          "Right now, the loudest information wins — promoters on La Rambla, forum rumours, third-party pages you've never seen describing your association inaccurately.",
          `${BRAND} readers are the other kind of visitor: they read the etiquette layer first, they understand private membership, and they respect discretion because we tell them to.`,
          "A verified profile is your official presence: accurate, discreet, and written by you — not by whoever got to the internet first.",
          "Limited verified slots per neighbourhood. £9.99/month founding rate, cancel anytime.",
        ],
        ctaLabel: "Take control of your profile",
        showMoreInfo: true,
      },
      {
        subject: "One last note from us",
        headline: "This is the last time we'll reach out.",
        body: [
          "If a verified profile isn't right for your association now, no problem — you can claim or correct your listing any time at redeyez.co.uk/partners/claim.",
          "If you'd like to see how verified clubs are presented within the guide before deciding, the button below shows you.",
        ],
        ctaLabel: "Verify for £9.99/month",
        showMoreInfo: true,
      },
    ],
    nurture: [
      {
        subject: "What a verified club profile includes",
        headline: "Discreet, accurate, yours.",
        body: [
          "Your association described your way — membership process, house expectations, and etiquette notes stated clearly so guests arrive prepared.",
          "Discreet placement in the city guide's cannabis layer — presented as a private members' association, never as a walk-in venue.",
          "An audience that reads the etiquette guide first: our Barcelona pages explain the association model before any profile is shown.",
          "Corrections and updates any time. £9.99/month founding rate, cancel anytime.",
        ],
        ctaLabel: "Verify your profile — £9.99/month",
        showMoreInfo: false,
      },
      {
        subject: "Complete your profile in 2 minutes",
        headline: "Two minutes and it's accurate.",
        body: [
          "Hit the button, confirm your association's details, and your verified profile goes live on the next publish — usually within 48 hours.",
          "Everything is written your way, reviewed by you before it publishes.",
        ],
        ctaLabel: "Finish setup",
        showMoreInfo: false,
      },
    ],
  },
  stay: {
    cold: [
      {
        subject: `Your hotel, on the map that cannabis travelers use`,
        headline: "Cannabis-curious travelers plan trips differently.",
        body: [
          "They research which cities have the culture, the venues, and the local knowledge. Then they choose where to stay based on what's nearby.",
          `${BRAND} is the discovery platform those travelers use — covering cannabis-friendly city guides, curated venues, and neighborhood maps across Europe and beyond.`,
          "A featured hotel listing puts your property directly in front of high-intent visitors who are already choosing their destination.",
          "Featured listings include a premium map pin, city guide placement, booking CTA, and a monthly visibility report. £9.99/month at the founding launch rate.",
        ],
        ctaLabel: "Upgrade your listing",
        showMoreInfo: true,
      },
      {
        subject: `The travelers picking hotels in your city right now`,
        headline: "Your competitors are building a first-mover advantage.",
        body: [
          "Cannabis tourism is growing. The travelers it brings are high-spend, experience-led, and loyal to recommendations they trust.",
          `${BRAND} city guides are how they plan. Featured properties appear at the top — with a map pin, booking link, and curated placement in the stay section.`,
          "Free listings exist. Featured listings convert. The difference is visibility.",
          "Secure your featured spot before the inventory in your city fills.",
        ],
        ctaLabel: "Claim your featured spot — £9.99/month",
        showMoreInfo: true,
      },
      {
        subject: "Last call — your featured listing slot",
        headline: "This is the last time we'll reach out.",
        body: [
          `If now isn't the right moment to upgrade your listing on ${BRAND}, no problem — you can always claim it at redeyez.co.uk/partners/claim.`,
          "If you'd like to know how other hotels in your city are using the platform before committing, hit the button below.",
        ],
        ctaLabel: "Claim the £9.99 launch rate",
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
          "All of this for £9.99/month at the founding launch rate. Cancel any time.",
        ],
        ctaLabel: "Complete setup — £9.99/month",
        showMoreInfo: false,
      },
      {
        subject: "Your spot on the XRED EYEZ map is waiting",
        headline: "Two minutes to set up. Ongoing reach.",
        body: [
          "Your featured listing is ready to go live. Click below to complete checkout via Stripe — £9.99/month founding rate, cancel any time.",
          "Once live, your property will appear on the city map and in the curated stay guide within 24 hours.",
          "Questions? Reply to this email — a real person will get back to you.",
        ],
        ctaLabel: "Complete your listing — £9.99/month",
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
          "Featured placement includes a premium map pin, venue profile, vibe tags, and a referral link. £9.99/month at the founding launch rate.",
        ],
        ctaLabel: "Get featured — £9.99/month",
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
        ctaLabel: "Secure your featured slot — £9.99/month",
        showMoreInfo: true,
      },
      {
        subject: "One last note from us",
        headline: "We'll leave you to it after this.",
        body: [
          `If the timing isn't right, you can always upgrade at redeyez.co.uk/partners/claim whenever you're ready.`,
          "If you'd like more detail on how the platform works and what featured cannabis spaces actually get, hit the button below.",
        ],
        ctaLabel: "Get featured — £9.99/month",
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
          "£9.99/month at the founding launch rate. No lock-in.",
        ],
        ctaLabel: "Complete your listing — £9.99/month",
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
        ctaLabel: "Go live — £9.99/month",
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
          "A featured listing puts your restaurant in front of a high-spend, experience-driven audience. £9.99/month at the founding launch rate.",
        ],
        ctaLabel: "Feature your restaurant — £9.99/month",
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
        ctaLabel: "Claim your slot — £9.99/month",
        showMoreInfo: true,
      },
      {
        subject: "Final word before we close this off",
        headline: "No pressure — but here's a shortcut.",
        body: [
          `You can always upgrade your listing at redeyez.co.uk/partners/claim whenever the time is right.`,
          "If you'd like to see the full package breakdown and how other restaurants in similar cities are using the platform, tap below.",
        ],
        ctaLabel: "Feature your restaurant — £9.99/month",
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
          "£9.99/month at the founding launch rate. Cancel any time.",
        ],
        ctaLabel: "Complete setup — £9.99/month",
        showMoreInfo: false,
      },
      {
        subject: "Complete your listing setup in 2 minutes",
        headline: "Your featured spot is ready.",
        body: [
          "Checkout takes two minutes. Your listing goes live the same day.",
          "Questions or want to talk through the package first? Reply to this email.",
        ],
        ctaLabel: "Get listed — £9.99/month",
        showMoreInfo: false,
      },
    ],
  },
};

export function getSectorLabel(sector: Sector): string {
  const labels: Record<Sector, string> = {
    stay: "Hotel / Accommodation",
    cannabis: "Cannabis Venue (general)",
    coffeeshop: "Coffeeshop (NL)",
    "social-club": "Cannabis Social Club",
    clinic: "Medical Clinic (UK)",
    eat: "Restaurant / Dining",
  };
  return labels[sector];
}

/**
 * Classify a venue into its outreach sector from its type string.
 * More specific than layerToSector: a Dutch coffeeshop and a Barcelona
 * social club get different sequences even though both sit in the
 * cannabis layer.
 */
export function venueTypeToSector(type: string, layer?: string): Sector | null {
  const t = type.toLowerCase();
  if (t.includes("coffeeshop") || t.includes("coffee shop")) return "coffeeshop";
  if (t.includes("social club") || t.includes("club") || t.includes("asociaci")) return "social-club";
  if (t.includes("cannabis") || t.includes("dispensary") || t.includes("smart shop") || t.includes("smartshop")) return "cannabis";
  if (t.includes("hotel") || t.includes("hostel") || t.includes("apartment") || t.includes("stay") || t.includes("resort")) return "stay";
  if (t.includes("restaurant") || t.includes("café") || t.includes("cafe") || t.includes("bar") || t.includes("bakery") || t.includes("dining")) return "eat";
  if (layer) return layerToSector(layer);
  return null;
}

export function layerToSector(layer: string): Sector | null {
  const map: Record<string, Sector> = {
    stay: "stay",
    cannabis: "cannabis",
    eat: "eat",
  };
  return map[layer] ?? null;
}
