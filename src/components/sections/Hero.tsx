import { Suspense } from "react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { CometCard } from "@/components/ui/comet-card";
import { GlassProCta } from "@/components/ui/GlassProCta";
import { HeroClubBadge } from "@/components/ui/HeroClubBadge";
import { HeroStatCounters } from "@/components/sections/HeroStatCounters";

/** Fundo da hero: arte final em `public/images/Hero@2x.jpg` (sem filtros no código). */
const imgHeroBackground = "/images/Hero@2x.jpg";
const imgLine = "/images/Lines.svg";
const imgAvatar1 = "/images/avatar1.png";
const imgAvatar2 = "/images/avatar2.png";

export function Hero() {
  return (
    <Section
      id="hero"
      spacing="none"
      className="relative isolate min-h-[min(100svh,900px)] overflow-hidden bg-[#1b807e] text-white lg:min-h-[752px]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <img
          src={imgHeroBackground}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
          sizes="100vw"
          decoding="async"
        />
      </div>

      <div className="relative pb-20 pt-24 sm:pb-[80px] sm:pt-28 lg:pt-40">
        <Container className="relative max-w-[1512px] lg:px-[100px]">
          <div className="flex flex-col items-center gap-8 sm:gap-10 lg:flex-row lg:items-center lg:gap-[60px]">
          <div className="flex w-full min-w-0 flex-1 flex-col gap-10 lg:gap-[72px]">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-6">
                <HeroClubBadge>
                  O maior clube de cabeleireiros profissionais do Brasil
                </HeroClubBadge>

                <div className="relative max-w-[702px] lg:min-h-[200px]">
                  <h1 className="font-display max-w-[702px] text-[32px] leading-[36px] tracking-tight [font-feature-settings:'lnum'_1,'tnum'_1] sm:text-[40px] sm:leading-[42px] sm:tracking-normal lg:text-[50px] lg:leading-[48px]">
                    <span className="block">
                      <span className="font-sans font-extralight text-white">Gere</span>
                      <span className="font-display font-medium text-white"> </span>
                      <AnimatedGradientText
                        colorFrom="#c2fffe"
                        colorTo="#51f0b1"
                        speed={0.85}
                        className="font-display font-bold"
                      >
                        lucro recorrente
                      </AnimatedGradientText>
                      <span className="font-display font-medium text-[#c2fffe]"> </span>
                      <span className="font-sans font-extralight text-white">com</span>
                    </span>
                    <span className="block">
                      <span className="font-sans font-extralight text-white">a</span>
                      <span className="font-display font-medium text-white"> </span>
                      <AnimatedGradientText
                        colorFrom="#c2fffe"
                        colorTo="#51f0b1"
                        speed={0.85}
                        className="font-display font-bold"
                      >
                        maior comissão
                      </AnimatedGradientText>
                      <span className="font-display font-medium text-white"> </span>
                      <span className="font-sans font-extralight text-white">do mercado</span>
                    </span>
                  </h1>
                  <p className="mt-5 max-w-[520px] font-sans text-base font-semibold leading-6 tracking-normal text-white sm:text-lg lg:absolute lg:left-0 lg:top-[160px] lg:mt-0">
                    Venda sem estoque, sem logística e com controle total das suas comissões.
                  </p>
                </div>
              </div>

              <div className="w-full max-w-[401px]">
                <Suspense fallback={null}>
                  <GlassProCta href="#final-cta" tone="dark">
                    Quero fazer parte do PRO
                  </GlassProCta>
                </Suspense>
              </div>
            </div>

            <HeroStatCounters imgLineSrc={imgLine} />
          </div>

          <div className="relative w-full shrink-0 lg:w-[478px]">
            <div
              className="relative z-[2] mx-auto w-full max-w-[440px] lg:ml-auto lg:mr-2 lg:-translate-y-4 lg:transform-gpu"
              style={{
                transform: "perspective(1400px) rotateY(-16deg) rotateX(6deg) rotateZ(2deg)",
                transformStyle: "preserve-3d",
              }}
            >
              <CometCard className="relative w-full max-w-[440px] lg:mx-0">
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
              </CometCard>
            </div>

            <div className="absolute -left-11 top-[401px] z-[3] w-[361px] max-w-[calc(100%+2.75rem)] rounded-[16px] bg-[rgba(255,255,255,0.620)] p-3 shadow-[0_10px_30px_rgba(0,0,0,0.204)] backdrop-blur-[16px] backdrop-saturate-[1.40] transition-all hover:bg-[rgba(255,255,255,0.700)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.218)] hover:backdrop-blur-[24px] max-lg:left-0 max-lg:right-auto max-lg:top-full max-lg:mt-8 max-lg:w-full">
              <div className="pointer-events-none absolute inset-0 rounded-[16px] bg-[linear-gradient(135deg,rgba(255,255,255,0.24),rgba(255,255,255,0.04))]" />
              <div className="flex items-center gap-3">
                <div className="relative size-12 shrink-0 overflow-hidden rounded-[32px]">
                  <img
                    src={imgAvatar2}
                    alt=""
                    className="absolute inset-0 h-full w-full object-contain object-center"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-sm font-medium leading-5 text-[#1e1e1f] [font-feature-settings:'lnum'_1,'tnum'_1]">
                    Roberto Lima
                  </p>
                  <p className="font-sans text-sm font-normal leading-[18px] text-[#353849]">Nova venda realizada</p>
                </div>
                <p className="shrink-0 text-right font-mono text-base font-bold leading-[1.5] tracking-[-0.16px] text-[#1f6665]">
                  + R$930
                </p>
              </div>
            </div>

            <div className="absolute left-[201px] top-[-59px] z-[3] w-[328px] max-w-[calc(100%-1rem)] rounded-[16px] bg-[rgba(255,255,255,0.620)] p-3 shadow-[0_10px_30px_rgba(0,0,0,0.204)] backdrop-blur-[16px] backdrop-saturate-[1.40] transition-all hover:bg-[rgba(255,255,255,0.700)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.218)] hover:backdrop-blur-[24px] max-lg:left-auto max-lg:right-0 max-lg:top-4">
              <div className="pointer-events-none absolute inset-0 rounded-[16px] bg-[linear-gradient(135deg,rgba(255,255,255,0.24),rgba(255,255,255,0.04))]" />
              <div className="flex items-center gap-3">
                <img src={imgAvatar1} alt="" className="size-12 shrink-0 rounded-full object-contain object-center" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-sm font-medium leading-5 text-[#1e1e1f] [font-feature-settings:'lnum'_1,'tnum'_1]">
                    Mariana Silva Santos
                  </p>
                  <p className="font-sans text-sm font-normal leading-[18px] text-[#353849]">Nova venda realizada</p>
                </div>
                <p className="shrink-0 text-right font-mono text-base font-bold leading-[1.5] tracking-[-0.16px] text-[#1f6665]">
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
