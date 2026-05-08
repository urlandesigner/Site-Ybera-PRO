"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { FaIcon } from "@/components/icons/FaIcon";
import { faBriefcase, faUser, faUsers } from "@/lib/fa-icons";
import { useActiveProfile } from "@/lib/profile-content";
import type { ProfileTabId } from "@/lib/profile-tabs";
import { PRODUCT_DASHBOARD_PREVIEW_FILTER } from "@/lib/product-dashboard-preview-shadow";

export function Benefits() {
  const profile = useActiveProfile();
  const byProfile: Record<
    ProfileTabId,
    { heading: string; support: string; cards: readonly { title: string; description: string; support: string; icon: typeof faUser }[] }
  > = {
    distribuidor: {
      heading: "Pare de perder clientes e transforme sua carteira em receita recorrente",
      support:
        "Pare de depender de feeling. Use dados para agir no momento certo e aumentar a recorrência da sua carteira.",
      cards: [
        {
          title: "Distribuidores",
          description: "Controle total da operação e previsibilidade de receita.",
          support: "Acompanhe representantes, recorrência e crescimento da rede em tempo real.",
          icon: faUser,
        },
        {
          title: "Representantes",
          description: "Mais vendas com menos esforço operacional.",
          support: "Organize pedidos, acompanhe recompra e mantenha sua carteira ativa.",
          icon: faBriefcase,
        },
        {
          title: "Profissionais",
          description: "Organize pedidos, acompanhe recompra e mantenha sua carteira ativa.",
          support: "Transforme atendimentos em clientes recorrentes e aumente o ticket médio.",
          icon: faUsers,
        },
      ],
    },
    representante: {
      heading: "Aumente seus ganhos com uma carteira mais recorrente",
      support:
        "Ganhe mais mantendo clientes ativos, acompanhando recompra e ampliando oportunidades de venda.",
      cards: [
        {
          title: "Comissão recorrente",
          description: "Comissões mais previsíveis ao manter sua base ativa.",
          support: "Venda com consistência e reduza oscilações ao longo do mês.",
          icon: faUser,
        },
        {
          title: "Mais clientes ativos",
          description: "Acompanhe a carteira e evite perder clientes por inatividade.",
          support: "Atue no momento certo para manter relacionamento e recompra.",
          icon: faBriefcase,
        },
        {
          title: "Oportunidades de recompra",
          description: "Identifique quem está na janela ideal de nova compra.",
          support: "Priorize contatos com maior chance de conversão e ganho.",
          icon: faUsers,
        },
      ],
    },
    profissional: {
      heading: "Transforme recorrência em crescimento para o seu salão",
      support:
        "Fortaleça a fidelização dos clientes e aumente o valor percebido dos seus atendimentos.",
      cards: [
        {
          title: "Mais retorno de clientes",
          description: "Estimule a recompra com acompanhamento contínuo da base.",
          support: "Mantenha frequência de retorno e reduza períodos sem atendimento.",
          icon: faUser,
        },
        {
          title: "Ticket médio maior",
          description: "Aumente o valor por cliente com rotina de recompra estruturada.",
          support: "Combine fidelização com mix inteligente para elevar receita por atendimento.",
          icon: faBriefcase,
        },
        {
          title: "Fidelização no salão",
          description: "Construa uma carteira recorrente com relacionamento mais forte.",
          support: "Mais previsibilidade de agenda e crescimento sustentável do salão.",
          icon: faUsers,
        },
      ],
    },
  };
  const content = byProfile[profile];
  const cards = content.cards;
  const previewDistribuidor = "/images/produto1.png";
  const previewProfissional = "/images/produto2.png";
  const previewRepresentante = "/images/produto3.png";
  const previewByCard = [previewDistribuidor, previewRepresentante, previewProfissional] as const;
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
              {content.heading}
            </h2>
            <p className="font-sans text-base leading-6 text-[#505052] opacity-80 lg:text-lg">
              {content.support}
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
