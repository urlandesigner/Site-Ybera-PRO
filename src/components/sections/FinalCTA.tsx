"use client";

import type { KeyboardEvent } from "react";
import { useId, useState } from "react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

type ProfileTab = "distribuidor" | "representante" | "profissional";

const TABS: { id: ProfileTab; label: string }[] = [
  { id: "distribuidor", label: "Distribuidor" },
  { id: "representante", label: "Representante" },
  { id: "profissional", label: "Profissional" },
];

/** Conteúdo do formulário por aba — hoje igual em todos; troque por perfil quando o copy existir. */
const formByTab: Record<
  ProfileTab,
  {
    heading: string;
    rows: [string, string][][];
    cityLabel: string;
    cityPlaceholder: string;
    submitLabel: string;
    footnote: string;
  }
> = {
  distribuidor: {
    heading: "Crie sua conta e comece a vender",
    rows: [
      [
        ["Nome completo", "Seu nome"],
        ["WhatsApp (com DDD)", "(00) 00000-0000"],
      ],
      [
        ["E-mail", "seu@email.com"],
        ["CNPJ", "00.000.000/0000-00"],
      ],
    ],
    cityLabel: "Cidade ou região de atuação",
    cityPlaceholder: "Ex: São Paulo — SP",
    submitLabel: "Criar minha conta",
    footnote: "Seus dados serão analisados e você será contatado para ativação.",
  },
  representante: {
    heading: "Crie sua conta e comece a vender",
    rows: [
      [
        ["Nome completo", "Seu nome"],
        ["WhatsApp (com DDD)", "(00) 00000-0000"],
      ],
      [
        ["E-mail", "seu@email.com"],
        ["CNPJ", "00.000.000/0000-00"],
      ],
    ],
    cityLabel: "Cidade ou região de atuação",
    cityPlaceholder: "Ex: São Paulo — SP",
    submitLabel: "Criar minha conta",
    footnote: "Seus dados serão analisados e você será contatado para ativação.",
  },
  profissional: {
    heading: "Crie sua conta e comece a vender",
    rows: [
      [
        ["Nome completo", "Seu nome"],
        ["WhatsApp (com DDD)", "(00) 00000-0000"],
      ],
      [
        ["E-mail", "seu@email.com"],
        ["CNPJ", "00.000.000/0000-00"],
      ],
    ],
    cityLabel: "Cidade ou região de atuação",
    cityPlaceholder: "Ex: São Paulo — SP",
    submitLabel: "Criar minha conta",
    footnote: "Seus dados serão analisados e você será contatado para ativação.",
  },
};

const tabBtnBase =
  "relative z-10 min-h-11 min-w-0 flex-1 cursor-pointer rounded-lg border border-transparent bg-transparent px-3 py-2 text-center font-sans text-sm font-semibold transition-[color,transform,background-color] duration-200 ease-out motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f6665] focus-visible:ring-offset-2 min-[380px]:min-h-0 min-[380px]:py-[6px] active:scale-[0.98] motion-reduce:active:scale-100";

