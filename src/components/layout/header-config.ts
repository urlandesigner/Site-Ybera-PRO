/** `backdrop-filter` do header sobre o hero (`onDark`). */
export const HEADER_DARK_GLASS_BACKDROP = [
  "backdrop-blur-[6px]",
  "backdrop-saturate-[100%]",
].join(" ");

/** Vidro do header ao abrir o site (`onDark`): translúcido sobre o hero. */
export const HEADER_DARK_GLASS_SURFACE = [
  "bg-white/[0.012]",
  HEADER_DARK_GLASS_BACKDROP,
  "shadow-none",
  "transition-[background-color,backdrop-filter,box-shadow] duration-300",
].join(" ");

/**
 * Núcleo visual do header em tema claro (vidro): mesmo em toda a faixa e nas ilhas alinhadas.
 * A borda da faixa fixa é só em baixo; na pílula da segunda linha usa-se borda uniforme fina.
 */
export const HEADER_LIGHT_GLASS_SURFACE = [
  "bg-[rgba(255,255,255,0.68)]",
  "backdrop-blur-[16px]",
  "backdrop-saturate-[180%]",
  "shadow-[0_12px_40px_-32px_rgba(15,23,42,0.07)]",
  "transition-[background-color,backdrop-filter,box-shadow,border-color] duration-300",
].join(" ");

export const HEADER_LIGHT_GLASS_STRIP_BORDER =
  "[border-bottom:0.5px_solid_rgba(15,23,42,0.075)]";

/** Segunda linha (logo + perfis): mesmo vidro + contorno fino na ilha arredondada. */
export const HEADER_LIGHT_GLASS_PILL = [
  HEADER_LIGHT_GLASS_SURFACE,
  "rounded-[18px]",
  "border-[0.5px]",
  "border-[rgba(15,23,42,0.075)]",
].join(" ");

/** Links da primeira faixa em tema claro. */
export const HEADER_NAV_LINK_ON_LIGHT =
  "cursor-pointer font-display text-base font-medium leading-[22px] text-[#1f6665] transition-colors hover:text-[#155050]";

/** Links da barra de perfil (segunda faixa): mesmo tom/hover, **18px**. */
export const HEADER_PROFILE_NAV_LINK_ON_LIGHT =
  "cursor-pointer font-display text-[18px] font-medium leading-[22px] text-[#1f6665] transition-colors hover:text-[#155050]";

/** Links da primeira faixa em tema escuro (header sobre o hero). */
export const HEADER_NAV_LINK_ON_DARK =
  "cursor-pointer font-display text-base font-medium leading-[22px] text-[#c2fffe] transition-opacity hover:opacity-85";

/** Links do menu: alinhados ao Figma (Header instance 2315:3239). */
export const HEADER_NAV = [
  { href: "#audience-tabs", label: "Para quem é o PRO" },
  { href: "#opportunity", label: "Como funciona" },
  { href: "#benefits", label: "Benefícios" },
] as const;

export type HeaderAppearance = "onDark" | "onLight";
