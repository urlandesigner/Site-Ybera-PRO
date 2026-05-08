"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { FaIcon } from "@/components/icons/FaIcon";
import { faArrowTrendDown, faPersonRunning, faUserSlash } from "@/lib/fa-icons";
import { useActiveProfile } from "@/lib/profile-content";
import type { ProfileTabId } from "@/lib/profile-tabs";

export function Opportunity() {
  const profile = useActiveProfile();
  const byProfile: Record<
    ProfileTabId,
    { title: string; support: string; cards: readonly { title: string; icon: typeof faUserSlash }[] }
  > = {
    distribuidor: {
      title: "Sua operação perde receita sem que você perceba",
      support:
        "Representantes reduzem atividade, clientes esfriam e sua operação perde recorrência todos os meses.",
      cards: [
        { title: "Sua rede perde recorrência sem visibilidade", icon: faUserSlash },
        { title: "Representantes ficam inativos sem acompanhamento", icon: faPersonRunning },
        { title: "Seu crescimento depende de esforço constante", icon: faArrowTrendDown },
      ],
    },
    representante: {
      title: "Você está deixando dinheiro na mesa todos os dias",
      support:
        "Clientes param de comprar, sua carteira esfria e você precisa começar do zero todo mês.",
      cards: [
        { title: "Clientes param de comprar sem aviso", icon: faUserSlash },
        { title: "Você precisa vender do zero todo mês", icon: faPersonRunning },
        { title: "Seu faturamento é imprevisível", icon: faArrowTrendDown },
      ],
    },
    profissional: {
      title: "Seu salão perde clientes sem perceber",
      support:
        "Clientes fazem um atendimento, não retornam e sua agenda depende sempre de novos atendimentos.",
      cards: [
        { title: "Clientes não voltam com frequência", icon: faUserSlash },
        { title: "Seu ticket médio oscila demais", icon: faPersonRunning },
        { title: "Sua agenda depende de novos clientes", icon: faArrowTrendDown },
      ],
    },
  };
  const content = byProfile[profile];

  return (
    <Section id="opportunity" className="bg-[#f4f7f7] py-14 md:py-20 lg:py-[100px]">
      <Container>
        <div className="space-y-8 lg:space-y-9">
          <header className="max-w-[560px] space-y-3">
            <p className="font-sans text-xs font-bold uppercase tracking-[1.5px] text-[#1f6665]">
              O problema
            </p>
            <h2 className="font-display text-[28px] font-semibold leading-9 text-[#1e1e1f] lg:text-[32px] lg:leading-10">
              {content.title}
            </h2>
            <p className="font-sans text-base leading-6 text-[#505052] opacity-80 lg:text-lg">
              {content.support}
            </p>
          </header>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
            {content.cards.map(({ title, icon }) => (
              <article
                key={title}
                className="card-border-shell card-border-r20 h-full transition-transform duration-300 ease-out hover:-translate-y-2"
              >
                <div className="card-border-inner card-border-r20 flex h-full min-h-[148px] flex-col justify-between bg-white p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f4f7f7] text-[#1f6665]">
                    <FaIcon icon={icon} className="h-6 w-6" aria-hidden />
                  </div>
                  <div className="space-y-2">
                    <p className="font-display text-lg font-semibold leading-6 text-[#505052] [font-feature-settings:'lnum'_1,'tnum'_1]">
                      {title}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </Container>
    </Section>
  );
}
