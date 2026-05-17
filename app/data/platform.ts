export type ListingTier = "free" | "featured" | "premium";
export type ClaimStatus = "unclaimed" | "claimed" | "partner";

export interface Vibe {
  id: string;
  slug: string;
  name: string;
  description: string;
  accent: string;
}

export interface Venue {
  id: string;
  slug: string;
  name: string;
  cityId: string;
  city: string;
  address?: string;
  postcode?: string;
  country?: string;
  neighborhood: string;
  type: string;
  image: string;
  description: string;
  highlights: string[];
  bestFor: string[];
  vibeIds: string[];
  coordinates: {
    x: number;
    y: number;
    lat?: number;
    lng?: number;
  };
  guideNote: string;
  listingTier: ListingTier;
  isFeatured: boolean;
  featuredWeight: number;
  partnerUrl?: string;
  referralCode?: string;
  bookingUrl?: string;
  claimStatus: ClaimStatus;
}

export interface FeaturedPlacement {
  id: string;
  type: "venue" | "city" | "collection" | "mapPin" | "sponsor";
  targetId: string;
  cityId?: string;
  label: string;
  sponsorName?: string;
  priority: number;
  active: boolean;
}

export interface City {
  id: string;
  slug: string;
  name: string;
  country: string;
  status: "flagship" | "live" | "coming";
  summary: string;
  legalContext: string;
  heroImage: string;
  vibeIds: string[];
  sponsorshipSlots: string[];
  featuredCollectionIds: string[];
  neighborhoods: {
    name: string;
    mood: string;
    note: string;
  }[];
  routes: {
    title: string;
    duration: string;
    description: string;
    stops: string[];
  }[];
}

export interface SavedItem {
  type: "venue" | "city" | "vibe" | "collection";
  id: string;
  savedAt: string;
}

export interface PartnerClaim {
  venueId?: string;
  businessName: string;
  contactName: string;
  email: string;
  phone?: string;
  message?: string;
  status: "new" | "reviewing" | "approved";
}

export interface OutboundReferral {
  targetType: "venue" | "city" | "partner" | "collection";
  targetId: string;
  sourcePage: string;
  referralCode?: string;
  createdAt: string;
}

export const vibes: Vibe[] = [
  { id: "creative", slug: "creative", name: "Creative", description: "Studios, galleries, music rooms, and places with a point of view.", accent: "#88d95f" },
  { id: "social", slug: "social", name: "Social", description: "Rooms made for conversation, groups, and shared pace.", accent: "#e3b35c" },
  { id: "luxury", slug: "luxury", name: "Luxury", description: "Higher-touch spaces with better design, service, and atmosphere.", accent: "#d6c39a" },
  { id: "hidden", slug: "hidden", name: "Hidden", description: "Low-key corners, quieter entrances, and places that reward looking closer.", accent: "#ff3035" },
  { id: "beginner", slug: "beginner-friendly", name: "Beginner-friendly", description: "Easy-going, clear, and comfortable for new or cautious visitors.", accent: "#9ee66f" },
  { id: "tourist", slug: "tourist-friendly", name: "Tourist-friendly", description: "Simple access, central locations, and low-friction discovery.", accent: "#68d2ff" },
  { id: "lounge", slug: "lounge", name: "Lounge", description: "Sit-down energy, soft lighting, and slower rituals.", accent: "#caa66a" },
  { id: "late", slug: "late-night", name: "Late-night", description: "After-dark mood, city lights, and evening momentum.", accent: "#ff4f7d" },
  { id: "recovery", slug: "recovery", name: "Recovery", description: "Reset, wellness, food, water, calm, and tomorrow-minded choices.", accent: "#84c51f" },
  { id: "quiet", slug: "quiet", name: "Quiet", description: "Lower noise, private-feeling spaces, and controlled pace.", accent: "#d8d0c4" },
  { id: "energy", slug: "high-energy", name: "High-energy", description: "Busy, electric, and closer to the pulse of the city.", accent: "#ff3035" },
  { id: "design", slug: "design-led", name: "Design-led", description: "Architecture, interiors, objects, and visual taste.", accent: "#d3358c" },
  { id: "origin", slug: "origin-culture", name: "Origin Culture", description: "Genetics, cultivation history, source stories, and the long arc of cannabis culture.", accent: "#b6df5c" },
];

