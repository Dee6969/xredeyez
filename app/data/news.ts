import { XMLParser } from "fast-xml-parser";

export interface CannabisSignal {
  slug: string;
  title: string;
  originalTitle: string;
  source: string;
  url: string;
  publishedAt: string;
  summary: string;
  category: string;
  article: {
    kicker: string;
    intro: string;
    sections: {
      heading: string;
      body: string;
    }[];
    sourceNote: string;
  };
}

interface FeedSource {
  source: string;
  category: string;
  url: string;
  keywords?: string[];
}

const enforcementKeywords = [
  "cannabis",
  "marijuana",
  "hemp",
  "drug",
  "drugs",
  "drug haul",
  "seized",
  "seize",
  "seizure",
  "border force",
  "customs",
  "smuggle",
  "smuggling",
  "trafficking",
  "organised crime",
  "organized crime",
  "cocaine",
  "heroin",
  "ketamine",
  "class b",
];

const feeds: FeedSource[] = [
  {
    source: "Marijuana Moment",
    category: "Policy",
    url: "https://www.marijuanamoment.net/feed/",
  },
  {
    source: "Ganjapreneur",
    category: "Industry",
    url: "https://www.ganjapreneur.com/feed/",
  },
  {
    source: "Cannabis Business Times",
    category: "Market",
    url: "https://www.cannabisbusinesstimes.com/rss/",
  },
  {
    source: "MJBizDaily",
    category: "Business",
    url: "https://mjbizdaily.com/feed/",
  },
  {
    source: "Sky News UK",
    category: "Enforcement",
    url: "https://feeds.skynews.com/feeds/rss/uk.xml",
    keywords: enforcementKeywords,
  },
  {
    source: "Sky News World",
    category: "Enforcement",
    url: "https://feeds.skynews.com/feeds/rss/world.xml",
    keywords: enforcementKeywords,
  },
  {
    source: "BBC News UK",
    category: "Enforcement",
    url: "https://feeds.bbci.co.uk/news/uk/rss.xml",
    keywords: enforcementKeywords,
  },
  {
    source: "BBC News World",
    category: "Enforcement",
    url: "https://feeds.bbci.co.uk/news/world/rss.xml",
    keywords: enforcementKeywords,
  },
  {
    source: "Global Enforcement Wire",
    category: "Enforcement",
    url: "https://news.google.com/rss/search?q=%28cannabis%20OR%20marijuana%20OR%20drugs%29%20%28seized%20OR%20seizure%20OR%20haul%20OR%20smuggling%20OR%20trafficking%20OR%20port%29&hl=en-GB&gl=GB&ceid=GB:en",
    keywords: enforcementKeywords,
  },
];

const parser = new XMLParser({
  ignoreAttributes: false,
  removeNSPrefix: true,
});

function toArray<T>(value: T | T[] | undefined): T[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function stripHtml(value: unknown) {
  return String(value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([a-fA-F0-9]+);/g, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 82);
}

function hashValue(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash).toString(36).slice(0, 6);
}

function makeSlug(title: string, url: string) {
  const base = slugify(title) || "global-cannabis-signal";
  return `${base}-${hashValue(url)}`;
}

function removeSourceSuffix(title: string) {
  return title.replace(/\s+-\s+[^-]+$/g, "").trim();
}

function makeEditorialTitle(title: string, category: string) {
  const cleanTitle = removeSourceSuffix(stripHtml(title));

  if (category === "Enforcement") {
    return `What This Enforcement Signal Says About The Shadow Cannabis Market`;
  }
  if (category === "Policy") {
    return `Policy Signal: ${cleanTitle}`;
  }
  if (category === "Market" || category === "Business") {
    return `Market Signal: ${cleanTitle}`;
  }
  return `Culture Signal: ${cleanTitle}`;
}

