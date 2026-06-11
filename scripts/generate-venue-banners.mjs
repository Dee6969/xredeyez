#!/usr/bin/env node
// Generates per-venue SVG banners for premium/featured venues missing bannerUrl.
// Reads /tmp/venues-need-banner.txt produced by audit awk script,
// emits public/venues/{slug}-banner.svg + outputs patch lines for platform.ts.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(process.cwd());
const SRC = join(ROOT, "scripts", "venues-need-banner.txt");
const OUT_DIR = join(ROOT, "public", "venues");

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

const VENUES = readFileSync(SRC, "utf8")
  .split("\n")
  .filter(Boolean)
  .map((line) => {
    const [slug, cityId, city, tier, weight, layer, type, nbhd, name, color, accent, aesthetic, tagline, logoText, year] = line.split("|");
    return { slug, cityId, city, tier, weight, layer, type, nbhd, name, color: color || "#18160F", accent: accent || "#84C51F", aesthetic: aesthetic || "dark", tagline, logoText: logoText || name, year };
  });

const ESC = (s) => (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const darken = (hex, pct) => {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, ((n >> 16) & 0xff) * (1 - pct));
  const g = Math.max(0, ((n >> 8) & 0xff) * (1 - pct));
  const b = Math.max(0, (n & 0xff) * (1 - pct));
  return "#" + [r, g, b].map((c) => Math.round(c).toString(16).padStart(2, "0")).join("");
};

const lighten = (hex, pct) => {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.min(255, ((n >> 16) & 0xff) + 255 * pct);
  const g = Math.min(255, ((n >> 8) & 0xff) + 255 * pct);
  const b = Math.min(255, (n & 0xff) + 255 * pct);
  return "#" + [r, g, b].map((c) => Math.round(c).toString(16).padStart(2, "0")).join("");
};

// ── Scene generators per layer ──────────────────────────────────────────────
function canalHouses(accent) {
  let svg = "<g opacity=\"0.42\">";
  const houses = [
    { x: 780, w: 78, h: 280, c: 1 },
    { x: 866, w: 70, h: 220, c: 0.85 },
    { x: 946, w: 90, h: 300, c: 1.1 },
    { x: 1046, w: 75, h: 240, c: 0.95 },
    { x: 1131, w: 68, h: 210, c: 0.85 },
    { x: 1209, w: 82, h: 240, c: 1 },
    { x: 1301, w: 90, h: 270, c: 1.1 },
    { x: 1401, w: 80, h: 230, c: 0.95 },
  ];
  for (const h of houses) {
    const top = 700 - h.h;
    const peak = top - 60;
    const shade = darken(accent, 1 - h.c * 0.15);
    svg += `<rect x="${h.x}" y="${top}" width="${h.w}" height="${h.h}" fill="${shade}" opacity="0.5"/>`;
    svg += `<polygon points="${h.x},${top} ${h.x + h.w / 2},${peak} ${h.x + h.w},${top}" fill="${shade}" opacity="0.5"/>`;
    // windows
    for (let row = 0; row < Math.floor(h.h / 50); row++) {
      const y = top + 16 + row * 50;
      svg += `<rect x="${h.x + 8}" y="${y}" width="${(h.w - 24) / 2}" height="28" fill="${accent}" opacity="${0.12 + (row % 3) * 0.05}"/>`;
      svg += `<rect x="${h.x + h.w / 2 + 4}" y="${y}" width="${(h.w - 24) / 2}" height="28" fill="${accent}" opacity="${0.18 + ((row + 1) % 3) * 0.04}"/>`;
    }
    // door
    svg += `<rect x="${h.x + h.w / 2 - 14}" y="${top + h.h - 56}" width="28" height="52" fill="${accent}" opacity="0.16"/>`;
  }
  // canal water
  svg += `<rect x="780" y="700" width="800" height="76" fill="#000" opacity="0.5"/>`;
  svg += `<line x1="800" y1="722" x2="1570" y2="722" stroke="${accent}" stroke-width="0.8" opacity="0.14"/>`;
  svg += `<line x1="840" y1="744" x2="1530" y2="744" stroke="${accent}" stroke-width="0.6" opacity="0.10"/>`;
  svg += "</g>";
  return svg;
}

