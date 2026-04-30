/** Links do menu — alinhados ao Figma (Header instance 2315:3239). */
export const HEADER_NAV = [
  { href: "#audience-tabs", label: "Para quem é o PRO" },
  { href: "#opportunity", label: "Como funciona" },
  { href: "#benefits", label: "Benefícios" },
] as const;

export type HeaderAppearance = "onDark" | "onLight";
