import { Container } from "@/components/layout/Container";
import { faArrowRight } from "@/lib/fa-icons";
import { Section } from "@/components/layout/Section";
import { FaIcon } from "@/components/icons/FaIcon";
import { GlassProCta } from "@/components/ui/GlassProCta";

function ListArrowIcon() {
  return (
    <span className="inline-flex size-4 shrink-0 items-center justify-center text-[#b0afb2]" aria-hidden>
      <FaIcon icon={faArrowRight} className="h-3 w-3" />
    </span>
  );
}

type AudienceCard = {
  label: string;
  labelColor: string;
  labelBg: string;
  labelBorder: string;
  title: string;
  description: string;
  points: string[];
  ctaText: string;
  ctaEmphasis?: string;
};

const cards: AudienceCard[] = [
  {
    label: "Distribuidor",
    labelColor: "#a65f00",
    labelBg: "#fefce8",
    labelBorder: "#fff085",
    title: "Venda mais sem precisar operar estoque ou entrega",
    description: "Controle sua carteira, aumente a recompra e acompanhe tudo em tempo real.",
    points: [
      "Visão completa da sua carteira de profissionais",
      "Alertas de inatividade antes de perder o cliente",
      "Acompanhe ciclos de recompra por profissional",
      "Métricas comerciais em tempo real",
    ],
    ctaText: "Começar como ",
    ctaEmphasis: "Distribuidor",
  },
  {
    label: "Profissional",
    labelColor: "#1447e6",
    labelBg: "#eff6ff",
    labelBorder: "#bedbff",
    title: "Compre melhor e aumente sua margem em cada serviço",
    description: "Acesse produtos exclusivos e benefícios que aumentam seu lucro.",
    points: [
      "Acesso direto a produtos Ybera com seu distribuidor",
      "Histórico de compras e recomendações personalizadas",
      "Participe de campanhas e promoções exclusivas",
      "Gestão de agenda e clientes integrada",
    ],
    ctaText: "Entrar como Profissional",
  },
  {
    label: "Representante",
    labelColor: "#008236",
    labelBg: "#f0fdf4",
    labelBorder: "#b9f8cf",
    title: "Ative profissionais e aumente suas vendas na prática",
    description: "Expanda sua base e ganhe mais com cada nova ativação.",
    points: [
      "Ative novos profissionais na sua região",
      "Apoie o distribuidor nas vendas e expansão",
      "Acompanhe sua carteira de ativações",
      "Suporte direto ao profissional no campo",
    ],
    ctaText: "Entrar como Representante",
  },
];

function perfilParamFromLabel(label: string) {
  return label.toLowerCase();
}

function AudienceCardCta({ card }: { card: AudienceCard }) {
  const emphasis = card.ctaEmphasis != null ? "primary" : "secondary";
  return (
    <GlassProCta
      href={`/?perfil=${perfilParamFromLabel(card.label)}#final-cta`}
      tone="light"
      emphasis={emphasis}
      size="small"
      className="w-full self-stretch sm:w-fit sm:self-start"
    >
      {card.ctaEmphasis != null ? (
        <span className="whitespace-nowrap text-center">
          <span className="font-normal">{card.ctaText}</span>
          <span className="font-semibold">{card.ctaEmphasis}</span>
        </span>
      ) : (
        <span className="whitespace-nowrap font-semibold">{card.ctaText}</span>
      )}
    </GlassProCta>
  );
}

export function AudienceTabs() {
  return (
    <Section id="audience-tabs" className="bg-surface-1 py-14 md:py-20 lg:py-[100px]">
      <Container>
        <div className="space-y-8 lg:space-y-9">
          <header className="max-w-[560px] space-y-3">
            <p className="font-sans text-xs font-bold uppercase tracking-[1.5px] text-[#1f6665]">
              Para quem é
            </p>
            <h2 className="font-display text-[28px] font-semibold leading-9 text-[#1e1e1f] lg:text-[32px] lg:leading-10">
              Se você quer vender mais e ganhar mais, o PRO é para você
            </h2>
            <p className="font-sans text-base leading-6 text-[#505052] opacity-80 lg:text-lg">
              Cada perfil atua com o que precisa para aumentar vendas, ativar clientes e gerar mais lucro.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-7 lg:grid-cols-3 lg:gap-9">
            {cards.map((card) => (
              <article
                key={card.label}
                className="card-border-shell card-border-r20 transition-transform duration-300 ease-out hover:-translate-y-2"
              >
                <div className="card-border-inner card-border-r20 flex min-h-0 flex-col justify-between bg-[#f4f7f7] px-5 py-7 lg:min-h-[480px] lg:px-[24px] lg:py-[36px]">
                  <div className="flex flex-1 flex-col gap-6">
                    <span
                      className="inline-flex w-fit rounded-full border border-solid px-[9px] py-[5px] font-sans text-sm font-semibold leading-[18px]"
                      style={{
                        color: card.labelColor,
                        backgroundColor: card.labelBg,
                        borderColor: card.labelBorder,
                      }}
                    >
                      {card.label}
                    </span>

                    <div className="flex flex-col gap-3">
                      <h3 className="font-display text-[18px] font-semibold leading-6 text-[#1e1e1f] [font-feature-settings:'lnum'_1,'tnum'_1]">
                        {card.title}
                      </h3>
                      <p className="font-sans text-base font-normal leading-5 text-[#505052]">{card.description}</p>
                    </div>

                    <ul className="flex flex-col gap-4">
                      {card.points.map((point) => (
                        <li key={point} className="flex items-center gap-2">
                          <ListArrowIcon />
                          <span className="min-w-0 flex-1 font-sans text-sm font-normal leading-[18px] text-[#505052]">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <AudienceCardCta card={card} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
