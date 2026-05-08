import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { FaIcon } from "@/components/icons/FaIcon";
import { GlassProCta } from "@/components/ui/GlassProCta";
import { faCheck } from "@/lib/fa-icons";

export function RecurringIncome() {
  const imgLeft = "https://www.figma.com/api/mcp/asset/8b52603d-4b8f-4149-95c6-d54cc694cebb";
  const recurrenceItems = [
    {
      title: "Recompra programada",
      description: "Antecipe o momento certo para o cliente comprar novamente.",
    },
    {
      title: "Acompanhamento de consumo",
      description: "Saiba quem esta ativo, quem reduziu compras e quem precisa ser reativado.",
    },
    {
      title: "Acoes de reativacao",
      description: "Crie oportunidades para recuperar clientes antes que eles deixem de comprar.",
    },
    {
      title: "Venda continua",
      description: "Gere faturamento previsivel sem depender apenas de novos clientes.",
    },
  ] as const;

  return (
    <Section id="recurring-income" className="bg-white py-14 md:py-20 lg:py-[100px]">
      <Container>
        <div className="space-y-8 lg:space-y-9">
          <header className="max-w-[560px] space-y-3">
            <p className="font-sans text-xs font-bold uppercase tracking-[1.5px] text-[#1f6665]">
              Lucratividade
            </p>
            <h2 className="font-display text-[28px] font-semibold leading-9 text-[#1e1e1f] lg:text-[32px] lg:leading-10">
              Transforme cada cliente em uma fonte de renda recorrente
            </h2>
            <p className="font-sans text-base leading-6 text-[#505052] opacity-80 lg:text-lg">
              A plataforma organiza sua carteira, antecipa oportunidades e transforma recompra em um
              processo comercial continuo.
            </p>
          </header>

          <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 md:gap-6">
            <div className="card-border-shell card-border-r20 h-full">
              <div className="card-border-inner card-border-r20 h-full overflow-hidden">
                <img src={imgLeft} alt="Lucratividade PRO 1" className="h-full w-full object-cover" />
              </div>
            </div>

            <article className="card-border-shell card-border-r20 h-full card-border-shell--no-elev">
              <div className="card-border-inner card-border-r20 flex h-full flex-col bg-[#f7f9f8] p-6 lg:p-7">
                <h3 className="font-display text-[22px] font-semibold leading-7 text-[#1e1e1f] lg:text-2xl">
                  Como a recorrencia acontece na pratica
                </h3>

                <ul className="mt-6 space-y-4">
                  {recurrenceItems.map((item) => (
                    <li key={item.title} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#e4f3f2] text-[#1f6665]">
                        <FaIcon icon={faCheck} className="h-3.5 w-3.5" aria-hidden />
                      </span>
                      <div className="space-y-1">
                        <p className="font-sans text-base font-bold leading-5 text-[#1f6665]">{item.title}</p>
                        <p className="font-sans text-sm leading-[18px] text-[#505052]">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-2">
                  <GlassProCta
                    href="#ferramentas-para-vender-mais-com-menos-esforco"
                    tone="light"
                    variant="ghost"
                    showArrow={false}
                    className="h-11 min-h-[44px] px-4 text-sm font-semibold sm:px-4 sm:text-sm"
                  >
                    Ver como funciona
                  </GlassProCta>
                </div>
              </div>
            </article>
          </div>
        </div>
      </Container>
    </Section>
  );
}
