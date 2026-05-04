import { Container } from "@/components/layout/Container";
import { faCheck } from "@/lib/fa-icons";
import { Section } from "@/components/layout/Section";
import { FaIcon } from "@/components/icons/FaIcon";

export function ControlPanel() {
  const imgScreen = "https://www.figma.com/api/mcp/asset/bf43b444-1aae-4d5c-87a5-cbf8778cda5a";
  const imgDivider = "https://www.figma.com/api/mcp/asset/0bcda5cb-877f-4c3e-9ab4-aef2ccb7551d";
  const imgBezels = "https://www.figma.com/api/mcp/asset/18295300-eb55-42d4-8db0-b41b66f4ed0d";
  const imgBezelsStroke = "https://www.figma.com/api/mcp/asset/76c7ecad-3693-4219-ab7e-a0b149db2609";
  const imgBase = "https://www.figma.com/api/mcp/asset/9a6688e1-dcbd-4d1f-bc9f-c5f7f641537f";
  const imgBaseCenter = "https://www.figma.com/api/mcp/asset/5a863f54-2185-4264-adc1-2898c5806005";
  const imgNotchCamera = "https://www.figma.com/api/mcp/asset/f9a330ea-e38c-4c4c-b0ae-263accf1253f";

  const bullets = [
    "Visual completo da sua carteira",
    "Acompanhamento de recompra",
    "Carteira organizada e inteligente",
    "Relacionamento mais próximo com profissionais",
  ];

  return (
    <Section id="control-panel" className="bg-[#f7f9f8] py-14 md:py-20 lg:py-[100px]">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,590px)_minmax(0,1fr)] lg:items-stretch lg:gap-[60px]">
          <div className="min-w-0 space-y-8 lg:space-y-9">
            <header className="max-w-[560px] space-y-3">
              <p className="font-sans text-xs font-bold uppercase tracking-[1.5px] text-[#1f6665]">
                Benefícios
              </p>
              <h2 className="font-display text-[28px] font-semibold leading-9 text-[#1e1e1f] lg:text-[32px] lg:leading-10">
                Controle sua carteira e saiba exatamente onde está o seu dinheiro
              </h2>
              <p className="font-sans text-base leading-6 text-[#505052] opacity-80 lg:text-lg">
                Veja quem compra, quem parou de comprar e o que fazer para recuperar vendas antes de
                perder clientes.
              </p>
            </header>

            <div className="max-w-[428.5px] space-y-3">
              {bullets.map((item) => (
                <div key={item} className="card-border-shell card-border-r12">
                  <div className="card-border-inner card-border-r12 flex h-[52px] items-center gap-3 bg-white pl-3 pr-6 py-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#4aaaa91a] text-[#1f6665]">
                      <FaIcon icon={faCheck} className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="font-sans text-base font-semibold leading-5 text-[#1f6665]">{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex min-w-0 flex-col justify-center rounded-[20px] bg-white/10 lg:justify-end">
            <div className="relative mx-auto w-full max-w-[725px] lg:ml-0 lg:mr-auto">
              <div className="relative aspect-[725/437] w-full">
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute inset-[89.45%_8.88%_4.63%_8.88%]">
                    <img alt="" src={imgDivider} className="h-full w-full" />
                  </div>
                  <div className="absolute inset-[0_8.88%_10.55%_8.88%]">
                    <img alt="" src={imgBezels} className="h-full w-full" />
                  </div>
                  <div className="absolute inset-[0_8.88%_4.63%_8.88%]">
                    <img alt="" src={imgBezelsStroke} className="h-full w-full" />
                  </div>
                  <div className="absolute inset-[93.25%_0_0.83%_0]">
                    <img alt="" src={imgBase} className="h-full w-full" />
                  </div>
                  <div className="absolute inset-[93.25%_41.23%_4.63%_41.34%]">
                    <img alt="" src={imgBaseCenter} className="h-full w-full" />
                  </div>
                  <div className="absolute inset-[2.22%_10.11%_12.03%_10.11%]">
                    <img alt="Painel PRO" src={imgScreen} className="h-full w-full object-contain" />
                  </div>
                  <div className="absolute inset-[2.22%_44.92%_94.91%_44.92%]">
                    <img alt="" src={imgNotchCamera} className="h-full w-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
