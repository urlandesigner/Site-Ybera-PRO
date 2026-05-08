"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { FaIcon } from "@/components/icons/FaIcon";
import { faCheck } from "@/lib/fa-icons";
import { useActiveProfile } from "@/lib/profile-content";
import type { ProfileTabId } from "@/lib/profile-tabs";

type ProfileId = ProfileTabId;

const PROFILE_CONTENT: Record<
  ProfileId,
  {
    title: string;
    bullets: string[];
    image: string;
    imageAlt: string;
    imageCaption: string;
  }
> = {
  distribuidor: {
    title: "",
    bullets: [
      "Gestão completa da rede",
      "Alertas automáticos de recompra",
      "Segmentação por recorrência",
      "Relatórios para tomada de decisão",
    ],
    image: "/images/distribuidor.jpg",
    imageAlt: "Dashboard do Ybera Club Pro — visão para distribuidores",
    imageCaption:
      "Hoje eu consigo enxergar queda de recorrência antes da operação sentir no caixa.",
  },
  representante: {
    title: "",
    bullets: [
      "Carteira organizada em um só lugar",
      "Alertas de clientes inativos",
      "Histórico de recompra",
      "Controle de comissão e pedidos",
    ],
    image: "/images/representante.png",
    imageAlt: "Tela do sistema Ybera Club Pro — visão para representantes",
    imageCaption:
      "Antes eu só descobria que perdi o cliente quando ele já estava comprando com outra pessoa.",
  },
  profissional: {
    title: "",
    bullets: [
      "Histórico dos clientes",
      "Recomendações de recompra",
      "Organização dos pedidos",
      "Fidelização da carteira do salão",
    ],
    image: "/images/profissional.png",
    imageAlt: "Tela do sistema Ybera Club Pro — visão para profissionais",
    imageCaption:
      "Hoje eu consigo manter minhas clientes comprando com frequência sem precisar correr atrás toda semana.",
  },
};

const IMAGE_EXIT_MS = 200;
const IMAGE_IN_MS = 300;

/** Imagem 1:1 + legenda — sequência: saída → troca → entrada com scale (só transform/opacity). */
function ProfilePreviewImage({ profileId }: { profileId: ProfileId }) {
  const reduceMotion = useReducedMotion();
  const { image, imageAlt, title, imageCaption } = PROFILE_CONTENT[profileId];
  const enterDelay = 0;

  return (
    <div className="relative flex w-full flex-col items-start gap-4">
      <div
        className="relative w-full max-w-[390px] shrink-0 self-start rounded-3xl shadow-[0_1px_3px_rgba(64,81,81,0.04),0_12px_36px_rgba(64,81,81,0.06)] ring-1 ring-black/[0.06] sm:max-w-[408px]"
      >
        <div className="relative aspect-square w-full overflow-hidden rounded-3xl">
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={profileId}
              src={image}
              alt={imageAlt}
              title={title}
              className="absolute inset-0 size-full object-cover object-center will-change-transform"
              sizes="(max-width: 1023px) min(100vw - 48px, 560px), (max-width: 1200px) 40vw, 440px"
              decoding="async"
              initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, transition: { duration: reduceMotion ? 0.05 : IMAGE_EXIT_MS / 1000, ease: "easeIn" } }}
              transition={{
                opacity: { duration: reduceMotion ? 0.05 : IMAGE_IN_MS / 1000, delay: enterDelay, ease: "easeOut" },
                scale: { duration: reduceMotion ? 0.05 : IMAGE_IN_MS / 1000, delay: enterDelay, ease: "easeOut" },
              }}
            />
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={profileId}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -2 }}
          transition={{
            duration: reduceMotion ? 0.05 : 0.2,
            delay: reduceMotion ? 0 : enterDelay + IMAGE_IN_MS / 1000 * 0.35,
            ease: "easeOut",
          }}
          className="m-0 w-full max-w-[22rem] font-sans text-[24px] font-normal leading-snug text-[#505052] lg:max-w-none"
        >
          “{imageCaption}”
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

