#!/usr/bin/env node
// Reads scripts/banner-patch.txt (slug|bannerUrl), patches app/data/platform.ts:
// for each matching venue, injects bannerUrl into its brand block.
import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(process.cwd());
const SRC = join(ROOT, "app", "data", "platform.ts");
const PATCH = join(ROOT, "scripts", "banner-patch.txt");

const patches = new Map(
  readFileSync(PATCH, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((l) => l.split("|"))
);

let content = readFileSync(SRC, "utf8");
const lines = content.split("\n");
let applied = 0;
let skipped = [];

// Find each venue: line "    slug: \"X\"" → track block until matching "  }," at indent 2.
// Inside the block find brand: { … } and inject bannerUrl right before the closing }.
let i = 0;
while (i < lines.length) {
  const slugMatch = lines[i].match(/^\s+slug:\s*"([^"]+)"/);
  if (!slugMatch) { i++; continue; }
  const slug = slugMatch[1];
  const url = patches.get(slug);
  if (!url) { i++; continue; }

  // find brand: { … } start in next ~50 lines
  let brandStart = -1;
  for (let j = i; j < Math.min(i + 80, lines.length); j++) {
    if (/^\s+brand:\s*\{/.test(lines[j])) { brandStart = j; break; }
    if (/^\s+\},?$/.test(lines[j]) && lines[j].indexOf("    }") === 0) break; // venue end
  }
  if (brandStart === -1) { skipped.push(slug + " (no brand)"); i++; continue; }

  // already has bannerUrl?
  // detect inline single-line brand
  if (/brand:\s*\{[^}]*bannerUrl/.test(lines[brandStart])) { skipped.push(slug + " (has banner inline)"); i++; continue; }

  if (lines[brandStart].includes("}")) {
    // single-line brand: insert bannerUrl before closing `}`
    const insertion = `, bannerUrl: "${url}"`;
    lines[brandStart] = lines[brandStart].replace(/\s*\}\s*,?\s*$/, (match) => `${insertion}${match}`);
    applied++;
  } else {
    // multiline brand: find closing `    }` line and insert before it
    let brandEnd = -1;
    for (let j = brandStart + 1; j < Math.min(brandStart + 30, lines.length); j++) {
      if (/^\s+bannerUrl:/.test(lines[j])) { brandEnd = -2; break; }
      if (/^\s{4,6}\}/.test(lines[j])) { brandEnd = j; break; }
    }
    if (brandEnd === -2) { skipped.push(slug + " (has bannerUrl already)"); i++; continue; }
    if (brandEnd === -1) { skipped.push(slug + " (no brand close)"); i++; continue; }
    // match indentation from existing brand sub-fields
    const indent = lines[brandStart + 1].match(/^(\s+)/)?.[1] || "      ";
    lines.splice(brandEnd, 0, `${indent}bannerUrl: "${url}",`);
    applied++;
    i++; // adjust for inserted line
  }
  i++;
}

writeFileSync(SRC, lines.join("\n"), "utf8");
console.log(`Applied: ${applied}`);
if (skipped.length) {
  console.log(`Skipped (${skipped.length}):`);
  for (const s of skipped) console.log("  -", s);
}
