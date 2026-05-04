import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

/** Assets — frame Produtos (Figma 2315:2980). */
const imgComboMirra =
  "https://www.figma.com/api/mcp/asset/e0d6f519-37ef-423c-906e-66dae237d334";
const imgLineVello =
  "https://www.figma.com/api/mcp/asset/15ed739d-49d9-4527-aba2-1d93ffb2b61e";

const productDescription = "Nutrição para cabelos longos e lisos";

const products = [
  {
    image: imgComboMirra,
    name: "Mirra",
    description: productDescription,
    alt: "Linha Mirra — combo oil, shampoo e máscara",
  },
  {
    image: imgLineVello,
    name: "Vello",
    description: productDescription,
    alt: "Linha Vello — shampoo, máscara e tônico",
  },
  {
    image: imgComboMirra,
    name: "Mirra",
    description: productDescription,
    alt: "Linha Mirra — combo oil, shampoo e máscara",
  },
  {
    image: imgLineVello,
    name: "Vello",
    description: productDescription,
    alt: "Linha Vello — shampoo, máscara e tônico",
  },
] as const;

export function Products() {
  return (
    <Section id="products" className="bg-white py-14 md:py-20 lg:py-[100px]">
      <Container>
        <div className="flex flex-col gap-9 lg:gap-[36px]">
          <header className="max-w-[560px] space-y-3">
            <p className="font-sans text-xs font-bold uppercase tracking-[1.5px] text-[#1f6665]">
              Produtos
            </p>
            <h2 className="font-display text-[28px] font-semibold leading-9 text-[#1e1e1f] [font-feature-settings:'lnum'_1,'tnum'_1] lg:text-[32px] lg:leading-10">
              Produtos profissionais de alta performance
            </h2>
          </header>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-9 lg:grid-cols-4 lg:gap-9">
            {products.map((p, index) => (
              <article
                key={`${p.name}-${index}`}
                className="relative aspect-[4/3] w-full min-w-0 overflow-hidden rounded-xl bg-[#f4f7f7] lg:aspect-[618/564]"
              >
                <img
                  src={p.image}
                  alt={p.alt}
                  className="absolute inset-0 size-full object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  decoding="async"
                />
                <div className="pointer-events-none absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4">
                  <div
                    className={[
                      "max-w-[229px] rounded-xl p-4 backdrop-blur-[10px]",
                      "bg-[rgba(194,194,194,0.28)]",
                    ].join(" ")}
                  >
                    <div className="flex flex-col gap-2">
                      <p className="font-display text-base font-semibold leading-[22px] text-[#1e1e1f] [font-feature-settings:'lnum'_1,'tnum'_1]">
                        {p.name}
                      </p>
                      <p className="font-sans text-sm font-normal leading-[18px] text-[#505052]">
                        {p.description}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
