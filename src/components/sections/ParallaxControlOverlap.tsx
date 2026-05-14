import { ControlPanel } from "@/components/sections/ControlPanel";
import { ParallaxCardsSection } from "@/components/sections/ParallaxCardsSection";
import { comoFuncionaScrollLayoutVars } from "@/lib/como-funciona-scroll-layout";

/**
 * Agrupa “Como funciona” + painel escuro.
 * Define tokens de altura de scroll / overlap (ver `como-funciona-scroll-layout.ts`).
 */
export function ParallaxControlOverlap() {
  return (
    <div className="relative" style={comoFuncionaScrollLayoutVars}>
      <ParallaxCardsSection />
      <ControlPanel />
    </div>
  );
}