function urbanTowers(accent) {
  let svg = "<g opacity=\"0.5\">";
  const towers = [
    { x: 790, w: 110, h: 480, opacity: 1 },
    { x: 920, w: 90, h: 380, opacity: 0.85 },
    { x: 1030, w: 140, h: 580, opacity: 1.1 },
    { x: 1190, w: 100, h: 420, opacity: 0.9 },
    { x: 1310, w: 130, h: 540, opacity: 1.05 },
    { x: 1460, w: 100, h: 440, opacity: 0.85 },
  ];
  for (const t of towers) {
    const top = 760 - t.h;
    const shade = darken(accent, 1 - t.opacity * 0.18);
    svg += `<rect x="${t.x}" y="${top}" width="${t.w}" height="${t.h}" fill="${shade}" opacity="0.55"/>`;
    // window grid
    const cols = Math.floor((t.w - 16) / 22);
    const rows = Math.floor((t.h - 30) / 32);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const lit = ((r * 7 + c * 3) % 5) < 2;
        if (!lit) continue;
        svg += `<rect x="${t.x + 8 + c * 22}" y="${top + 16 + r * 32}" width="14" height="20" fill="${accent}" opacity="${0.18 + (r % 3) * 0.06}"/>`;
      }
    }
  }
  svg += "</g>";
  return svg;
}

function palmsBeach(accent) {
  let svg = "<g opacity=\"0.42\">";
  // sea horizon
  svg += `<rect x="700" y="540" width="900" height="220" fill="#000" opacity="0.4"/>`;
  // palms
  const palms = [
    { x: 800, h: 240 },
    { x: 980, h: 280 },
    { x: 1180, h: 220 },
    { x: 1370, h: 260 },
    { x: 1520, h: 200 },
  ];
  for (const p of palms) {
    const trunkTop = 540 - p.h;
    // trunk (curved)
    svg += `<path d="M${p.x},540 Q${p.x - 12},${540 - p.h / 2} ${p.x + 6},${trunkTop}" stroke="${darken(accent, 0.5)}" stroke-width="6" fill="none" opacity="0.6"/>`;
    // fronds
    for (let i = 0; i < 7; i++) {
      const angle = -90 + i * 30;
      const rad = (angle * Math.PI) / 180;
      const fx = p.x + 6 + Math.cos(rad) * 70;
      const fy = trunkTop + Math.sin(rad) * 50;
      svg += `<path d="M${p.x + 6},${trunkTop} Q${(p.x + 6 + fx) / 2 + 6},${(trunkTop + fy) / 2 - 14} ${fx},${fy}" stroke="${accent}" stroke-width="3" fill="none" opacity="0.5"/>`;
    }
    // ground
    svg += `<ellipse cx="${p.x + 6}" cy="544" rx="22" ry="4" fill="#000" opacity="0.3"/>`;
  }
  svg += "</g>";
  return svg;
}

function neonStrip(accent) {
  let svg = "<g opacity=\"0.6\">";
  // strip outline
  svg += `<rect x="760" y="280" width="820" height="380" fill="${darken(accent, 0.85)}" opacity="0.3"/>`;
  // neon vertical bars
  for (let i = 0; i < 14; i++) {
    const x = 780 + i * 58;
    const h = 100 + (i * 17) % 220;
    svg += `<rect x="${x}" y="${300 + ((i * 13) % 80)}" width="6" height="${h}" fill="${accent}" opacity="${0.4 + (i % 3) * 0.18}"/>`;
    svg += `<rect x="${x - 2}" y="${300 + ((i * 13) % 80)}" width="10" height="${h}" fill="${accent}" opacity="0.12" filter="blur(2px)"/>`;
  }
  // horizon glow
  svg += `<ellipse cx="1170" cy="680" rx="420" ry="40" fill="${accent}" opacity="0.18"/>`;
  svg += "</g>";
  return svg;
}

function cannabisLeaf(accent) {
  let svg = "<g opacity=\"0.32\" transform=\"translate(1180, 450) scale(2.4)\">";
  // 7-point leaf
  const angles = [-90, -60, -30, 0, 30, 60, 90];
  for (const a of angles) {
    const rad = (a * Math.PI) / 180;
    const len = a === 0 ? 110 : a === -90 || a === 90 ? 60 : 88;
    const x2 = Math.cos(rad) * len;
    const y2 = Math.sin(rad) * len;
    svg += `<path d="M0,0 Q${x2 * 0.4 + Math.sin(rad) * 14},${y2 * 0.4 - Math.cos(rad) * 14} ${x2},${y2} Q${x2 * 0.4 - Math.sin(rad) * 14},${y2 * 0.4 + Math.cos(rad) * 14} 0,0 Z" fill="${accent}" opacity="0.55"/>`;
    // serration
    svg += `<line x1="0" y1="0" x2="${x2}" y2="${y2}" stroke="${darken(accent, 0.4)}" stroke-width="1" opacity="0.4"/>`;
  }
  svg += `<circle cx="0" cy="0" r="6" fill="${accent}" opacity="0.7"/>`;
  svg += "</g>";
  return svg;
}

