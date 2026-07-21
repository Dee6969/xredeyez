/**
 * Map glyph system — one icon language for pins, sidebar rows and filters.
 * Bold, white, sized to read at 20px on saturated chips.
 */

export const MAP_GLYPHS: Record<string, string> = {
  cannabis:
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 1.8c1 2.9 1.35 5.6.95 8.2 1.95-1.75 4.3-2.85 6.9-3.15-1.35 2.2-3.05 4-5.15 5.25 2.1.2 4.1.9 5.8 2.1-2.2.85-4.55 1.05-6.85.55.9 1.4 1.4 3 1.5 4.7-1.3-.8-2.4-1.8-3.25-3.05v3.4h-1.8v-3.4c-.85 1.25-1.95 2.25-3.25 3.05.1-1.7.6-3.3 1.5-4.7-2.3.5-4.65.3-6.85-.55 1.7-1.2 3.7-1.9 5.8-2.1C5.2 10.85 3.5 9.05 2.15 6.85c2.6.3 4.95 1.4 6.9 3.15-.4-2.6-.05-5.3.95-8.2z"/></svg>',
  stay:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 18v-7h18v7"/><path d="M3 11V6"/><path d="M21 18v-4a2 2 0 0 0-2-2"/><circle cx="7.5" cy="8" r="1.6" fill="currentColor" stroke="none"/><path d="M11 11V8.5A1.5 1.5 0 0 1 12.5 7H17a2 2 0 0 1 2 2v2"/></svg>',
  eat:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" aria-hidden="true"><path d="M6.5 3v18"/><path d="M4 3v5a2.5 2.5 0 0 0 5 0V3"/><path d="M17.5 3c-2 1.6-2.8 3.8-2.8 6 0 1.6 1.1 2.8 2.8 2.8V21"/></svg>',
  do:
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.6l2.8 5.9 6.4.8-4.7 4.4 1.2 6.3L12 16.9 6.3 20l1.2-6.3L2.8 9.3l6.4-.8z"/></svg>',
};

export const LAYER_META: Record<string, { label: string; color: string; gradient: string }> = {
  cannabis: { label: "Cannabis", color: "#7FB828", gradient: "linear-gradient(150deg, #8FCC2E, #5E9412)" },
  stay: { label: "Stay", color: "#4E86C0", gradient: "linear-gradient(150deg, #6FA8DC, #3E6EA8)" },
  eat: { label: "Eat", color: "#CC7E2E", gradient: "linear-gradient(150deg, #E8A050, #B5691E)" },
  do: { label: "Do", color: "#8460C8", gradient: "linear-gradient(150deg, #A886E0, #6E48B0)" },
};

export function glyphFor(layer?: string): string {
  return MAP_GLYPHS[layer === "stay" || layer === "eat" || layer === "cannabis" ? layer : "do"];
}

export function metaFor(layer?: string) {
  return LAYER_META[layer === "stay" || layer === "eat" || layer === "cannabis" ? layer : "do"];
}
