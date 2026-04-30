import { Container } from "@/components/layout/Container";

const imgChevron =
  "https://www.figma.com/api/mcp/asset/db562008-06cc-4237-a23a-9bc746115eb3";

export function EcosystemStrip() {
  return (
    <section
      id="ecosystem-strip"
      className="flex min-h-[100px] items-center border-y border-white/[0.07] bg-[#104443] py-6 text-white md:h-[100px] md:py-0"
    >
      <Container className="flex w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:gap-[60px]">
          <p className="font-sans text-[12px] font-extrabold uppercase leading-[11px] tracking-[1.5px] text-[rgba(194,255,254,0.7)]">
            Um ecossistema completo
          </p>

          <div className="hidden h-8 w-px shrink-0 bg-[rgba(255,255,255,0.15)] md:block" aria-hidden />

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 md:gap-6">
            <span className="font-display text-xl font-bold leading-7 tracking-[-0.3px] whitespace-nowrap md:text-2xl md:leading-[30px]">
              Distribuidor
            </span>
            <img src={imgChevron} alt="" width={20} height={20} className="size-5 shrink-0 object-contain" />
            <span className="font-display text-xl font-bold leading-7 tracking-[-0.3px] whitespace-nowrap md:text-2xl md:leading-[30px]">
              Representante
            </span>
            <img src={imgChevron} alt="" width={20} height={20} className="size-5 shrink-0 object-contain" />
            <span className="font-display text-xl font-bold leading-7 tracking-[-0.3px] whitespace-nowrap md:text-2xl md:leading-[30px]">
              Profissional
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
