"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { FaIcon } from "@/components/icons/FaIcon";
import { faArrowRight } from "@/lib/fa-icons";
import { cn } from "@/lib/utils";

const imgPro1 = "/images/pro1.webp";
const imgPro2 = "/images/pro2.webp";
const imgPro3 = "/images/pro3.webp";
const imgPro4 = "/images/pro4.webp";
const imgPro5 = "/images/pro5.webp";
const imgPro6 = "/images/pro6.webp";

const products = [
  {
    image: imgPro1,
    name: "MemóriFios Stemcell Discovery",
    description: "Nutrição para cabelos longos e lisos",
    alt: "MemóriFios Stemcell Discovery",
  },
  {
    image: imgPro2,
    name: "Kit Relaxamento Ácido",
    description: "Força e brilho para cabelos finos",
    alt: "Kit Relaxamento Ácido",
  },
  {
    image: imgPro3,
    name: "Shampoo + Condicionador Elixir do Pantanal Essência Brasileira",
    description: "Hidratação profunda para cabelos secos",
    alt: "Shampoo + Condicionador Elixir do Pantanal Essência Brasileira",
  },
  {
    image: imgPro5,
    name: "Shampoo + Condicionador Elixir do Cerrado Essência Brasileira",
    description: "Limpeza e condicionamento com ativos da biodiversidade brasileira",
    alt: "Shampoo + Condicionador Elixir do Cerrado Essência Brasileira",
  },
  {
    image: imgPro6,
    name: "Kit Cronograma Capilar Cuidados Profundos",
    description: "Rotina completa para nutrição, hidratação e reconstrução dos fios",
    alt: "Kit Cronograma Capilar Cuidados Profundos",
  },
  {
    image: imgPro4,
    name: "Spray Fruto Brilhante Stemcell Discovery",
    description: "Finalização com brilho intenso e toque leve para o dia a dia",
    alt: "Spray Fruto Brilhante Stemcell Discovery",
  },
] as const;

/** Intervalo entre avanços automáticos (ms). */
const AUTO_ROTATE_MS = 5500;

/** Após clique ou setas, não avançar automaticamente por este tempo (ms). */
const AUTO_ROTATE_COOLDOWN_MS = 9000;

const DRAG_CLICK_THRESHOLD_PX = 10;

function useDragScroll(scrollRef: React.RefObject<HTMLDivElement | null>) {
  const drag = useRef({ active: false, pointerId: -1, startX: 0, startScroll: 0 });
  /** Se o último gesto foi arraste real, o próximo `click` deve ser ignorado (ex.: centrar card). */
  const suppressNextClickRef = useRef(false);
  const maxPointerDeltaRef = useRef(0);

  const onPointerDown = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el || e.button !== 0) return;
    maxPointerDeltaRef.current = 0;
    suppressNextClickRef.current = false;
    drag.current = {
      active: true,
      pointerId: e.pointerId,
      startX: e.clientX,
      startScroll: el.scrollLeft,
    };
    el.setPointerCapture(e.pointerId);
  }, [scrollRef]);

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      const el = scrollRef.current;
      if (!el || !drag.current.active || e.pointerId !== drag.current.pointerId) return;
      maxPointerDeltaRef.current = Math.max(
        maxPointerDeltaRef.current,
        Math.abs(e.clientX - drag.current.startX),
      );
      el.scrollLeft = drag.current.startScroll - (e.clientX - drag.current.startX);
    },
    [scrollRef],
  );

  const endDrag = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (!drag.current.active || e.pointerId !== drag.current.pointerId) return;
      drag.current.active = false;
      suppressNextClickRef.current = maxPointerDeltaRef.current > DRAG_CLICK_THRESHOLD_PX;
      try {
        scrollRef.current?.releasePointerCapture(e.pointerId);
      } catch {
        /* */
      }
    },
    [scrollRef],
  );

  const consumeSuppressClick = useCallback(() => {
    const v = suppressNextClickRef.current;
    suppressNextClickRef.current = false;
    return v;
  }, []);

  return { onPointerDown, onPointerMove, onPointerUp: endDrag, onPointerCancel: endDrag, consumeSuppressClick };
}

