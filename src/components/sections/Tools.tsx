import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export function Tools() {
  const tools = [
    {
      title: "Dashboard inteligente",
      text: "Veja suas vendas e indicadores em tempo real",
    },
    {
      title: "Carteira de profissionais",
      text: "Saiba exatamente quem compra e quem está parado",
    },
    {
      title: "Relatórios e indicadores",
      text: "Tome decisões com mais segurança",
    },
    {
      title: "Campanhas e ativações",
      text: "Ative sua base e aumente a recompra",
    },
  ];

  return (
    <Section id="tools" className="bg-white py-14 md:py-20 lg:py-[100px]">
      <Container>
        <div className="space-y-8 lg:space-y-9">
          <header className="max-w-[560px] space-y-3">
            <p className="font-sans text-xs font-bold uppercase tracking-[1.5px] text-[#1f6665]">Produto</p>
            <h2 className="font-display text-[28px] font-semibold leading-9 text-[#1e1e1f] lg:text-[32px] lg:leading-10">
              Ferramentas para você vender mais com menos esforço
            </h2>
            <p className="font-sans text-base leading-6 text-[#505052] lg:text-lg">
              Ferramentas completas para organizar sua operação e aumentar a recorrência de vendas.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
            {tools.map((tool) => (
              <article key={tool.title} className="card-border-shell card-border-r20">
                <div className="card-border-inner card-border-r20 overflow-hidden bg-[linear-gradient(100deg,#1b807e_2%,#349392_98%)] p-6 text-white">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">+</div>
                  <h3 className="font-display text-lg font-semibold leading-6">{tool.title}</h3>
                  <p className="mt-3 font-sans text-base leading-5 text-[#c2fffe]">{tool.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
