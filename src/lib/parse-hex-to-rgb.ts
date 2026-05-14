/** Converte `#RRGGBB` ou `#RGB` em componentes 0–255 (fallback brand teal). */
export function parseHexToRgb(hex: string): { r: number; g: number; b: number } {
  let h = hex.trim().replace(/^#/, "");
  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (h.length !== 6) {
    return { r: 31, g: 102, b: 101 };
  }
  const n = Number.parseInt(h, 16);
  if (!Number.isFinite(n)) {
    return { r: 31, g: 102, b: 101 };
  }
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}
