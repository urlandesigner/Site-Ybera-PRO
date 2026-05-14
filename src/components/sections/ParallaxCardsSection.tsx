"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform } from "motion/react";

import ParallaxCardEffect from "@/components/parallax-cards/parallax-card-effect";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { FaIcon } from "@/components/icons/FaIcon";
import {
  inactiveCardGradient,
  sharedCardGradient,
  stackedInactiveCardGradient,
} from "@/lib/card-stack-gradients";
import { ecosystemHowItWorksContent } from "@/data/ecosystem-how-it-works";
import { PRODUCT_DASHBOARD_PREVIEW_FILTER } from "@/lib/product-dashboard-preview-shadow";
import {
  cardIndexFromStackProgressFallback,
  readStackCardIndexFromRectsOverlap,
} from "@/lib/read-stack-card-index-from-hit";

const ecosystemCards = ecosystemHowItWorksContent.cards;
const CARD_COUNT = ecosystemCards.length;

/** Mesmo `top` sticky dos cards — preview alinhado à mesma altura do card no topo. */
const STICKY_TOP_CLASS = "top-[88px]";

const PREVIEW_IMAGES = [
  "/images/produto1.png",
  "/images/produto2.png",
  "/images/comofunciona3.png",
] as const;

/** Pilha completa em ~86% do scroll; o restante é hold antes de liberar a página. */
const PARALLAX_STACK_SCROLL_COMPLETE = 0.86;

/** Altura mínima (px) de interseção entre faces antes de ativar o card seguinte. */
const PARALLAX_MIN_OVERLAP_PX_0_TO_1 = 52;
/** Card 3 só após esta sobreposição vertical (px) com o card 2 — exige cobertura visível real. */
const PARALLAX_MIN_OVERLAP_PX_1_TO_2 = 140;

export function ParallaxCardsSection() {
  const scrollRootRef = useRef<HTMLDivElement | null>(null);
  const parallaxCardsViewportRef = useRef<HTMLDivElement | null>(null);
  const [previewIndex, setPreviewIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: scrollRootRef,
    offset: ["start end", "end start"],
  });

  const stackProgress = useTransform(
    scrollYProgress,
    [0, PARALLAX_STACK_SCROLL_COMPLETE, 1],
    [0, 1, 1],
  );

  useEffect(() => {
    let raf = 0;
    const run = () => {
      const vp = parallaxCardsViewportRef.current;
      const fromRects = vp
        ? readStackCardIndexFromRectsOverlap(vp, "data-parallax-desktop-card", CARD_COUNT, {
            minOverlapPx01: PARALLAX_MIN_OVERLAP_PX_0_TO_1,
            minOverlapPx12: PARALLAX_MIN_OVERLAP_PX_1_TO_2,
          })
        : null;
      const p = stackProgress.get();
      const next = fromRects ?? cardIndexFromStackProgressFallback(p, CARD_COUNT);
      setPreviewIndex((i) => (i === next ? i : next));
    };
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(run);
    };
    schedule();
    const unsub = stackProgress.on("change", schedule);
    const vp = parallaxCardsViewportRef.current;
    const ro = typeof ResizeObserver !== "undefined" && vp ? new ResizeObserver(schedule) : null;
    if (vp && ro) ro.observe(vp);
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      unsub();
      cancelAnimationFrame(raf);
      ro?.disconnect();
      window.removeEventListener("scroll", schedule);
    };
  }, [stackProgress]);

  const content = ecosystemHowItWorksContent;

  return (
    <Section
      id="benefits"
      spacing="none"
      className="relative z-0 bg-[#f4f7f7] pb-[100px] pt-14 text-[#1e1e1f] md:pt-20 lg:pt-[100px]"
      aria-labelledby="benefits-heading"
    >
      <Container>
        <header className="mb-10 max-w-[560px] space-y-3 lg:mb-14">
          <p className="font-sans text-xs font-bold uppercase tracking-[1.5px] text-[#1f6665]">Como funciona</p>
          <h2
            id="benefits-heading"
            className="font-display text-[28px] font-semibold leading-9 text-[#1e1e1f] lg:text-[32px] lg:leading-10"
          >
            {content.heading}
          </h2>
          <p className="font-sans text-base leading-6 text-[#505052] opacity-80 lg:text-lg">{content.support}</p>
        </header>

        {/*
          Desktop: altura fixa da trilha = `--como-funciona-scroll-height` (2200px em
          `como-funciona-scroll-layout.ts`). `h` em vez de `min-h` para a section não crescer além disso.
        */}
        <div
          ref={scrollRootRef}
          className="relative w-full lg:h-[var(--como-funciona-scroll-height)]"
        >
          <div className="grid w-full grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(280px,360px)_minmax(0,1fr)] lg:items-stretch lg:gap-14 xl:grid-cols-[minmax(300px,380px)_minmax(0,1fr)]">
            <div
              ref={parallaxCardsViewportRef}
              className="min-w-0 shrink-0 overflow-x-clip lg:h-[var(--como-funciona-scroll-height)]"
            >
              {ecosystemCards.map((item, index) => {
                const targetScale = 1 - (CARD_COUNT - index) * 0.05;
                const isActive = index === previewIndex;
                return (
                  <ParallaxCardEffect
                    key={item.title}
                    id={index}
                    progress={stackProgress}
                    range={[index / CARD_COUNT, 1]}
                    targetScale={targetScale}
                    stickyClassName={STICKY_TOP_CLASS}
                    verticalAlign="start"
                    className="w-full"
                  >
                    <div
                      data-parallax-desktop-card={index}
                      className="relative w-full overflow-hidden rounded-[20px] text-left text-white"
                      style={{
                        backgroundImage: isActive ? inactiveCardGradient : stackedInactiveCardGradient,
                      }}
                    >
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out"
                        style={{
                          backgroundImage: sharedCardGradient,
                          opacity: isActive ? 1 : 0,
                        }}
                      />
                      <div className="relative z-10 p-6">
                        <div
                          className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl text-white"
                          style={{ backgroundColor: "#FAF9FC33" }}
                        >
                          <FaIcon icon={item.icon} className="h-5 w-5" aria-hidden />
                        </div>
                        <h3 className="font-display text-lg font-bold leading-snug text-white [font-feature-settings:'lnum'_1,'tnum'_1]">
                          {item.title}
                        </h3>
                        <p className="mt-2.5 font-sans text-base font-medium leading-6 text-[#c2fffe]">
                          {item.description}
                        </p>
                        <ul className="mt-5 space-y-2">
                          {item.bullets.map((bullet) => (
                            <li
                              key={bullet}
                              className="flex items-center gap-2 font-sans text-sm font-normal leading-[18px] text-white"
                            >
                              <span className="size-1.5 shrink-0 rounded-full bg-[#c2fffe]" aria-hidden />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </ParallaxCardEffect>
                );
              })}
            </div>

            <div className="relative min-h-0 w-full min-w-0 shrink-0 lg:h-[var(--como-funciona-scroll-height)]">
              <div
                className="lg:sticky lg:z-10 lg:top-[88px]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- preview estático local */}
                <img
                  src={PREVIEW_IMAGES[previewIndex]}
                  alt="Dashboard Ybera PRO com visão macro da operação, representantes, profissionais, recompra e crescimento da rede"
                  className="mx-auto block w-full max-w-full object-contain"
                  style={{ filter: PRODUCT_DASHBOARD_PREVIEW_FILTER }}
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
