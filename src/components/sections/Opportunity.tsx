import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { FaIcon } from "@/components/icons/FaIcon";
import { faArrowTrendDown, faPersonRunning, faUserSlash } from "@/lib/fa-icons";

export function Opportunity() {
  const problemCards = [
    { text: "Clientes param de comprar sem aviso", icon: faUserSlash },
    { text: "Você precisa vender do zero todo mês", icon: faPersonRunning },
    { text: "Seu faturamento é imprevisível", icon: faArrowTrendDown },
  ] as const;

  return (
    <Section id="opportunity" className="bg-[#f4f7f7] py-14 md:py-20 lg:py-[100px]">
      <Container>
        <div className="space-y-8 lg:space-y-9">
          <header className="max-w-[560px] space-y-3">
            <p className="font-sans text-xs font-bold uppercase tracking-[1.5px] text-[#1f6665]">
              O problema
            </p>
            <h2 className="font-display text-[28px] font-semibold leading-9 text-[#1e1e1f] lg:text-[32px] lg:leading-10">
              Você está deixando dinheiro na mesa todos os dias
            </h2>
            <p className="font-sans text-base leading-6 text-[#505052] opacity-80 lg:text-lg">
              Clientes param de comprar, sua base esfria e você precisa começar do zero todo mês.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
            {problemCards.map(({ text, icon }) => (
              <article key={text} className="card-border-shell card-border-r20">
                <div className="card-border-inner card-border-r20 flex min-h-[148px] flex-col justify-between bg-white p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f4f7f7] text-[#1f6665]">
                    <FaIcon icon={icon} className="h-6 w-6" aria-hidden />
                  </div>
                  <p className="font-display text-lg font-semibold leading-6 text-[#505052] [font-feature-settings:'lnum'_1,'tnum'_1]">
                    {text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