function tableSettings(accent) {
  let svg = "<g opacity=\"0.45\">";
  // tabletop
  svg += `<rect x="700" y="540" width="900" height="220" fill="${darken(accent, 0.7)}" opacity="0.45"/>`;
  svg += `<line x1="700" y1="540" x2="1600" y2="540" stroke="${accent}" stroke-width="1" opacity="0.4"/>`;
  // 3 plate settings
  for (let i = 0; i < 3; i++) {
    const cx = 880 + i * 260;
    const cy = 640;
    // plate ring
    svg += `<circle cx="${cx}" cy="${cy}" r="78" fill="none" stroke="${accent}" stroke-width="1.5" opacity="0.7"/>`;
    svg += `<circle cx="${cx}" cy="${cy}" r="58" fill="none" stroke="${accent}" stroke-width="1" opacity="0.5"/>`;
    // fork
    svg += `<rect x="${cx - 110}" y="${cy - 36}" width="3" height="72" fill="${accent}" opacity="0.55"/>`;
    // knife
    svg += `<rect x="${cx + 108}" y="${cy - 36}" width="3" height="72" fill="${accent}" opacity="0.55"/>`;
    // glass
    svg += `<path d="M${cx - 26},${cy - 110} L${cx + 26},${cy - 110} L${cx + 18},${cy - 60} L${cx - 18},${cy - 60} Z" fill="none" stroke="${accent}" stroke-width="1" opacity="0.5"/>`;
    svg += `<rect x="${cx - 3}" y="${cy - 60}" width="6" height="18" fill="${accent}" opacity="0.4"/>`;
  }
  svg += "</g>";
  return svg;
}

function mountainScape(accent) {
  let svg = "<g opacity=\"0.46\">";
  svg += `<polygon points="700,640 880,420 1020,540 1180,360 1340,500 1500,400 1600,520 1600,760 700,760" fill="${darken(accent, 0.55)}" opacity="0.6"/>`;
  svg += `<polygon points="700,720 900,540 1080,640 1240,500 1420,620 1600,560 1600,760 700,760" fill="${darken(accent, 0.35)}" opacity="0.55"/>`;
  // moon/sun
  svg += `<circle cx="1380" cy="280" r="48" fill="${accent}" opacity="0.45"/>`;
  svg += `<circle cx="1380" cy="280" r="68" fill="${accent}" opacity="0.18"/>`;
  svg += "</g>";
  return svg;
}

function abstractGrid(accent) {
  let svg = "<g opacity=\"0.36\">";
  // concentric arcs
  for (let i = 0; i < 6; i++) {
    svg += `<circle cx="1240" cy="500" r="${100 + i * 70}" fill="none" stroke="${accent}" stroke-width="1" opacity="${0.5 - i * 0.06}"/>`;
  }
  // diagonal beams
  for (let i = 0; i < 5; i++) {
    svg += `<line x1="${800 + i * 60}" y1="200" x2="${1100 + i * 90}" y2="800" stroke="${accent}" stroke-width="0.8" opacity="0.18"/>`;
  }
  svg += `<rect x="780" y="320" width="2" height="360" fill="${accent}" opacity="0.5"/>`;
  svg += `<rect x="1620" y="220" width="2" height="500" fill="${accent}" opacity="0.4"/>`;
  svg += "</g>";
  return svg;
}

// ── Scene picker ─────────────────────────────────────────────────────────────
function pickScene(v) {
  const city = (v.cityId || "").toLowerCase();
  const layer = (v.layer || "").toLowerCase();
  const type = (v.type || "").toLowerCase();

  if (city === "amsterdam" || city === "den-haag" || city === "rotterdam") return canalHouses(v.accent);
  if (city === "usa" && /vegas|las-vegas/.test(v.slug)) return neonStrip(v.accent);
  if (city === "usa" && /miami/.test(v.slug)) return palmsBeach(v.accent);
  if (city === "marbella" || city === "tenerife") return palmsBeach(v.accent);
  if (city === "thailand") return /chiang|samui|phangan|tao|phuket/.test(v.slug) ? palmsBeach(v.accent) : neonStrip(v.accent);
  if (city === "south-africa") return mountainScape(v.accent);
  if (city === "canada") return urbanTowers(v.accent);
  if (city === "germany" || city === "czech-republic") return urbanTowers(v.accent);
  if (city === "barcelona") {
    if (layer === "stay") return urbanTowers(v.accent);
    if (layer === "eat") return tableSettings(v.accent);
    return abstractGrid(v.accent);
  }
  // USA fallback
  if (city === "usa") {
    if (layer === "stay") return urbanTowers(v.accent);
    if (layer === "eat") return tableSettings(v.accent);
    if (layer === "cannabis") return cannabisLeaf(v.accent);
    return urbanTowers(v.accent);
  }
  // Generic per layer
  if (layer === "cannabis" || /coffeeshop|dispensary|cannabis/.test(type)) return cannabisLeaf(v.accent);
  if (layer === "eat" || /restaurant|café|cafe|brunch|dining/.test(type)) return tableSettings(v.accent);
  if (layer === "stay" || /hotel|hostel|apartment/.test(type)) return urbanTowers(v.accent);
  return abstractGrid(v.accent);
}

