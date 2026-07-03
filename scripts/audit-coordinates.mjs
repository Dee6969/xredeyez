/**
 * Coordinate quality audit.
 * Flags venues whose pins are likely wrong:
 *  1. DUPLICATE   — identical coords shared by 2+ venues (copy-paste placeholders)
 *  2. LOW_PRECISION — fewer than 4 decimal places (>11m error; Street View lands off)
 *  3. FAR_FROM_CITY — >30km from the city centre (wrong city / swapped lat-lng)
 *  4. MISSING     — no lat/lng at all
 * Run: node scripts/audit-coordinates.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";

const platform = readFileSync("app/data/platform.ts", "utf8");

// Multi-region markets are checked against ALL their hubs; a venue is
// flagged only if it is >30km from EVERY hub in its market.
const CITY_HUBS = {
  amsterdam: [[52.3707, 4.8977]], "den-haag": [[52.08, 4.3007]], rotterdam: [[51.9244, 4.4777]],
  barcelona: [[41.3851, 2.1734]], tenerife: [[28.2916, -16.6291], [28.0997, -16.68], [28.4636, -16.2518]],
  marbella: [[36.5101, -4.8824], [36.7213, -4.4214]],
  thailand: [[13.7563, 100.5018], [7.8804, 98.3923], [9.5317, 100.061], [9.7047, 100.0296], [18.7883, 98.9853], [12.9236, 100.8825], [10.0956, 99.8404]],
  germany: [[52.52, 13.405], [48.1351, 11.582], [53.5511, 9.9937], [50.1109, 8.6821], [50.9375, 6.9603], [51.2277, 6.7735], [48.7758, 9.1829], [51.3397, 12.3731], [51.0504, 13.7373]],
  usa: [[34.0195, -118.4912], [40.7484, -73.9967], [36.1147, -115.1728], [25.7617, -80.1918], [41.8827, -87.6233], [37.7749, -122.4194], [39.7392, -104.9903], [45.5152, -122.6784], [42.3601, -71.0589], [32.7157, -117.1611], [38.5816, -121.4944], [36.1627, -86.7816]],
  "czech-republic": [[50.0755, 14.4378], [49.1951, 16.6068]],
  "south-africa": [[-33.9249, 18.4241], [-26.2041, 28.0473], [-29.8587, 31.0218], [-25.7479, 28.2293], [-34.0362, 23.0471], [-34.1932, 18.4326]],
  canada: [[43.6532, -79.3832], [49.2827, -123.1207], [45.5017, -73.5673], [51.0447, -114.0719], [45.4215, -75.6972], [44.6488, -63.5752]],
};

// Parse venue entries (id, name, cityId, lat, lng) from the TS source.
const venueRe = /id:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"[\s\S]*?cityId:\s*"([^"]+)"[\s\S]*?coordinates:\s*\{([^}]*)\}/g;
const latRe = /lat:\s*(-?\d+\.?\d*)/;
const lngRe = /lng:\s*(-?\d+\.?\d*)/;

const venues = [];
let match;
while ((match = venueRe.exec(platform)) !== null) {
  const [, id, name, cityId, coordBlock] = match;
  const lat = coordBlock.match(latRe)?.[1];
  const lng = coordBlock.match(lngRe)?.[1];
  venues.push({ id, name, cityId, lat, lng });
}

const dist = (a, b, c, d) => {
  const R = 6371, dLat = ((c - a) * Math.PI) / 180, dLng = ((d - b) * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos((a * Math.PI) / 180) * Math.cos((c * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};
const decimals = (s) => (s.includes(".") ? s.split(".")[1].length : 0);

const issues = { MISSING: [], LOW_PRECISION: [], FAR_FROM_CITY: [], DUPLICATE: [] };
const coordMap = new Map();

for (const v of venues) {
  if (!v.lat || !v.lng) { issues.MISSING.push(v); continue; }
  const key = `${v.lat},${v.lng}`;
  coordMap.set(key, [...(coordMap.get(key) || []), v]);

  if (decimals(v.lat) < 4 || decimals(v.lng) < 4) issues.LOW_PRECISION.push(v);

  const hubs = CITY_HUBS[v.cityId];
  if (hubs) {
    const kms = hubs.map((h) => dist(h[0], h[1], parseFloat(v.lat), parseFloat(v.lng)));
    const km = Math.min(...kms);
    if (km > 30) issues.FAR_FROM_CITY.push({ ...v, km: Math.round(km) });
  }
}
const SAME_BUILDING = new Set(["43.6485,-79.3963"]);
for (const [key, group] of coordMap) {
  if (group.length > 1 && !SAME_BUILDING.has(key)) issues.DUPLICATE.push({ key, venues: group });
}

let report = `# Coordinate Audit — ${new Date().toISOString().slice(0, 10)}\n\n`;
report += `Total venues parsed: ${venues.length}\n\n`;
report += `| Issue | Count |\n|---|---|\n`;
report += `| Missing coordinates | ${issues.MISSING.length} |\n`;
report += `| Low precision (<4dp, >11m error) | ${issues.LOW_PRECISION.length} |\n`;
report += `| >30km from city centre | ${issues.FAR_FROM_CITY.length} |\n`;
report += `| Duplicate pins (shared coords) | ${issues.DUPLICATE.length} groups |\n\n`;

if (issues.DUPLICATE.length) {
  report += `## Duplicate pins (likely copy-paste — pins stack on the map)\n`;
  for (const d of issues.DUPLICATE) {
    report += `- \`${d.key}\` shared by: ${d.venues.map((v) => `${v.name} (${v.cityId})`).join(" · ")}\n`;
  }
  report += `\n`;
}
if (issues.FAR_FROM_CITY.length) {
  report += `## Far from city centre (wrong city or swapped lat/lng)\n`;
  for (const v of issues.FAR_FROM_CITY) report += `- ${v.name} (${v.cityId}) — ${v.km}km out at ${v.lat},${v.lng}\n`;
  report += `\n`;
}
if (issues.LOW_PRECISION.length) {
  report += `## Low precision (Street View / walk-to will land off)\n`;
  for (const v of issues.LOW_PRECISION) report += `- ${v.name} (${v.cityId}) — ${v.lat},${v.lng}\n`;
  report += `\n`;
}
if (issues.MISSING.length) {
  report += `## Missing coordinates (no pin, no map actions)\n`;
  for (const v of issues.MISSING) report += `- ${v.name} (${v.cityId})\n`;
}

writeFileSync("REDEYEZ_COORDINATE_AUDIT.md", report);
console.log(report.split("\n").slice(0, 14).join("\n"));
console.log(`\nFull report: REDEYEZ_COORDINATE_AUDIT.md`);