export const cities: City[] = [
  {
    id: "amsterdam",
    slug: "amsterdam",
    name: "Amsterdam",
    country: "Netherlands",
    status: "flagship",
    summary: "The flagship XRED EYEZ city guide: coffeeshop culture, canal walks, design-led rooms, and easy mobile discovery.",
    legalContext: "Cannabis is tolerated through licensed coffeeshops, but public rules, age limits, and local etiquette still matter. Keep it respectful, discreet, and location-aware.",
    heroImage: "/cities/amsterdam-canal-day.png",
    vibeIds: ["tourist", "lounge", "hidden", "design", "quiet", "late"],
    sponsorshipSlots: ["amsterdam-city-sponsor", "amsterdam-map-featured"],
    featuredCollectionIds: ["first-timer-loop", "after-dark-signal"],
    neighborhoods: [
      { name: "Centrum", mood: "First-timer energy", note: "Easy access, classic coffeeshop density, busy streets, and tourist-friendly movement." },
      { name: "Jordaan", mood: "Canal calm", note: "Slower pace, better walks, intimate cafes, and design-led stops." },
      { name: "De Pijp", mood: "Food and social", note: "Cafes, food, conversation, and a less obvious rhythm than the centre." },
      { name: "Oud-West", mood: "Local route", note: "Good for a day plan with parks, food, and quieter movement." },
      { name: "Noord", mood: "Creative edge", note: "Waterfront spaces, culture yards, ferry routes, and stronger lifestyle crossover." },
    ],
    routes: [
      {
        title: "First Timer Loop",
        duration: "2-3 hours",
        description: "A low-friction route for visitors who want the city without getting swallowed by the centre.",
        stops: ["Centrum arrival", "Beginner-friendly stop", "Canal walk", "Food reset"],
      },
      {
        title: "After Dark Signal",
        duration: "Evening",
        description: "A night-led route for city lights, lounge energy, and controlled pace.",
        stops: ["Jordaan walk", "Lounge stop", "Late food", "Canal reset"],
      },
      {
        title: "Recovery Morning",
        duration: "Half day",
        description: "Water, food, air, and calm spaces for the day after the night before.",
        stops: ["Oud-West breakfast", "Vondel walk", "De Pijp coffee", "Quiet design stop"],
      },
    ],
  },
  {
    id: "barcelona",
    slug: "barcelona",
    name: "Barcelona",
    country: "Spain",
    status: "coming",
    summary: "Social club culture, design, food, late nights, and member-led access.",
    legalContext: "Cannabis social club rules are membership-based and local. Access expectations can vary.",
    heroImage: "/cities/barcelona-terrace.png",
    vibeIds: ["social", "creative", "late", "hidden"],
    sponsorshipSlots: ["barcelona-city-sponsor"],
    featuredCollectionIds: [],
    neighborhoods: [],
    routes: [],
  },
  {
    id: "tenerife",
    slug: "tenerife",
    name: "Tenerife",
    country: "Spain",
    status: "coming",
    summary: "Island social clubs, recovery energy, scenic routes, and relaxed travel utility.",
    legalContext: "Club access and local rules vary. Confirm requirements before travelling.",
    heroImage: "/cities/tenerife-coast.png",
    vibeIds: ["recovery", "social", "tourist"],
    sponsorshipSlots: ["tenerife-city-sponsor"],
    featuredCollectionIds: [],
    neighborhoods: [],
    routes: [],
  },
  {
    id: "marbella",
    slug: "marbella",
    name: "Marbella",
    country: "Spain",
    status: "coming",
    summary: "Luxury social energy, nightlife, private rooms, and coastal lifestyle.",
    legalContext: "Club access and local rules vary. Confirm requirements before travelling.",
    heroImage: "/cities/marbella-marina.png",
    vibeIds: ["luxury", "late", "social"],
    sponsorshipSlots: ["marbella-city-sponsor"],
    featuredCollectionIds: [],
    neighborhoods: [],
    routes: [],
  },
  {
    id: "thailand",
    slug: "thailand",
    name: "Thailand",
    country: "Market Guide",
    status: "coming",
    summary: "Fast-changing cannabis retail, travel rules, wellness, islands, and market shifts.",
    legalContext: "Thailand regulation has changed quickly. Always check current rules before use or travel.",
    heroImage: "/dna/origin-lab.png",
    vibeIds: ["tourist", "recovery", "creative"],
    sponsorshipSlots: ["thailand-market-sponsor"],
    featuredCollectionIds: [],
    neighborhoods: [],
    routes: [],
  },
  {
    id: "germany",
    slug: "germany",
    name: "Germany",
    country: "Market Guide",
    status: "coming",
    summary: "Europe's major reform signal: clubs, medical access, personal limits, and culture in transition.",
    legalContext: "Adult-use reform is structured and rule-heavy. Details vary by implementation.",
    heroImage: "/dna/silence-room.png",
    vibeIds: ["quiet", "design", "creative"],
    sponsorshipSlots: ["germany-market-sponsor"],
    featuredCollectionIds: [],
    neighborhoods: [],
    routes: [],
  },
  {
    id: "czech-republic",
    slug: "czech-republic",
    name: "Czech Republic",
    country: "Market Guide",
    status: "coming",
    summary: "Prague nightlife, policy movement, beer culture, and cannabis conversation.",
    legalContext: "Rules are specific and evolving. Treat any guide as travel context, not legal advice.",
    heroImage: "/rooms/archive-room.png",
    vibeIds: ["late", "creative", "hidden"],
    sponsorshipSlots: ["czech-market-sponsor"],
    featuredCollectionIds: [],
    neighborhoods: [],
    routes: [],
  },
  {
    id: "south-africa",
    slug: "south-africa",
    name: "South Africa",
    country: "Market Guide",
    status: "coming",
    summary: "Wellness, private-use context, cultivation culture, and high-scenery travel.",
    legalContext: "Private-use rules and commercial access are not the same thing. Know the difference before travelling.",
    heroImage: "/dna/space-architecture.png",
    vibeIds: ["recovery", "origin", "creative"],
    sponsorshipSlots: ["south-africa-market-sponsor"],
    featuredCollectionIds: [],
    neighborhoods: [],
    routes: [],
  },
];

