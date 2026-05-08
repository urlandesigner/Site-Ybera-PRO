"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { FaIcon } from "@/components/icons/FaIcon";
import { faBriefcase, faUser, faUsers } from "@/lib/fa-icons";
import { PRODUCT_DASHBOARD_PREVIEW_FILTER } from "@/lib/product-dashboard-preview-shadow";

export function Benefits() {
  const cards = [
    {
      title: "Distribuidores",
      description: "Controle total da sua operação e previsibilidade de receita",
      support: "Você enxerga quem compra, quando recompra e quanto pode faturar",
      icon: faUser,
    },
    {
      title: "Profissionais",
      description: "Mais lucro sem depender de novas vendas o tempo todo",
      support: "Seus clientes voltam com mais frequência e aumentam seu ticket médio",
      icon: faUsers,
    },
    {
      title: "Representantes",
      description: "Mais vendas sem aumentar esforço",
      support: "Sua rede ativa mais rápido, recompra melhor e performa com consistência",
      icon: faBriefcase,
    },
  ] as const;
  const previewDistribuidor = "/images/produto1.png";
  const previewProfissional = "/images/produto2.png";
  const previewRepresentante = "/images/produto3.png";
  const previewByCard = [previewDistribuidor, previewProfissional, previewRepresentante] as const;
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start 80%", "end 25%"],
  });

  const sharedCardGradient = "linear-gradient(98deg, #1B807E 1.99%, #349392 98.1%)";

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.33) {
      setActiveCardIndex(0);
      return;
    }
    if (latest < 0.66) {
      setActiveCardIndex(1);
      return;
    }
    setActiveCardIndex(2);
  });

  return (
    <Section
      id="benefits"
      className="bg-white pt-[104px] pb-14 md:pt-[120px] md:pb-20 lg:pt-[140px] lg:pb-[100px] overflow-x-clip overflow-y-visible"
    >
      <Container>
        <div className="space-y-10 lg:space-y-12">
          <header className="max-w-[560px] space-y-3">
            <p className="font-sans text-xs font-bold uppercase tracking-[1.5px] text-[#1f6665]">Produto</p>
            <h2 className="font-display text-[28px] font-semibold leading-9 text-[#1e1e1f] lg:text-[32px] lg:leading-10">
              Pare de perder clientes e transforme sua carteira em receita previsível
            </h2>
            <p className="font-sans text-base leading-6 text-[#505052] opacity-80 lg:text-lg">
              O PRO organiza sua operação, ativa recompra automaticamente e te dá controle total sobre
              suas vendas.
            </p>
          </header>

          <div ref={scrollRef} className="relative overflow-visible">
            <div className="grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start lg:gap-14 lg:overflow-visible xl:grid-cols-[340px_minmax(0,1fr)]">
              <div className="space-y-4 lg:space-y-5">
                {cards.map((card, index) => {
                  const isActive = index === activeCardIndex;

                  return (
                    <motion.button
                      key={card.title}
                      type="button"
                      onClick={() => setActiveCardIndex(index)}
                      onFocus={() => setActiveCardIndex(index)}
                      aria-pressed={isActive}
                      animate={{
                        opacity: isActive ? 1 : 0.6,
                        scale: isActive ? 1 : 0.98,
                        y: isActive ? 0 : 8,
                        boxShadow: isActive
                          ? "0 22px 46px rgba(14,44,43,0.24)"
                          : "0 12px 28px rgba(14,44,43,0.12)",
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="h-full w-full rounded-[20px] text-left transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f6665] focus-visible:ring-offset-2"
                    >
                      <div
                        className="relative h-full overflow-hidden rounded-[20px] text-white transition-all duration-300 ease-out"
                        style={{
                          backgroundImage: sharedCardGradient,
                        }}
                      >
                        <div className="h-full p-6">
                          <div
                            className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl text-white"
                            style={{ backgroundColor: "#FAF9FC33" }}
                          >
                            <FaIcon icon={card.icon} className="h-5 w-5" aria-hidden />
                          </div>
                          <h3 className="font-display text-lg font-bold leading-snug text-white [font-feature-settings:'lnum'_1,'tnum'_1]">
                            {card.title}
                          </h3>
                          <p className="mt-2.5 font-sans text-base font-medium leading-6 text-[#c2fffe]">
                            {card.description}
                          </p>
                          <p className="mt-5 font-sans text-sm font-normal leading-[18px] text-white">
                            {card.support}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <div className="relative lg:self-stretch lg:flex lg:flex-col">
                <div className="lg:sticky lg:top-[calc(7rem+0.75rem+env(safe-area-inset-top,0px))] lg:w-full lg:self-start lg:max-h-[min(780px,calc(100svh-7rem-0.75rem-env(safe-area-inset-top,0px)-24px))]">
                  <div className="relative mx-auto w-full min-w-0 max-w-[1001px] overflow-visible lg:max-h-[inherit]">
                    {/*
                      Mesmo tom da section Tools: em fundo branco da página, o alpha do PNG vira “faixa branca”.
                      Painel discreto alinha as duas sections “Produto”.
                    */}
                    <div className="relative aspect-[2003/1430] w-full max-h-[min(520px,calc(100svh-14rem))] sm:max-h-[min(580px,calc(100svh-13rem))] lg:max-h-[min(720px,calc(100svh-12rem))] overflow-visible rounded-2xl bg-[#f4f7f7]">
                      <AnimatePresence mode="sync" initial={false}>
                        <motion.img
                          key={previewByCard[activeCardIndex]}
                          src={previewByCard[activeCardIndex] ?? previewDistribuidor}
                          alt="Painel do sistema Ybera PRO com métricas e carteira organizada"
                          className="absolute inset-0 m-auto max-h-full max-w-full bg-transparent object-contain object-center"
                          style={{ filter: PRODUCT_DASHBOARD_PREVIEW_FILTER }}
                          decoding="async"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.28, ease: "easeOut" }}
                        />
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