export function FinalCTA() {
  const [tab, setTab] = useState<ProfileTab>("distribuidor");
  const uid = useId();
  const form = formByTab[tab];
  const tabIndex = TABS.findIndex((t) => t.id === tab);

  const onTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, currentId: ProfileTab) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "Home" && e.key !== "End") return;
    e.preventDefault();
    const idx = TABS.findIndex((t) => t.id === currentId);
    if (e.key === "Home") {
      setTab(TABS[0]!.id);
      return;
    }
    if (e.key === "End") {
      setTab(TABS[TABS.length - 1]!.id);
      return;
    }
    const next =
      e.key === "ArrowRight"
        ? (idx + 1) % TABS.length
        : (idx - 1 + TABS.length) % TABS.length;
    setTab(TABS[next]!.id);
  };

  return (
    <Section
      id="final-cta"
      className="relative overflow-hidden bg-[linear-gradient(121deg,#132424_4%,#1e1e1f_52%,#092929_110%)] py-14 md:py-20 lg:py-[100px]"
    >
      <Container>
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_520px] lg:gap-9">
          <div className="space-y-10 lg:space-y-12">
            <div className="space-y-4">
              <p className="font-sans text-[11px] font-bold uppercase tracking-[1.5px] text-white">Comece hoje</p>
              <h2 className="max-w-[756px] font-display text-[28px] font-semibold leading-[34px] text-[#c2fffe] sm:text-[34px] sm:leading-[40px] lg:text-[40px] lg:leading-[48px]">
                Comece agora a gerar lucro recorrente com a maior comissão do mercado
              </h2>
              <p className="max-w-[547px] font-sans text-base leading-6 text-white lg:text-lg">
                Crie sua conta, acompanhe suas vendas e saque suas comissões.
              </p>
            </div>

            <div className="space-y-3">
              {[
                "Sem taxa mensal. Você cresce com as vendas",
                "Gestão completa da carteira sem custo",
                "Acompanhamento de recompra",
              ].map((item) => (
                <div key={item} className="card-border-shell card-border-r12 w-full lg:w-fit">
                  <div className="card-border-inner card-border-r12 flex min-h-[52px] items-center gap-3 bg-white px-3 py-2 sm:h-[52px] sm:min-h-0">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#4aaaa91a] text-[#1f6665]">
                      ✓
                    </span>
                    <span className="font-sans text-base font-semibold leading-5 text-[#1f6665]">{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-border-shell card-border-r20">
            <div className="card-border-inner card-border-r20 bg-[#faf9fc] p-6">
              <div className="rounded-xl border border-[#e2e1e5] bg-white p-[6px]">
                <div
                  role="tablist"
                  aria-label="Tipo de cadastro"
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
                  {TABS.map(({ id, label }) => {
                    const selected = tab === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        role="tab"
                        id={`${uid}-tab-${id}`}
                        aria-selected={selected}
                        aria-controls={`${uid}-panel`}
                        onClick={() => setTab(id)}
                        onKeyDown={(e) => onTabKeyDown(e, id)}
                        className={[
                          tabBtnBase,
                          selected
                            ? "text-[#1e1e1f] max-[379px]:bg-[#ecebf0]"
                            : "text-[#505052] hover:bg-[#f4f3f7]/90 max-[379px]:hover:bg-[#f4f3f7]",
                        ].join(" ")}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div
                key={tab}
                id={`${uid}-panel`}
                role="tabpanel"
                aria-labelledby={`${uid}-tab-${tab}`}
                className="mt-9 space-y-6 motion-safe:[animation:cta-tab-panel-in_0.42s_cubic-bezier(0.32,0.72,0,1)_both] motion-reduce:[animation:none]"
              >
                <h3 className="font-display text-xl font-semibold leading-7 text-[#1e1e1f] lg:text-2xl lg:leading-8">
                  {form.heading}
                </h3>

                <div className="space-y-6">
                  {form.rows.map((pair, rowIdx) => (
                    <div key={rowIdx} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {pair.map(([label, placeholder]) => (
                        <label key={label} className="space-y-2">
                          <span className="block font-sans text-sm text-[#1e1e1f]">{label}</span>
                          <input
                            className="h-11 w-full rounded-xl border border-[#c9c8cc] bg-white px-3 font-sans text-sm text-[#1e1e1f]"
                            placeholder={placeholder}
                            readOnly
                          />
                        </label>
                      ))}
                    </div>
                  ))}

                  <label className="block space-y-2">
                    <span className="block font-sans text-sm text-[#1e1e1f]">{form.cityLabel}</span>
                    <input
                      className="h-11 w-full rounded-xl border border-[#c9c8cc] bg-white px-3 font-sans text-sm text-[#1e1e1f]"
                      placeholder={form.cityPlaceholder}
                      readOnly
                    />
                  </label>
                </div>

                <div className="space-y-[18px]">
                  <button
                    type="button"
                    className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#1f6665] px-5 py-3 font-sans text-sm font-bold text-white transition-colors hover:bg-[#185654] active:bg-[#144848]"
                  >
                    {form.submitLabel} <span aria-hidden>→</span>
                  </button>
                  <p className="text-center font-sans text-xs leading-4 text-[#505052]">{form.footnote}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
