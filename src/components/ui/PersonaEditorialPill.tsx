import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";
import { parseHexToRgb } from "@/lib/parse-hex-to-rgb";

type PersonaEditorialPillProps = PropsWithChildren<{
  /** Cor principal da persona (`#RRGGBB`) — texto + mistura suave de fundo/borda. */
  accentColor: string;
  className?: string;
}>;

/**
 * Pill editorial para labels de persona (texto em uppercase via CSS).
 * Estilo global `.persona-editorial-pill` (globals.css): fundo/borda a partir do accent, hover suave.
 */
export function PersonaEditorialPill({ accentColor, className, children }: PersonaEditorialPillProps) {
  const { r, g, b } = parseHexToRgb(accentColor);
  return (
    <span
      className={cn(
        "persona-editorial-pill inline-flex w-fit items-center justify-center rounded-full border border-solid",
        "px-3.5 py-1.5 font-sans text-xs font-semibold uppercase leading-none tracking-[0.08em]",
        "shadow-[0_2px_8px_rgba(16,24,40,0.04),0_1px_2px_rgba(16,24,40,0.03)]",
        "motion-reduce:transition-none",
        className,
      )}
      style={{
        color: accentColor,
        ["--pill-r" as string]: String(r),
        ["--pill-g" as string]: String(g),
        ["--pill-b" as string]: String(b),
      }}
    >
      {children}
    </span>
  );
}
