"use client";

import { useId, useState } from "react";

import { Container } from "@/components/layout/Container";
import { faArrowRight, faChevronDown } from "@/lib/fa-icons";
import { Section } from "@/components/layout/Section";
import { FaIcon } from "@/components/icons/FaIcon";

type FaqItem = {
  question: string;
  answer: string;
};

const faqItems: FaqItem[] = [
  {
    question: "Preciso pagar para usar o PRO?",
    answer:
      "Não. O acesso à plataforma é gratuito. Você só paga pelos produtos adquiridos dentro do ecossistema.",
  },
  {
    question: "Quem pode se cadastrar?",
    answer:
      "Distribuidores, representantes e profissionais (cabeleireiros e salões) conforme as regras do programa. Cada perfil passa por uma análise antes da ativação.",
  },
  {
    question: "Como funciona após o cadastro?",
    answer:
      "Seu cadastro é analisado pela equipe. Quando aprovado, você recebe acesso ao PRO e pode começar a usar as ferramentas e benefícios do seu perfil.",
  },
  {
    question: "Quanto tempo leva para liberar o acesso?",
    answer:
      "O prazo pode variar conforme o volume de solicitações e a validação dos dados. Você será contatado por um canal oficial assim que houver retorno.",
  },
  {
    question: "Preciso ter CNPJ?",
    answer:
      "Depende do tipo de conta. Distribuidores costumam operar com CNPJ; profissionais e representantes seguem as regras informadas no momento do cadastro.",
  },
  {
    question: "Posso usar pelo celular?",
    answer:
      "Sim. Há experiência web e aplicativo para acompanhar vendas, carteira e outras funções no dia a dia, conforme o seu perfil.",
  },
  {
    question: "Como ganho dinheiro com o PRO?",
    answer:
      "Através de comissões, recompra da base, benefícios do ecossistema e ferramentas que ajudam a organizar vendas e ativar clientes — conforme o seu papel na rede.",
  },
  {
    question: "Posso cancelar quando quiser?",
    answer:
      "As condições de uso e encerramento seguem o contrato e as políticas vigentes no momento da sua adesão. Em caso de dúvida, fale com o suporte oficial.",
  },
];

export function FAQ() {
  const baseId = useId();
  const [openQuestion, setOpenQuestion] = useState<string | null>(faqItems[0]!.question);

  const toggle = (question: string) => {
    setOpenQuestion((prev) => (prev === question ? null : question));
  };

  return (
    <Section id="faq" className="bg-white py-14 md:py-20 lg:py-[100px]">
      <Container>
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(360px,476px)_1fr] lg:gap-12">
          <aside className="space-y-8 lg:space-y-9 lg:pr-10">
            <div className="space-y-4">
              <p className="font-sans text-xs font-bold uppercase tracking-[1.5px] text-[#1f6665]">FAQ</p>
              <h2 className="font-display text-[28px] font-semibold leading-9 text-[#1e1e1f] lg:text-[32px] lg:leading-10">
                Ainda tem dúvidas antes de começar?
              </h2>
              <p className="max-w-[412px] font-sans text-base leading-6 text-[#505052] opacity-80 lg:text-lg">
                Veja como funciona o PRO e como você pode começar a vender mais.
              </p>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#1f6665] px-5 font-sans text-sm font-bold text-white transition-colors hover:bg-[#185654] active:bg-[#144848] sm:h-auto sm:w-auto sm:py-3"
              >
                Quero me cadastrar{" "}
                <FaIcon icon={faArrowRight} className="inline h-3.5 w-3.5 align-[-2px]" aria-hidden />
              </button>
              <p className="font-sans text-xs leading-4 text-black">
                Seu cadastro será analisado e você será contatado em breve.
              </p>
            </div>
          </aside>

          <div className="space-y-0 lg:space-y-0">
            {faqItems.map((item, index) => {
              const panelId = `${baseId}-panel-${index}`;
              const buttonId = `${baseId}-trigger-${index}`;
              const expanded = openQuestion === item.question;

              return (
                <article key={item.question} className="border-b border-[#e2e1e5]">
                  <h3 className="m-0 font-display text-base font-semibold leading-6 text-[#1e1e1f] sm:text-lg">
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={expanded}
                      aria-controls={panelId}
                      onClick={() => toggle(item.question)}
                      className="flex w-full cursor-pointer items-start gap-3 pt-6 pb-5 pr-0 text-left outline-none sm:gap-4 sm:pb-6 sm:pr-5 lg:pr-5 focus-visible:ring-2 focus-visible:ring-[#1f6665] focus-visible:ring-offset-2"
                    >
                      <span className="mt-0.5 w-1 shrink-0 self-stretch py-1.5" aria-hidden>
                        <span className="block h-full rounded-[2px] bg-[#1f6665]" />
                      </span>
                      <span className="min-w-0 flex-1">{item.question}</span>
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center text-[#505052]" aria-hidden>
                        <FaIcon
                          icon={faChevronDown}
                          className={[
                            "h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
                            "motion-reduce:transition-none",
                            expanded ? "rotate-180" : "rotate-0",
                          ].join(" ")}
                        />
                      </span>
                    </button>
                  </h3>
                  <div
                    className={[
                      "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
                      "motion-reduce:transition-none",
                    ].join(" ")}
                    style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        aria-hidden={!expanded}
                        inert={!expanded}
                        className="pb-5 pr-0 sm:pr-5 lg:pr-5"
                      >
                        <p className="max-w-[640px] font-sans text-sm leading-[18px] text-[#505052]">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
