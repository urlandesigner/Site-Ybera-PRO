"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { FaIcon } from "@/components/icons/FaIcon";
import { faArrowsRotate, faDollarSign, faGift } from "@/lib/fa-icons";
import { useActiveProfile } from "@/lib/profile-content";
import type { ProfileTabId } from "@/lib/profile-tabs";

export function Ecosystem() {
  const profile = useActiveProfile();
  const contentByProfile: Record<
    ProfileTabId,
    { title: string; support: string; items: readonly { label: string; icon: typeof faGift }[] }
  > = {
    distribuidor: {
      title: "Ganhe dinheiro comprando e vendendo dentro do ecossistema",
      support: "Além da comissão, você ainda recebe benefícios que aumentam sua margem.",
      items: [
        { label: "Cashback em compras recorrentes", icon: faArrowsRotate },
        { label: "Benefícios exclusivos", icon: faGift },
        { label: "Mais lucro em cada pedido", icon: faDollarSign },
      ],
    },
    representante: {
      title: "Aumente seus ganhos com uma carteira mais recorrente",
      support:
        "Ganhe mais mantendo clientes ativos, acompanhando recompra e ampliando oportunidades de venda.",
      items: [
        { label: "Comissão recorrente", icon: faArrowsRotate },
        { label: "Mais clientes ativos", icon: faGift },
        { label: "Oportunidades de recompra", icon: faDollarSign },
      ],
    },
    profissional: {
      title: "Transforme recorrência em crescimento para o seu salão",
      support:
        "Fortaleça a fidelização dos clientes e aumente o valor percebido dos seus atendimentos.",
      items: [
        { label: "Mais retorno de clientes", icon: faArrowsRotate },
        { label: "Ticket médio maior", icon: faGift },
        { label: "Fidelização no salão", icon: faDollarSign },
      ],
    },
  };
  const content = contentByProfile[profile];

  return (
    <Section
      id="ecosystem"
      className="relative z-[1] bg-white py-14 md:py-20 lg:py-[100px]"
    >
      <Container>
        <div className="space-y-8 lg:space-y-9">
          <header className="max-w-[560px] space-y-3">
            <p className="font-sans text-xs font-bold uppercase tracking-[1.5px] text-[#1f6665]">
              Benefícios
            </p>
            <h2 className="font-display text-[28px] font-semibold leading-9 text-[#1e1e1f] lg:text-[32px] lg:leading-10">
              {content.title}
            </h2>
            <p className="font-sans text-base leading-6 text-[#505052] opacity-80 lg:text-lg">
              {content.support}
            </p>
          </header>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
            {content.items.map(({ label, icon }) => (
              <div key={label} className="card-border-shell card-border-r12 w-full sm:w-auto">
                <div className="card-border-inner card-border-r12 flex min-h-[52px] items-center gap-3 bg-white px-3 py-2 sm:h-[52px] sm:min-h-0">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#4aaaa91a] text-[#1f6665]">
                    <FaIcon icon={icon} className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="font-sans text-base font-semibold leading-5 text-[#1f6665]">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
