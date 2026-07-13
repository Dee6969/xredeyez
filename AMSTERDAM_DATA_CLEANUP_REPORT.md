# AMSTERDAM DATA CLEANUP REPORT — July 2026

## Duplicates resolved (4 removed, 58 → 54 venues)

| Duplicate | Decision | Reasoning |
|---|---|---|
| `pllek-waterfront` vs `pllek-amsterdam` | **Removed** `pllek-waterfront` | Same venue (TT Neveritaweg 59); kept the richer profile |
| `paradox-jordaan` vs `paradox` | **Removed** `paradox-jordaan` | Same Jordaan coffeeshop listed twice |
| `tweede-kamer-amsterdam` vs `tweede-kamer` | **Removed** duplicate | Same Heisteeg venue |
| `abraxas-amsterdam` vs `abraxas` | **Removed** duplicate; kept `abraxas` + added hours | Same venue, canonical kept |
| Boerejongens (2 real branches) | **Renamed** to `Boerejongens West` + `Boerejongens Centrum` | Genuine multi-location business — branches now unambiguous |
| The Hoxton | **Checked — no duplicate found** in current data | Single listing remains |

## Trust-label corrections (7 venues)
`partner` or `claimed` statuses that implied commercial relationships with no confirmed partner behind them were reset to `unclaimed` (incl. Boerejongens West/Centrum, Coffeeshop Amsterdam, Siberië, and 3 others). Rule going forward: paid/confirmed relationships only.

## Verified data fixes
- Grey Area: pin corrected to 52.374596, 4.888972 (was ~210m off; verified against directory listing).
- Abraxas: opening hours added (Daily 09:00–01:00).

## No dangling references
All removed IDs checked against routes, guides, collections and featured placements — zero references remained. Build verified at 435 pages.
