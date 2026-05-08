"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { CometCard } from "@/components/ui/comet-card";
import { cn } from "@/lib/utils";

type ProductSlide = {
  badge: string;
  name: string;
  strategicDescription: string;
  resultImage: string;
  resultAlt: string;
  productImage: string;
  productAlt: string;
};

/** Pares lifestyle (.jpg) + packshot (.png) em `/images/produtos`. */
const productSlides: ProductSlide[] = [
  {
    badge: "Mais vendido",
    name: "Black Diva Luxury",
    strategicDescription:
      "Linha premium para tratamentos com forte desejo e recompra em operações que valorizam resultado visível.",
    resultImage: "/images/produtos/blackdiva.jpg",
    resultAlt: "Modelo com resultado Black Diva Luxury",
    productImage: "/images/produtos/produto-blackdiva.png",
    productAlt: "Linha Black Diva Luxury",
  },
  {
    badge: "Essencial salão",
    name: "Cronograma Capilar",
    strategicDescription:
      "Rotina completa para nutrição, hidratação e reconstrução dos fios, sustentando protocolos recorrentes em salão.",
    resultImage: "/images/produtos/cronograma.jpg",
    resultAlt: "Resultado com cronograma capilar profissional",
    productImage: "/images/produtos/produto-cronograma.png",
    productAlt: "Cronograma capilar em destaque",
  },
  {
    badge: "Linha Essência",
    name: "Essência Brasileira — Cerrado",
    strategicDescription:
      "Limpeza e condicionamento com narrativa de biodiversidade brasileira para elevar ticket e fidelização.",
    resultImage: "/images/produtos/essencia-cerrado.jpg",
    resultAlt: "Resultado Essência do Cerrado",
    productImage: "/images/produtos/produto-cerrado.png",
    productAlt: "Linha Essência do Cerrado",
  },
  {
    badge: "Novidade",
    name: "Essência Brasileira — Floresta",
    strategicDescription:
      "Tratamento capilar com posicionamento editorial e recorrência para clientes que buscam experiência premium.",
    resultImage: "/images/produtos/essencia-floresta.jpg",
    resultAlt: "Resultado Essência da Floresta",
    productImage: "/images/produtos/produto-floresta.png",
    productAlt: "Linha Essência da Floresta",
  },
  {
    badge: "Destaque",
    name: "Essência Brasileira — Pantanal",
    strategicDescription:
      "Hidratação profunda e storytelling de marca para aumentar recompra em operações profissionais.",
    resultImage: "/images/produtos/essencia-pantanal.jpg",
    resultAlt: "Resultado Essência do Pantanal",
    productImage: "/images/produtos/produto-pantanal.png",
    productAlt: "Linha Essência do Pantanal",
  },
  {
    badge: "Lançamento",
    name: "Genoma",
    strategicDescription:
      "Protocolo de alto desempenho para rotinas técnicas com foco em resultado consistente e continuidade.",
    resultImage: "/images/produtos/genoma.jpg",
    resultAlt: "Resultado com linha Genoma",
    productImage: "/images/produtos/produto-genoma.png",
    productAlt: "Linha Genoma em destaque",
  },
  // Sem `progressiva.jpg` na pasta: lifestyle temporário até o asset existir.
  {
    badge: "Alta performance",
    name: "Progressiva",
    strategicDescription:
      "Alisamento e disciplina dos fios com percepção premium para salões que priorizam técnica e recorrência.",
    resultImage: "/images/produtos/cronograma.jpg",
    resultAlt: "Ambiente e resultado profissional",
    productImage: "/images/produtos/produto-progressiva.png",
    productAlt: "Linha progressiva em destaque",
  },
];

const AUTOPLAY_INTERVAL_MS = 7000;

/** Mesma base 3D estática do hero (`Hero.tsx` painel CometCard): diagonal / profundidade antes do tilt interativo. */
const editorialStageTransform = {
  transform: "perspective(1400px) rotateY(-16deg) rotateX(6deg) rotateZ(2deg)",
  transformStyle: "preserve-3d" as const,
};

