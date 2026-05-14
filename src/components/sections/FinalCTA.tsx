"use client";

import { Container } from "@/components/layout/Container";
import { faCheck } from "@/lib/fa-icons";
import { Section } from "@/components/layout/Section";
import { FaIcon } from "@/components/icons/FaIcon";
import { GlassProCta } from "@/components/ui/GlassProCta";
import { PersonaEditorialPill } from "@/components/ui/PersonaEditorialPill";
import { useActiveProfile } from "@/lib/profile-content";
import type { ProfileTabId } from "@/lib/profile-tabs";

type ProfileTab = ProfileTabId;

/** Conteúdo do formulário por aba: hoje igual em todos; troque por perfil quando o copy existir. */
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
    heading: "Estruture sua operação com a Ybera PRO",
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
    cityPlaceholder: "Ex: São Paulo, SP",
    submitLabel: "Quero expandir minha operação",
    footnote: "Seus dados serão analisados e você será contatado para ativação.",
  },
  representante: {
    heading: "Estruture sua carteira com a Ybera PRO",
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
    cityPlaceholder: "Ex: São Paulo, SP",
    submitLabel: "Quero aumentar minha carteira",
    footnote: "Seus dados serão analisados e você será contatado para ativação.",
  },
  profissional: {
    heading: "Comece a vender com a Ybera PRO",
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
    cityPlaceholder: "Ex: São Paulo, SP",
    submitLabel: "Quero vender mais com recorrência",
    footnote: "Seus dados serão analisados e você será contatado para ativação.",
  },
};

const ctaContentByTab: Record<
  ProfileTab,
  {
    eyebrow: string;
    heading: string;
    support: string;
    bullets: string[];
  }
> = {
  distribuidor: {
    eyebrow: "Distribuidor Ybera PRO",
    heading: "Expanda sua operação com o ecossistema Ybera PRO",
    support:
      "Centralize representantes, acompanhe performance da rede e fortaleça a recorrência da operação em uma única plataforma.",
    bullets: [
      "Sem taxa mensal. Crescimento alinhado à operação",
      "Gestão completa da operação",
      "Visibilidade da recorrência da operação",
    ],
  },
  representante: {
    eyebrow: "Representante Ybera PRO",
    heading: "Transforme sua carteira em receita recorrente",
    support:
      "Acompanhe clientes, identifique oportunidades de recompra e aumente sua recorrência com mais previsibilidade e controle.",
    bullets: [
      "Sem mensalidade. Você cresce com as vendas.",
      "Gestão inteligente da carteira de clientes",
      "Acompanhamento de recompra e oportunidades",
    ],
  },
  profissional: {
    eyebrow: "Profissional Ybera PRO",
    heading: "Venda mais com recorrência e menos esforço operacional",
    support:
      "Organize pedidos, acompanhe clientes e aumente sua recompra com uma operação simples, prática e profissional.",
    bullets: [
      "Sem mensalidade. Você cresce com as vendas.",
      "Pedidos e clientes organizados em um só lugar",
      "Mais recompra e previsibilidade no salão",
    ],
  },
};

const formBadgeByTab: Record<
  ProfileTab,
  {
    label: string;
    color: string;
  }
> = {
  distribuidor: {
    label: "Distribuidor",
    color: "#1f6665",
  },
  representante: {
    label: "Representante",
    color: "#435950",
  },
  profissional: {
    label: "Profissional",
    color: "#1f3f7a",
  },
};

export function FinalCTA() {
  const tab = useActiveProfile();
  const form = formByTab[tab];
  const ctaContent = ctaContentByTab[tab];
  const formBadge = formBadgeByTab[tab];

  return (
    <Section
      id="final-cta"
      className="relative overflow-hidden bg-[#132424] bg-cover bg-center py-14 md:py-20 lg:py-[100px]"
      style={{
        backgroundImage: "url('/images/bg-forms.jpg')",
      }}
    >
      <Container>
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_520px] lg:gap-9">
          <div className="space-y-10 lg:space-y-12">
            <div className="space-y-4">
              <p className="font-sans text-[11px] font-bold uppercase tracking-[1.5px] text-white">
                {ctaContent.eyebrow}
              </p>
              <h2 className="max-w-[756px] font-display text-[28px] font-semibold leading-[34px] text-[#c2fffe] sm:text-[34px] sm:leading-[40px] lg:text-[40px] lg:leading-[48px]">
                {ctaContent.heading}
              </h2>
              <p className="max-w-[547px] font-sans text-base leading-6 text-white opacity-80 lg:text-lg">
                {ctaContent.support}
              </p>
            </div>

            <div className="space-y-3">
              {ctaContent.bullets.map((item) => (
                <div key={item} className="card-border-shell card-border-r12 w-full lg:w-fit">
                  <div className="card-border-inner card-border-r12 flex min-h-[52px] items-center gap-3 bg-white py-2 pl-3 pr-6 sm:h-[52px] sm:min-h-0">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#4aaaa91a] text-[#1f6665]">
                      <FaIcon icon={faCheck} className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="font-sans text-base font-semibold leading-5 text-[#1f6665]">{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] bg-white/20 p-2">
            <div className="rounded-[20px] bg-[#faf9fc] p-6">
                <div
                  key={tab}
                  className="motion-safe:[animation:cta-tab-panel-in_0.42s_cubic-bezier(0.32,0.72,0,1)_both] motion-reduce:[animation:none]"
                >
                  <PersonaEditorialPill accentColor={formBadge.color} className="mb-5">
                    {formBadge.label}
                  </PersonaEditorialPill>

                  <h3 className="font-display text-xl font-semibold leading-7 text-[#1e1e1f] lg:text-2xl lg:leading-8">
                    {form.heading}
                  </h3>

                  <div className="mt-6 space-y-6">
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

                  <div className="mt-9 space-y-[18px]">
                    <GlassProCta type="button" tone="light" className="w-full">
                      {form.submitLabel}
                    </GlassProCta>
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
