"use client";

import { useCallback, useId, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { FaIcon } from "@/components/icons/FaIcon";
import { faCheck } from "@/lib/fa-icons";

type ProfileId = "distribuidores" | "representantes" | "profissionais";

/** Mesmo shell dos tabs do formulário (FinalCTA). */
const toolsTabBtnBase =
  "relative z-10 min-h-11 min-w-0 flex-1 cursor-pointer rounded-lg border border-transparent bg-transparent px-3 py-2 text-center font-sans text-sm font-semibold transition-[color,transform,background-color] duration-200 ease-out motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f6665] focus-visible:ring-offset-2 min-[380px]:min-h-0 min-[380px]:py-[6px] active:scale-[0.98] motion-reduce:active:scale-100";

const TAB_ORDER: ProfileId[] = ["distribuidores", "representantes", "profissionais"];

const TAB_LABELS: Record<ProfileId, string> = {
  distribuidores: "Distribuidores",
  representantes: "Representantes",
  profissionais: "Profissionais",
};

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
  distribuidores: {
    title: "Tenha controle total da sua carteira e previsibilidade de receita",
    bullets: [
      "Gestão completa da carteira",
      "Alertas automáticos de recompra",
      "Segmentação por valor e frequência",
      "Relatórios para tomada de decisão",
    ],
    image: "/images/distribuidor.jpg",
    imageAlt: "Dashboard do Ybera Club Pro — visão para distribuidores",
    imageCaption:
      "Eu consigo enxergar receita e recompra na hora — antes eu só descobria o buraco quando já era tarde.",
  },
  representantes: {
    title: "Organize a carteira, defina prioridades do dia e acompanhe resultado em um só lugar",
    bullets: [
      "Carteira de profissionais organizada",
      "Priorização de contatos do dia",
      "Acompanhamento de performance",
      "Histórico completo de pedidos",
    ],
    image: "/images/representante.png",
    imageAlt: "Tela do sistema Ybera Club Pro — visão para representantes",
    imageCaption:
      "Eu saio de casa sabendo exatamente quem visitar primeiro; a lista do dia no PRO virou meu roteiro.",
  },
  profissionais: {
    title: "Compre com menos atrito, veja histórico e aproveite campanhas sem sair do fluxo do salão",
    bullets: [
      "Compra simplificada",
      "Histórico de pedidos",
      "Recomendações de recompra",
      "Acesso a campanhas e benefícios",
    ],
    image: "/images/profissional.png",
    imageAlt: "Tela do sistema Ybera Club Pro — visão para profissionais",
    imageCaption:
      "Eu fecho pedido sem ficar no telefone o dia todo e ainda vejo promoção e recompra — o PRO simplificou minha vida no salão.",
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
      <motion.h3
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: titleMs, ease: "easeOut" }}
        className="m-0 font-display text-base font-semibold leading-6 text-[#1e1e1f] sm:text-lg"
      >
        {content.title}
      </motion.h3>

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
  const baseId = useId();
  const [active, setActive] = useState<ProfileId>("distribuidores");
  const tablistId = `${baseId}-tablist`;
  const tabIndex = TAB_ORDER.indexOf(active);
  const nextTab = TAB_ORDER[(tabIndex + 1) % TAB_ORDER.length]!;

  const focusTab = useCallback((id: ProfileId) => {
    document.getElementById(`${baseId}-tab-${id}`)?.focus();
  }, [baseId]);

  const onTabKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, current: ProfileId) => {
      const idx = TAB_ORDER.indexOf(current);
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        const next = TAB_ORDER[(idx + 1) % TAB_ORDER.length]!;
        setActive(next);
        focusTab(next);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        const next = TAB_ORDER[(idx - 1 + TAB_ORDER.length) % TAB_ORDER.length]!;
        setActive(next);
        focusTab(next);
      } else if (e.key === "Home") {
        e.preventDefault();
        const first = TAB_ORDER[0]!;
        setActive(first);
        focusTab(first);
      } else if (e.key === "End") {
        e.preventDefault();
        const last = TAB_ORDER[TAB_ORDER.length - 1]!;
        setActive(last);
        focusTab(last);
      }
    },
    [focusTab],
  );

  const onNextTab = useCallback(() => {
    setActive(nextTab);
    focusTab(nextTab);
  }, [focusTab, nextTab]);

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
                    Ferramentas para você vender mais com menos esforço
                  </h2>
                  <p className="font-sans text-base leading-6 text-[#505052] lg:text-lg">
                    Escolha seu perfil e veja como o PRO se aplica na rotina real de cada papel.
                  </p>
                </header>

                <div className="flex w-full items-center gap-[8px]">
                  <div className="min-w-0 flex-1 rounded-xl border border-[#e2e1e5] bg-white p-[6px]">
                    <div
                      id={tablistId}
                      role="tablist"
                      aria-label="Perfil de uso"
                      className="relative grid grid-cols-1 gap-1 min-[380px]:grid-cols-3"
                    >
                    <span
                      aria-hidden
                      className={[
                        "pointer-events-none absolute hidden rounded-md bg-[#ecebf0]",
                        "shadow-[0_1px_2px_rgba(30,30,31,0.06)]",
                        "transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none",
                        "min-[380px]:block",
                      ].join(" ")}
                      style={{
                        top: "2px",
                        bottom: "2px",
                        width: "calc((100% - 0.5rem) / 3)",
                        transform: `translateX(calc(${tabIndex} * (100% + 0.25rem)))`,
                      }}
                    />
                    {TAB_ORDER.map((id) => {
                      const selected = active === id;
                      return (
                        <button
                          key={id}
                          type="button"
                          role="tab"
                          id={`${baseId}-tab-${id}`}
                          aria-selected={selected}
                          aria-controls={`${baseId}-panel`}
                          tabIndex={selected ? 0 : -1}
                          onClick={() => setActive(id)}
                          onKeyDown={(e) => onTabKeyDown(e, id)}
                          className={[
                            toolsTabBtnBase,
                            selected
                              ? "text-[#1e1e1f] max-[379px]:bg-[#ecebf0]"
                              : "text-[#505052] hover:bg-[#f4f3f7]/90 max-[379px]:hover:bg-[#f4f3f7]",
                          ].join(" ")}
                        >
                          {TAB_LABELS[id]}
                        </button>
                      );
                    })}
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label={`Próxima aba: ${TAB_LABELS[nextTab]}`}
                    onClick={onNextTab}
                    className="z-20 hidden shrink-0 items-center justify-center rounded-full bg-white p-2 text-[#1f6665] shadow-[0_6px_24px_rgba(15,15,18,0.12)] ring-1 ring-black/[0.06] transition hover:bg-[#f7fafa] active:scale-95 motion-reduce:transition-none lg:inline-flex"
                  >
                    <ChevronRight className="size-5" strokeWidth={1.8} aria-hidden />
                  </button>
                </div>
              </div>

              {/* BLOCO 2 — próximo das tabs; título do perfil é secundário ao H2 da section */}
              <div
                id={`${baseId}-panel`}
                role="tabpanel"
                aria-labelledby={`${baseId}-tab-${active}`}
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
              aria-label={`Imagem do produto — ${TAB_LABELS[active]}`}
            >
              <ProfilePreviewImage profileId={active} />
            </aside>
          </div>
        </div>
      </Container>
    </Section>
  );
}
