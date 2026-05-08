import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

/** Fotos do frame Figma 2315:3014 (salões / vitrine PRO). */
const imgSalonA =
  "https://www.figma.com/api/mcp/asset/cd73e1c9-8acc-47ef-9f5a-1b1b43cdc28c";
const imgSalonB =
  "https://www.figma.com/api/mcp/asset/db5e9e5e-c741-4538-bec8-0e67f181a72b";
const imgSalonC =
  "https://www.figma.com/api/mcp/asset/00cb1ffe-5b17-4edb-bd07-2b4f6f961659";

const gallery = [
  { src: imgSalonA, alt: "Ambiente de salão com branding Ybera Paris e exposição de produtos" },
  { src: imgSalonB, alt: "Estação de lavagem em salão com exposição de linha profissional" },
  { src: imgSalonC, alt: "Balcão e vitrine de produtos em salão parceiro" },
] as const;

/** Seção “Produtos exclusivos” com copy de margem + grid 3 fotos (abaixo do carrossel V2 na home antiga). */
export function ExclusiveProducts() {
  return (
    <Section id="exclusive-products" className="bg-white pb-7 pt-14 md:pb-10 md:pt-20 lg:pb-[50px] lg:pt-[100px]">
      <Container>
        <div className="flex flex-col gap-9 lg:gap-[36px]">
          <header className="max-w-[560px] space-y-3">
            <p className="font-sans text-xs font-bold uppercase tracking-[1.5px] text-[#1f6665]">
              Produtos exclusivos
            </p>
            <div className="space-y-4">
              <h2 className="font-display text-[28px] font-semibold leading-9 text-[#1e1e1f] [font-feature-settings:'lnum'_1,'tnum'_1] lg:text-[32px] lg:leading-10">
                Venda produtos que não estão disponíveis para o consumidor final
              </h2>
              <p className="font-sans text-base leading-6 text-[#505052] opacity-80 lg:text-lg lg:leading-6">
                Mais valor, mais margem e menos concorrência direta.
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {gallery.map(({ src, alt }) => (
              <div
                key={src}
                className="relative aspect-square w-full min-w-0 overflow-hidden rounded-xl bg-[#f4f7f7]"
              >
                <img
                  src={src}
                  alt={alt}
                  className="absolute inset-0 size-full object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