export const venues: Venue[] = [
  {
    id: "grey-area",
    slug: "grey-area-amsterdam",
    name: "Grey Area",
    cityId: "amsterdam",
    city: "Amsterdam",
    neighborhood: "Centrum",
    type: "Coffeeshop",
    image: "/rooms/archive-room.png",
    description: "Compact, legacy, high-recognition coffeeshop energy for people who care about the culture.",
    highlights: ["Legacy reputation", "Central", "Connoisseur signal"],
    bestFor: ["Experienced visitors", "Quick stop", "Culture history"],
    vibeIds: ["hidden", "tourist", "creative"],
    coordinates: { x: 48, y: 38, lat: 52.3727, lng: 4.8899 },
    guideNote: "Best treated as a focused stop rather than a long lounge session. Go with patience and a plan.",
    listingTier: "featured",
    isFeatured: true,
    featuredWeight: 86,
    partnerUrl: "https://www.greyarea.nl/",
    referralCode: "xred-grey-area",
    claimStatus: "unclaimed",
  },
  {
    id: "boerejongens",
    slug: "boerejongens-amsterdam",
    name: "Boerejongens",
    cityId: "amsterdam",
    city: "Amsterdam",
    address: "Baarsjesweg 239",
    postcode: "1058 AA",
    country: "Netherlands",
    neighborhood: "West",
    type: "Coffeeshop",
    image: "/dna/material-study.png",
    description: "Clean, service-led, and more polished than the old-school stereotype.",
    highlights: ["Polished service", "Clear menu", "Design-led"],
    bestFor: ["Beginner-friendly", "Service", "Quality-minded visitors"],
    vibeIds: ["beginner", "design", "tourist"],
    coordinates: { x: 36, y: 52, lat: 52.3660, lng: 4.8540 },
    guideNote: "A strong proof that cannabis retail can feel considered, useful, and calm.",
    listingTier: "premium",
    isFeatured: true,
    featuredWeight: 98,
    partnerUrl: "https://www.boerejongens.com",
    bookingUrl: "https://www.boerejongens.com",
    referralCode: "xred-boerejongens",
    claimStatus: "partner",
  },
  {
    id: "paradox",
    slug: "paradox-amsterdam",
    name: "Paradox",
    cityId: "amsterdam",
    city: "Amsterdam",
    neighborhood: "Jordaan",
    type: "Coffeeshop",
    image: "/dna/ritual-table.png",
    description: "Low-key, neighborhood-led, and better for slower Amsterdam movement.",
    highlights: ["Local feel", "Canal route", "Quiet pace"],
    bestFor: ["Jordaan walk", "Calmer stop", "Low-noise route"],
    vibeIds: ["quiet", "lounge", "hidden"],
    coordinates: { x: 42, y: 45, lat: 52.3744, lng: 4.8796 },
    guideNote: "Pair it with a canal walk and food nearby. The point is pace, not pressure.",
    listingTier: "free",
    isFeatured: false,
    featuredWeight: 40,
    partnerUrl: "https://www.coffeeshopparadox.com/",
    referralCode: "xred-paradox",
    claimStatus: "unclaimed",
  },
  {
    id: "the-stud",
    slug: "the-stud-amsterdam",
    name: "The Stud",
    cityId: "amsterdam",
    city: "Amsterdam",
    neighborhood: "Oost",
    type: "Coffeeshop",
    image: "/dna/sound-room.png",
    description: "East-side community energy with a relaxed rhythm and less obvious tourist pressure.",
    highlights: ["Local rhythm", "Oost route", "Friendly pace"],
    bestFor: ["Repeat visitors", "East Amsterdam", "Social stop"],
    vibeIds: ["social", "beginner", "hidden"],
    coordinates: { x: 71, y: 48, lat: 52.3620, lng: 4.9320 },
    guideNote: "Useful for people who want to step outside the centre and see a more local Amsterdam pattern.",
    listingTier: "featured",
    isFeatured: true,
    featuredWeight: 78,
    partnerUrl: "https://www.coffeeshopthestud.com/",
    referralCode: "xred-stud",
    claimStatus: "unclaimed",
  },
  {
    id: "coffeeshop-amsterdam",
    slug: "coffeeshop-amsterdam-centrum",
    name: "Coffeeshop Amsterdam",
    cityId: "amsterdam",
    city: "Amsterdam",
    neighborhood: "Centrum",
    type: "Coffeeshop",
    image: "/rooms/manifesto-room.png",
    description: "Central, accessible, and built for visitors who want simple movement and clear atmosphere.",
    highlights: ["Central access", "Tourist-friendly", "Easy stop"],
    bestFor: ["First stop", "Groups", "Simple route"],
    vibeIds: ["tourist", "social", "lounge"],
    coordinates: { x: 51, y: 31, lat: 52.3762, lng: 4.8999 },
    guideNote: "Good as an entry point before moving toward quieter streets, food, or canal routes.",
    listingTier: "free",
    isFeatured: false,
    featuredWeight: 50,
    partnerUrl: "https://coffeeshopamsterdam.com/",
    referralCode: "xred-cs-amsterdam",
    claimStatus: "claimed",
  },
  {
    id: "siberie",
    slug: "siberie-amsterdam",
    name: "Siberie",
    cityId: "amsterdam",
    city: "Amsterdam",
    neighborhood: "Jordaan",
    type: "Coffeeshop",
    image: "/dna/vision-studio.png",
    description: "Creative canal-side energy with a more editorial feel than the busy central route.",
    highlights: ["Canal-side", "Creative crowd", "Slower lounge"],
    bestFor: ["Creative mood", "Jordaan route", "Conversation"],
    vibeIds: ["creative", "lounge", "design"],
    coordinates: { x: 44, y: 33, lat: 52.3779, lng: 4.8861 },
    guideNote: "A strong XRED EYEZ fit: atmosphere, place, culture, and route value in one stop.",
    listingTier: "premium",
    isFeatured: true,
    featuredWeight: 92,
    partnerUrl: "https://www.coffeeshopsiberie.nl/",
    bookingUrl: "https://www.coffeeshopsiberie.nl/",
    referralCode: "xred-siberie",
    claimStatus: "partner",
  },
  {
    id: "dampkring",
    slug: "original-dampkring-amsterdam",
    name: "Original Dampkring",
    cityId: "amsterdam",
    city: "Amsterdam",
    address: "Handboogstraat 29",
    postcode: "1012 XM",
    country: "Netherlands",
    neighborhood: "Centrum",
    type: "Coffeeshop",
    image: "/rooms/culture-wall.png",
    description: "A cinematic classic with global recognition and a strong culture-history signal.",
    highlights: ["Classic name", "Film history", "Central route"],
    bestFor: ["Culture seekers", "Tourists", "Legacy stop"],
    vibeIds: ["tourist", "creative", "energy"],
    coordinates: { x: 55, y: 42, lat: 52.3694, lng: 4.8947 },
    guideNote: "Treat it as a culture stop, then balance the route with air, food, and a quieter next move.",
    listingTier: "featured",
    isFeatured: true,
    featuredWeight: 82,
    partnerUrl: "https://ogdampkring.com",
    referralCode: "xred-dampkring",
    claimStatus: "unclaimed",
  },
  {
    id: "prix-dami",
    slug: "prix-dami-amsterdam",
    name: "Prix d'Ami",
    cityId: "amsterdam",
    city: "Amsterdam",
    address: "Haringpakkerssteeg 3",
    postcode: "1012 LR",
    country: "Netherlands",
    neighborhood: "Centrum",
    type: "Coffeeshop",
    image: "/cities/amsterdam-canal-day.png",
    description: "Large-format central coffeeshop with lounge energy, tourist access, and a high-volume Amsterdam feel.",
    highlights: ["Large venue", "Central access", "Lounge format"],
    bestFor: ["Groups", "Tourist route", "Rainy-day stop"],
    vibeIds: ["tourist", "lounge", "social"],
    coordinates: { x: 50, y: 28, lat: 52.3753, lng: 4.8959 },
    guideNote: "Useful when a group needs an obvious, easy-to-find central stop with space and low planning friction.",
    listingTier: "featured",
    isFeatured: true,
    featuredWeight: 84,
    partnerUrl: "https://www.prixdami.nl/en",
    bookingUrl: "https://www.prixdami.nl/en",
    referralCode: "xred-prix-dami",
    claimStatus: "unclaimed",
  },
  {
    id: "bulldog-first",
    slug: "the-bulldog-the-first-amsterdam",
    name: "The Bulldog The First",
    cityId: "amsterdam",
    city: "Amsterdam",
    address: "Oudezijds Voorburgwal 90",
    postcode: "1012 GG",
    country: "Netherlands",
    neighborhood: "Centrum",
    type: "Coffeeshop",
    image: "/rooms/culture-wall.png",
    description: "A globally recognised Amsterdam name and a direct line into coffeeshop history.",
    highlights: ["Historic name", "Central canal area", "Brand recognition"],
    bestFor: ["First-time visitors", "Culture history", "Quick landmark stop"],
    vibeIds: ["tourist", "energy", "origin"],
    coordinates: { x: 57, y: 35, lat: 52.3730, lng: 4.8990 },
    guideNote: "Treat this as an Amsterdam landmark stop. It is high-recognition, busy, and useful for orientation.",
    listingTier: "featured",
    isFeatured: true,
    featuredWeight: 83,
    partnerUrl: "https://thebulldog.com",
    bookingUrl: "https://thebulldog.com",
    referralCode: "xred-bulldog-first",
    claimStatus: "unclaimed",
  },
  {
    id: "bulldog-energy",
    slug: "the-bulldog-energy-amsterdam",
    name: "The Bulldog Energy",
    cityId: "amsterdam",
    city: "Amsterdam",
    address: "Oudezijds Voorburgwal 218",
    postcode: "1012 GJ",
    country: "Netherlands",
    neighborhood: "Centrum",
    type: "Coffeeshop",
    image: "/banners/seen-differently.png",
    description: "A central Bulldog stop with busier after-dark movement and strong tourist flow.",
    highlights: ["Central", "Known brand", "Late city energy"],
    bestFor: ["Night route", "Tourist-friendly", "Groups"],
    vibeIds: ["tourist", "late", "energy"],
    coordinates: { x: 59, y: 39, lat: 52.3710, lng: 4.8998 },
    guideNote: "Best used as part of a controlled central route with food, water, and a quieter next stop planned.",
    listingTier: "free",
    isFeatured: false,
    featuredWeight: 62,
    partnerUrl: "https://thebulldog.com",
    referralCode: "xred-bulldog-energy",
    claimStatus: "unclaimed",
  },
  {
    id: "green-house-centrum",
    slug: "green-house-centrum-coffeeshop-amsterdam",
    name: "Green House Centrum Coffeeshop",
    cityId: "amsterdam",
    city: "Amsterdam",
    address: "Oudezijds Voorburgwal 191",
    postcode: "",
    country: "Netherlands",
    neighborhood: "Centrum",
    type: "Coffeeshop",
    image: "/dna/origin-lab.png",
    description: "A genetics-led Amsterdam name with a strong reputation around cannabis culture and awards history.",
    highlights: ["Genetics signal", "Central", "Known operator"],
    bestFor: ["Genetics curious", "Experienced visitors", "Central route"],
    vibeIds: ["origin", "tourist", "creative"],
    coordinates: { x: 58, y: 37, lat: 52.3725, lng: 4.9007 },
    guideNote: "A good fit for users who care about lineage, reputation, and the wider cannabis story behind the menu.",
    listingTier: "premium",
    isFeatured: true,
    featuredWeight: 94,
    partnerUrl: "https://www.greenhouse.org",
    bookingUrl: "https://www.greenhouse.org",
    referralCode: "xred-green-house-centrum",
    claimStatus: "unclaimed",
  },
  {
    id: "green-house-pijp",
    slug: "green-house-pijp-amsterdam",
    name: "Green House Pijp",
    cityId: "amsterdam",
    city: "Amsterdam",
    address: "Tolstraat 91",
    postcode: "",
    country: "Netherlands",
    neighborhood: "De Pijp",
    type: "Coffeeshop",
    image: "/banners/the-right-room.png",
    description: "A De Pijp coffeeshop stop that pairs naturally with food, market streets, and a less central rhythm.",
    highlights: ["De Pijp", "Food route", "Genetics signal"],
    bestFor: ["Day route", "Food pairing", "Less central movement"],
    vibeIds: ["origin", "social", "design"],
    coordinates: { x: 57, y: 66, lat: 52.3527, lng: 4.8980 },
    guideNote: "Use it as part of a De Pijp loop, where the strongest experience is the full neighbourhood around it.",
    listingTier: "featured",
    isFeatured: true,
    featuredWeight: 80,
    partnerUrl: "https://www.greenhouse.org",
    bookingUrl: "https://www.greenhouse.org",
    referralCode: "xred-green-house-pijp",
    claimStatus: "unclaimed",
  },
  {
    id: "abraxas",
    slug: "coffeeshop-abraxas-amsterdam",
    name: "Coffeeshop Abraxas",
    cityId: "amsterdam",
    city: "Amsterdam",
    address: "Jonge Roelensteeg 12-14",
    postcode: "1012 PL",
    country: "Netherlands",
    neighborhood: "Centrum",
    type: "Coffeeshop",
    image: "/dna/ritual-table.png",
    description: "A central coffeeshop with a more atmospheric, tucked-away feel than the obvious tourist corridor.",
    highlights: ["Central lane", "Atmospheric", "Easy detour"],
    bestFor: ["Hidden feel", "Small groups", "Canal walk"],
    vibeIds: ["hidden", "tourist", "lounge"],
    coordinates: { x: 49, y: 40, lat: 52.3712, lng: 4.8951 },
    guideNote: "Useful when the user wants central access without feeling like every stop is a loud main-street choice.",
    listingTier: "featured",
    isFeatured: true,
    featuredWeight: 79,
    partnerUrl: "https://abraxas.amsterdam",
    bookingUrl: "https://abraxas.amsterdam",
    referralCode: "xred-abraxas",
    claimStatus: "unclaimed",
  },
  {
    id: "tweede-kamer",
    slug: "coffeeshop-tweede-kamer-amsterdam",
    name: "Coffeeshop Tweede Kamer",
    cityId: "amsterdam",
    city: "Amsterdam",
    address: "Heisteeg 6",
    postcode: "1012 WC",
    country: "Netherlands",
    neighborhood: "Centrum",
    type: "Coffeeshop",
    image: "/dna/material-study.png",
    description: "A compact, respected stop with a sharper connoisseur feel and central walking access.",
    highlights: ["Compact", "Respected", "Central lane"],
    bestFor: ["Quick stop", "Connoisseur mood", "Solo route"],
    vibeIds: ["hidden", "quiet", "design"],
    coordinates: { x: 47, y: 43, lat: 52.3716, lng: 4.8943 },
    guideNote: "Better as a precise stop than a long hang. Save it for a route where quality and pacing matter.",
    listingTier: "premium",
    isFeatured: true,
    featuredWeight: 90,
    partnerUrl: "https://tweedekamercoffeeshop.nl",
    bookingUrl: "https://tweedekamercoffeeshop.nl",
    referralCode: "xred-tweede-kamer",
    claimStatus: "unclaimed",
  },
  {
    id: "katsu",
    slug: "katsu-coffeeshop-galerie-amsterdam",
    name: "Katsu Coffeeshop & Galerie",
    cityId: "amsterdam",
    city: "Amsterdam",
    address: "1e van der Helststraat 70",
    postcode: "1072 NZ",
    country: "Netherlands",
    neighborhood: "De Pijp",
    type: "Coffeeshop",
    image: "/dna/vision-studio.png",
    description: "A De Pijp favourite with neighbourhood pace, gallery energy, and a strong cultural fit.",
    highlights: ["De Pijp", "Gallery feel", "Neighbourhood favourite"],
    bestFor: ["Creative mood", "Food route", "Repeat visitors"],
    vibeIds: ["creative", "social", "hidden"],
    coordinates: { x: 56, y: 69, lat: 52.3538, lng: 4.8984 },
    guideNote: "This is one of the better examples of the XRED idea: cannabis, neighbourhood, and culture in the same movement.",
    listingTier: "premium",
    isFeatured: true,
    featuredWeight: 91,
    partnerUrl: "https://www.katsu.nl",
    bookingUrl: "https://www.katsu.nl",
    referralCode: "xred-katsu",
    claimStatus: "unclaimed",
  },
  {
    id: "boerejongens-centrum",
    slug: "boerejongens-centrum-amsterdam",
    name: "Boerejongens Centrum",
    cityId: "amsterdam",
    city: "Amsterdam",
    address: "Utrechtsestraat 21",
    postcode: "1017 VH",
    country: "Netherlands",
    neighborhood: "Centrum",
    type: "Coffeeshop",
    image: "/dna/material-study.png",
    description: "A polished central Boerejongens stop with service-led energy and easy city access.",
    highlights: ["Polished service", "Central", "Clear menu"],
    bestFor: ["Beginner-friendly", "Quality-minded visitors", "Central route"],
    vibeIds: ["beginner", "design", "tourist"],
    coordinates: { x: 53, y: 48, lat: 52.3630, lng: 4.9010 },
    guideNote: "Good for users who want a more professional retail feel without leaving the core city route.",
    listingTier: "premium",
    isFeatured: true,
    featuredWeight: 93,
    partnerUrl: "https://www.boerejongens.com",
    bookingUrl: "https://www.boerejongens.com",
    referralCode: "xred-boerejongens-centrum",
    claimStatus: "partner",
  },
  {
    id: "the-plug-utopia",
    slug: "the-plug-utopia-amsterdam",
    name: "The Plug Utopia",
    cityId: "amsterdam",
    city: "Amsterdam",
    address: "Nieuwezijds Voorburgwal 132",
    postcode: "1012 SH",
    country: "Netherlands",
    neighborhood: "Centrum",
    type: "Coffeeshop",
    image: "/banners/before-the-drop.png",
    description: "A central stop with modern brand energy and strong fit for visitors moving through the core city.",
    highlights: ["Modern brand", "Central", "Visitor route"],
    bestFor: ["Tourist-friendly", "High-energy", "Brand-led stop"],
    vibeIds: ["tourist", "energy", "social"],
    coordinates: { x: 49, y: 34, lat: 52.3752, lng: 4.8929 },
    guideNote: "A useful modern counterpoint to legacy shops, especially for users comparing brand styles in one route.",
    listingTier: "featured",
    isFeatured: true,
    featuredWeight: 81,
    partnerUrl: "https://theplugcoffeeshops.com",
    bookingUrl: "https://theplugcoffeeshops.com",
    referralCode: "xred-plug-utopia",
    claimStatus: "unclaimed",
  },
  {
    id: "de-pijp-culture-walk",
    slug: "de-pijp-culture-walk",
    name: "De Pijp Culture Walk",
    cityId: "amsterdam",
    city: "Amsterdam",
    neighborhood: "De Pijp",
    type: "Lifestyle Route",
    image: "/banners/the-right-room.png",
    description: "A non-cannabis crossover route for food, coffee, streets, and reset time.",
    highlights: ["Food", "Coffee", "Walkable"],
    bestFor: ["Groups", "Recovery", "Day plan"],
    vibeIds: ["recovery", "social", "design"],
    coordinates: { x: 58, y: 64, lat: 52.3538, lng: 4.8992 },
    guideNote: "This is why XRED EYEZ is broader than cannabis: the full day matters.",
    listingTier: "featured",
    isFeatured: true,
    featuredWeight: 74,
    bookingUrl: "/partners/claim?collection=de-pijp-culture-walk",
    referralCode: "xred-de-pijp",
    claimStatus: "claimed",
  },
  {
    id: "foodhallen-reset",
    slug: "foodhallen-reset-amsterdam",
    name: "Foodhallen Reset",
    cityId: "amsterdam",
    city: "Amsterdam",
    neighborhood: "Oud-West",
    type: "Food / Recovery",
    image: "/banners/between-sessions.png",
    description: "A practical food stop for groups who need choice, seats, water, and a clean reset.",
    highlights: ["Food hall", "Group-friendly", "Recovery utility"],
    bestFor: ["After a session", "Groups", "Refuel"],
    vibeIds: ["recovery", "social", "beginner"],
    coordinates: { x: 34, y: 60, lat: 52.3685, lng: 4.8641 },
    guideNote: "A platform needs places like this because good discovery is about the whole route, not one venue.",
    listingTier: "free",
    isFeatured: false,
    featuredWeight: 42,
    partnerUrl: "https://foodhallen.nl/amsterdam/",
    referralCode: "xred-foodhallen",
    claimStatus: "unclaimed",
  },
  {
    id: "vondel-reset",
    slug: "vondel-reset-amsterdam",
    name: "Vondel Reset",
    cityId: "amsterdam",
    city: "Amsterdam",
    neighborhood: "Oud-West",
    type: "Recovery Space",
    image: "/dna/silence-room.png",
    description: "A park-led reset for water, food, walking, and lowering the volume.",
    highlights: ["Green space", "Recovery", "Easy reset"],
    bestFor: ["After a session", "Solo walk", "Calm"],
    vibeIds: ["recovery", "quiet", "beginner"],
    coordinates: { x: 32, y: 70, lat: 52.3583, lng: 4.8684 },
    guideNote: "Save recovery spaces the same way you save venues. The next morning is part of the experience.",
    listingTier: "free",
    isFeatured: false,
    featuredWeight: 36,
    bookingUrl: "/trips?seed=vondel-reset",
    referralCode: "xred-vondel",
    claimStatus: "claimed",
  },
  {
    id: "ndsm-culture-yard",
    slug: "ndsm-culture-yard-amsterdam",
    name: "NDSM Culture Yard",
    cityId: "amsterdam",
    city: "Amsterdam",
    neighborhood: "Noord",
    type: "Culture Spot",
    image: "/banners/seen-differently.png",
    description: "Industrial creative energy, water movement, murals, events, and a strong day-plan anchor.",
    highlights: ["Creative district", "Ferry route", "Street culture"],
    bestFor: ["Creative route", "Photos", "Non-cannabis crossover"],
    vibeIds: ["creative", "design", "hidden"],
    coordinates: { x: 62, y: 21, lat: 52.4003, lng: 4.9019 },
    guideNote: "A useful counterweight to coffeeshop-only maps: this is where culture discovery earns its place.",
    listingTier: "featured",
    isFeatured: true,
    featuredWeight: 76,
    partnerUrl: "https://www.ndsm.nl/en/",
    referralCode: "xred-ndsm",
    claimStatus: "unclaimed",
  },
  {
    id: "pllek-waterfront",
    slug: "pllek-waterfront-amsterdam",
    name: "Pllek Waterfront",
    cityId: "amsterdam",
    city: "Amsterdam",
    neighborhood: "Noord",
    type: "Food / Lounge",
    image: "/dna/space-architecture.png",
    description: "Waterfront food, music, sunset energy, and a clean bridge between city guide and lifestyle platform.",
    highlights: ["Waterfront", "Food", "Music mood"],
    bestFor: ["Sunset", "Groups", "After-map route"],
    vibeIds: ["social", "lounge", "late"],
    coordinates: { x: 66, y: 25, lat: 52.3997, lng: 4.9030 },
    guideNote: "Strong for users who want a full evening rather than a single cannabis stop.",
    listingTier: "premium",
    isFeatured: true,
    featuredWeight: 88,
    partnerUrl: "https://pllek.nl/",
    bookingUrl: "https://pllek.nl/",
    referralCode: "xred-pllek",
    claimStatus: "partner",
  },
];