function EditorialVisual({
  slide,
}: {
  slide: ProductSlide;
}) {
  return (
    <div className="relative h-[340px] w-full md:h-[420px] lg:h-[540px]">
      {/*
        3D só na foto lifestyle (hero-style). Card do produto fica FORA: backdrop-filter + filtro SVG
        não funcionam de forma fiável dentro de ancestral com transform; além disso o packshot não roda.
      */}
      <div
        className="absolute right-0 top-6 z-[1] h-[calc(100%-24px)] min-h-0 w-[78%] transform-gpu"
        style={editorialStageTransform}
      >
        <CometCard
          className="relative h-full min-h-0 w-full"
          surfaceClassName="relative h-full min-h-0 w-full overflow-hidden rounded-[24px] shadow-[0_22px_48px_-28px_rgba(15,15,18,0.38)]"
          glareClassName="rounded-[24px]"
          disableHoverScale
          dropShadow={false}
        >
          <div className="relative h-full min-h-0 w-full">
            <img
              src={slide.resultImage}
              alt={slide.resultAlt}
              className="absolute inset-0 h-full w-full object-cover object-center saturate-[1.04] contrast-[1.04]"
              width={960}
              height={1200}
              sizes="(max-width: 768px) 78vw, (max-width: 1024px) 40vw, 38vw"
              decoding="async"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,12,16,0.018),rgba(255,255,255,0.06))]" />
          </div>
        </CometCard>
        {/* Faixa de luz acompanha a foto (coord. relativas à coluna 78%). Equiv. ~40% do stage total. */}
        <div className="pointer-events-none absolute left-[23%] top-[14%] h-[66%] w-14 -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.18),transparent_78%)]" />
      </div>

      {/* Card produto: sem transform ancestral — cristal + packshot planos como antes */}
      <div className="absolute left-[calc(11%-20px)] top-[68%] z-[2] isolate h-[52%] w-[38%] -translate-y-1/2 overflow-hidden rounded-[12px] p-2.5 md:h-[54%] md:w-[40%] md:p-3 lg:p-3.5">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 rounded-[12px] border border-white/45 bg-[linear-gradient(145deg,rgba(255,255,255,0.42)_0%,rgba(248,246,242,0.72)_42%,rgba(255,255,255,0.14)_100%)]"
          style={{
            backdropFilter: "url(#ybera-product-crystal-glass)",
            WebkitBackdropFilter: "url(#ybera-product-crystal-glass)",
          }}
        />
        <img
          src={slide.productImage}
          alt={slide.productAlt}
          className="relative z-10 size-full min-h-0 object-contain object-center contrast-[1.06] saturate-[1.05] scale-[1.12] md:scale-[1.14]"
          decoding="sync"
          fetchPriority="high"
        />
      </div>
    </div>
  );
}

export function ProductsV2() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const total = productSlides.length;
  const activeSlide = productSlides[activeIndex]!;

  const goTo = useCallback(
    (delta: number) => {
      setActiveIndex((current) => (current + delta + total) % total);
    },
    [total],
  );

  useEffect(() => {
    if (total < 2 || autoplayPaused) return;
    const id = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % total);
    }, AUTOPLAY_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [autoplayPaused, total]);

  return (
    <Section
      id="products"
      spacing="none"
      className="relative overflow-x-clip overflow-y-visible bg-[#f4f7f7] pt-20 pb-[100px] md:pt-24"
    >
      <Container className="relative">
        <div className="max-w-[620px] space-y-4">
          <p className="font-sans text-[12px] font-bold uppercase tracking-[0.125em] text-[#1f6665]">
            Produtos Exclusivos
          </p>
          <h2 className="max-w-[620px] font-display text-[32px] leading-[38px] font-semibold tracking-[0] text-[#1e1e1f]">
            Trabalhe com linhas exclusivas do mercado profissional
          </h2>
          <p className="max-w-[620px] font-sans text-base leading-6 text-[#505052]">
            Linhas estrategicas para elevar recorrencia, fortalecer fidelizacao e sustentar crescimento de ticket medio
            em operacoes profissionais.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start lg:gap-6">
          <div className="order-2 lg:order-1 lg:col-span-5 lg:self-start">
            <div className="flex h-full max-w-[430px] flex-col">
              <div className="pt-8">
                <span className="mb-4 inline-flex items-center rounded-full bg-[#1f6665]/10 px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1f6665]">
                  {activeSlide.badge}
                </span>
                <p className="font-display text-[24px] leading-[32px] font-medium tracking-[0] text-[#1e1e1f]">
                  {activeSlide.name}
                </p>
                <p className="mt-2 max-w-[470px] font-sans text-base leading-6 text-[#505052]">
                  {activeSlide.strategicDescription}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-2.5 lg:mt-7">
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
                  aria-label="Próximo produto"
                  onClick={() => goTo(1)}
                  className="inline-flex size-9 items-center justify-center rounded-full border border-black/10 bg-white/85 text-[#121214] transition-colors hover:border-black/20"
                >
                  <ChevronRight className="size-4" strokeWidth={1.7} aria-hidden />
                </button>
              </div>
            </div>
          </div>

          <div className="order-1 min-w-0 lg:order-2 lg:col-span-7 lg:self-start">
            <div
              className="relative w-full lg:-translate-y-[136px] lg:-mb-[136px]"
              onMouseEnter={() => setAutoplayPaused(true)}
              onMouseLeave={() => setAutoplayPaused(false)}
            >
              {productSlides.map((slide, index) => (
                <div
                  key={slide.name}
                  className={cn(
                    "transition-opacity duration-500 ease-out",
                    index === activeIndex ? "opacity-100" : "pointer-events-none absolute inset-0 opacity-0",
                  )}
                  aria-hidden={index !== activeIndex}
                >
                  <EditorialVisual slide={slide} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
