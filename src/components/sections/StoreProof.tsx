import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

const LOGO_SRC = {
  yberaParis:
    "https://www.figma.com/api/mcp/asset/d514c7b4-34e6-46f7-8796-89c5917d7cbe",
  fashionGold:
    "https://www.figma.com/api/mcp/asset/f0fa6eaf-6fb0-485a-a62b-f5f4941cc28d",
  terraCoco:
    "https://www.figma.com/api/mcp/asset/ab88b87d-2774-4f72-b5fd-83b703affe01",
  blackDiva:
    "https://www.figma.com/api/mcp/asset/55d35d58-1a16-4590-84cd-f6bd0ab19611",
} as const;

export function StoreProof() {
  return (
    <Section id="store-proof" className="bg-white py-5">
      <Container>
        <div className="grid auto-rows-fr grid-cols-2 items-center gap-4 py-6 md:h-[200px] md:grid-cols-4 md:gap-12 md:py-0">
          <div className="flex min-h-[120px] items-center justify-center rounded-[20px] bg-white p-4 md:h-[200px] md:min-h-0 md:p-6">
            <img
              src={LOGO_SRC.yberaParis}
              alt="Logo Ybera Paris"
              className="h-[71px] w-[197px] object-contain"
            />
          </div>
          <div className="flex min-h-[120px] items-center justify-center rounded-[20px] bg-white p-4 md:h-[200px] md:min-h-0 md:p-6">
            <img
              src={LOGO_SRC.fashionGold}
              alt="Logo Fashion Gold"
              className="h-16 w-[123px] object-contain"
            />
          </div>
          <div className="flex min-h-[120px] items-center justify-center rounded-[20px] bg-white p-4 md:h-[200px] md:min-h-0 md:p-6">
            <img
              src={LOGO_SRC.terraCoco}
              alt="Logo Terra Coco"
              className="h-[108px] w-[108px] object-contain"
            />
          </div>
          <div className="flex min-h-[120px] items-center justify-center rounded-[20px] bg-white p-4 md:h-[200px] md:min-h-0 md:p-6">
            <img
              src={LOGO_SRC.blackDiva}
              alt="Logo Black Diva"
              className="h-[88px] w-[136px] object-contain"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
