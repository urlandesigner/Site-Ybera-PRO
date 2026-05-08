import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

/** Assets: frame Multiplataforma (Figma 2315:2954, Dev Mode). */
const imgScreen = "/images/produto1.png";
const imgPhone = "https://www.figma.com/api/mcp/asset/64557df8-e589-4923-9c8e-cac9164efc20";

/**
 * Frame 22 (2315:2954) no Figma: altura total **487px** (padding 100 + área útil 287 + padding 100).
 * Os mocks ultrapassam a base do frame; a seção Metrics cobre a parte inferior (z-index + fundo).
 */
const PREVIEW_W = 660;
const PREVIEW_H = 485;
const MAC_W = 571;
const MAC_H = 408;
const PHONE_W = 188;
const PHONE_H = 392;
const MAC_LEFT = 0;
const MAC_TOP = 0;
const PHONE_LEFT = 472;
const PHONE_TOP = 93;

const pct = (n: number, d: number) => `${(n / d) * 100}%`;

export function AppPreview() {
  return (
    <Section
      id="app-preview"
      spacing="none"
      className={[
        /* `hidden` + `visible` em eixos diferentes vira `auto` no outro eixo; scroll indesejado. `clip` não. */
        "relative z-0 overflow-x-clip overflow-y-visible bg-[#f4f7f7] py-14 md:py-20",
        /* Altura total do frame Figma 22 (487px) em desktop, com padding 100 igual ao arquivo. */
        "lg:box-border lg:h-[487px] lg:min-h-[487px] lg:max-h-[487px] lg:shrink-0 lg:py-[100px]",
      ].join(" ")}
    >
      <Container className="h-full lg:min-h-0 lg:h-full">
        {/*
          Área útil no Figma: 487 − 200 = 287px de altura. Coluna esquerda no topo; mocks alinhados
          à base da área útil para ultrapassarem para baixo (parcialmente sob a próxima seção).
        */}
        <div className="grid gap-8 lg:h-full lg:min-h-0 lg:grid-cols-[480px_1fr] lg:gap-[36px] lg:items-stretch">
          <div className="space-y-8 lg:max-w-[480px] lg:space-y-5 lg:self-start lg:pt-0">
            <header className="space-y-3">
              <p className="font-sans text-xs font-bold uppercase tracking-[1.5px] text-[#1f6665]">
                Multiplataforma
              </p>
              <h2 className="font-display text-xl font-semibold leading-7 text-[#1e1e1f] lg:text-2xl lg:leading-8">
                Acompanhe suas vendas e seus ganhos de qualquer lugar
              </h2>
              <p className="font-sans text-base leading-6 text-[#505052] opacity-80 lg:text-lg">
                Distribuidores gerenciam a operação pelo web enquanto representantes e profissionais
                atuam pelo app no dia a dia.
              </p>
              <p className="font-sans text-base leading-6 text-[#505052] opacity-80 lg:text-lg">
                Acompanhe suas vendas e solicite seus ganhos direto pelo sistema, de onde estiver.
              </p>
            </header>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <img
                src="/images/btn-android.svg"
                alt="Disponível no Google Play"
                width={120}
                height={40}
                className="h-10 w-[120px]"
                decoding="async"
              />
              <img
                src="/images/btn-ios.svg"
                alt="Baixar na App Store"
                width={120}
                height={40}
                className="h-10 w-[120px]"
                decoding="async"
              />
            </div>
          </div>

          {/*
            Ancorado embaixo, o bloco escala pela largura da coluna e sobra para baixo.
            translateY = altura do bloco − altura da área (cqh), para o topo alinhar à área útil
            e o excesso ir só para baixo (sob Metrics), sem invadir a seção anterior.
          */}
          <div className="relative flex min-h-0 w-full min-w-0 items-end justify-end overflow-visible [container-type:size] [container-name:app-mock] lg:h-full lg:min-h-0">
            <div
              className="relative mx-auto w-full max-w-[660px] max-lg:mx-auto max-lg:max-w-[min(660px,calc(100vw-48px))] lg:mx-0 lg:ml-auto lg:mr-0 lg:[transform:translateY(max(0px,calc(min(100cqw,660px)*485/660-100cqh)))]"
              style={{ aspectRatio: `${PREVIEW_W} / ${PREVIEW_H}` }}
            >
              <div className="absolute inset-0 overflow-visible">
                <div
                  className="absolute z-[1] overflow-hidden"
                  style={{
                    left: pct(MAC_LEFT, PREVIEW_W),
                    top: pct(MAC_TOP, PREVIEW_H),
                    width: pct(MAC_W, PREVIEW_W),
                    height: pct(MAC_H, PREVIEW_H),
                  }}
                >
                  <img
                    src={imgScreen}
                    alt="Preview da plataforma web"
                    className="absolute inset-0 size-full max-w-none object-contain"
                    decoding="async"
                  />
                </div>
                <img
                  src={imgPhone}
                  alt="Preview do app mobile"
                  width={PHONE_W}
                  height={PHONE_H}
                  className="absolute z-[2] max-h-none max-w-none object-contain"
                  style={{
                    left: pct(PHONE_LEFT, PREVIEW_W),
                    top: pct(PHONE_TOP, PREVIEW_H),
                    width: pct(PHONE_W, PREVIEW_W),
                    height: pct(PHONE_H, PREVIEW_H),
                  }}
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
