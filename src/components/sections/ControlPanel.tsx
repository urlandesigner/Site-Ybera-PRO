"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { cn } from "@/lib/utils";

const AUTO_ADVANCE_MS = 5000;
const PROGRESS_TICK_MS = 80;

const expandedAudienceIds = ["distribuidores", "representantes", "profissionais"] as const;
type ExpandedAudienceId = (typeof expandedAudienceIds)[number];

const expandedAudienceLabels: Record<ExpandedAudienceId, string> = {
  distribuidores: "Distribuidores",
  representantes: "Representantes",
  profissionais: "Profissionais",
};

const expandedFeaturesByAudience: Record<
  ExpandedAudienceId,
  readonly { title: string; description: string }[]
> = {
  distribuidores: [
    {
      title: "Mapa da carteira por atividade",
      description:
        "Visualize ativos, em risco e inativos em uma única tela, com leitura rápida de concentração e saúde da base — sem montar BI paralelo.",
    },
    {
      title: "Segmentação por valor e frequência",
      description:
        "Monte cortes por ticket, recência e potencial para definir política comercial, campanhas de trade e prioridade de suporte à rede.",
    },
    {
      title: "Painel de metas e ritmo da operação",
      description:
        "Acompanhe vendas, recompra e produtividade da operação com linha do tempo clara para alinhar time interno e cobrar resultado.",
    },
    {
      title: "Histórico completo de pedidos",
      description:
        "Consulte compras anteriores por cliente ou por representante para dar suporte à rede, resolver divergência e orientar próximo passo.",
    },
    {
      title: "Relatórios para decisão",
      description:
        "Visões objetivas para comitê comercial: números organizados para justificar ação, cortar ruído e acelerar alinhamento interno.",
    },
    {
      title: "Hub único da operação",
      description:
        "Carteira, pedidos e indicadores no mesmo lugar para reduzir planilha duplicada, versões conflitantes e retrabalho entre áreas.",
    },
    {
      title: "Previsão de receita e cenários",
      description:
        "Projete faturamento por canal, região e representante com base no ritmo atual de recompra — útil para comitê, trade e metas trimestrais.",
    },
    {
      title: "Governança de política comercial",
      description:
        "Centralize tabelas, condições especiais e exceções aprovadas para evitar venda fora da regra e conflito entre áreas.",
    },
    {
      title: "Auditoria de pedidos e divergências",
      description:
        "Rastreio de alterações, cancelamentos e ajustes com contexto para fechar o mês com segurança e resposta rápida à rede.",
    },
    {
      title: "Exportações e rotinas para o financeiro",
      description:
        "Arquivos e visões prontas para conciliação, fechamento e integração com processos internos sem retrabalho manual.",
    },
  ],
  representantes: [
    {
      title: "Priorização de contatos do dia",
      description:
        "Lista ordenada por impacto no resultado e proximidade da recompra, para gastar rota onde o retorno é maior.",
    },
    {
      title: "Alertas de recompra e esfriamento",
      description:
        "Receba aviso quando o cliente entra na janela ideal de nova compra ou quando o relacionamento começa a esfriar.",
    },
    {
      title: "Campanhas de ativação e reativação",
      description:
        "Dispare ações rápidas em massa com mensagem alinhada ao distribuidor e acompanhamento de quem respondeu.",
    },
    {
      title: "Performance por profissional e território",
      description:
        "Veja ranking, gaps e oportunidades por base atendida para decidir visita, treino e follow-up sem achismo.",
    },
    {
      title: "Metas e pendências em tempo real",
      description:
        "Aderência a volume, mix de produtos e cadastro em dia — para corrigir rota antes do fechamento do período.",
    },
    {
      title: "Agenda de visitas ligada à carteira",
      description:
        "Planeje rota com base em prioridade, distância e janela de recompra, sem depender de anotações soltas ou planilhas paralelas.",
    },
    {
      title: "Registro de interações por cliente",
      description:
        "Histórico de visitas, ligações e próximos passos para retomar conversa com contexto e evitar promessa duplicada.",
    },
    {
      title: "Sugestão de mix por perfil de salão",
      description:
        "Indicadores de oportunidade por linha e ticket para orientar abordagem comercial sem depender só de feeling.",
    },
    {
      title: "Campanhas ativas e taxa de resposta",
      description:
        "Acompanhe disparos, adesão e retorno por território para ajustar mensagem e foco antes do fim da janela.",
    },
    {
      title: "Comparativo de performance no território",
      description:
        "Veja seu posicionamento relativo a metas e pares internos para priorizar correção de rota onde o impacto é maior.",
    },
  ],
  profissionais: [
    {
      title: "Pedidos e histórico de compras",
      description:
        "Linha do tempo de pedidos e status para planejar reposição do salão e reduzir ligação para conferência manual.",
    },
    {
      title: "Lembretes de recompra",
      description:
        "Notificações quando produtos-chave da sua rotina entram no ciclo típico de recompra da sua operação.",
    },
    {
      title: "Condições e benefícios claros",
      description:
        "Transparência sobre margens, promoções vigentes e canais oficiais com o distribuidor — menos improviso na precificação.",
    },
    {
      title: "Catálogo e linha profissional",
      description:
        "Acesso organizado ao que está disponível para o seu perfil de cliente e novidades da marca em um só fluxo.",
    },
    {
      title: "Menos atrito operacional",
      description:
        "Concentração de informações operacionais para você gastar tempo no salão, não caçando pedido ou condição em vários canais.",
    },
    {
      title: "Status de entrega e previsão",
      description:
        "Acompanhe despacho, trânsito e previsão de chegada para combinar recebimento com a rotina do salão.",
    },
    {
      title: "Notas fiscais e documentos",
      description:
        "Acesso organizado a comprovantes e NF-e relacionados aos seus pedidos para contabilidade e conferência rápida.",
    },
    {
      title: "Sugestão de reabastecimento",
      description:
        "Indicações com base no ritmo de consumo dos produtos que mais giram no seu salão, reduzindo ruptura e excesso.",
    },
    {
      title: "Comunicados da marca",
      description:
        "Novidades de linha, campanhas vigentes e orientações oficiais em um único feed, sem ruído de grupos paralelos.",
    },
    {
      title: "Canal direto com o distribuidor",
      description:
        "Menos ida e volta em canais informais: dúvidas operacionais concentradas onde o histórico fica registrado.",
    },
  ],
};

