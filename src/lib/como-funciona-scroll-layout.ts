import type { CSSProperties } from "react";

/** Altura fixa da trilha de scroll no DOM (desktop `lg`) — `scrollRoot` + colunas parallax. */
export const COMO_FUNCIONA_SCROLL_HEIGHT_PX = 2200;

/**
 * Reserva vertical “ainda é conteúdo” (cards + mockups altos + respiro) em desktop.
 * Só entra no cálculo do overlap: quanto maior, menor o `-mt` da section dark (menos cobertura
 * por cima da preview). Se 950, o overlap vira enorme e o painel escuro sobe cedo demais.
 */
export const COMO_FUNCIONA_VISUAL_HEIGHT_PX = 1200;

/**
 * Variáveis CSS para `ParallaxControlOverlap`: scroll alto, overlap negativo na section dark.
 * `--como-funciona-overlap` = quanto a section dark sobe para cobrir o “vazio” da trilha longa.
 */
export const comoFuncionaScrollLayoutVars = {
  ["--como-funciona-scroll-height" as string]: `${COMO_FUNCIONA_SCROLL_HEIGHT_PX}px`,
  ["--como-funciona-visual-height" as string]: `${COMO_FUNCIONA_VISUAL_HEIGHT_PX}px`,
  ["--como-funciona-overlap" as string]:
    "calc(var(--como-funciona-scroll-height) - var(--como-funciona-visual-height))",
} as const satisfies CSSProperties;
