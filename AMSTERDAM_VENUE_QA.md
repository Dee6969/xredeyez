# AMSTERDAM VENUE QA — 2026-07-13

54 Amsterdam venues after dedupe.

| Venue | Image | Location | Place ID | Hours | Website | Address |
|---|---|---|---|---|---|---|
| Grey Area | pending | approximate | — | yes | yes | yes |
| Boerejongens West | pending | approximate | — | yes | yes | yes |
| Paradox | pending | approximate | — | yes | yes | yes |
| The Stud | pending | approximate | — | yes | yes | MISSING |
| Coffeeshop Amsterdam | pending | approximate | — | MISSING | yes | MISSING |
| Siberie | pending | approximate | — | yes | yes | yes |
| Original Dampkring | pending | approximate | — | yes | yes | yes |
| Prix d'Ami | placeholder | approximate | — | yes | yes | yes |
| The Bulldog The First | pending | approximate | — | yes | yes | yes |
| The Bulldog Energy | pending | approximate | — | MISSING | yes | yes |
| Green House Centrum Coffeeshop | pending | approximate | — | yes | yes | yes |
| Green House Pijp | pending | approximate | — | yes | yes | yes |
| Coffeeshop Abraxas | pending | approximate | — | yes | yes | yes |
| Coffeeshop Tweede Kamer | pending | approximate | — | yes | yes | yes |
| Katsu Coffeeshop & Galerie | pending | approximate | — | yes | yes | yes |
| Boerejongens Centrum | pending | approximate | — | yes | yes | yes |
| The Plug Utopia | pending | approximate | — | yes | yes | yes |
| De Pijp Culture Walk | pending | approximate | — | MISSING | — | MISSING |
| Foodhallen Reset | pending | approximate | — | MISSING | yes | MISSING |
| Vondel Reset | pending | approximate | — | MISSING | — | MISSING |
| NDSM Culture Yard | pending | approximate | — | MISSING | yes | MISSING |
| De Kas | placeholder | approximate | — | yes | yes | yes |
| Rijsel | placeholder | approximate | — | yes | yes | yes |
| Restaurant GUTS | placeholder | approximate | — | yes | yes | yes |
| Moeders | placeholder | approximate | — | yes | yes | yes |
| NENI Amsterdam | placeholder | approximate | — | yes | yes | yes |
| Café de Klos | placeholder | approximate | — | yes | yes | yes |
| Restaurant As | placeholder | approximate | — | yes | yes | yes |
| Brouwerij 't IJ | placeholder | approximate | — | yes | yes | yes |
| Ron Gastrobar | placeholder | approximate | — | yes | yes | yes |
| Hangar | placeholder | approximate | — | yes | yes | yes |
| Terps Army | pending | approximate | — | yes | yes | yes |
| The Hoxton Amsterdam | placeholder | approximate | — | MISSING | yes | yes |
| Conservatorium Hotel | placeholder | approximate | — | MISSING | yes | yes |
| Pulitzer Amsterdam | placeholder | approximate | — | MISSING | yes | yes |
| Volkshotel | placeholder | approximate | — | MISSING | yes | yes |
| Sir Adam Hotel | placeholder | approximate | — | MISSING | yes | yes |
| Hotel Not Hotel | placeholder | approximate | — | MISSING | yes | yes |
| The Dylan | placeholder | approximate | — | MISSING | yes | yes |
| Kimpton De Witt | placeholder | approximate | — | MISSING | yes | yes |
| Hotel Okura | placeholder | approximate | — | MISSING | yes | yes |
| Hotel V Nesplein | placeholder | approximate | — | MISSING | yes | yes |
| Hotel TwentySeven | placeholder | approximate | — | MISSING | yes | yes |
| The Student Hotel | placeholder | approximate | — | MISSING | yes | yes |
| Dampkring Haarlemmerstraat | placeholder | approximate | — | yes | yes | yes |
| Barney's Lounge | placeholder | approximate | — | yes | yes | yes |
| Noon | placeholder | approximate | — | yes | — | yes |
| Rush Hour | placeholder | approximate | — | yes | — | yes |
| Greenhouse Namaste | placeholder | approximate | — | yes | yes | yes |
| Restaurant Breda | placeholder | approximate | — | yes | yes | yes |
| Pllek | placeholder | approximate | — | yes | yes | yes |
| Buffet van Odette | placeholder | approximate | — | yes | yes | yes |
| W Amsterdam | placeholder | approximate | — | yes | yes | yes |
| Stanley Park Seawall | placeholder | approximate | — | yes | yes | yes |

**Summary:** 54 venues · verified images: 0 · verified coordinates: 0 · Place IDs: 0 · missing hours: 18 · missing address: 6

---

## Street View policy (July 13 update)
Street View buttons now render ONLY for venues with `coordinateStatus: "verified"`. Current state: **2 verified (Grey Area, Prix d'Ami — both checked against directory listings), 1 needs-review, 51 approximate.** Approximate venues show Walk-there (address-resolved, entrance-accurate) but no Street View until verified.

## Barney's Lounge — identity conflict (editorial decision needed)
Our listing "Barney's Lounge" carries Haarlemmerstraat 105 — but per Barney's own site that address is **Barney's Uptown** (the bar/restaurant). The coffeeshop is at Haarlemmerstraat 102, and a further Barney's location is at Reguliersgracht 27. Decide which venue the listing represents, then correct name + address + pin together. Marked `needs-review`.

## The one command that fixes the other 51
`node scripts/geocode-venues.mjs` (run locally, ~5 min) resolves every address to building-accurate coordinates and writes a review file; `--apply` commits them. After review, set `coordinateStatus: "verified"` in bulk and Street View switches on across the city. Alternative gold standard: add Google Place IDs (directions then ignore pins entirely).
