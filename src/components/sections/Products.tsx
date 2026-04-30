import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export function Products() {
  const productImageA = "https://www.figma.com/api/mcp/asset/bea74cd3-7823-4f29-9c84-a6fba7446884";
  const productImageB = "https://www.figma.com/api/mcp/asset/08e05ad1-b60e-4595-8b50-efd3b4b5b6ab";

  return (
    <Section id="products" className="bg-white py-14 md:py-20 lg:py-[100px]">
      <Container>
        <div className="space-y-8 lg:space-y-9">
          <header className="max-w-[560px] space-y-3">
            <p className="font-sans text-xs font-bold uppercase tracking-[1.5px] text-[#1f6665]">
              Produto
            </p>
            <h2 className="font-display text-[28px] font-semibold leading-9 text-[#1e1e1f] [font-feature-settings:'lnum'_1,'tnum'_1] lg:text-[32px] lg:leading-10">
              Produtos profissionais de alta performance
            </h2>
          </header>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            <img src={productImageA} alt="Produto Ybera 1" className="h-full w-full object-cover" />
            <img src={productImageB} alt="Produto Ybera 2" className="h-full w-full object-cover" />
            <img src={productImageA} alt="Produto Ybera 3" className="h-full w-full object-cover" />
            <img src={productImageB} alt="Produto Ybera 4" className="h-full w-full object-cover" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
