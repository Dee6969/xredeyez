/**
 * Batch re-geocoder — fixes approximate venue pins using street addresses.
 *
 * Every venue with an `address` is geocoded against OpenStreetMap Nominatim
 * (free, no API key, 1 request/second per usage policy). Differences over
 * 25 metres are written to geocode-corrections.json for review.
 *
 *   node scripts/geocode-venues.mjs          → produce review file
 *   node scripts/geocode-venues.mjs --apply  → apply reviewed corrections to platform.ts
 *
 * Run locally (not in CI). Takes ~5 minutes for the full dataset.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const APPLY = process.argv.includes("--apply");
const NOMINATIM = "https://nominatim.openstreetmap.org/search";
const UA = "XREDEYEZ-geocoder/1.0 (redeyez.co.uk data quality)";

const CITY_SEARCH_NAMES = {
  amsterdam: "Amsterdam, Netherlands", "den-haag": "Den Haag, Netherlands",
  rotterdam: "Rotterdam, Netherlands", barcelona: "Barcelona, Spain",
  tenerife: "Tenerife, Spain", marbella: "Marbella, Spain",
  "czech-republic": "Czech Republic", thailand: "Thailand", germany: "Germany",
  usa: "USA", "south-africa": "South Africa", canada: "Canada",
};

function parseVenues(source) {
  const re = /id:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"[\s\S]*?cityId:\s*"([^"]+)"[\s\S]*?address:\s*"([^"]+)"[\s\S]*?coordinates:\s*\{[^}]*lat:\s*(-?\d+\.?\d*),\s*lng:\s*(-?\d+\.?\d*)/g;
  const out = [];
  let m;
  while ((m = re.exec(source)) !== null) {
    out.push({ id: m[1], name: m[2], cityId: m[3], address: m[4], lat: +m[5], lng: +m[6] });
  }
  return out;
}

const dist = (a, b, c, d) => {
  const R = 6371000, dLat = ((c - a) * Math.PI) / 180, dLng = ((d - b) * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos((a * Math.PI) / 180) * Math.cos((c * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function geocode(query) {
  const url = `${NOMINATIM}?format=json&limit=1&q=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) return null;
  const data = await res.json();
  return data[0] ? { lat: +data[0].lat, lng: +data[0].lon } : null;
}

async function main() {
  const source = readFileSync("app/data/platform.ts", "utf8");

  if (APPLY) {
    if (!existsSync("geocode-corrections.json")) {
      console.error("No geocode-corrections.json found. Run without --apply first.");
      process.exit(1);
    }
    const corrections = JSON.parse(readFileSync("geocode-corrections.json", "utf8"));
    let updated = source;
    let applied = 0;
    for (const c of corrections) {
      const from = `lat: ${c.oldLat}, lng: ${c.oldLng}`;
      const to = `lat: ${c.newLat}, lng: ${c.newLng}`;
      if (updated.includes(from)) {
        updated = updated.replace(from, to);
        applied++;
      }
    }
    writeFileSync("app/data/platform.ts", updated);
    console.log(`Applied ${applied}/${corrections.length} corrections. Run the build to verify.`);
    return;
  }

  const venues = parseVenues(source);
  console.log(`${venues.length} venues with addresses. Geocoding at 1/sec…`);
  const corrections = [];

  for (const [i, v] of venues.entries()) {
    const cityName = CITY_SEARCH_NAMES[v.cityId] || v.cityId;
    const hit = await geocode(`${v.address}, ${cityName}`);
    await sleep(1100);
    if (!hit) {
      console.log(`  [${i + 1}/${venues.length}] ${v.name}: no geocode hit — skipped`);
      continue;
    }
    const metres = Math.round(dist(v.lat, v.lng, hit.lat, hit.lng));
    if (metres > 25) {
      corrections.push({
        id: v.id, name: v.name, address: v.address, metresOff: metres,
        oldLat: v.lat, oldLng: v.lng, newLat: hit.lat, newLng: hit.lng,
      });
      console.log(`  [${i + 1}/${venues.length}] ${v.name}: ${metres}m off → queued`);
    } else {
      console.log(`  [${i + 1}/${venues.length}] ${v.name}: OK (${metres}m)`);
    }
  }

  corrections.sort((a, b) => b.metresOff - a.metresOff);
  writeFileSync("geocode-corrections.json", JSON.stringify(corrections, null, 2));
  console.log(`\n${corrections.length} corrections written to geocode-corrections.json`);
  console.log("Review it, then: node scripts/geocode-venues.mjs --apply");
}

main();
