import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export function Ecosystem() {
  const items = [
    "Cashback em compras recorrentes",
    "Benefícios exclusivos",
    "Mais lucro em cada pedido",
  ];

  return (
    <Section
      id="ecosystem"
      className="relative z-[1] bg-[#f4f7f7] py-14 md:py-20 lg:py-[100px]"
    >
      <Container>
        <div className="space-y-8 lg:space-y-9">
          <header className="max-w-[560px] space-y-3">
            <p className="font-sans text-xs font-bold uppercase tracking-[1.5px] text-[#1f6665]">
              Benefícios
            </p>
            <h2 className="font-display text-[28px] font-semibold leading-9 text-[#1e1e1f] lg:text-[32px] lg:leading-10">
              Ganhe dinheiro comprando e vendendo dentro do ecossistema
            </h2>
            <p className="font-sans text-base leading-6 text-[#505052] lg:text-lg">
              Além da comissão, você ainda recebe benefícios que aumentam sua margem.
            </p>
          </header>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
            {items.map((item) => (
              <div key={item} className="card-border-shell card-border-r12 w-full sm:w-auto">
                <div className="card-border-inner card-border-r12 flex min-h-[52px] items-center gap-3 bg-white px-3 py-2 sm:h-[52px] sm:min-h-0">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#4aaaa91a] text-[#1f6665]">
                    $
                  </span>
                  <span className="font-sans text-base font-semibold leading-5 text-[#1f6665]">{item}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