/** Micro storytelling: título → lista com stagger (só opacity + transform). */
function ToolsProfileStoryPanel({ profileId }: { profileId: ProfileId }) {
  const reduceMotion = useReducedMotion();
  const content = PROFILE_CONTENT[profileId];
  const titleMs = reduceMotion ? 0.01 : 0.2;
  const listDelay = reduceMotion ? 0 : 0.2;
  const stagger = reduceMotion ? 0 : 0.06;
  const itemMs = reduceMotion ? 0.01 : 0.2;

  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -6, transition: { duration: reduceMotion ? 0.05 : 0.16, ease: "easeIn" } }}
      transition={{ duration: reduceMotion ? 0.05 : 0.18 }}
    >
      {content.title ? (
        <motion.h3
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: titleMs, ease: "easeOut" }}
          className="m-0 font-display text-base font-semibold leading-6 text-[#1e1e1f] sm:text-lg"
        >
          {content.title}
        </motion.h3>
      ) : null}

      <ul className="mt-4 flex flex-col gap-3.5">
        {content.bullets.map((line, i) => (
          <motion.li
            key={line}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: itemMs,
              delay: reduceMotion ? 0 : listDelay + i * stagger,
              ease: "easeOut",
            }}
            className="flex items-start gap-3"
          >
            <span
              className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#e4f3f2] text-[#1f6665]"
              aria-hidden
            >
              <FaIcon icon={faCheck} className="h-3 w-3" />
            </span>
            <span className="min-w-0 pt-0.5 font-sans text-base font-medium leading-6 text-[#505052]">
              {line}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export function Tools() {
  const active = useActiveProfile();

  return (
    <Section
      id="ferramentas-para-vender-mais-com-menos-esforco"
      className="overflow-x-clip bg-[#f4f7f7] py-14 md:py-20 lg:py-[100px]"
      aria-labelledby="tools-heading"
    >
      <Container>
        <div className="relative mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(260px,42%)] lg:items-start lg:gap-x-10 xl:gap-x-12">
            {/* Coluna esquerda: bloco intro (título + subtítulo + tabs) | bloco detalhe (perfil + lista + frase) */}
            <div className="flex flex-col gap-6 lg:border-r lg:border-[#dfe8e6] lg:gap-6 lg:pr-10 xl:pr-14">
              {/* BLOCO 1 */}
              <div className="flex max-w-[560px] flex-col gap-6">
                <header className="space-y-3">
                  <p className="font-sans text-xs font-bold uppercase tracking-[1.5px] text-[#1f6665]">Produto</p>
                  <h2
                    id="tools-heading"
                    className="font-display text-[28px] font-semibold leading-9 text-[#1e1e1f] [font-feature-settings:'lnum'_1,'tnum'_1] lg:text-[32px] lg:leading-10"
                  >
                    {active === "representante"
                      ? "Ferramentas para você vender mais sem começar do zero todo mês"
                      : active === "profissional"
                        ? "Ferramentas para transformar atendimento em recorrência"
                        : "Ferramentas para você gerir sua operação com previsibilidade"}
                  </h2>
                  <p className="font-sans text-base leading-6 text-[#505052] lg:text-lg">
                    {active === "profissional"
                      ? "O PRO ajuda você a acompanhar clientes, incentivar recompras e aumentar o ticket médio sem depender apenas de novos atendimentos."
                      : "O PRO centraliza sua rede, acompanha recompra e transforma dados da operação em decisões mais rápidas."}
                  </p>
                </header>
              </div>

              {/* BLOCO 2 — próximo das tabs; título do perfil é secundário ao H2 da section */}
              <div
                className="max-w-[560px]"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <ToolsProfileStoryPanel key={active} profileId={active} />
                </AnimatePresence>
              </div>
            </div>

            {/* Coluna direita: apenas imagem (abaixo do conteúdo no mobile) */}
            <aside
              className="w-full lg:sticky lg:top-[120px] lg:self-start"
              aria-label="Imagem do produto"
            >
              <ProfilePreviewImage profileId={active} />
            </aside>
          </div>
        </div>
      </Container>
    </Section>
  );
}
