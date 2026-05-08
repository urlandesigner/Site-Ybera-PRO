import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { FaIcon } from "@/components/icons/FaIcon";
import { faArrowTrendDown, faPersonRunning, faUserSlash } from "@/lib/fa-icons";

export function Opportunity() {
  const problemCards = [
    {
      title: "Clientes somem sem aviso",
      description: "Você só percebe quando já pararam de comprar",
      icon: faUserSlash,
    },
    {
      title: "Você precisa vender do zero todo mês",
      description: "Sem recompra, seu esforço nunca diminui",
      icon: faPersonRunning,
    },
    {
      title: "Seu faturamento nunca é previsível",
      description: "Você não sabe quanto vai entrar no próximo mês",
      icon: faArrowTrendDown,
    },
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
              Sua carteira esfria todos os meses, e você precisa recomeçar do zero
            </h2>
            <p className="font-sans text-base leading-6 text-[#505052] opacity-80 lg:text-lg">
              Clientes param de comprar, a recompra cai e sua receita se torna imprevisível.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
            {problemCards.map(({ title, description, icon }) => (
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
                    <p className="font-sans text-sm leading-[18px] text-[#505052] opacity-80">{description}</p>
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