export const featuredPlacements: FeaturedPlacement[] = [
  { id: "amsterdam-city-sponsor", type: "sponsor", targetId: "amsterdam", cityId: "amsterdam", label: "City sponsor slot", sponsorName: "Available for launch partner", priority: 100, active: true },
  { id: "amsterdam-map-featured", type: "mapPin", targetId: "boerejongens", cityId: "amsterdam", label: "Featured map pin", sponsorName: "Premium placement ready", priority: 98, active: true },
  { id: "amsterdam-premium-collection", type: "collection", targetId: "first-timer-loop", cityId: "amsterdam", label: "Sponsored collection", sponsorName: "First Timer Loop", priority: 88, active: true },
  { id: "explore-featured-venue", type: "venue", targetId: "siberie", cityId: "amsterdam", label: "Featured venue", sponsorName: "Partner-ready listing", priority: 92, active: true },
];

export function getCity(slug: string) {
  return cities.find((city) => city.slug === slug);
}

export function getVenue(slug: string) {
  return venues.find((venue) => venue.slug === slug);
}

export function getVenueById(id: string) {
  return venues.find((venue) => venue.id === id);
}

export function getVibe(id: string) {
  return vibes.find((vibe) => vibe.id === id || vibe.slug === id);
}

export function getVenuesByCity(cityId: string) {
  return venues.filter((venue) => venue.cityId === cityId);
}

export function getSortedVenuesByCity(cityId: string) {
  return getVenuesByCity(cityId).sort((a, b) => b.featuredWeight - a.featuredWeight);
}

export function getFeaturedVenuesByCity(cityId: string) {
  return getSortedVenuesByCity(cityId).filter((venue) => venue.isFeatured);
}

export function getVenuesByVibe(vibeId: string) {
  return venues.filter((venue) => venue.vibeIds.includes(vibeId));
}

export function getFeaturedPlacements(cityId?: string) {
  return featuredPlacements
    .filter((placement) => placement.active && (!cityId || placement.cityId === cityId))
    .sort((a, b) => b.priority - a.priority);
}
