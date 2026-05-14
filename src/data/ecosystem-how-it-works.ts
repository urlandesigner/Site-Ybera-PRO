import { faBriefcase, faUser, faUsers } from "@/lib/fa-icons";

export const ecosystemHowItWorksContent = {
  heading: "Entenda como o ecossistema Ybera PRO funciona",
  support:
    "O PRO conecta distribuidores, representantes e profissionais em uma única operação integrada, com visibilidade, recorrência e crescimento contínuo.",
  cards: [
    {
      title: "Distribuidor",
      description:
        "Gerencia a operação, acompanha a rede e monitora indicadores de crescimento em tempo real.",
      bullets: ["Controle da carteira", "Visão da recorrência", "Gestão da rede comercial"],
      icon: faUsers,
    },
    {
      title: "Representante",
      description: "Ativa profissionais, acompanha relacionamento e fortalece a recompra da carteira.",
      bullets: ["Ativação de profissionais", "Acompanhamento em campo", "Expansão da base ativa"],
      icon: faBriefcase,
    },
    {
      title: "Profissional",
      description: "Compra produtos, atende clientes e mantém recorrência através da operação no app.",
      bullets: ["Compras recorrentes", "Gestão de pedidos", "Acesso ao ecossistema"],
      icon: faUser,
    },
  ],
} as const;

export type EcosystemHowCard = (typeof ecosystemHowItWorksContent.cards)[number];
