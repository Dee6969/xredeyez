export interface RoomIntro {
  slug: string;
  id: string;
  number: string;
  name: string;
  role: string;
  detail: string;
  image: string;
  intro: string;
  briefing: string[];
  codes: string[];
  cta: string;
}

export const roomIntros: RoomIntro[] = [
  {
    slug: "manifesto",
    id: "manifesto",
    number: "01",
    name: "Manifesto Room",
    role: "The belief system",
    detail: "A quiet declaration of who XRED EYEZ is for, and who it is not for.",
    image: "/rooms/manifesto-room.png",
    intro: "This is the first chamber: the belief system before the product, the tone before the drop, the reason the world exists.",
    briefing: [
      "The Manifesto Room introduces X Red Eyez as a cannabis lifestyle brand with restraint, confidence, and a point of view.",
      "It is not here to explain everything. It sets the rules of the world: controlled mystery, culture first, and a slower return to market.",
    ],
    codes: ["Belief", "Restraint", "Identity", "No hard sell"],
    cta: "Read the manifesto",
  },
  {
    slug: "culture-wall",
    id: "culture",
    number: "02",
    name: "Culture Wall",
    role: "The influence board",
    detail: "Sound, cities, ritual, materials, and the codes shaping the return.",
    image: "/rooms/culture-wall.png",
    intro: "The Culture Wall is where the brand shows its references: music, movement, wellness, design, cannabis culture, and global taste.",
    briefing: [
      "This room expands the brand beyond cannabis as a product and into cannabis as lifestyle: how people gather, move, listen, recover, and build rituals.",
      "Each DNA tile opens into a deeper editorial page, turning the wall into a living content system.",
    ],
    codes: ["Lifestyle", "Wellness", "Cannabis culture", "Editorial signal"],
    cta: "Open the DNA",
  },
  {
    slug: "archive",
    id: "archive",
    number: "03",
    name: "The Archive",
    role: "The proof of origin",
    detail: "A timeline of silence, rebuild, and intent before Chapter One opens.",
    image: "/rooms/archive-room.png",
    intro: "The Archive proves the brand did not appear from nowhere. It has memory, silence, rebuild, and intent.",
    briefing: [
      "This is where visitors understand that the return is deliberate. X Red Eyez has been quiet, not absent.",
      "The timeline turns the brand story into artefacts: early vision, first samples, community moments, the quiet period, and Chapter One.",
    ],
    codes: ["Origin", "Timeline", "Evidence", "Chapter One"],
    cta: "View the record",
  },
  {
    slug: "lifestyle-gallery",
    id: "gallery",
    number: "04",
    name: "Lifestyle Gallery",
    role: "The atmosphere",
    detail: "Cinematic glimpses of the rooms, nights, and moods around the brand.",
    image: "/rooms/lifestyle-gallery.png",
    intro: "The Gallery is the feeling layer: rooms, nights, faces, cities, and the visual memory of the lifestyle.",
    briefing: [
      "This room is not a product carousel. It is a mood archive for the world surrounding X Red Eyez.",
      "It should make visitors understand the brand through atmosphere before they ever see a commercial offer.",
    ],
    codes: ["Mood", "Cities", "Visual culture", "Desire"],
    cta: "Enter the gallery",
  },
  {
    slug: "signal",
    id: "signal",
    number: "05",
    name: "The Signal",
    role: "Future drops",
    detail: "Redacted transmissions for the product world that arrives later.",
    image: "/rooms/signal-room.png",
    intro: "The Signal is where the future starts to speak without giving everything away.",
    briefing: [
      "This room builds anticipation for products, drops, collaborations, and cultural moments without becoming a shop.",
      "Information stays controlled. Visitors get hints, progress, redacted notes, and a reason to come back.",
    ],
    codes: ["Coming soon", "Redacted drops", "Anticipation", "Return visits"],
    cta: "Decode the signal",
  },
  {
    slug: "members-vault",
    id: "vault",
    number: "06",
    name: "Members Vault",
    role: "Early access",
    detail: "The soft conversion: first entry, no hard sell, no public noise.",
    image: "/rooms/members-vault.png",
    intro: "The Vault is the first access layer: private entry for people who want the signal before the room opens.",
    briefing: [
      "This is the soft conversion system. No pressure, no catalogue, no corporate signup language.",
      "The Vault turns attention into membership energy: early access, private notes, and Chapter One priority.",
    ],
    codes: ["Private entry", "Early access", "Membership", "First signal"],
    cta: "Enter the vault",
  },
];

export function getRoomIntro(slug: string) {
  return roomIntros.find((room) => room.slug === slug);
}
