import { Container } from "@/components/layout/Container";

export function Footer() {
  return (
    <footer className="bg-[#1e1e1f] pb-10 pt-12 text-[#b0afb2] lg:pt-[60px]">
      <Container>
        <div className="flex flex-col flex-wrap items-start justify-between gap-10 lg:flex-row lg:gap-12">
          <div className="w-full space-y-6 lg:w-[300px]">
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
            <div className="flex items-center gap-3 font-sans text-base">
              <a href="#" aria-label="Instagram" className="hover:text-white">
                instagram
              </a>
              <a href="#" aria-label="TikTok" className="hover:text-white">
                tiktok
              </a>
            </div>
          </div>

          <div className="grid w-full grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 sm:gap-10">
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
        </div>

        <div className="mt-9 border-t border-white/10 pt-4">
          <p className="text-center font-sans text-xs leading-4">© 2026 Ybera Group. Todos os direitos reservados.</p>
        </div>
      </Container>
    </footer>
  );
}
