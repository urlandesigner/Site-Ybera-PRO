"use client";

import type React from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

import { cn } from "@/lib/utils";

/**
 * Brilho radial que segue o rato (mesmo padrão do `Card` do Glass Operating System),
 * adaptado a superfícies claras/gradiente.
 */
export function GlassGlowSurface({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const background = useMotionTemplate`
    radial-gradient(
      650px circle at ${mouseX}px ${mouseY}px,
      rgba(255,255,255,0.22),
      transparent 80%
    )
  `;

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn("group relative h-full w-full rounded-[19px]", className)}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[19px] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{ background }}
        aria-hidden
      />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
