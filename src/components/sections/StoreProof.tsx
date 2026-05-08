import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { CarouselInfinite } from "@/components/ui/CarouselInfinite";

const LOGO_SRC = {
  yberaParis: "/images/logo-yberaparis.svg",
  fashionGold: "/images/logo-fashiongold.svg",
  terraCoco: "/images/logo-terracoco.svg",
  blackDiva: "/images/logo-blackdiva.svg",
} as const;

const LOGO_IMAGES = [
  LOGO_SRC.yberaParis,
  LOGO_SRC.fashionGold,
  LOGO_SRC.terraCoco,
  LOGO_SRC.blackDiva,
] as const;

const LOGO_ALTS = [
  "Logo Ybera Paris",
  "Logo Fashion Gold",
  "Logo Terra Coco",
  "Logo Black Diva",
] as const;

/** Mesmas dimensões da grid estática anterior (sem distorcer com caixa única). */
const LOGO_SLIDE_DIMS = [
  { width: "197px", height: "71px" },
  { width: "123px", height: "64px" },
  { width: "108px", height: "108px" },
  { width: "136px", height: "88px" },
] as const;

export function StoreProof() {
  return (
    <Section
      id="store-proof"
      spacing="none"
      className="bg-[#f4f7f7] pt-0 pb-14 md:pb-20 lg:pb-[100px]"
    >
      <Container>
        <div className="mx-auto w-full max-w-[min(100%,72rem)] py-2">
          <CarouselInfinite
            images={[...LOGO_IMAGES]}
            alts={[...LOGO_ALTS]}
            slideDimensions={LOGO_SLIDE_DIMS}
            backgroundColor="transparent"
            imageBgColor="transparent"
            imageBorderRadius="0.5rem"
            imageOpacity={0.5}
            imageObjectFit="contain"
            animationDuration={32}
            maskGradient="linear-gradient(to right, transparent, black 12%, black 88%, transparent)"
            maxWidth="100%"
          />
        </div>
      </Container>
    </Section>
  );
}
