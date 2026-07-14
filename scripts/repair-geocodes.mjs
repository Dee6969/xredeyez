/**
 * Repair pass for geocode-corrections.json application.
 *
 * Policy:
 *  - delta ≤ 800m  → KEEP geocoded coords, mark coordinateStatus "verified"
 *                    (address-resolved, building-level)
 *  - delta > 800m  → REVERT to the previous pin and mark "needs-review"
 *                    (a delta that large means the geocoder matched the
 *                    wrong place — trust neither coordinate)
 *
 * Run AFTER `geocode-venues.mjs --apply`, BEFORE committing:
 *   node scripts/repair-geocodes.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";

const THRESHOLD_M = 800;
const TODAY = new Date().toISOString().slice(0, 10);

const corrections = JSON.parse(readFileSync("geocode-corrections.json", "utf8"));
let src = readFileSync("app/data/platform.ts", "utf8");

let kept = 0, reverted = 0, untouched = 0, statusSet = 0;

function setStatus(id, status) {
  const anchor = `id: "${id}",`;
  const idx = src.indexOf(anchor);
  if (idx === -1) return false;
  // Replace existing status if present within this venue object, else insert.
  const objEnd = src.indexOf("\n  },", idx);
  const region = src.slice(idx, objEnd);
  if (region.includes("coordinateStatus:")) {
    const updated = region
      .replace(/coordinateStatus: "[^"]*"/, `coordinateStatus: "${status}"`)
      .replace(/lastLocationCheckedAt: "[^"]*"/, `lastLocationCheckedAt: "${TODAY}"`);
    src = src.slice(0, idx) + updated + src.slice(objEnd);
  } else {
    src =
      src.slice(0, idx) +
      `${anchor}\n    coordinateStatus: "${status}",\n    lastLocationCheckedAt: "${TODAY}",` +
      src.slice(idx + anchor.length);
  }
  statusSet++;
  return true;
}

for (const c of corrections) {
  const newPair = `lat: ${c.newLat}, lng: ${c.newLng}`;
  const oldPair = `lat: ${c.oldLat}, lng: ${c.oldLng}`;
  const applied = src.includes(newPair);

  if (!applied) {
    // This correction never landed (28 didn't) — leave the pin, but flag
    // big-delta ones for review since the address disagrees with the pin.
    if (c.metresOff > THRESHOLD_M) setStatus(c.id, "needs-review");
    untouched++;
    continue;
  }

  if (c.metresOff > THRESHOLD_M) {
    src = src.replace(newPair, oldPair);
    setStatus(c.id, "needs-review");
    reverted++;
    console.log(`REVERTED  ${c.name} (geocoder ${Math.round(c.metresOff)}m off — untrustworthy)`);
  } else {
    setStatus(c.id, "verified");
    kept++;
  }
}

writeFileSync("app/data/platform.ts", src);
console.log(`\nKept+verified: ${kept} · Reverted to review: ${reverted} · Untouched: ${untouched} · Statuses written: ${statusSet}`);
console.log("Now run the build, then commit.");
