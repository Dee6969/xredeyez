export interface DnaSection {
  slug: string;
  label: string;
  city: string;
  aspect: string;
  accent: string;
  description: string;
  title: string;
  content: string;
  signal: string;
  image: string;
  position: string;
  intro: string;
  editorial: string[];
  codes: string[];
  genetics: string[];
  worldSignals: string[];
  dispatchTitle: string;
  dispatch: string;
  closing: string;
}

const allDnaSections: DnaSection[] = [
  {
    slug: "sound",
    label: "FREQUENCY",
    city: "LONDON",
    aspect: "Music & frequency",
    accent: "rgba(90,190,120,0.9)",
    description: "The room has a pulse before the product appears.",
    title: "The listening room",
    content: "Lifestyle is not just what you wear. It is what you tune into: late-night sessions, slow rooms, clean mixes, and the soundtracks that make a brand feel lived in.",
    signal: "Culture note: build playlists, listening sessions, and artist-led moments before product drops.",
    image: "/dna/sound-room.png",
    position: "center",
    intro: "Sound is the invisible architecture of X Red Eyez. Before a product appears, the room should already have a pulse.",
    editorial: [
      "This is the cannabis lifestyle beyond the obvious: the playlist before the session, the room tone, the low conversation, the city outside the glass. Sound tells people whether they are somewhere disposable or somewhere intentional.",
      "For X Red Eyez, music becomes the social layer. It gives the brand a way to host culture without shouting for attention: mixes, late-night listening notes, artist signals, and rooms built around pace rather than pressure.",
      "The aim is not to soundtrack excess. It is to soundtrack presence. A slower tempo. Better taste. A room that makes people stay longer because it feels considered.",
    ],
    codes: ["Late-night mixes", "Artist-led moments", "Private listening sessions", "No throwaway noise"],
    genetics: [
      "Genetics carry a rhythm of their own: old-school gas, dessert profiles, fruit-forward selections, and sharper haze lines all create different social tempos.",
      "The X Red Eyez sound lens should pair terpene language with mood language: citrus for lift, earth for depth, gas for impact, cream for softness.",
      "Future strain storytelling should feel like a track note: lineage, aroma, expected setting, and the room it belongs in.",
    ],
    worldSignals: [
      "Los Angeles, Barcelona, Amsterdam, London, and Bangkok all shape cannabis nightlife differently. The brand should read each city by sound, not stereotype.",
      "Global cannabis culture is increasingly crossing into fashion, music, events, and members-only hospitality.",
      "The strongest drops in the space behave like cultural releases: limited, talked about, visually distinct, and tied to community.",
    ],
    dispatchTitle: "Signal To Watch",
    dispatch: "Cannabis culture is moving closer to hospitality, music, and member-style experiences. Brands that understand atmosphere will feel more premium than brands that only show packaging.",
    closing: "The sound should make the brand feel alive before anyone sees a drop.",
  },
  {
    slug: "motion",
    label: "MOTION",
    city: "TOKYO",
    aspect: "Street & movement",
    accent: "rgba(130,220,170,0.9)",
    description: "The city as a wellness practice.",
    title: "Move through the night",
    content: "Movement keeps the world sharp: walking cities, training lightly, recovering properly, and treating the street as part of the lifestyle instead of background noise.",
    signal: "Wellness note: motion, sleep, hydration, and recovery sit beside the culture.",
    image: "/dna/motion-city.png",
    position: "center",
    intro: "Motion keeps the brand from becoming static. X Red Eyez lives in movement: through streets, studios, venues, and private rooms.",
    editorial: [
      "A modern cannabis lifestyle cannot be built only around stillness. It has to understand movement: walking after dark, training lightly, stretching, recovering, travelling, and moving through the city with a clear head.",
      "The wellness layer here is not medical and not preachy. It is practical: hydration, sleep, breath, pacing, and knowing when the night should speed up or slow down.",
      "Motion also gives the brand a global rhythm. London, Tokyo, Amsterdam, Los Angeles, Lagos: each city has a different pace, and X Red Eyez should know how to move through all of them without losing itself.",
    ],
    codes: ["City walks", "Recovery culture", "Travel rhythm", "Controlled energy"],
    genetics: [
      "Not every genetic story is about intensity. Some selections are built around daytime clarity, lighter social rhythm, or post-event decompression.",
      "X Red Eyez should treat strain choice as context: movement, rest, conversation, creative focus, or late-night stillness.",
      "This is not medical positioning. It is responsible culture: know the setting, know the pace, and respect potency.",
    ],
    worldSignals: [
      "Germany's adult-use reform has made Europe watch social access, home cultivation, and cannabis clubs more closely.",
      "Thailand's rapid policy shifts show how fast an open market can change when regulation catches up with culture.",
      "Across mature markets, consumers are asking for clearer labels, cleaner formats, and better education around strength.",
    ],
    dispatchTitle: "Lifestyle Note",
    dispatch: "The strongest premium lifestyle brands are expanding beyond product use into routines, movement, social pace, and how people want to feel the next morning.",
    closing: "Movement is part of the ritual. The culture should feel awake, not wasted.",
  },
  {
    slug: "material",
    label: "MATERIALS",
    city: "MILAN",
    aspect: "Craft & texture",
    accent: "var(--brass)",
    description: "Weight, texture, finish, and the discipline of premium objects.",
    title: "Objects with standards",
    content: "Materials create trust before a word is spoken: glass, stone, leather, paper, weight, temperature, finish. XRED EYEZ should feel collected, not consumed.",
    signal: "Lifestyle note: future products should arrive like designed objects, not shelf filler.",
    image: "/dna/material-study.png",
    position: "center",
    intro: "Material is how the brand proves it has standards. The hand knows before the mind explains.",
    editorial: [
      "Cannabis has often been sold too cheaply, visually and physically. X Red Eyez should move in the opposite direction: weight, texture, restraint, packaging that feels kept rather than thrown away.",
      "The material world can borrow from luxury fragrance, vinyl, hospitality, architecture, and gallery publishing. Nothing needs to scream cannabis to belong to cannabis culture.",
      "This is where future commerce can enter naturally. If the product arrives later, it should feel like an object from the world, not a listing dropped onto a template.",
    ],
    codes: ["Glass over plastic", "Weight and texture", "Collectible packaging", "Quiet luxury cues"],
    genetics: [
      "Genetics deserve material respect. A premium cultivar should not be hidden behind generic packaging or empty strain hype.",
      "Lineage, breeder notes, harvest care, terpene profile, and batch identity can become part of the collectible object.",
      "The design challenge is to make education feel premium: less laboratory sheet, more archive card.",
    ],
    worldSignals: [
      "Cookies proved cannabis can live as a wider lifestyle system: apparel, accessories, collaborations, and recognisable visual language.",
      "Seed-led brands show how genetics can become the centre of desire before finished products appear.",
      "Modern consumers increasingly expect transparency: origin, testing, ingredients, and a reason to trust the brand.",
    ],
    dispatchTitle: "Commerce Signal",
    dispatch: "Premium cannabis consumers increasingly expect design literacy: better packaging, clearer information, and products that fit into their homes rather than hide in drawers.",
    closing: "If it touches the hand, it represents the whole world.",
  },
  {
    slug: "space",
    label: "SPACE",
    city: "LAGOS",
    aspect: "Architecture & light",
    accent: "rgba(75,180,105,0.9)",
    description: "The room changes the state.",
    title: "Environment is part of the experience",
    content: "Wellness is also spatial: dimmer lighting, softer edges, better air, fewer distractions, and places that let people slow down without feeling passive.",
    signal: "Design note: every launch should feel like entering a room, not opening a catalog.",
    image: "/dna/space-architecture.png",
    position: "center",
    intro: "Space is the first product. Before X Red Eyez asks anyone to buy, it should show them where the brand lives.",
    editorial: [
      "A room can change behaviour. Low light slows people down. Better air makes a space feel cared for. Materials tell people whether they are being rushed or hosted.",
      "For a cannabis lifestyle brand, space matters because setting matters. Not as a claim, not as a cliché, but as a cultural truth: people remember where they were and how the room felt.",
      "The digital flagship should behave the same way. Each section needs to feel like a place with a purpose: arrival, manifesto, culture, archive, signal, vault.",
    ],
    codes: ["Low light", "Private rooms", "Gallery pacing", "Hospitality energy"],
    genetics: [
      "The same cultivar can feel different depending on the room around it: lighting, people, sound, food, air, and pace all shape the ritual.",
      "X Red Eyez should build strain stories around environments, not just effects: gallery, listening room, balcony, table, studio, after-hours.",
      "Genetics become more meaningful when they are connected to a use occasion and a cultural setting.",
    ],
    worldSignals: [
      "Amsterdam remains a global symbol for cannabis spaces, while regulated supply experiments point toward tighter quality control.",
      "In North America, cannabis retail is increasingly borrowing from hospitality, gallery design, and fashion retail.",
      "The next wave is not just stores. It is lounges, education rooms, private events, and digital spaces that make access feel intentional.",
    ],
    dispatchTitle: "Design Signal",
    dispatch: "The future of cannabis retail is not only shelves. It is lounges, education spaces, members rooms, events, and digital environments that create trust before conversion.",
    closing: "When the room feels right, the brand feels inevitable.",
  },
  {
    slug: "ritual",
    label: "RITUAL",
    city: "AMSTERDAM",
    aspect: "Culture & practice",
    accent: "rgba(170,135,92,0.92)",
    description: "Taste, timing, setting, and respect for the moment.",
    title: "The ritual is controlled",
    content: "The strongest cannabis culture is not loud for the sake of it. It is measured, social, thoughtful, and built around taste, timing, setting, and respect for the moment.",
    signal: "Cannabis note: education, responsible use, and context matter more than hype.",
    image: "/dna/ritual-table.png",
    position: "center",
    intro: "Ritual is where cannabis culture becomes lifestyle instead of novelty.",
    editorial: [
      "X Red Eyez should treat cannabis with taste and responsibility. The ritual is not about excess. It is about timing, people, setting, pace, and knowing what kind of night you are building.",
      "This gives the brand a grown-up voice. It can talk about culture, responsible use, sensory experience, and social rituals without drifting into medical promises or cartoon smoke-shop language.",
      "The ritual can be solitary or social: a table, a candle, a record, a city view, a conversation, a quiet reset. The important thing is intention.",
    ],
    codes: ["Responsible culture", "Setting and timing", "Taste over volume", "Ritual objects"],
    genetics: [
      "Ritual begins with knowing what is in front of you: cultivar family, aroma, potency, format, and the pace it asks for.",
      "The brand should teach cannabis through taste and context: gas, fruit, cream, spice, earth, floral, haze, resin, and finish.",
      "Responsible ritual means no pressure. The point is not more. The point is better.",
    ],
    worldSignals: [
      "Exclusive genetics culture shows the power of mythology: people follow names, cuts, and reputations before they see a shelf.",
      "Across the world, cannabis education is becoming part of premium culture because consumers want confidence, not confusion.",
      "Regulated markets are pushing brands to separate real product knowledge from empty strain-name theatre.",
    ],
    dispatchTitle: "Cannabis Culture Note",
    dispatch: "The market is maturing. The brands with longevity will make cannabis feel considered, social, and well-designed rather than novelty-led.",
    closing: "The ritual is not louder. It is sharper.",
  },
  {
    slug: "vision",
    label: "VISION",
    city: "LOS ANGELES",
    aspect: "Perspective & art",
    accent: "rgba(100,210,150,0.9)",
    description: "The culture needs a point of view.",
    title: "Watch the wider signal",
    content: "Cannabis news is moving fast: wellness formats, design-led retail, ingredient transparency, creator culture, and tighter expectations from customers who want substance.",
    signal: "News note: XRED EYEZ should report culture shifts, not just announce itself.",
    image: "/dna/vision-studio.png",
    position: "center",
    intro: "Vision is the editorial eye of the brand. It watches culture before it joins the conversation.",
    editorial: [
      "X Red Eyez should not only post itself. It should observe the world around cannabis: design-led retail, plant education, wellness language, music, nightlife, regulation, creator culture, and global taste shifts.",
      "This becomes a content engine. Short dispatches, visual essays, city notes, founder observations, and signal reports can make the brand feel intelligent before it becomes commercial.",
      "The voice should be selective. Not every headline deserves attention. The brand should choose the stories that reveal where the culture is moving.",
    ],
    codes: ["Culture dispatches", "Design intelligence", "Market watching", "Selective commentary"],
    genetics: [
      "Genetics are the newswire of cannabis culture. New crosses, old cuts, breeder reputations, terpene trends, and limited drops all move the conversation.",
      "X Red Eyez should track genetics like an editorial desk: what is rising, what is tired, what is misunderstood, and what deserves respect.",
      "The goal is not to chase every hype strain. The goal is to understand why certain lines become cultural signals.",
    ],
    worldSignals: [
      "Germany is a key European watchpoint after adult-use reform; the question is how social access, clubs, and medical channels evolve.",
      "Thailand remains a global case study in how fast cannabis tourism and retail can expand, then face tighter rules.",
      "The UK remains medical-only at a legal level, but private patient access and public debate continue shaping the culture.",
    ],
    dispatchTitle: "Editorial Signal",
    dispatch: "Cannabis news is no longer just product news. It now touches wellness, hospitality, law, design, investment, community, and lifestyle behaviour.",
    closing: "The brand should see clearly, then speak carefully.",
  },
  {
    slug: "silence",
    label: "SILENCE",
    city: "BERLIN",
    aspect: "Restraint & edge",
    accent: "rgba(210,200,180,0.72)",
    description: "Recovery has its own status.",
    title: "Quiet is a luxury",
    content: "A wellness-led lifestyle makes room for pause: breath, reset, privacy, lower noise, and the discipline to leave space around the experience.",
    signal: "Wellness note: the brand can own calm without becoming soft.",
    image: "/dna/silence-room.png",
    position: "center",
    intro: "Silence is not absence. It is control. X Red Eyez does not need to fill every space to prove it exists.",
    editorial: [
      "The premium move is restraint. Fewer claims. Better pacing. Less clutter. More confidence. This matters especially in cannabis, where many brands still rely on obvious signals.",
      "Silence also connects to wellness. Recovery, sleep, breath, privacy, and personal boundaries are part of modern lifestyle culture. A brand can support that tone without pretending to be medicine.",
      "The quiet parts of the website should feel intentional: pauses between rooms, slow reveals, limited language, and the confidence to let atmosphere do some of the work.",
    ],
    codes: ["Privacy", "Recovery", "Low-noise design", "Controlled mystery"],
    genetics: [
      "Silence is where restraint matters most: high-potency genetics, concentrates, and intense cultivars need education and respect.",
      "Some of the most premium cannabis moments are low-volume: one person, one setting, one carefully chosen profile.",
      "X Red Eyez should make space for recovery, reflection, and privacy alongside louder cultural energy.",
    ],
    worldSignals: [
      "Wellness language is growing around cannabis globally, but brands need to avoid medical promises unless backed by regulation and evidence.",
      "Consumers are becoming more alert to dosage, tolerance, and the difference between hemp, CBD, medical cannabis, and adult-use products.",
      "Quiet, responsible education can become a trust advantage in a noisy category.",
    ],
    dispatchTitle: "Wellness Signal",
    dispatch: "Consumers are tired of overstatement. Brands that use calm, clarity, and restraint can feel more trustworthy than brands that over-explain.",
    closing: "Quiet gives the world its edge.",
  },
  {
    slug: "origin",
    label: "ORIGIN",
    city: "WORLDWIDE",
    aspect: "Identity & roots",
    accent: "rgba(125,220,90,0.95)",
    description: "Plant literacy, genetics, hemp innovation, and cultural roots.",
    title: "Know where it comes from",
    content: "The future of cannabis culture is more transparent: origin stories, cultivation care, hemp innovation, plant literacy, and communities that want to understand what they support.",
    signal: "Culture note: education should feel desirable, not clinical.",
    image: "/dna/origin-lab.png",
    position: "center",
    intro: "Origin is where the lifestyle earns depth. The plant has a story, and so do the people around it.",
    editorial: [
      "X Red Eyez can bring plant literacy into the brand without becoming dry or clinical. Origin means cultivation, hemp innovation, responsible sourcing, community, and respect for the culture that came before.",
      "The point is transparency with taste. People want to know what they support, but they do not want to feel like they are reading a compliance document inside a beautiful world.",
      "This section can become the educational backbone later: strain literacy, hemp materials, cultivation stories, sustainability notes, and responsible cannabis culture.",
    ],
    codes: ["Plant literacy", "Hemp innovation", "Transparent sourcing", "Culture respect"],
    genetics: [
      "Origin starts with the plant: landrace influence, breeder selection, mother cuts, phenotype hunting, cultivation method, and post-harvest care.",
      "The brand can explain genetics without making it dry: family tree, aroma map, room pairing, origin note, and why the line matters.",
      "Hemp also belongs in the story: materials, wellness formats, textiles, packaging, and plant innovation beyond intoxication.",
    ],
    worldSignals: [
      "The Netherlands' regulated cannabis experiment is a major European signal around supply chain control and quality standards.",
      "Canada and parts of the United States continue to show how legal markets mature through testing, branding, retail, and consumer education.",
      "The global direction is uneven, but the demand for trustworthy origin stories is consistent.",
    ],
    dispatchTitle: "Origin Signal",
    dispatch: "As cannabis matures, education becomes part of premium positioning. The opportunity is to make knowledge feel desirable, visual, and culturally fluent.",
    closing: "The future feels stronger when the roots are visible.",
  },
];

export const dnaSections = allDnaSections.filter((section) =>
  ["sound", "material", "ritual", "origin"].includes(section.slug)
);

export function getDnaSection(slug: string) {
  return dnaSections.find((section) => section.slug === slug);
}
