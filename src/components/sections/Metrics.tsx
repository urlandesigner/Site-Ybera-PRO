import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export function Metrics() {
  return (
    <Section id="metrics" className="relative z-[1] bg-[#f4f7f7] py-14 md:py-20 lg:py-[100px]">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[480px_1fr] lg:gap-[60px]">
          <div className="space-y-4">
            <header className="space-y-3">
              <p className="font-sans text-xs font-bold uppercase tracking-[1.5px] text-[#1f6665]">
                Escala global
              </p>
              <h2 className="font-display text-xl font-semibold leading-7 text-[#1e1e1f] lg:text-2xl lg:leading-8">
                Mais de 1 milhão de salões já trabalham com produtos Ybera
              </h2>
            </header>
            <p className="font-sans text-base leading-6 text-[#505052] lg:text-lg">
              Presença global e uma operação validada em mais de 53 países.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 md:gap-9">
            <article className="card-border-shell card-border-r20">
              <div className="card-border-inner card-border-r20 flex min-h-[106px] items-center justify-center bg-white px-5 py-8 lg:h-[106px] lg:px-6 lg:py-9">
                <div className="text-center">
                  <p className="font-display text-[32px] font-semibold leading-10 text-[#1f6665] [font-feature-settings:'lnum'_1,'tnum'_1]">
                    +1 milhão
                  </p>
                  <p className="font-sans text-base font-semibold leading-[22px] text-[#1f6665]">Salões no mundo</p>
                </div>
              </div>
            </article>

            <article className="card-border-shell card-border-r20">
              <div className="card-border-inner card-border-r20 flex min-h-[106px] items-center justify-center bg-white px-5 py-8 lg:h-[106px] lg:px-6 lg:py-9">
                <div className="text-center">
                  <p className="font-display text-[32px] font-semibold leading-10 text-[#1f6665] [font-feature-settings:'lnum'_1,'tnum'_1]">
                    +53
                  </p>
                  <p className="font-sans text-base font-semibold leading-[22px] text-[#1f6665]">Países</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </Container>
    </Section>
  );
}
