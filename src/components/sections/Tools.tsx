import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { FaIcon } from "@/components/icons/FaIcon";
import { GlassGlowSurface } from "@/components/ui/GlassGlowSurface";
import { faBullhorn, faChartColumn, faChartLine, faUsers } from "@/lib/fa-icons";

export function Tools() {
  /** Ordem: chart-line → users → file-chart-column (`faChartColumn` no npm; ver `fa-icons`) → bullhorn */
  const tools = [
    {
      title: "Dashboard inteligente",
      text: "Veja suas vendas e indicadores em tempo real",
      icon: faChartLine,
    },
    {
      title: "Carteira de profissionais",
      text: "Saiba exatamente quem compra e quem está parado",
      icon: faUsers,
    },
    {
      title: "Relatórios e indicadores",
      text: "Tome decisões com mais segurança",
      icon: faChartColumn,
    },
    {
      title: "Campanhas e ativações",
      text: "Ative sua base e aumente a recompra",
      icon: faBullhorn,
    },
  ] as const;

  return (
    <Section id="tools" className="bg-white py-14 md:py-20 lg:py-[100px]">
      <Container>
        <div className="space-y-8 lg:space-y-9">
          <header className="max-w-[560px] space-y-3">
            <p className="font-sans text-xs font-bold uppercase tracking-[1.5px] text-[#1f6665]">Produto</p>
            <h2 className="font-display text-[28px] font-semibold leading-9 text-[#1e1e1f] lg:text-[32px] lg:leading-10">
              Ferramentas para você vender mais com menos esforço
            </h2>
            <p className="font-sans text-base leading-6 text-[#505052] opacity-80 lg:text-lg">
              Ferramentas completas para organizar sua operação e aumentar a recorrência de vendas.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
            {tools.map((tool) => (
              <article key={tool.title} className="card-border-shell card-border-r20">
                <div className="card-border-inner card-border-r20 relative overflow-hidden bg-[linear-gradient(100deg,#1b807e_2%,#349392_98%)] text-white">
                  <GlassGlowSurface className="p-6">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white">
                      <FaIcon icon={tool.icon} className="h-5 w-5" aria-hidden />
                    </div>
                    <h3 className="font-display text-lg font-semibold leading-6">{tool.title}</h3>
                    <p className="mt-3 font-sans text-base leading-5 text-[#c2fffe]">{tool.text}</p>
                  </GlassGlowSurface>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
