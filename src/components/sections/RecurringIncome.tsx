import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export function RecurringIncome() {
  const imgLeft = "https://www.figma.com/api/mcp/asset/8b52603d-4b8f-4149-95c6-d54cc694cebb";
  const imgRight = "https://www.figma.com/api/mcp/asset/15b52e42-2c65-4e71-8548-f6b9e842e453";

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
              A recompra constante aumenta seu faturamento sem depender de novas vendas o tempo todo.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
            <img src={imgLeft} alt="Lucratividade PRO 1" className="w-full rounded-xl object-cover" />
            <img src={imgRight} alt="Lucratividade PRO 2" className="w-full rounded-xl object-cover" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
