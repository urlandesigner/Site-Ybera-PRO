/**
 * Descobre qual card da pilha está no topo num ponto de prova (elementsFromPoint).
 * Em layouts sticky + transform pode antecipar o índice; para pilha parallax usar
 * {@link readStackCardIndexFromRectsOverlap}.
 */
export function readStackCardIndexFromHit(
  viewportEl: HTMLElement,
  dataAttr: string,
  cardCount: number,
  probeOffsetPx: number,
): number | null {
  if (typeof document === "undefined") return null;
  if (viewportEl.getClientRects().length === 0) return null;
  const r = viewportEl.getBoundingClientRect();
  if (r.width < 2 || r.height < 2) return null;
  const x = r.left + r.width * 0.5;
  const y = r.top + Math.min(probeOffsetPx, Math.max(8, r.height * 0.18));
  let stack: Element[];
  try {
    stack = document.elementsFromPoint(x, y);
  } catch {
    return null;
  }
  const selector = `[${dataAttr}]`;
  for (const node of stack) {
    if (!(node instanceof Element)) continue;
    const card = node.closest(selector);
    if (!card || !viewportEl.contains(card)) continue;
    const raw = card.getAttribute(dataAttr);
    if (raw == null) continue;
    const n = Number(raw);
    if (Number.isInteger(n) && n >= 0 && n < cardCount) return n;
  }
  return null;
}

function verticalOverlapPx(a: DOMRect, b: DOMRect): number {
  return Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
}

export type RectsOverlapOptions = {
  /** Altura mínima (px) de interseção vertical entre card 1 e 0 para ativar o 1. */
  minOverlapPx01?: number;
  /** Altura mínima (px) de interseção vertical entre card 2 e 1 para ativar o 3.º card. */
  minOverlapPx12?: number;
};

/**
 * Índice ativo pela **área de sobreposição vertical** entre retângulos consecutivos
 * (getBoundingClientRect dos faces). O 3.º card só conta quando a interseção com o 2.º
 * atinge `minOverlapPx12` (por defeito ~⅓ da altura típica do card).
 */
export function readStackCardIndexFromRectsOverlap(
  viewportEl: HTMLElement,
  dataAttr: string,
  cardCount: number,
  options?: RectsOverlapOptions,
): number | null {
  const cards: HTMLElement[] = [];
  for (let i = 0; i < cardCount; i++) {
    const el = viewportEl.querySelector(`[${dataAttr}="${i}"]`);
    if (!(el instanceof HTMLElement)) return null;
    if (!viewportEl.contains(el)) return null;
    cards.push(el);
  }

  const rects = cards.map((c) => c.getBoundingClientRect());
  if (rects.some((r) => r.width < 2 || r.height < 2)) return null;

  const hMid = rects.map((r) => r.height).sort((a, b) => a - b)[Math.floor(rects.length / 2)]!;
  const default12 = Math.max(112, Math.round(hMid * 0.34));
  const min01 = options?.minOverlapPx01 ?? 48;
  const min12 = options?.minOverlapPx12 ?? default12;

  let idx = 0;
  if (cardCount > 1 && verticalOverlapPx(rects[1]!, rects[0]!) >= min01) idx = 1;
  if (cardCount > 2 && idx >= 1 && verticalOverlapPx(rects[2]!, rects[1]!) >= min12) idx = 2;
  return idx;
}

/** Fallback quando a coluna desktop está oculta (viewport sem layout) ou a leitura falha. */
export function cardIndexFromStackProgressFallback(p: number, count: number): number {
  if (count <= 1) return 0;
  return Math.min(count - 1, Math.floor(p * count + 1e-9));
}
