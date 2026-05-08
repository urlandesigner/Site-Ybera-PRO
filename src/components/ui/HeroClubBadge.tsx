import type { ReactNode } from "react";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { cn } from "@/lib/utils";

type HeroClubBadgeProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Badge “clube” da hero: Figma Site---PRO nó 2379:3117 (Colors/Alfa/secondary).
 * Texto com gradiente animado (Magic UI), cores alinhadas ao hero.
 */
export function HeroClubBadge({ children, className }: HeroClubBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex w-fit max-w-full items-center gap-2 rounded-full bg-[rgb(5_5_5/10%)] px-3 py-2",
        className
      )}
    >
      <span className="size-[6px] shrink-0 rounded-[3px] bg-[#8dd586]" aria-hidden />
      <AnimatedGradientText
        colorFrom="#c2fffe"
        colorTo="#51f0b1"
        speed={0.85}
        className="whitespace-nowrap font-sans text-xs font-light uppercase leading-[1.3] tracking-[0.5px]"
      >
        {children}
      </AnimatedGradientText>
    </div>
  );
}