export function ControlPanel() {
  const primaryFeatures = [
    {
      title: "Veja quem está ativo e quem você pode perder.",
      description: "Tenha visibilidade da carteira em tempo real para identificar oportunidades e riscos.",
      image: "/images/produto1.png",
      alt: "Painel com visão de carteira e atividade de clientes",
    },
    {
      title: "Seja avisado antes do cliente parar de comprar",
      description:
        "Antecipe recompras, recupere pedidos perdidos e priorize contatos com maior impacto no caixa.",
      image: "/images/produto2.png",
      alt: "Painel com alertas e indicadores de oportunidade",
    },
    {
      title: "Aumente recorrência e previsibilidade de receita",
      description: "Transforme dados da operação em ações práticas que aceleram vendas recorrentes.",
      image: "/images/produto3.png",
      alt: "Painel de performance e previsibilidade de receita",
    },
  ] as const;
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [expandedAudience, setExpandedAudience] = useState<ExpandedAudienceId>("distribuidores");
  const activeFeature = primaryFeatures[activeFeatureIndex];

  useEffect(() => {
    setProgress(0);
    const step = (100 * PROGRESS_TICK_MS) / AUTO_ADVANCE_MS;
    const id = window.setInterval(() => {
      setProgress((current) => {
        const next = current + step;
        if (next >= 100) {
          setActiveFeatureIndex(
            (prev) => (prev - 1 + primaryFeatures.length) % primaryFeatures.length,
          );
          return 0;
        }
        return next;
      });
    }, PROGRESS_TICK_MS);

    return () => window.clearInterval(id);
  }, [activeFeatureIndex, primaryFeatures.length]);

  return (
    <Section id="control-panel" className="bg-[#020b10] py-14 md:py-20 lg:py-[100px]">
      <Container>
        <div className="space-y-8 lg:space-y-10">
          <header className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,392px)] lg:items-start lg:gap-10">
            <h2 className="max-w-[620px] font-display text-[28px] font-semibold leading-9 text-white lg:text-[32px] lg:leading-10">
              Pare de perder clientes e transforme sua carteira em receita recorrente
            </h2>
            <p className="max-w-[392px] pt-1 font-sans text-base leading-6 text-white lg:text-[17px]">
              Pare de depender de feeling. Use dados para agir no momento certo e aumentar a recorrencia da sua
              carteira.
            </p>
          </header>

          <div className="card-border-r20 mx-auto w-full max-h-[598px] overflow-hidden bg-[#06131a] lg:w-[86.4%]">
            <div className="card-border-r20 relative max-h-[598px] overflow-hidden">
              <img
                src={activeFeature.image}
                alt={activeFeature.alt}
                className="h-auto w-full object-cover object-top"
                decoding="async"
              />
              {/*
                Fade inferior premium: blur leve + escurecimento atmosférico (sem branco/lavado).
                Máscara longa evita “corte”; vinheta radial dá profundidade sem esconder o dashboard.
              */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[min(52%,300px)] min-h-[112px]"
                style={{
                  WebkitBackdropFilter: "blur(3px)",
                  backdropFilter: "blur(3px)",
                  background: [
                    "linear-gradient(to bottom,",
                    "rgba(2,11,16,0) 0%,",
                    "rgba(2,11,16,0) 44%,",
                    "rgba(2,11,16,0.035) 58%,",
                    "rgba(2,11,16,0.08) 74%,",
                    "rgba(2,11,16,0.14) 88%,",
                    "rgba(2,11,16,0.19) 100%",
                    ")",
                    ",",
                    "radial-gradient(ellipse 115% 85% at 50% 108%,",
                    "rgba(0,0,0,0.12) 0%,",
                    "rgba(0,0,0,0.04) 42%,",
                    "transparent 68%",
                    ")",
                  ].join(" "),
                  WebkitMaskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 42%, rgba(0,0,0,0.12) 55%, rgba(0,0,0,0.38) 72%, rgba(0,0,0,0.72) 88%, rgba(0,0,0,1) 100%)",
                  maskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 42%, rgba(0,0,0,0.12) 55%, rgba(0,0,0,0.38) 72%, rgba(0,0,0,0.72) 88%, rgba(0,0,0,1) 100%)",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskSize: "100% 100%",
                  maskSize: "100% 100%",
                }}
                aria-hidden
              />
            </div>
          </div>

          <div
            dir="ltr"
            className="grid grid-cols-1 gap-6 pt-6 [direction:ltr] md:grid-cols-3 md:gap-8"
          >
            {primaryFeatures.map((feature, index) => (
              <button
                key={feature.title}
                type="button"
                onClick={() => setActiveFeatureIndex(index)}
                className={`space-y-3 border-t border-[#2a3d47] pt-4 text-left transition-opacity duration-300 md:border-t-0 md:pt-0 ${
                  activeFeatureIndex === index ? "opacity-100" : "opacity-60"
                }`}
                aria-pressed={activeFeatureIndex === index}
              >
                <span className="relative block h-[4px] w-full overflow-hidden bg-[#141e24]">
                  <span
                    className="absolute inset-y-0 left-0 bg-[#1f6665] transition-[width] duration-75 ease-linear"
                    style={{
                      width: activeFeatureIndex === index ? `${progress}%` : "0%",
                    }}
                  />
                </span>
                <p className="font-display text-2xl font-semibold leading-8 text-white">{feature.title}</p>
                <p className="font-sans text-base leading-6 text-white">{feature.description}</p>
              </button>
            ))}
          </div>

          <div className="mt-12 flex justify-center md:mt-16">
            <button
              type="button"
              onClick={() => setShowAllFeatures((prev) => !prev)}
              className="inline-flex h-[52px] items-center justify-center gap-2 rounded-xl border border-white bg-transparent px-5 font-sans text-base font-bold leading-5 text-white transition-colors hover:bg-white/10 active:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020b10]"
              aria-expanded={showAllFeatures}
            >
              {showAllFeatures ? "Ocultar funcionalidades" : "Ver todas as funcionalidades"}
              <ChevronDown
                className={`size-5 shrink-0 transition-transform duration-300 ease-out ${showAllFeatures ? "rotate-180" : ""}`}
                strokeWidth={2}
                aria-hidden
              />
            </button>
          </div>

          {showAllFeatures ? (
            <div
              className="border-t border-[#1d2b33] pt-8 lg:pt-10"
              role="region"
              aria-label="Funcionalidades por perfil"
            >
              <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,220px)_minmax(0,1fr)] lg:items-start lg:gap-x-12 xl:grid-cols-[minmax(0,260px)_minmax(0,1fr)] xl:gap-x-16">
                <nav aria-label="Escolha o perfil" className="flex flex-col">
                  <p className="mb-3 font-sans text-xs font-bold uppercase tracking-[1.2px] text-white/45">
                    Por público
                  </p>
                  <div role="tablist" className="relative pl-6">
                    <span
                      className="pointer-events-none absolute bottom-2 left-0 top-2 w-px bg-white/25"
                      aria-hidden
                    />
                    {expandedAudienceIds.map((id) => {
                      const selected = expandedAudience === id;
                      return (
                        <button
                          key={id}
                          type="button"
                          role="tab"
                          aria-selected={selected}
                          aria-controls={`control-panel-features-${id}`}
                          id={`control-panel-tab-${id}`}
                          onClick={() => setExpandedAudience(id)}
                          className={cn(
                            "relative block w-full py-2.5 text-left font-display text-[22px] font-semibold leading-[1.15] tracking-[-0.01em] transition-colors lg:text-[24px]",
                            selected ? "text-white" : "text-white/50 hover:text-white/75",
                          )}
                        >
                          <span
                            className={cn(
                              "pointer-events-none absolute -left-6 top-1/2 h-8 w-[3px] -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-300",
                              selected && "bg-[#1f6665] opacity-100",
                            )}
                            aria-hidden
                          />
                          {expandedAudienceLabels[id]}
                        </button>
                      );
                    })}
                  </div>
                </nav>

                <div
                  role="tabpanel"
                  id={`control-panel-features-${expandedAudience}`}
                  aria-labelledby={`control-panel-tab-${expandedAudience}`}
                  className="min-w-0 border-t border-[#1d2b33] pt-8 lg:border-t-0 lg:border-l lg:border-[#1d2b33] lg:pt-0 lg:pl-10 xl:pl-14"
                >
                  <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-10 md:gap-y-12">
                    {expandedFeaturesByAudience[expandedAudience].map((item) => (
                      <div key={item.title} className="min-w-0 border-b border-[#243842]/80 pb-8 last:border-b-0 last:pb-0 md:border-0 md:pb-0">
                        <h4 className="font-display text-[17px] font-semibold leading-snug tracking-normal text-white lg:text-lg">
                          {item.title}
                        </h4>
                        <p className="mt-2 font-sans text-[15px] leading-relaxed text-white/75 lg:text-base lg:leading-6">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