// ── SVG builder ─────────────────────────────────────────────────────────────
function buildSvg(v) {
  const bgStart = v.color || "#18160F";
  const bgEnd = darken(bgStart, 0.25);
  const accent = v.accent || "#84C51F";
  const headline = (v.logoText || v.name || "").toUpperCase();
  // split headline into max 2 lines
  const words = headline.split(/\s+/).filter(Boolean);
  let line1 = headline, line2 = "";
  if (words.length > 1 && headline.length > 12) {
    const mid = Math.ceil(words.length / 2);
    line1 = words.slice(0, mid).join(" ");
    line2 = words.slice(mid).join(" ");
  }
  const scene = pickScene(v);
  const meta = [v.nbhd, v.type, v.year ? `Est. ${v.year}` : ""].filter(Boolean).join(" · ");
  const tagline = v.tagline || `${v.nbhd || v.city}.`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${bgStart}"/>
      <stop offset="100%" stop-color="${bgEnd}"/>
    </linearGradient>
  </defs>
  <rect width="1600" height="900" fill="url(#bg)"/>

  <!-- texture lines -->
  <g opacity="0.06" stroke="${accent}" stroke-width="0.5">
    <line x1="0" y1="160" x2="1600" y2="220"/>
    <line x1="0" y1="340" x2="1600" y2="300"/>
    <line x1="0" y1="520" x2="1600" y2="560"/>
    <line x1="0" y1="720" x2="1600" y2="680"/>
  </g>

  ${scene}

  <!-- left text overlay -->
  <rect x="0" y="0" width="780" height="900" fill="${bgStart}" opacity="0.82"/>

  <!-- XRED EYEZ label -->
  <text x="68" y="92" font-family="'Courier New', monospace" font-size="12" fill="${accent}" letter-spacing="4" opacity="0.9">XRED EYEZ CULTURE</text>

  <!-- Wordmark -->
  <text x="64" y="222" font-family="Georgia, 'Times New Roman', serif" font-size="${line2 ? 78 : 86}" fill="#F5F0E6" font-weight="700" letter-spacing="-1">${ESC(line1)}</text>
  ${line2 ? `<text x="64" y="${222 + 86}" font-family="Georgia, 'Times New Roman', serif" font-size="78" fill="#F5F0E6" font-weight="700" letter-spacing="-1">${ESC(line2)}</text>` : ""}

  <!-- Accent strip -->
  <text x="68" y="${line2 ? 372 : 286}" font-family="'Courier New', monospace" font-size="13" fill="${accent}" letter-spacing="1" opacity="0.92">${ESC(tagline)}</text>
  <rect x="68" y="${line2 ? 390 : 306}" width="180" height="2.5" fill="${accent}" opacity="0.85"/>

  <text x="68" y="${line2 ? 430 : 346}" font-family="'Courier New', monospace" font-size="11" fill="rgba(245,240,230,0.4)" letter-spacing="1">${ESC(meta)}</text>

  <text x="68" y="852" font-family="'Courier New', monospace" font-size="10" fill="${accent}" letter-spacing="3" opacity="0.45">${ESC((v.city || "").toUpperCase())}</text>
</svg>
`;
}

// ── Main ────────────────────────────────────────────────────────────────────
const patches = [];
for (const v of VENUES) {
  const filename = `${v.slug}-banner.svg`;
  const out = join(OUT_DIR, filename);
  writeFileSync(out, buildSvg(v), "utf8");
  patches.push(`${v.slug}|/venues/${filename}`);
}
writeFileSync(join(ROOT, "scripts", "banner-patch.txt"), patches.join("\n"), "utf8");
console.log(`Generated ${VENUES.length} banners → public/venues/`);
console.log(`Patch list → scripts/banner-patch.txt`);