function makeSignal(title: string, description: string, category: string) {
  const cleanTitle = stripHtml(title);
  const cleanDescription = stripHtml(description);
  const base = cleanDescription || cleanTitle;
  const trimmed = base.length > 180 ? `${base.slice(0, 177).trim()}...` : base;

  if (category === "Policy") {
    return `Policy watch: ${trimmed}`;
  }
  if (category === "Market" || category === "Business") {
    return `Market signal: ${trimmed}`;
  }
  if (category === "Enforcement") {
    return `Enforcement signal: ${trimmed}`;
  }
  return `Culture signal: ${trimmed}`;
}

function makeArticle(title: string, description: string, category: string, source: string) {
  const cleanTitle = removeSourceSuffix(stripHtml(title));
  const cleanDescription = stripHtml(description);
  const context = cleanDescription || cleanTitle;

  if (category === "Enforcement") {
    return {
      kicker: "ENFORCEMENT WATCH",
      intro: `${cleanTitle} is the kind of signal that shows why cannabis culture cannot be separated from law, logistics, borders, and public perception. X Red Eyez tracks these stories because the legal market and the shadow market are still being understood side by side.`,
      sections: [
        {
          heading: "Why it matters",
          body: `Stories involving seizures, ports, airports, trafficking routes, and organised supply chains shape how the wider public talks about cannabis. For a lifestyle brand, the important move is to stay clear-eyed: celebrate culture, wellness, and responsible access while understanding the forces still operating around prohibition and enforcement.`,
        },
        {
          heading: "The X Red Eyez read",
          body: `This is not just crime news. It is a market signal. Every enforcement story reveals pressure points in supply, demand, border control, and regulation. The more mature the legal conversation becomes, the more clearly the industry can separate premium, transparent cannabis culture from the noise around illicit trade.`,
        },
        {
          heading: "What to watch next",
          body: `Watch for whether the story develops into arrests, charges, sentencing, policy debate, or further seizures. These follow-ups often show where governments are focusing attention and how quickly cannabis-adjacent regulation is changing across regions.`,
        },
      ],
      sourceNote: `This X Red Eyez signal is original commentary based on a developing report first surfaced via ${source}. Source context: ${context}`,
    };
  }

  if (category === "Policy") {
    return {
      kicker: "POLICY WATCH",
      intro: `${cleanTitle} matters because cannabis policy is not abstract. It decides who gets access, who gets punished, who gets to build, and how quickly the culture can move from stigma into legitimacy.`,
      sections: [
        {
          heading: "Why it matters",
          body: `Policy is the architecture around the plant. Licensing, medical access, hemp rules, employment protections, and criminal reform all decide whether cannabis becomes a trusted wellness and lifestyle category or remains trapped in contradiction.`,
        },
        {
          heading: "The X Red Eyez read",
          body: `For X Red Eyez, the strongest brands will be the ones that understand the law without becoming boring because of it. Culture needs freedom, but long-term trust needs structure. The future belongs to brands that can hold both ideas at once.`,
        },
        {
          heading: "What to watch next",
          body: `Look for the next vote, agency guidance, court decision, regulator statement, or business reaction. Policy stories usually move in waves, and each wave changes the room for consumers, operators, and communities.`,
        },
      ],
      sourceNote: `This X Red Eyez signal is original commentary based on reporting first surfaced via ${source}. Source context: ${context}`,
    };
  }

  if (category === "Market" || category === "Business" || category === "Industry") {
    return {
      kicker: "MARKET SIGNAL",
      intro: `${cleanTitle} points to the business side of cannabis: how products mature, how operators survive, and how consumer trust is earned in a category that is still finding its premium language.`,
      sections: [
        {
          heading: "Why it matters",
          body: `The cannabis market is becoming more selective. Consumers are learning to read quality, origin, formulation, transparency, and brand behaviour. The companies that win will not simply sell more products; they will make people feel safer, sharper, healthier, and more connected to the culture.`,
        },
        {
          heading: "The X Red Eyez read",
          body: `This is the lane where lifestyle, wellness, genetics, retail, and design start speaking the same language. A serious cannabis brand has to understand the market without losing the feeling that made people care in the first place.`,
        },
        {
          heading: "What to watch next",
          body: `Watch how consumers respond, how regulators react, and whether the story creates new standards around access, education, product quality, or community. Those signals are where future drops and future loyalty are built.`,
        },
      ],
      sourceNote: `This X Red Eyez signal is original commentary based on reporting first surfaced via ${source}. Source context: ${context}`,
    };
  }

  return {
    kicker: "CULTURE SIGNAL",
    intro: `${cleanTitle} is part of the wider cannabis lifestyle conversation: the rituals, attitudes, spaces, and ideas shaping how the plant appears in modern life.`,
    sections: [
      {
        heading: "Why it matters",
        body: `Culture is what turns a product into a movement. The cannabis brands that last will be the ones that understand taste, wellness, music, design, community, and the quiet codes people use to recognise one another.`,
      },
      {
        heading: "The X Red Eyez read",
        body: `The opportunity is not to shout louder. It is to build a world people want to enter. Every cultural signal helps define what cannabis can feel like when it is premium, considered, and emotionally intelligent.`,
      },
      {
        heading: "What to watch next",
        body: `Watch how the story travels across communities, retail, wellness, fashion, nightlife, and digital spaces. That movement is often where tomorrow's product language begins.`,
      },
    ],
    sourceNote: `This X Red Eyez signal is original commentary based on reporting first surfaced via ${source}. Source context: ${context}`,
  };
}

