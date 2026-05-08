import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import WorldMap from "@/components/ui/world-map";

const globalRoutes = [
  {
    start: { lat: -23.5505, lng: -46.6333, label: "Sao Paulo" },
    end: { lat: 40.7128, lng: -74.006, label: "New York" },
  },
  {
    start: { lat: -23.5505, lng: -46.6333, label: "Sao Paulo" },
    end: { lat: 48.8566, lng: 2.3522, label: "Paris" },
  },
  {
    start: { lat: -23.5505, lng: -46.6333, label: "Sao Paulo" },
    end: { lat: 25.2048, lng: 55.2708, label: "Dubai" },
  },
  {
    start: { lat: -23.5505, lng: -46.6333, label: "Sao Paulo" },
    end: { lat: 35.6762, lng: 139.6503, label: "Tokyo" },
  },
];

export function Metrics() {
  return (
    <Section
      id="metrics"
      className="relative z-[1] overflow-hidden bg-white pt-14 pb-12 md:pb-14 md:pt-20 lg:pb-[88px] lg:pt-[100px]"
    >
      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-10 xl:gap-12">
          <div className="flex max-w-[520px] flex-col gap-8 lg:col-span-5 lg:max-w-none">
            <div className="flex flex-col gap-4">
              <header className="flex flex-col gap-3">
                <p className="font-sans text-xs font-bold uppercase tracking-[1.5px] text-[#1f6665]">
                  Escala global
                </p>
                <h2 className="font-display text-xl font-semibold leading-7 text-[#1e1e1f] lg:text-2xl lg:leading-8">
                  Mais de 1 milhão de salões já trabalham com produtos Ybera
                </h2>
              </header>
              <p className="font-sans text-base leading-6 text-[#505052] opacity-80 lg:text-lg">
                Presença global e uma operação validada em mais de 53 países.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <article className="card-border-shell card-border-r20">
                <div className="card-border-inner card-border-r20 flex min-h-[106px] items-center justify-center bg-[#f4f7f7] px-5 py-8 lg:h-[106px] lg:px-6 lg:py-9">
                  <div className="text-center">
                    <p className="font-display text-[32px] font-semibold leading-10 text-[#1f6665] [font-feature-settings:'lnum'_1,'tnum'_1]">
                      +1 milhão
                    </p>
                    <p className="font-sans text-base font-semibold leading-[22px] text-[#1f6665]">
                      Salões no mundo
                    </p>
                  </div>
                </div>
              </article>

              <article className="card-border-shell card-border-r20">
                <div className="card-border-inner card-border-r20 flex min-h-[106px] items-center justify-center bg-[#f4f7f7] px-5 py-8 lg:h-[106px] lg:px-6 lg:py-9">
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

          <div className="relative min-h-0 w-full min-w-0 lg:col-span-7">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-[min(28%,6rem)] bg-[linear-gradient(90deg,#fff_12%,transparent_100%)]"
            />
            <WorldMap
              dots={globalRoutes}
              lineColor="#1f6665"
              dotColor="#1f666599"
              backgroundColor="transparent"
              className="relative z-0 w-full max-w-full rounded-none bg-transparent dark:bg-transparent"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
