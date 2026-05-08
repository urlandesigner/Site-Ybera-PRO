import { Container } from "@/components/layout/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";

export function Footer() {
  return (
    <footer className="bg-[#1e1e1f] pb-8 pt-10 text-[#b0afb2] lg:pb-10 lg:pt-[52px]">
      <Container>
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1.3fr] lg:gap-16">
          <div className="w-full space-y-5 lg:max-w-[360px]">
            <img
              src="https://www.figma.com/api/mcp/asset/c6e6e697-57d6-406c-9391-343d0abea668"
              alt="Ybera PRO"
              className="h-7 w-[239px]"
            />
            <p className="font-sans text-sm leading-[18px]">
              Plataforma para ativar sua carteira, aumentar a recompra e gerar vendas recorrentes com
              previsibilidade.
            </p>
            <div className="flex items-center gap-3 font-sans text-xs leading-4">
              <a href="#" className="hover:text-white">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-white">
                Termos de Uso
              </a>
            </div>
            <div className="flex items-center gap-3 text-base">
              <a
                href="#"
                aria-label="Instagram"
                className="flex size-9 items-center justify-center rounded-lg transition-colors hover:bg-white/10 hover:text-white"
              >
                <FontAwesomeIcon icon={faInstagram} className="size-5" aria-hidden />
              </a>
              <a
                href="#"
                aria-label="TikTok"
                className="flex size-9 items-center justify-center rounded-lg transition-colors hover:bg-white/10 hover:text-white"
              >
                <FontAwesomeIcon icon={faTiktok} className="size-5" aria-hidden />
              </a>
            </div>
          </div>

          <div className="space-y-5">
            <p className="font-display text-sm font-medium leading-5 text-white">Produto</p>
            <div className="space-y-3 font-sans text-xs leading-4">
              <p>Como funciona</p>
              <p>Para quem é</p>
              <p>Benefícios</p>
              <p>FAQ</p>
            </div>
          </div>

          <div className="space-y-5">
            <p className="font-display text-sm font-medium leading-5 text-white">Plataforma</p>
            <div className="space-y-3 font-sans text-xs leading-4">
              <p>Criar conta</p>
              <p>Entrar como distribuidor</p>
              <p>Entrar como profissional</p>
              <p>Entrar como representante</p>
            </div>
          </div>

          <div className="space-y-5">
            <p className="font-display text-sm font-medium leading-5 text-white">Empresa</p>
            <div className="space-y-3 font-sans text-xs leading-4">
              <p>Sobre a Ybera</p>
              <p>Contato</p>
              <p>Suporte</p>
            </div>
          </div>

          <div className="space-y-5">
            <p className="font-display text-sm font-medium leading-5 text-white">Atendimento</p>
            <div className="space-y-4 font-sans text-xs leading-4">
              <p>pro@ybera.com.br</p>
              <p>+55 22 99251-1907</p>
              <p>Segunda a sexta das 8h00 às 16h30</p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-4">
          <p className="text-center font-sans text-xs leading-4">© 2026 Ybera Group. Todos os direitos reservados.</p>
        </div>
      </Container>
    </footer>
  );
}
