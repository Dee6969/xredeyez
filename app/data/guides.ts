export interface GuideSection {
  heading: string;
  body: string;
}

export interface Guide {
  slug: string;
  title: string;
  subtitle: string;
  cityId: string;
  city: string;
  country: string;
  heroImage: string;
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  tags: string[];
  intro: string;
  sections: GuideSection[];
  quickFacts: { label: string; value: string }[];
  relatedCitySlug: string;
  metaTitle: string;
  metaDescription: string;
}

export const guides: Guide[] = [
  {
    slug: "amsterdam-cannabis-guide-2026",
    title: "Amsterdam Cannabis Guide 2026",
    subtitle: "Coffeeshops, neighbourhoods, etiquette and everything you need to know before you arrive.",
    cityId: "amsterdam",
    city: "Amsterdam",
    country: "Netherlands",
    heroImage: "/cities/amsterdam-canal-day.png",
    publishedAt: "2026-01-15",
    updatedAt: "2026-06-07",
    readTime: "9 min read",
    tags: ["Amsterdam", "Coffeeshops", "Netherlands", "Travel Guide"],
    metaTitle: "Amsterdam Cannabis Guide 2026 — Best Coffeeshops, Neighbourhoods & Tips | XRED EYEZ",
    metaDescription: "The complete Amsterdam cannabis guide for 2026. Best coffeeshops, which neighbourhoods to stay in, purchase rules, etiquette and insider tips from XRED EYEZ.",
    intro: "Amsterdam has been the world's most recognised cannabis culture destination for over five decades. The city's coffeeshop system — unique in the world — allows licensed establishments to sell cannabis openly to adults, creating a travel experience that no other city can replicate. Whether you're a first-time visitor or returning after years, this guide covers everything you need to make the most of Amsterdam in 2026.",
    quickFacts: [
      { label: "Legal status", value: "Tolerated — coffeeshops licensed by municipality" },
      { label: "Purchase limit", value: "5g per transaction per shop" },
      { label: "Minimum age", value: "18+ with valid ID" },
      { label: "Consumption", value: "Coffeeshops only — not on streets or public spaces" },
      { label: "Tobacco mixing", value: "Banned — pure cannabis or herbal mix only" },
      { label: "Number of coffeeshops", value: "~160 licensed in Amsterdam (2026)" },
    ],
    sections: [
      {
        heading: "How the coffeeshop system works",
        body: "Amsterdam's coffeeshops operate under a tolerance policy called gedoogbeleid. Cannabis is technically illegal under Dutch law but prosecution is waived for personal amounts. Licensed coffeeshops can sell up to 5 grams per person per visit, and you can visit multiple shops in a day — though purchasing more than 5g total in one day is against the rules.\n\nEvery coffeeshop must hold a municipal licence, and Amsterdam has capped the total number at around 160 establishments. Many shops have been operating for 30 or 40 years, making them genuine cultural institutions. You'll find menus listing strains, hash, pre-rolls and edibles — staff are almost always knowledgeable and happy to advise on potency, flavour and effect.\n\nEntry requires valid photo ID proving you're 18 or over. Passports, national ID cards and EU driving licences are accepted. UK and US driving licences are generally accepted but carry a passport to be safe.",
      },
      {
        heading: "The tobacco ban — what changed and why it matters",
        body: "One of the most significant developments in recent years is the indoor smoking ban. Since 2008, mixing cannabis with tobacco has been banned inside coffeeshops. This means all joints served must be pure cannabis or use a tobacco-free herbal mix (commonly referred to as a 'pure' joint).\n\nThis fundamentally changed the Amsterdam coffeeshop experience. Expect stronger, more immediate effects than the tobacco-mixed joints many European travellers are used to. Start with a small amount if you're not accustomed to pure cannabis, and take your time between sessions. The ban is strictly enforced — staff will ask you to leave if you add tobacco.\n\nVaporisers are widely available to rent or use at many coffeeshops, and they remain one of the most popular consumption methods for visitors who want a cleaner experience.",
      },
      {
        heading: "Best neighbourhoods for cannabis culture",
        body: "De Pijp is the neighbourhood most associated with authentic Amsterdam cannabis culture. South of the centre, it has the highest concentration of locally-loved coffeeshops alongside the Albert Cuypmarkt, independent food spots and a genuinely local feel that many tourists never find. If you want to experience the scene without the Leidseplein tourist crowd, De Pijp is where to be.\n\nLeidseplein and Rembrandtplein sit at the heart of the tourist experience. Both squares are surrounded by coffeeshops, bars and restaurants, and the energy is high — particularly on weekends. The coffeeshops here cater heavily to international visitors, with large menus, bilingual staff and late opening hours. If you want convenience and selection, you're well-served here.\n\nJordaan, directly west of the centre, has a more residential, canal-house character. The coffeeshops here tend to be smaller, less crowded and more intimate. It's worth the short walk from the main tourist drag.\n\nOud-West and the area around Vondelpark offer a more relaxed atmosphere. The park itself is a popular place to wind down between visits, and the surrounding streets have solid coffeeshop options without the central city crowds.",
      },
      {
        heading: "What to look for on a coffeeshop menu",
        body: "Amsterdam coffeeshop menus vary considerably in quality and range. At the top end you'll find detailed strain information — genetics, THC/CBD percentages, terpene profiles and effect descriptions. At tourist-facing shops the menu may be simpler.\n\nFlower (dried bud) is the most common purchase. Quality ranges from commercial to premium craft, and prices reflect this. Expect €10–€20 per gram for quality flower. Hash — pressed cannabis resin — remains a Dutch specialty, and you'll often find Moroccan, Lebanese and Afghan varieties alongside Dutch-produced hash. Pre-rolled joints are convenient but represent lower value than rolling your own.\n\nEdibles (spacecakes, cookies) are sold in most shops but carry a significant caveat: effects can take 60–90 minutes to onset and last 4–6 hours. Many first-time visitors are caught out by eating more when they don't feel an effect quickly. Buy one, eat half, wait at least 90 minutes before deciding to take more.",
      },
      {
        heading: "Practical tips for first-time visitors",
        body: "Drink water and eat before visiting coffeeshops — cannabis on an empty stomach amplifies effects significantly. Keep a bottle of water with you. Many coffeeshops serve soft drinks and snacks.\n\nPace yourself. The culture in Amsterdam is relaxed — there's no expectation to rush through a session. Stay as long as you like, order a drink, watch the canal through the window. The best coffeeshop experiences are unhurried.\n\nBring cash. While more shops now accept card payments, many still prefer cash and have ATMs nearby. Cards are also sometimes subject to minimum purchase requirements.\n\nBe aware of 'weed delivery' touts on the street. Buying from anyone who approaches you on the street is illegal, unsafe and unnecessary — there are 160 licensed shops in the city.\n\nFinally: Amsterdam is a remarkably easy city to get around on foot or by canal boat. Many of the best coffeeshops are within 20 minutes walk of Centraal Station. Renting a bike is a local experience in itself, though we'd recommend keeping cycling sessions to before rather than after a coffeeshop visit.",
      },
      {
        heading: "Beyond the coffeeshop: cannabis culture in Amsterdam",
        body: "Amsterdam's cannabis culture extends well beyond the coffeeshops themselves. The Cannabis College on the Oudezijds Achterburgwal is a free education centre offering information about the plant, Dutch policy and harm reduction. It's worth a visit for context before you dive into the coffeeshop scene.\n\nThe Hash, Marihuana & Hemp Museum on the same street is one of the world's oldest cannabis museums, covering the history of hemp cultivation in the Netherlands and the evolution of the tolerance policy. A small admission fee is charged.\n\nFor accommodation, a number of cannabis-friendly hotels and boutique stays have emerged in recent years, offering rooms where guests can consume in designated areas. Check the XRED EYEZ Amsterdam city guide for current vetted options.\n\nThe annual Cannabis Cup, originally held in Amsterdam, has moved internationally, but the city retains a strong community of cultivators, advocates and cultural events throughout the year. Keep an eye on local listings if you're visiting around November.",
      },
    ],
    relatedCitySlug: "amsterdam",
  },
  {
    slug: "barcelona-cannabis-clubs-guide-2026",
    title: "Barcelona Cannabis Social Clubs 2026",
    subtitle: "How to access Barcelona's private cannabis club scene — the system, the etiquette, and what to expect.",
    cityId: "barcelona",
    city: "Barcelona",
    country: "Spain",
    heroImage: "/cities/barcelona-terrace.png",
    publishedAt: "2026-02-01",
    updatedAt: "2026-06-07",
    readTime: "8 min read",
    tags: ["Barcelona", "Cannabis Clubs", "Spain", "Social Clubs", "Travel Guide"],
    metaTitle: "Barcelona Cannabis Social Clubs Guide 2026 — How to Access & What to Expect | XRED EYEZ",
    metaDescription: "How Barcelona's private cannabis club system works in 2026. Access as a tourist, club etiquette, best areas and insider advice from XRED EYEZ.",
    intro: "Barcelona operates one of the world's most distinctive cannabis cultures — built entirely around private social clubs rather than open shops. The city has an estimated 200–500 cannabis associations operating across its neighbourhoods, each functioning as a private members club. Understanding how this system works is essential before you arrive, because Barcelona's scene is deliberately low-profile and not accessible to walk-in tourists.",
    quickFacts: [
      { label: "Legal basis", value: "Private use and cultivation — decriminalised between consenting adults" },
      { label: "Minimum age", value: "21+ (most clubs)" },
      { label: "Membership", value: "Required — introduced by existing member only" },
      { label: "Street purchase", value: "Illegal and inadvisable" },
      { label: "Club consumption", value: "On-premises only — never leave with product" },
      { label: "Best areas", value: "Eixample, Gràcia, El Raval" },
    ],
    sections: [
      {
        heading: "How Barcelona's cannabis club system works",
        body: "Barcelona's cannabis social clubs operate on a legal grey area rooted in Spain's constitutional right to personal freedom. Cannabis consumption in private spaces between consenting adults is not criminalised. Social clubs interpret this as a legal basis for members to collectively cultivate and consume cannabis on club premises.\n\nEach club is technically a private association — members pay a monthly or annual fee, and the club uses this to cover cultivation costs. Members then receive an allocation of cannabis in return. No money changes hands for the cannabis itself (officially), and none of it leaves the premises. This structure keeps clubs within the tolerance of Spanish law, though it remains legally ambiguous and the situation can change.\n\nCrucially: these are private clubs, not shops. You cannot simply walk in off the street. You must be introduced by an existing member, and clubs take this seriously. Many clubs have closed their doors to tourist-facilitated introductions following increased scrutiny, which means access as a visitor requires genuine connections or trusted intermediaries.",
      },
      {
        heading: "How to get access as a tourist",
        body: "The introduction requirement exists for a reason — clubs are legally protected as private spaces, and any appearance of public retail puts that protection at risk. Access as a tourist in 2026 requires more effort than it did five years ago.\n\nThe most reliable route is through accommodation. Cannabis-friendly hotels and guesthouses in Barcelona often have established relationships with local clubs and can make introductions for verified guests. This is the route XRED EYEZ recommends — it's legitimate, the clubs you access are vetted, and you're protected by the relationship.\n\nTrusted concierge services and cannabis travel specialists can also facilitate access. Be cautious of anyone on the street, near tourist attractions or on unverified apps claiming to offer club access — these are almost always scams or fronts for illegal street dealing.\n\nOnce introduced to a club, you'll typically fill in a membership form with ID and pay a small annual membership fee. Legitimate clubs will not ask for large upfront payments.",
      },
      {
        heading: "What to expect inside a Barcelona cannabis club",
        body: "Barcelona's clubs vary dramatically. At one end you have minimalist, professionally-run social spaces with lounge areas, good sound systems, a proper menu and knowledgeable staff. At the other end are small, private apartment-style spaces with a home-made atmosphere.\n\nThe menu (usually called a 'menu' or shown on a board) lists available strains with basic information on type and effect. Staff can advise on selection. Consumption is typically through joints, which members roll themselves or buy pre-rolled, or through vaporisers. Prices are generally lower than Amsterdam for comparable quality.\n\nClubs often have a bar selling non-alcoholic drinks (some also serve alcohol), snacks, and food in larger operations. The social aspect is genuine — many clubs host events, film nights and community gatherings. They're not just consumption spaces; they're neighbourhood institutions for their members.",
      },
      {
        heading: "Club etiquette",
        body: "The golden rule: never take cannabis out of the club. This single rule protects the legal basis of the entire system. Any member observed leaving with product risks the club's operating licence.\n\nArriving stoned from another venue is generally accepted but arriving visibly intoxicated on alcohol is not — clubs take responsibility for their members' conduct.\n\nMost clubs ask that phones are kept away in the main consumption area, and photography is unwelcome. This protects other members' privacy and the club's integrity.\n\nSpeak with the staff about consumption preferences before selecting — they've seen it all and will steer you toward something appropriate for your tolerance. Don't rush. The club experience is designed to be slow, social and relaxed.",
      },
      {
        heading: "Best neighbourhoods in Barcelona for cannabis culture",
        body: "Eixample — the grid-planned neighbourhood north of the Gothic centre — has the highest concentration of cannabis social clubs in the city. The wide boulevards and mixed residential-commercial character make it easy to move between a club visit, a meal and a bar without any of them being conspicuous. L'Eixample Esquerra (left side of the grid) tends to be slightly more local than the right.\n\nGràcia, the village-within-the-city northeast of Eixample, has a countercultural history that makes it naturally suited to cannabis culture. Clubs here tend to be smaller and more community-focused. The neighbourhood's squares (Plaça del Sol, Plaça de la Vila de Gràcia) are excellent for a meal or drink before a club visit.\n\nEl Raval, the historically rough neighbourhood west of the Ramblas, has evolved into one of Barcelona's most interesting cultural quarters. Several well-regarded clubs operate here, and the surrounding area has excellent independent food and bar options.\n\nAvoid the Gothic Quarter and Barceloneta for cannabis activity — these are peak tourist zones with high police visibility and the clubs operating there tend to be less careful about vetting members.",
      },
      {
        heading: "Staying safe in Barcelona's cannabis scene",
        body: "Barcelona's cannabis scene has genuine quality depth for well-connected visitors, but the risks are also real. Street dealers operating in tourist areas (particularly around the Ramblas and Barceloneta) sell adulterated product and are known to operate in scam networks. Avoid all street offers entirely.\n\nBe aware that police enforcement of street cannabis activity has increased in recent years. Possession of small amounts is a civil offence punishable by a fine, not a criminal one — but confiscation is routine and fines can be significant.\n\nThe clubs themselves are safe if accessed through legitimate channels. Staff are professionals, the environment is controlled, and the product is tested. Stick to verified access routes and you'll have an excellent experience.",
      },
    ],
    relatedCitySlug: "barcelona",
  },
  {
    slug: "prague-cannabis-guide-2026",
    title: "Prague Cannabis Guide 2026",
    subtitle: "Czech Republic's evolving cannabis scene — decriminalisation, social clubs and what travellers need to know.",
    cityId: "prague",
    city: "Prague",
    country: "Czech Republic",
    heroImage: "/cities/czech-prague.png",
    publishedAt: "2026-03-10",
    updatedAt: "2026-06-07",
    readTime: "7 min read",
    tags: ["Prague", "Czech Republic", "Cannabis", "Decriminalisation", "Travel Guide"],
    metaTitle: "Prague Cannabis Guide 2026 — Laws, Social Clubs & Traveller Tips | XRED EYEZ",
    metaDescription: "The complete Prague cannabis travel guide for 2026. Czech Republic cannabis laws, social clubs, best areas and traveller advice from XRED EYEZ.",
    intro: "Prague occupies a fascinating position in European cannabis culture. The Czech Republic has some of the most progressive cannabis policies on the continent — personal possession has been decriminalised for years, home cultivation is now legal up to defined limits, and a regulated cannabis market is actively being developed. For travellers, Prague is a city where the scene is real, the culture is genuine, and the pace is exactly right.",
    quickFacts: [
      { label: "Possession limit", value: "Up to 10g decriminalised (civil offence only)" },
      { label: "Home cultivation", value: "Up to 2 plants legal (2026)" },
      { label: "Social clubs", value: "Operating in legal grey area — growing scene" },
      { label: "Minimum age", value: "18+ (clubs)" },
      { label: "Best areas", value: "Žižkov, Vinohrady, Holešovice" },
      { label: "CBD shops", value: "Widespread and legal — used as access point by many" },
    ],
    sections: [
      {
        heading: "The legal landscape in 2026",
        body: "Czech Republic has had one of Europe's most tolerant cannabis policies for over a decade. Personal possession of up to 10 grams is a civil offence carrying a fine of up to 15,000 CZK — not a criminal charge and not a record. In practice, police in Prague rarely enforce even this, particularly in areas with an established cannabis culture.\n\nHome cultivation of up to two plants became legal in 2025 following a parliamentary vote, making the Czech Republic one of a small number of European countries where personal growing is explicitly permitted. This has given the emerging social club scene a more solid legal foundation than Barcelona's clubs — members can legitimately contribute home-grown cannabis to a collective.\n\nA full regulatory framework for cannabis retail is under active parliamentary discussion and is expected to pass in some form before 2027. Prague may well join Amsterdam as a city with genuine, licensed cannabis commerce within the next few years. The XRED EYEZ guide will be updated as this develops.",
      },
      {
        heading: "Prague's cannabis social clubs",
        body: "Following the Barcelona model, a network of cannabis social clubs has grown in Prague over the past several years. These operate on the same private-association basis — members collectively cultivate and share cannabis on club premises, framed as a private activity between consenting adults.\n\nThe Prague club scene is younger and smaller than Barcelona's, and quality varies considerably. The better-established clubs in Žižkov and Vinohrady are well-organised, with proper menus, tested product and a genuine community atmosphere. Some newer clubs are less consistent.\n\nAccess follows the same introduction model as Barcelona. The XRED EYEZ Prague city guide lists vetted clubs with information on how to get access. As with all private club scenes, walk-in access is not possible and any service claiming to offer immediate tourist access without a proper introduction process should be treated with caution.",
      },
      {
        heading: "CBD shops as a starting point",
        body: "Prague has an unusually high density of CBD shops — perhaps higher than any other European city. These are fully legal retail businesses selling CBD flower, oils, edibles and related products. They're openly signed, easily found and a legitimate part of the cannabis culture landscape.\n\nFor many travellers, CBD shops are the first point of contact with the scene. Staff at the better shops are knowledgeable, speak English, and can often provide introductions to cannabis social clubs for visitors who are clear about what they're looking for. This is one of the more reliable access routes for tourists.\n\nCBD flower sold in these shops can be remarkably high quality — Czech cultivation standards are strong — and for travellers who prefer a non-intoxicating cannabis experience, Prague's CBD shops represent excellent value.",
      },
      {
        heading: "Best neighbourhoods for cannabis culture",
        body: "Žižkov is Prague's most storied bohemian neighbourhood — hilly, slightly rough around the edges, full of pubs and independently-minded residents. It has the highest concentration of cannabis social clubs in the city and a cultural atmosphere that makes the whole scene feel natural rather than touristy. The neighbourhood's famous pub culture means you can move seamlessly between a bar and a club visit.\n\nVinohrady, directly adjacent to Žižkov, has a more refined character — tree-lined streets, art nouveau apartment buildings, upmarket restaurants. The clubs here tend to be better-fitted and more establishment-friendly. It's an excellent base for a longer stay in Prague.\n\nHolešovice, north of the centre, is Prague's emerging creative quarter. A former industrial area now full of galleries, studios and independent venues, it has an authentically countercultural atmosphere and a growing number of cannabis-friendly venues.\n\nAvoid the historic centre (Prague 1) for anything cannabis-related — it's heavily policed and any activity there attracts immediate attention.",
      },
      {
        heading: "Practical advice for visiting Prague",
        body: "Prague is one of Europe's most affordable major cities, and the cannabis experience here reflects that. Quality is high and prices are lower than Amsterdam or Barcelona for comparable product.\n\nThe city is walkable and extremely well-served by tram and metro. Žižkov and Vinohrady are 15–20 minutes from the centre on foot or a short tram ride. The transport runs late, which suits the evening-oriented cannabis club scene.\n\nEnglish is widely spoken in the social clubs and CBD shops. Czech is worth a basic attempt — even a few words of greeting goes a long way in a local club atmosphere.\n\nBring cash. Prague's club scene runs almost entirely on cash transactions, and while the city has plenty of ATMs, using a local bank ATM (avoiding tourist exchange booths) gives significantly better rates.\n\nWeather matters: Prague winters are cold and the city is at its best from April to October. The outdoor terrace culture that makes the city so enjoyable in summer disappears in winter — factor this into your planning if a relaxed outdoor cannabis culture experience matters to you.",
      },
      {
        heading: "What's coming next in Prague",
        body: "Prague is one of the most interesting cannabis markets to watch in Europe right now. The combination of progressive legislation, a growing social club infrastructure, high-quality domestic cultivation and a city already attracting international cannabis tourists creates the conditions for a scene that could rival Amsterdam within five years.\n\nXRED EYEZ will continue to expand its Prague coverage as the market develops, including new venue listings, neighbourhood guides and regulatory updates. If you're planning a trip and want current intel, the XRED EYEZ Prague city guide has the most up-to-date information on what's open and accessible.",
      },
    ],
    relatedCitySlug: "prague",
  },
  {
    slug: "tenerife-cannabis-guide-2026",
    title: "Tenerife Cannabis Guide 2026",
    subtitle: "Spain's best-kept cannabis secret — sun, social clubs and year-round season in the Canary Islands.",
    cityId: "tenerife",
    city: "Tenerife",
    country: "Spain",
    heroImage: "/cities/tenerife-sunrise.png",
    publishedAt: "2026-04-20",
    updatedAt: "2026-06-07",
    readTime: "7 min read",
    tags: ["Tenerife", "Canary Islands", "Spain", "Cannabis", "Social Clubs", "Travel Guide"],
    metaTitle: "Tenerife Cannabis Guide 2026 — Social Clubs, Laws & Traveller Tips | XRED EYEZ",
    metaDescription: "Cannabis in Tenerife 2026 — how social clubs work on the island, where to go, etiquette and insider advice from XRED EYEZ.",
    intro: "Tenerife is the Canary Islands' largest and most visited island, and it hosts one of Spain's most developed cannabis social club scenes outside of Barcelona. With year-round warm weather, a mature international tourism infrastructure and a growing network of vetted clubs, Tenerife has quietly become one of the best cannabis culture destinations in Southern Europe. Few travel guides talk about it — which is exactly how the local scene prefers it.",
    quickFacts: [
      { label: "Legal basis", value: "Same as mainland Spain — private adult consumption" },
      { label: "Club membership", value: "Required — introduction via member" },
      { label: "Best areas", value: "Santa Cruz, Puerto de la Cruz, Costa Adeje" },
      { label: "Season", value: "Year-round (average 22–28°C)" },
      { label: "Minimum age", value: "21+ most clubs" },
      { label: "Street purchase", value: "Illegal — avoid" },
    ],
    sections: [
      {
        heading: "Why Tenerife has a serious cannabis scene",
        body: "Tenerife benefits from the same legal framework as mainland Spain — cannabis consumption in private adult spaces is not criminalised — but adds several factors that make its scene distinct. The island receives over 6 million tourists annually, many from Northern Europe where cannabis culture is well-established. This has created demand that local clubs have met with genuine quality.\n\nThe year-round warm climate also plays a role. Unlike most European cannabis destinations where the scene is compressed into summer months, Tenerife operates at the same pace in December as it does in July. Outdoor terrace culture, rooftop social spaces and garden-facing club premises make the consumption experience significantly more pleasant than most Northern European alternatives.\n\nThe island also has lower operating costs than Barcelona or Madrid, which means better-value memberships and consistently high-quality product for the price.",
      },
      {
        heading: "How to access Tenerife's clubs",
        body: "The access model mirrors mainland Spain — introduction by an existing member is required. Tenerife's tourist-heavy economy means that cannabis-friendly accommodation is more developed here than in Barcelona, and hotel introductions are the most reliable access route for first-time visitors.\n\nSeveral cannabis-friendly boutique hotels and villa rentals in the south (Costa Adeje, Los Cristianos) and north (Puerto de la Cruz) of the island maintain established relationships with local clubs. Book with verified cannabis-friendly accommodation and the introduction process is handled for you.\n\nThe XRED EYEZ Tenerife guide lists current vetted properties. Avoid any service that claims to offer walk-in club access — the better clubs don't operate this way.",
      },
      {
        heading: "Best areas in Tenerife for cannabis culture",
        body: "Santa Cruz de Tenerife, the island's capital in the northeast, has the most established and locally-rooted club scene. Clubs here tend to cater more to residents than tourists, which means better quality control and lower prices, but also stricter introduction requirements. If you have a local connection, Santa Cruz clubs are excellent.\n\nPuerto de la Cruz in the north is the island's most relaxed resort town — a step back from the mass tourism of the south. The cannabis scene here is smaller but well-regarded, and the town's general atmosphere of unhurried outdoor living suits the cannabis culture experience perfectly.\n\nCosta Adeje and Los Cristianos in the south see the most international tourist traffic and have the most visitor-accessible clubs. Quality has improved significantly in recent years as the better operators have professionalized their offer. The proximity to beaches and outdoor spaces makes for a complete experience.",
      },
      {
        heading: "Beyond the clubs: Tenerife's cannabis-friendly lifestyle",
        body: "What makes Tenerife exceptional for cannabis culture travel isn't just the clubs — it's the backdrop. The island has extraordinary natural environments: the volcanic landscape around Teide, ancient laurisilva forest in the Anaga mountains, black sand beaches and dramatic cliff coastline. These are exceptional settings for a post-session walk or hike.\n\nThe food scene, especially in Santa Cruz and the north, is outstanding by Spanish standards. Canarian cuisine — papas arrugadas, mojo, fresh seafood — pairs exceptionally well with a relaxed cannabis afternoon. The island's wines, produced on volcanic soil, are genuinely distinctive and worth exploring.\n\nYear-round outdoor dining, rooftop bars and a culture that genuinely values leisure over productivity make Tenerife one of the most comfortable cannabis culture destinations in the world. It rewards a slower pace.",
      },
    ],
    relatedCitySlug: "tenerife",
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find(g => g.slug === slug);
}