function useFocalProductIndex(scrollRef: React.RefObject<HTMLDivElement | null>, count: number) {
  const [focalIndex, setFocalIndex] = useState(0);

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller || count === 0) return;

    const update = () => {
      const cards = scroller.querySelectorAll<HTMLElement>("[data-product-slide]");
      if (!cards.length) return;
      const r = scroller.getBoundingClientRect();
      const mid = r.left + r.width / 2;
      let best = 0;
      let bestD = Infinity;
      cards.forEach((node, i) => {
        const b = node.getBoundingClientRect();
        const c = b.left + b.width / 2;
        const d = Math.abs(c - mid);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      setFocalIndex((p) => (p === best ? p : best));
    };

    update();
    scroller.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const ro = new ResizeObserver(update);
    ro.observe(scroller);
    return () => {
      scroller.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      ro.disconnect();
    };
  }, [scrollRef, count]);

  return focalIndex;
}

function scrollBehaviorForUser(): ScrollBehavior {
  if (typeof window === "undefined" || !window.matchMedia) return "smooth";
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

function getFocalIndexFromScroller(scroller: HTMLDivElement): number {
  const cards = scroller.querySelectorAll<HTMLElement>("[data-product-slide]");
  if (!cards.length) return 0;
  const r = scroller.getBoundingClientRect();
  const mid = r.left + r.width / 2;
  let best = 0;
  let bestD = Infinity;
  cards.forEach((node, i) => {
    const b = node.getBoundingClientRect();
    const c = b.left + b.width / 2;
    const d = Math.abs(c - mid);
    if (d < bestD) {
      bestD = d;
      best = i;
    }
  });
  return best;
}

export function ProductsV1() {
  const scrollRef = useRef<HTMLDivElement>(null);
  /** Permite o primeiro auto-advance após o primeiro intervalo. */
  const lastUserNavRef = useRef(Date.now() - AUTO_ROTATE_COOLDOWN_MS);
  const { consumeSuppressClick, ...dragHandlers } = useDragScroll(scrollRef);
  const focalIndex = useFocalProductIndex(scrollRef, products.length);
  const total = products.length;

  const centerSlide = useCallback((article: HTMLElement) => {
    const scroller = scrollRef.current;
    if (!scroller) return;

    const scrollerRect = scroller.getBoundingClientRect();
    const articleRect = article.getBoundingClientRect();
    const rawTargetLeft =
      scroller.scrollLeft +
      (articleRect.left - scrollerRect.left) -
      (scrollerRect.width / 2 - articleRect.width / 2);
    const maxScrollLeft = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
    const targetLeft = Math.min(maxScrollLeft, Math.max(0, rawTargetLeft));

    scroller.scrollTo({
      left: targetLeft,
      behavior: scrollBehaviorForUser(),
    });
  }, []);

  const goNext = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    lastUserNavRef.current = Date.now();
    const cards = el.querySelectorAll<HTMLElement>("[data-product-slide]");
    if (!cards.length) return;
    const idx = getFocalIndexFromScroller(el);
    if (idx >= cards.length - 1) centerSlide(cards[0]!);
    else centerSlide(cards[idx + 1]!);
  }, [centerSlide]);

  const goPrev = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    lastUserNavRef.current = Date.now();
    const cards = el.querySelectorAll<HTMLElement>("[data-product-slide]");
    if (!cards.length) return;
    const idx = getFocalIndexFromScroller(el);
    if (idx <= 0) centerSlide(cards[cards.length - 1]!);
    else centerSlide(cards[idx - 1]!);
  }, [centerSlide]);

  const advanceAuto = useCallback(() => {
    const el = scrollRef.current;
    if (!el || total < 2) return;
    const cards = el.querySelectorAll<HTMLElement>("[data-product-slide]");
    if (!cards.length) return;
    const best = getFocalIndexFromScroller(el);
    const next = (best + 1) % cards.length;
    centerSlide(cards[next]!);
  }, [centerSlide, total]);

  const onStripClickCapture = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (consumeSuppressClick()) return;
      const t = e.target;
      if (!(t instanceof Element)) return;
      const article = t.closest<HTMLElement>("[data-product-slide]");
      if (!article || !scrollRef.current?.contains(article)) return;
      const idx = Number(article.dataset.slideIndex);
      if (Number.isNaN(idx) || idx === focalIndex) return;
      lastUserNavRef.current = Date.now();
      centerSlide(article);
    },
    [centerSlide, consumeSuppressClick, focalIndex],
  );

  const onCatalogKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    },
    [goNext, goPrev],
  );

  const [stripHovered, setStripHovered] = useState(false);
  const [stripFocused, setStripFocused] = useState(false);

  useEffect(() => {
    if (total < 2) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tick = () => {
      if (stripHovered || stripFocused) return;
      if (document.visibilityState !== "visible") return;
      if (Date.now() - lastUserNavRef.current < AUTO_ROTATE_COOLDOWN_MS) return;
      advanceAuto();
    };

    const id = window.setInterval(tick, AUTO_ROTATE_MS);
    return () => window.clearInterval(id);
  }, [advanceAuto, stripFocused, stripHovered, total]);

  return (
    <Section
      id="products"
      className="relative overflow-x-clip overflow-y-visible bg-[#ffffff] pb-14 pt-12 md:pb-16 md:pt-16 lg:pb-20 lg:pt-[84px]"
    >
      {/* Atmosfera: luz brand muito suave — não compete com o produto */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[min(85vh,820px)] w-[min(140vw,1600px)] -translate-x-1/2 opacity-100"
        aria-hidden
      >
        <div className="h-full w-full bg-[radial-gradient(ellipse_55%_45%_at_50%_0%,rgba(31,102,101,0.11)_0%,transparent_72%)]" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#fff_0%,transparent_28%,transparent_100%)]"
        aria-hidden
      />

      <Container className="relative">
        <div className="flex flex-col gap-7 md:gap-8 lg:gap-10">
          <header className="flex max-w-[720px] flex-col gap-5 sm:max-w-none sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-[560px] space-y-4">
              <p className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#1f6665]">PRODUTOS</p>
              <h2 className="font-display text-[clamp(1.75rem,4vw,2.25rem)] font-semibold leading-[1.12] tracking-[-0.02em] text-[#0f0f10] [font-feature-settings:'lnum'_1,'tnum'_1]">
                Produtos profissionais de alta performance
              </h2>
              <p className="max-w-[480px] font-sans text-base leading-relaxed text-[#5a5a5d] md:text-lg">
                Usados por profissionais em todo o Brasil
              </p>
            </div>
            <a
              href="#products"
              className="inline-flex h-[52px] w-fit shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-transparent px-5 font-sans text-base font-bold leading-5 text-[#1f6665] transition-colors duration-200 hover:bg-white/60 sm:self-auto"
            >
              <span>Ver todos</span>
              <FaIcon icon={faArrowRight} className="size-3.5" aria-hidden />
            </a>
          </header>

          <div className="relative -mx-1 md:-mx-0">
            <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)]">
              <div
                ref={scrollRef}
                role="region"
                aria-label="Linha de produtos"
                tabIndex={0}
                onKeyDown={onCatalogKeyDown}
                onMouseEnter={() => setStripHovered(true)}
                onMouseLeave={() => setStripHovered(false)}
                onFocusCapture={() => setStripFocused(true)}
                onBlurCapture={(e) => {
                  const next = e.relatedTarget;
                  if (!next || !e.currentTarget.contains(next as Node)) setStripFocused(false);
                }}
                {...dragHandlers}
                onClickCapture={onStripClickCapture}
                className={cn(
                  "flex touch-pan-x cursor-grab gap-14 overflow-x-auto overflow-y-visible pb-14 pt-2 active:cursor-grabbing sm:gap-16 sm:pb-16 md:gap-20 md:pb-20 lg:gap-24 lg:pb-24",
                  /* Metade da largura do card (igual às classes w-* do article): permite centrar o 1.º e o último slide */
                  "pl-[max(1rem,calc(50%-min(44vw,190px)))] pr-[max(1rem,calc(50%-min(44vw,190px)))]",
                  "sm:pl-[max(1rem,calc(50%-min(41vw,200px)))] sm:pr-[max(1rem,calc(50%-min(41vw,200px)))]",
                  "md:pl-[max(1rem,calc(50%-min(24vw,220px)))] md:pr-[max(1rem,calc(50%-min(24vw,220px)))]",
                  "lg:pl-[max(1rem,calc(50%-min(21vw,240px)))] lg:pr-[max(1rem,calc(50%-min(21vw,240px)))]",
                  "scroll-smooth snap-x snap-mandatory [scroll-behavior:smooth] [-ms-overflow-style:none] [scrollbar-width:none]",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1f6665]",
                  "[&::-webkit-scrollbar]:hidden",
                )}
              >
              {products.map((p, i) => {
                const isFocal = focalIndex === i;
                const isNearFocal = Math.abs(focalIndex - i) === 1 || Math.abs(focalIndex - i) === total - 1;
                const idx = String(i + 1).padStart(2, "0");
                const tot = String(total).padStart(2, "0");

                return (
                  <article
                    key={`${p.name}-${i}`}
                    data-product-slide
                    data-slide-index={i}
                    className={cn(
                      "group relative shrink-0 snap-center will-change-transform",
                      "w-[min(88vw,380px)] sm:w-[min(82vw,400px)] md:w-[min(48vw,440px)] lg:w-[min(42vw,480px)]",
                      "transition-[transform,opacity,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-opacity motion-reduce:duration-150",
                      i % 2 === 0 ? "md:translate-y-0" : "md:translate-y-2",
                      isFocal && "z-[4] cursor-default opacity-100 blur-0 md:scale-100",
                      !isFocal &&
                        (isNearFocal
                          ? "z-[2] cursor-pointer opacity-[0.75] blur-0 md:scale-[0.95]"
                          : "z-[1] cursor-pointer opacity-[0.66] blur-[0.5px] md:scale-[0.92]"),
                      !isFocal && "md:hover:opacity-[0.86] md:hover:blur-0 md:hover:scale-[0.95]",
                    )}
                  >
                    <div
                      className={cn(
                        "relative aspect-[16/15] w-full bg-transparent md:aspect-square",
                      )}
                    >
                      <img
                        src={p.image}
                        alt={p.alt}
                        decoding="async"
                        draggable={false}
                        className={cn(
                          "relative z-[1] size-full object-contain object-center p-[15px]",
                          "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                          isFocal ? "scale-[1.1]" : "scale-100",
                          "group-hover:scale-[1.05] motion-reduce:group-hover:scale-100",
                        )}
                      />
                    </div>

                    <div
                      className={cn(
                        "absolute -bottom-6 left-4 right-4 z-[4] space-y-3 rounded-2xl px-4 py-4 sm:left-6 sm:right-6 sm:px-5",
                        isFocal
                          ? "border border-white/28 bg-white/62 opacity-100 shadow-[0_24px_40px_-30px_rgba(15,15,18,0.26)] backdrop-blur-[8px]"
                          : "border-transparent bg-transparent opacity-[0.62] shadow-none backdrop-blur-0",
                        !isFocal && "pointer-events-none opacity-0",
                      )}
                    >
                      <p
                        className={cn(
                          "font-sans text-[11px] font-semibold tabular-nums tracking-[0.18em]",
                          isFocal ? "text-[#1f6665]/80" : "text-[#1f6665]/45",
                        )}
                      >
                        {idx}
                        <span className="mx-1.5 font-normal text-[#b0b0b3]">/</span>
                        {tot}
                      </p>
                      <div className="h-px w-12 bg-[#1f6665]/30" aria-hidden />
                      <h3
                        className={cn(
                          "font-display text-[1.15rem] font-semibold leading-[1.2] tracking-[-0.025em] sm:text-[1.3rem] md:text-[1.45rem] md:leading-[1.18]",
                          isFocal ? "text-[#0f0f10]" : "text-[#0f0f10]/58",
                        )}
                      >
                        {p.name}
                      </h3>
                      <p
                        className={cn(
                          "max-w-[34ch] font-sans text-[13px] leading-relaxed md:text-[14px] md:leading-6",
                          isFocal ? "text-[#4f4f52]" : "text-[#4f4f52]/52",
                        )}
                      >
                        {p.description}
                      </p>
                    </div>
                  </article>
                );
              })}
              </div>
            </div>

            <div className="pointer-events-none absolute inset-y-8 left-0 right-0 z-[3] hidden items-center justify-between md:flex">
              <button
                type="button"
                aria-label="Anterior"
                onClick={goPrev}
                className="pointer-events-auto flex size-9 items-center justify-center rounded-full bg-white/90 text-[#1e1e1f] shadow-[0_2px_12px_rgba(15,15,18,0.08)] ring-1 ring-black/[0.04] transition hover:bg-white hover:shadow-[0_4px_20px_rgba(15,15,18,0.1)] active:scale-95 motion-reduce:transition-none"
              >
                <ChevronLeft className="size-4" strokeWidth={1.5} aria-hidden />
              </button>
              <button
                type="button"
                aria-label="Próximo"
                onClick={goNext}
                className="pointer-events-auto flex size-9 items-center justify-center rounded-full bg-white/90 text-[#1e1e1f] shadow-[0_2px_12px_rgba(15,15,18,0.08)] ring-1 ring-black/[0.04] transition hover:bg-white hover:shadow-[0_4px_20px_rgba(15,15,18,0.1)] active:scale-95 motion-reduce:transition-none"
              >
                <ChevronRight className="size-4" strokeWidth={1.5} aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
