import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export function Benefits() {
  const cards = [
    {
      title: "Para distribuidores",
      subtitle: "Tenha controle total da sua operação",
      points: ["Mais controle da carteira", "Mais recompra", "Mais previsibilidade de receita"],
    },
    {
      title: "Para profissionais",
      subtitle: "Compre melhor e venda mais",
      points: ["Compra mais organizada", "Mais benefícios", "Mais lucro no dia a dia"],
    },
    {
      title: "Para representantes",
      subtitle: "Expanda sua carteira com eficiência",
      points: ["Mais ativações", "Mais vendas", "Mais produtividade"],
    },
  ];

  return (
    <Section id="benefits" className="bg-white py-14 md:py-20 lg:py-[100px]">
      <Container>
        <div className="space-y-8 lg:space-y-9">
          <header className="max-w-[560px] space-y-3">
            <p className="font-sans text-xs font-bold uppercase tracking-[1.5px] text-[#1f6665]">Produto</p>
            <h2 className="font-display text-[28px] font-semibold leading-9 text-[#1e1e1f] lg:text-[32px] lg:leading-10">
              O que muda quando você usa o PRO
            </h2>
            <p className="font-sans text-base leading-6 text-[#505052] lg:text-lg">
              O PRO organiza sua operação e aumenta a eficiência em todos os níveis.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
            {cards.map((card) => (
              <article key={card.title} className="card-border-shell card-border-shell--elev-lg card-border-r20">
                <div
                  className="card-border-inner card-border-r20 relative overflow-hidden p-6 text-white"
                  style={{
                    backgroundImage:
                      "radial-gradient(ellipse 70% 60% at 88% -6%, rgba(255,255,255,0.22), transparent 52%), radial-gradient(ellipse 58% 52% at 100% 4%, rgba(255,255,255,0.12), transparent 48%), linear-gradient(100.631deg, rgb(27,128,126) 1.99%, rgb(52,147,146) 98.1%)",
                  }}
                >
                  <div
                    className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ backgroundColor: "rgba(250, 249, 252, 0.2)" }}
                  >
                    +
                  </div>
                  <h3 className="font-display text-lg font-bold leading-6">{card.title}</h3>
                  <p className="mt-3 font-sans text-base leading-5 text-[#c2fffe]">{card.subtitle}</p>
                  <ul className="mt-6 space-y-4">
                    {card.points.map((point) => (
                      <li key={point} className="flex items-center gap-3 font-sans text-sm leading-[18px]">
                        <span className="text-white/40">→</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
