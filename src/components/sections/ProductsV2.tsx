"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { cn } from "@/lib/utils";

type ProductSlide = {
  name: string;
  strategicDescription: string;
  image: string;
  imageAlt: string;
  detailHref: string;
};

const productSlides: ProductSlide[] = [
  {
    name: "Fashion Gold",
    strategicDescription:
      "Tratamento premium com alta percepção de valor e recorrência consistente em salões profissionais.",
    image: "/images/pro1.webp",
    imageAlt: "Linha Fashion Gold em composição editorial",
    detailHref: "#products",
  },
  {
    name: "Elixir do Pantanal",
    strategicDescription:
      "Ritual de cuidado com narrativa brasileira que amplia ticket médio e fortalece fidelização.",
    image: "/images/pro3.webp",
    imageAlt: "Produto Elixir do Pantanal em destaque",
    detailHref: "#products",
  },
  {
    name: "Cronograma Capilar PRO",
    strategicDescription:
      "Protocolo de rotina completa para aumentar recompra e manter clientes em ciclos contínuos.",
    image: "/images/pro6.webp",
    imageAlt: "Kit Cronograma Capilar em showcase sofisticado",
    detailHref: "#products",
  },
];

const AUTOPLAY_INTERVAL_MS = 6500;

function EditorialImageSlot({
  slides,
  visibleIndex,
  muted = false,
}: {
  slides: ProductSlide[];
  visibleIndex: number;
  muted?: boolean;
}) {
  return (
    <div className="relative h-full overflow-hidden rounded-[16px] border border-black/8 bg-white md:rounded-[20px]">
      {slides.map((slide, index) => (
        <img
          key={slide.name}
          src={slide.image}
          alt={slide.imageAlt}
          decoding="async"
          className={cn(
            "absolute inset-0 size-full object-cover object-center transition-opacity duration-500 ease-out motion-reduce:transition-none",
            index === visibleIndex ? "opacity-100" : "pointer-events-none opacity-0",
          )}
          aria-hidden={index !== visibleIndex}
        />
      ))}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 transition-colors duration-500",
          muted
            ? "bg-[linear-gradient(150deg,rgba(255,255,255,0.26),rgba(244,248,242,0.5))]"
            : "bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.14))]",
        )}
      />
    </div>
  );
}

export function ProductsV2() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const total = productSlides.length;
  const activeSlide = productSlides[activeIndex]!;
  const nextIndex = (activeIndex + 1) % total;

  const goTo = useCallback(
    (delta: number) => {
      setActiveIndex((current) => (current + delta + total) % total);
    },
    [total],
  );

  useEffect(() => {
    if (total < 2 || autoplayPaused || !autoplayEnabled) return;
    const id = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % total);
    }, AUTOPLAY_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [autoplayEnabled, autoplayPaused, total]);

  return (
    <Section id="products" className="relative overflow-hidden bg-[#f3f6f1] py-20 md:py-24 lg:py-[92px]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_16%_14%,rgba(31,102,101,0.08),transparent_52%)]"
        aria-hidden
      />

      <Container className="relative">
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="order-1 lg:col-span-5">
            <div className="max-w-[500px] space-y-5 lg:space-y-6">
              <h2 className="font-display text-[clamp(1.8rem,3.2vw,2.6rem)] leading-[1.14] font-semibold tracking-[-0.02em] text-[#161618]">
                Produtos que aumentam recompra e fidelizacao
              </h2>

              <p className="max-w-[43ch] font-sans text-[15px] leading-relaxed text-[#4f5154] md:text-base">
                Linhas estrategicas para elevar recorrencia, fortalecer fidelizacao e sustentar crescimento de ticket
                medio em operacoes profissionais.
              </p>

              <div className="space-y-2.5 pt-1">
                <p className="font-display text-[1.25rem] leading-tight font-medium tracking-[-0.015em] text-[#121214]">
                  {activeSlide.name}
                </p>
                <p className="max-w-[38ch] font-sans text-sm leading-relaxed text-[#505256] md:text-[15px]">
                  {activeSlide.strategicDescription}
                </p>
                <a
                  href={activeSlide.detailHref}
                  className="inline-flex items-center gap-2 pt-1 font-sans text-xs font-semibold tracking-[0.08em] text-[#1f6665] uppercase transition-opacity hover:opacity-70"
                >
                  Ver detalhes
                </a>
              </div>

              <div className="hidden items-center gap-2.5 pt-1 lg:flex">
                <button
                  type="button"
                  aria-label="Produto anterior"
                  onClick={() => goTo(-1)}
                  className="inline-flex size-9 items-center justify-center rounded-full border border-black/10 bg-white/85 text-[#121214] transition-colors hover:border-black/20"
                >
                  <ChevronLeft className="size-4" strokeWidth={1.7} aria-hidden />
                </button>
                <button
                  type="button"
                  aria-label={autoplayEnabled ? "Pausar autoplay" : "Iniciar autoplay"}
                  onClick={() => setAutoplayEnabled((prev) => !prev)}
                  className="inline-flex size-9 items-center justify-center rounded-full border border-black/10 bg-white/85 text-[#121214] transition-colors hover:border-black/20"
                >
                  {autoplayEnabled ? (
                    <Pause className="size-3.5" strokeWidth={2} aria-hidden />
                  ) : (
                    <Play className="size-3.5" strokeWidth={2} aria-hidden />
                  )}
                </button>
                <button
                  type="button"
                  aria-label="Próximo produto"
                  onClick={() => goTo(1)}
                  className="inline-flex size-9 items-center justify-center rounded-full border border-black/10 bg-white/85 text-[#121214] transition-colors hover:border-black/20"
                >
                  <ChevronRight className="size-4" strokeWidth={1.7} aria-hidden />
                </button>
              </div>
            </div>
          </div>

          <div className="order-2 lg:col-span-7">
            <div
              className="grid min-h-[260px] grid-cols-2 gap-4 md:min-h-[300px] lg:min-h-[360px]"
              onMouseEnter={() => setAutoplayPaused(true)}
              onMouseLeave={() => setAutoplayPaused(false)}
            >
              <EditorialImageSlot slides={productSlides} visibleIndex={activeIndex} />
              <EditorialImageSlot slides={productSlides} visibleIndex={nextIndex} muted />
            </div>
          </div>

          <div className="order-3 lg:hidden">
            <div className="flex items-center gap-2.5 pt-1">
              <button
                type="button"
                aria-label="Produto anterior"
                onClick={() => goTo(-1)}
                className="inline-flex size-9 items-center justify-center rounded-full border border-black/10 bg-white/85 text-[#121214]"
              >
                <ChevronLeft className="size-4" strokeWidth={1.7} aria-hidden />
              </button>
              <button
                type="button"
                aria-label={autoplayEnabled ? "Pausar autoplay" : "Iniciar autoplay"}
                onClick={() => setAutoplayEnabled((prev) => !prev)}
                className="inline-flex size-9 items-center justify-center rounded-full border border-black/10 bg-white/85 text-[#121214]"
              >
                {autoplayEnabled ? (
                  <Pause className="size-3.5" strokeWidth={2} aria-hidden />
                ) : (
                  <Play className="size-3.5" strokeWidth={2} aria-hidden />
                )}
              </button>
              <button
                type="button"
                aria-label="Próximo produto"
                onClick={() => goTo(1)}
                className="inline-flex size-9 items-center justify-center rounded-full border border-black/10 bg-white/85 text-[#121214]"
              >
                <ChevronRight className="size-4" strokeWidth={1.7} aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