function getItemDate(item: Record<string, unknown>) {
  const raw = item.pubDate || item.published || item.updated || item.date || "";
  const date = new Date(String(raw));
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

function matchesFeedKeywords(feed: FeedSource, title: string, description: string) {
  if (!feed.keywords?.length) return true;
  const haystack = `${title} ${description}`.toLowerCase();
  return feed.keywords.some((keyword) => haystack.includes(keyword));
}

async function readFeed(feed: FeedSource) {
  const response = await fetch(feed.url, {
    next: { revalidate: 60 * 60 * 24 },
    headers: {
      "User-Agent": "XRED-EYEZ-News-Signals/1.0",
    },
  });

  if (!response.ok) return [];

  const xml = await response.text();
  const parsed = parser.parse(xml);
  const channel = parsed?.rss?.channel || parsed?.feed;
  const items = toArray<Record<string, unknown>>(channel?.item || channel?.entry).slice(0, 6);

  return items
    .map((item) => {
      const title = stripHtml(item.title);
      const linkValue = item.link;
      const url =
        typeof linkValue === "string"
          ? linkValue
          : Array.isArray(linkValue)
            ? String(linkValue[0]?.["@_href"] || linkValue[0] || "")
            : String((linkValue as Record<string, unknown> | undefined)?.["@_href"] || "");

      if (!title || !url) return null;

      const description = stripHtml(item.description || item.summary || item.encoded);

      if (!matchesFeedKeywords(feed, title, description)) return null;

      return {
        slug: makeSlug(title, url),
        title: makeEditorialTitle(title, feed.category),
        originalTitle: title,
        source: feed.source,
        url,
        publishedAt: getItemDate(item),
        summary: makeSignal(title, description, feed.category),
        category: feed.category,
        article: makeArticle(title, description, feed.category, feed.source),
      };
    })
    .filter(Boolean) as CannabisSignal[];
}

function balanceSignals(signals: CannabisSignal[], limit: number) {
  const categoryCap = Math.max(3, Math.ceil(limit / 3));
  const categoryCounts = new Map<string, number>();
  const selected: CannabisSignal[] = [];
  const overflow: CannabisSignal[] = [];

  for (const signal of signals) {
    const categoryCount = categoryCounts.get(signal.category) || 0;

    if (categoryCount < categoryCap) {
      selected.push(signal);
      categoryCounts.set(signal.category, categoryCount + 1);
    } else {
      overflow.push(signal);
    }
  }

  return [...selected, ...overflow].slice(0, limit);
}

export async function getCannabisSignals(limit = 12) {
  const results = await Promise.allSettled(feeds.map(readFeed));
  const signals = results
    .flatMap((result) => (result.status === "fulfilled" ? result.value : []))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return balanceSignals(signals, limit);
}

export async function getCannabisSignalBySlug(slug: string) {
  const signals = await getCannabisSignals(48);
  return signals.find((signal) => signal.slug === slug);
}
