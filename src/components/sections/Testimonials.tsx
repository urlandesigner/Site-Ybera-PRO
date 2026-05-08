"use client";

import { useCallback, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Section } from "@/components/layout/Section";
import { cn } from "@/lib/utils";

/** Frame Figma “Testimonials” (1512×800): tipografia e espaçamentos alinhados ao node 2385:3357. */
const testimonials = [
  {
    image: "/images/feedback01.jpg",
    name: "Joana Bascelos",
    role: "Distribuidor PRO, Região Sudeste",
    quote:
      "O PRO organizou minha carteira e a recompra virou previsível. Hoje sei exatamente quem precisa de atenção e onde está meu lucro.",
  },
  {
    image: "/images/feedback02.jpg",
    name: "Fernando Hintz",
    role: "Representante - MG",
    quote:
      "O PRO organizou minha carteira e a recompra virou previsível. Hoje sei exatamente quem precisa de atenção e onde está meu lucro.",
  },
  {
    image: "/images/feedback01.jpg",
    name: "Mariana Silva",
    role: "Cabeleireira, Belo Horizonte",
    quote:
      "Consigo comprar com margem melhor e acompanhar tudo pelo app. Menos improviso e mais tempo com minhas clientes.",
  },
  {
    image: "/images/feedback02.jpg",
    name: "Fred Benevides",
    role: "Salão parceiro, Curitiba",
    quote:
      "Transparência nas comissões e suporte do distribuidor integrado ao PRO. Finalmente uma operação que escala com a gente.",
  },
] as const;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => (i + delta + total) % total);
    },
    [total]
  );

  const counter = String(index + 1).padStart(2, "0");
  const totalStr = String(total).padStart(2, "0");
  const slideShiftPct = 100 / total;
  const trackWidthPct = total * 100;

  return (
    <Section
      id="testimonials"
      spacing="none"
      className="relative isolate overflow-hidden bg-[rgba(74,170,169,0.1)] py-12 md:py-16 lg:py-0"
    >
      {/* Fundo: luminosity + crop vertical (≈125.95% altura, -4.56% top) como no Figma */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[min(800px,92svh)] max-lg:h-[min(520px,70svh)] mix-blend-luminosity lg:h-[800px]"
      >
        {testimonials.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            className={cn(
              "absolute inset-0 overflow-hidden transition-opacity duration-500 ease-out motion-reduce:transition-none",
              slideIndex === index ? "z-[1] opacity-100" : "z-0 opacity-0"
            )}
          >
            <img
              src={slide.image}
              alt=""
              className="absolute left-0 top-[-4.56%] h-[125.95%] w-full max-w-none object-cover object-center"
              sizes="(min-width: 1512px) 1512px, 100vw"
              decoding="async"
            />
          </div>
        ))}
      </div>

      {/* Shell alinhado ao frame 1512px; padding lateral 100px (Figma) */}
      <div className="relative z-[1] mx-auto w-full max-w-[1512px] min-h-[min(520px,92svh)] px-6 lg:min-h-[800px] lg:px-[100px]">
        {/* Aspas decorativas (asset Figma) + color-burn; ≈ left 212px, top 253px */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-[14.04%] top-[31.6%] hidden size-[min(52vw,388px)] lg:left-[212px] lg:top-[252.89px] lg:block"
        >
          <div className="flex size-full items-center justify-center">
            <div className="relative size-full max-h-[388px] max-w-[388px]">
              <img
                src="/images/testimonials-qotes.png"
                alt=""
                className="absolute inset-0 size-full max-w-none object-contain object-center opacity-[0.92] mix-blend-color-burn"
              />
            </div>
          </div>
        </div>

        <div className="overflow-hidden pt-8 lg:pt-[100px]">
          <div
            className="flex shrink-0 transition-transform duration-500 ease-out motion-reduce:transition-none"
            style={{
              width: `${trackWidthPct}%`,
              transform: `translateX(-${index * slideShiftPct}%)`,
            }}
          >
            {testimonials.map((slide, slideIndex) => (
              <div
                key={slide.name}
                className="shrink-0"
                style={{ width: `${100 / total}%` }}
                aria-hidden={slideIndex !== index}
              >
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,40%)_minmax(0,1fr)] lg:items-start lg:gap-x-0">
                  {/* Esquerda: só identidade (zona da foto no fundo) */}
                  <div className="relative max-w-[420px] space-y-0 lg:max-w-none lg:pr-6">
                    <p className="font-display text-[32px] font-medium leading-[40px] tracking-normal text-[#1e1e1f] [font-feature-settings:'lnum'_1,'tnum'_1] sm:text-[36px] sm:leading-[44px] lg:text-[40px] lg:leading-[48px]">
                      {slide.name}
                    </p>
                    <p className="mt-2 font-sans text-lg font-normal leading-6 tracking-normal text-[#505052] lg:mt-1">
                      {slide.role}
                    </p>
                    <div className="mt-4 h-px w-[120px] bg-[#1e1e1f]/18" aria-hidden />
                  </div>

                  {/* Direita: depoimento na faixa direita (sem painel / card) */}
                  <div className="relative flex min-h-0 flex-col lg:min-h-[min(100%,320px)] lg:justify-center lg:pl-[390px] lg:pr-0">
                    <span
                      className="mb-3 block font-display text-[2.5rem] font-medium leading-none text-[#1e1e1f] lg:mb-4 lg:text-[2.75rem]"
                      aria-hidden
                    >
                      “
                    </span>
                    <p className="font-sans text-xl font-normal leading-[1.3] tracking-normal text-[#505052] lg:max-w-[min(100%,560px)] lg:text-[24px]">
                      {slide.quote}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slider: gap 30px, setas 32px, número 56px + rótulo 16px; Figma bottom ~164px, right ~100px */}
        <div
          className="mt-12 ml-auto flex h-16 w-full max-w-[216px] shrink-0 items-center gap-[30px] lg:ml-0 lg:absolute lg:bottom-[164px] lg:right-[100px] lg:mt-0"
          role="group"
          aria-label="Navegação do carrossel de depoimentos"
        >
          <button
            type="button"
            onClick={() => go(-1)}
            className="flex size-8 shrink-0 items-center justify-center text-[#1e1e1f] transition-opacity hover:opacity-70"
            aria-label="Depoimento anterior"
          >
            <ChevronLeft className="size-8" strokeWidth={1.25} aria-hidden />
          </button>
          <div className="flex items-end gap-1.5 font-sans font-normal" aria-live="polite">
            <span
              className="flex h-12 w-[68px] items-center justify-start text-[56px] leading-none tracking-normal text-[#1e1e1f]"
              style={{ fontVariationSettings: "'wdth' 100, 'YTLC' 500" }}
            >
              {counter}
            </span>
            <span className="pb-1 text-base leading-normal whitespace-nowrap text-[#505052]">
              / {totalStr}
            </span>
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            className="flex size-8 shrink-0 items-center justify-center text-[#1e1e1f] transition-opacity hover:opacity-70"
            aria-label="Próximo depoimento"
          >
            <ChevronRight className="size-8" strokeWidth={1.25} aria-hidden />
          </button>
        </div>
      </div>
    </Section>
  );
}
