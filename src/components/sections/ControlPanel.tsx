"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { FaIcon } from "@/components/icons/FaIcon";
import { Section } from "@/components/layout/Section";
import { BackgroundSnippets } from "@/components/ui/background-snippets";
import { faCheck } from "@/lib/fa-icons";
import { useActiveProfile } from "@/lib/profile-content";
import type { ProfileTabId } from "@/lib/profile-tabs";

const AUTO_ADVANCE_MS = 5000;
const PROGRESS_TICK_MS = 80;

type ExpandedAudienceId = "distribuidores" | "representantes" | "profissionais";

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
  const profile = useActiveProfile();
  const byProfile: Record<
    ProfileTabId,
    {
      title: string;
      support: string;
      primaryFeatures: readonly { title: string; description: string; image: string; alt: string }[];
      expandedAudience: ExpandedAudienceId;
    }
  > = {
    distribuidor: {
      title: "Pare de perder clientes e transforme sua carteira em receita recorrente",
      support:
        "Pare de depender de feeling. Use dados para agir no momento certo e aumentar a recorrencia da sua carteira.",
      primaryFeatures: [
        {
          title: "Veja quem está ativo e quem você pode perder",
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
      ],
      expandedAudience: "distribuidores",
    },
    representante: {
      title: "Organize sua carteira e aumente suas vendas recorrentes",
      support:
        "Acompanhe clientes, pedidos e oportunidades de recompra para vender no momento certo e aumentar seus ganhos.",
      primaryFeatures: [
        {
          title: "Saiba quais clientes estão parados",
          description: "Carteira ordenada por impacto comercial e chance de recompra.",
          image: "/images/produto1.png",
          alt: "Painel comercial para representantes",
        },
        {
          title: "Receba alertas de recompra",
          description: "Ative contatos no momento ideal e reduza perdas por atraso.",
          image: "/images/produto2.png",
          alt: "Alertas de recompra para representantes",
        },
        {
          title: "Acompanhe suas vendas e comissões",
          description: "Performance por cliente, região e rota para ajustar rapidamente.",
          image: "/images/produto3.png",
          alt: "Painel de metas para representantes",
        },
      ],
      expandedAudience: "representantes",
    },
    profissional: {
      title: "Transforme atendimentos em clientes recorrentes",
      support:
        "Use dados para acompanhar recompra, identificar clientes inativos e aumentar a fidelização no salão.",
      primaryFeatures: [
        {
          title: "Veja quais clientes não retornaram",
          description: "Tudo em um fluxo simples para decidir a próxima compra com segurança.",
          image: "/images/produto1.png",
          alt: "Painel para profissionais",
        },
        {
          title: "Acompanhe produtos mais recorrentes",
          description: "Recompra orientada para evitar urgência e compra fora do plano.",
          image: "/images/produto2.png",
          alt: "Alertas de reposição para profissionais",
        },
        {
          title: "Fortaleça a recorrência do salão",
          description: "Condições e benefícios organizados para compra mais inteligente.",
          image: "/images/produto3.png",
          alt: "Campanhas e benefícios para profissionais",
        },
      ],
      expandedAudience: "profissionais",
    },
  };
  const content = byProfile[profile];
  const primaryFeatures = content.primaryFeatures;
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const activeFeature = primaryFeatures[activeFeatureIndex];

  useEffect(() => {
    setActiveFeatureIndex(0);
    setProgress(0);
  }, [profile]);

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
    <Section
      id="control-panel"
      className="relative z-10 overflow-hidden bg-[#020b10] py-14 md:py-20 lg:z-20 lg:-mt-[var(--como-funciona-overlap,0px)] lg:py-[100px]"
    >
      <BackgroundSnippets variant="dark" />
      <Container className="relative z-10">
        <div className="space-y-8 lg:space-y-10">
          <header className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,392px)] lg:items-start lg:gap-10">
            <h2 className="max-w-[620px] font-display text-[28px] font-semibold leading-9 text-white lg:text-[32px] lg:leading-10">
              {content.title}
            </h2>
            <p className="max-w-[392px] pt-1 font-sans text-base leading-6 text-white lg:text-[17px]">
              {content.support}
            </p>
          </header>

          <div className="card-border-r20 mx-auto w-full max-h-[640px] overflow-hidden bg-[#06131a] lg:w-[86.4%]">
            <div className="card-border-r20 relative max-h-[640px] overflow-hidden">
              <img
                key={activeFeature.image}
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
              aria-label="Todas as funcionalidades"
            >
              <div className="min-w-0">
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-10 md:gap-y-12 lg:grid-cols-3">
                  {expandedFeaturesByAudience[content.expandedAudience].map((item) => (
                    <div key={item.title} className="min-w-0 border-b border-[#243842]/80 pb-8 last:border-b-0 last:pb-0 md:border-0 md:pb-0">
                      <span className="mb-5 block text-white">
                        <FaIcon icon={faCheck} className="h-3.5 w-3.5" aria-hidden />
                      </span>
                      <h4 className="font-display text-base font-semibold leading-snug tracking-normal text-white">
                        {item.title}
                      </h4>
                      <p className="mt-2 font-sans text-base leading-relaxed text-white/40 lg:leading-6">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
