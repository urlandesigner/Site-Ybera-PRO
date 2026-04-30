import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

const imgHeroPattern =
  "https://www.figma.com/api/mcp/asset/d5cd7864-795c-4183-99d3-7de071da7745";
const imgLine =
  "https://www.figma.com/api/mcp/asset/615f537d-3a8e-4a09-bff1-4ebed208f357";
const imgEllipseGlow =
  "https://www.figma.com/api/mcp/asset/97e718ed-c890-4d9e-bc4b-d0195e21107f";
const imgMaleAvatar07 =
  "https://www.figma.com/api/mcp/asset/0bea5da5-6968-46bd-bc6e-1c33ebbc872e";
const imgMaleAvatar8 =
  "https://www.figma.com/api/mcp/asset/58063757-53b8-4198-8362-d3eeb8e58b98";

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <span
      className={["inline-flex size-5 shrink-0 items-center justify-center", className].filter(Boolean).join(" ")}
      aria-hidden
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2 6h8M7 3l3 3-3 3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function Hero() {
  return (
    <Section
      id="hero"
      spacing="none"
      className="relative isolate overflow-hidden bg-[linear-gradient(104.95deg,#1b807e_1.99%,#349392_98.1%)] text-white"
    >
      <div className="pointer-events-none absolute -left-[82px] -top-[111px] h-[729px] w-[1264px] max-lg:-left-10 max-lg:opacity-[0.35]">
        <img src={imgHeroPattern} alt="" className="block h-full w-full max-w-none" />
      </div>

      <div className="relative pb-[80px] pt-24 sm:pt-28 lg:pt-[120px]">
        <Container className="relative">
          <div className="flex flex-col items-center gap-8 sm:gap-10 lg:flex-row lg:items-center lg:gap-[60px]">
          <div className="flex w-full min-w-0 flex-1 flex-col gap-10 lg:gap-[72px]">
            <div className="flex flex-col gap-6 lg:gap-8">
              <div className="flex flex-col gap-5 lg:gap-6">
                <div className="inline-flex w-fit max-w-full items-center gap-2 rounded-full bg-black/10 px-3 py-2">
                  <span className="size-[6px] shrink-0 rounded-[3px] bg-[#8dd586]" />
                  <span className="font-sans text-[12px] font-bold uppercase leading-[1.3] tracking-[0.5px] text-[#c2fffe]">
                    O maior clube de cabeleireiros profissionais do Brasil
                  </span>
                </div>

                <div className="relative max-w-[702px] lg:min-h-[200px]">
                  <h1 className="font-display max-w-[702px] text-[32px] leading-[36px] tracking-tight [font-feature-settings:'lnum'_1,'tnum'_1] sm:text-[40px] sm:leading-[42px] sm:tracking-normal lg:text-[50px] lg:leading-[48px]">
                    <span className="block">
                      <span className="font-sans font-normal text-white">Gere</span>
                      <span className="font-display font-medium text-white"> </span>
                      <span className="font-display font-bold text-[#51f0b1]">lucro recorrente</span>
                      <span className="font-display font-medium text-[#c2fffe]"> </span>
                      <span className="font-sans font-normal text-white">com</span>
                    </span>
                    <span className="block">
                      <span className="font-sans font-normal text-white">a</span>
                      <span className="font-display font-medium text-white"> </span>
                      <span className="font-display font-bold text-[rgba(81,240,177,0.82)]">maior comissão</span>
                      <span className="font-display font-medium text-white"> </span>
                      <span className="font-sans font-normal text-white">do mercado</span>
                    </span>
                  </h1>
                  <p className="mt-5 max-w-[520px] font-sans text-base font-semibold leading-6 tracking-normal text-white/70 sm:text-lg lg:absolute lg:left-0 lg:top-[160px] lg:mt-0">
                    Venda sem estoque, sem logística e com controle total das suas comissões.
                  </p>
                </div>
              </div>

              <div className="flex w-full max-w-[401px] flex-row flex-nowrap items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-1 rounded-xl bg-white px-4 py-3 font-sans text-sm font-bold leading-[18px] text-[#1f6665] shadow-[0_1px_4px_0_rgba(5,5,5,0.1)] transition-[background-color,box-shadow,transform] hover:bg-[#eef8f7] hover:shadow-[0_2px_8px_0_rgba(5,5,5,0.12)] active:scale-[0.99] sm:px-5"
                >
                  Quero fazer parte do PRO
                </button>
                <button
                  type="button"
                  className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-1 rounded-xl px-3 py-3 font-sans text-sm font-bold leading-[18px] text-white transition-[background-color,color] hover:bg-white/12 active:bg-white/18 sm:px-5"
                >
                  Ver como funciona
                  <ArrowRightIcon />
                </button>
              </div>
            </div>

            <div className="flex w-full max-w-[500px] flex-wrap items-center gap-4 text-[#c2fffe] sm:gap-6">
              <div className="min-w-0">
                <p className="font-display text-[26px] font-semibold leading-8 tracking-normal [font-feature-settings:'lnum'_1,'tnum'_1] sm:text-[32px] sm:leading-10">
                  90K+
                </p>
                <p className="font-sans text-[13px] font-normal leading-5 tracking-normal">Vendas realizadas</p>
              </div>
              <img src={imgLine} alt="" className="h-[38px] w-[15px] shrink-0" />
              <div className="min-w-0">
                <p className="font-display text-[26px] font-semibold leading-8 tracking-normal [font-feature-settings:'lnum'_1,'tnum'_1] sm:text-[32px] sm:leading-10">
                  5K+
                </p>
                <p className="font-sans text-[13px] font-normal leading-5 tracking-normal">Profissionais ativos </p>
              </div>
              <img src={imgLine} alt="" className="h-[38px] w-[15px] shrink-0" />
              <div className="min-w-0">
                <p className="font-display text-[26px] font-semibold leading-8 tracking-normal [font-feature-settings:'lnum'_1,'tnum'_1] sm:text-[32px] sm:leading-10">
                  200+
                </p>
                <p className="font-sans text-[13px] font-normal leading-5 tracking-normal">Distribuidores conectados</p>
              </div>
            </div>
          </div>

          <div className="relative w-full shrink-0 lg:w-[478px]">
            <div className="pointer-events-none absolute -left-[75px] -top-[34px] flex h-[560.792px] w-[628.742px] items-center justify-center">
              <div className="shrink-0 -rotate-[112.15deg]">
                <div className="relative h-[518px] w-[394.526px]">
                  <img src={imgEllipseGlow} alt="" className="block h-full w-full max-w-none object-contain" />
                </div>
              </div>
            </div>

            <div className="relative z-[2] mx-auto w-full max-w-[440px] lg:mx-0">
              <div className="overflow-hidden rounded-[20px] bg-white">
                <div className="flex h-[43px] items-center gap-2 border-b border-[rgba(255,255,255,0.05)] pl-5">
                    <span className="size-[10px] shrink-0 rounded-[5px] bg-[#ff5f57] opacity-65" />
                    <span className="size-[10px] shrink-0 rounded-[5px] bg-[#febc2e] opacity-65" />
                    <span className="size-[10px] shrink-0 rounded-[5px] bg-[#28c840] opacity-65" />
                  </div>
                  <div className="flex flex-col gap-7 p-6">
                  <div className="max-w-[390px] space-y-1">
                    <p className="font-sans text-xs font-semibold uppercase leading-[11px] tracking-[1.5px] text-[#1f6665]">
                      suas Vendas
                    </p>
                    <p className="font-display text-[0px] leading-none text-[#1f6665]">
                      <span className="font-display text-2xl font-semibold leading-[44px]">R$ </span>
                      <span className="font-display text-[36px] font-extrabold leading-[44px]">34.200</span>
                    </p>
                    <p className="font-sans text-sm leading-[18px]">
                      <span className="font-semibold text-[#50ae47]">+18%</span>
                      <span> </span>
                      <span className="text-[#50ae47]">que o mês anterior</span>
                    </p>
                  </div>
                  <div className="flex h-[52px] max-w-[390px] items-end gap-2">
                    <span className="h-5 min-w-0 flex-[48.859_0_0] rounded-[4px] bg-[#ecebf0]" />
                    <span className="h-8 min-w-0 flex-[48.859_0_0] rounded-[4px] bg-[#ecebf0]" />
                    <span className="h-[26px] min-w-0 flex-[48.859_0_0] rounded-[4px] bg-[#ecebf0]" />
                    <span className="h-10 min-w-0 flex-[48.859_0_0] rounded-[4px] bg-[#ecebf0]" />
                    <span className="h-9 min-w-0 flex-[48.859_0_0] rounded-[4px] bg-[#ecebf0]" />
                    <span className="h-[52px] min-w-0 flex-[48.859_0_0] rounded-[4px] bg-[#ecebf0]" />
                    <span className="h-16 min-w-0 flex-[48.859_0_0] rounded-[4px] bg-[#8dd586]" />
                  </div>
                  <div className="grid max-w-[390px] grid-cols-2 gap-4">
                    {(
                      [
                        ["645", "Profissionais"],
                        ["37", "Representantes"],
                        ["R$34k", "Carteira/mês"],
                        ["85%", "Recompra"],
                      ] as const
                    ).map(([value, label]) => (
                      <div key={label} className="rounded-xl border border-[#e2e1e5] px-[17px] py-[13px]">
                        <p className="font-display text-lg font-semibold leading-6 text-[#1f6665] [font-feature-settings:'lnum'_1,'tnum'_1]">
                          {value}
                        </p>
                        <p className="font-sans text-xs font-semibold leading-[16.5px] tracking-[0.3px] text-[#505052]">
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -left-11 top-[421px] z-[3] w-[361px] max-w-[calc(100%+2.75rem)] rounded-[20px] bg-[#ecebf0] p-3 shadow-[-1px_15px_7px_rgba(0,0,0,0),-1px_10px_7px_rgba(0,0,0,0.05),0_5px_6.5px_rgba(0,0,0,0.05),0_2px_6px_rgba(0,0,0,0.05),0_1px_0.5px_rgba(0,0,0,0.08)] max-lg:left-0 max-lg:right-auto max-lg:top-full max-lg:mt-8 max-lg:w-full">
              <div className="flex items-center gap-3">
                <div className="relative size-12 shrink-0 overflow-hidden rounded-[32px]">
                  <img
                    src={imgMaleAvatar07}
                    alt=""
                    className="absolute left-[-12%] top-0 h-[125%] w-[156%] max-w-none object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-sm font-medium leading-5 text-[#1e1e1f] [font-feature-settings:'lnum'_1,'tnum'_1]">
                    Roberto Lima
                  </p>
                  <p className="font-sans text-sm font-normal leading-[18px] text-[#353849]">Nova venda realizada</p>
                </div>
                <p className="shrink-0 text-right font-mono text-base font-bold leading-[1.5] tracking-[-0.16px] text-[#50ae47]">
                  + R$930
                </p>
              </div>
            </div>

            <div className="absolute left-[151px] top-[-39px] z-[3] w-[328px] max-w-[calc(100%-1rem)] rounded-[20px] bg-[#ecebf0] p-3 shadow-[-1px_15px_7px_rgba(0,0,0,0),-1px_10px_7px_rgba(0,0,0,0.05),0_5px_6.5px_rgba(0,0,0,0.05),0_2px_6px_rgba(0,0,0,0.05),0_1px_0.5px_rgba(0,0,0,0.08)] max-lg:left-auto max-lg:right-0 max-lg:top-4">
              <div className="flex items-center gap-3">
                <img src={imgMaleAvatar8} alt="" className="size-12 shrink-0 rounded-full object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-sm font-medium leading-5 text-[#1e1e1f] [font-feature-settings:'lnum'_1,'tnum'_1]">
                    Mariana Silva Santos
                  </p>
                  <p className="font-sans text-xs font-normal leading-4 text-[#505052]">Nova venda realizada</p>
                </div>
                <p className="shrink-0 text-right font-mono text-base font-bold leading-[1.5] tracking-[-0.16px] text-[#50ae47]">
                  + R$500
                </p>
              </div>
            </div>
          </div>
          </div>
        </Container>
      </div>
    </Section>
  );
}
