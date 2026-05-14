"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion, useTransform, type MotionValue } from "motion/react";

interface CardProps {
  id: number;
  className?: string;
  /** Scroll progress 0→1 (ex.: `useScroll` no container da coluna). */
  progress: MotionValue<number>;
  range: number[];
  targetScale: number;
  /** Classes do wrapper `position: sticky` (altura do “segmento” de scroll). */
  stickyClassName?: string;
  /** Alinhamento vertical do card dentro do segmento sticky (`start` = topo alinhado ao preview ao lado). */
  verticalAlign?: "center" | "start";
  /** Classes extras no wrapper sticky (ex.: altura mínima do segmento de scroll). */
  segmentMinClassName?: string;
  children?: React.ReactNode;
}

export default function ParallaxCardEffect({
  id,
  className,
  progress,
  range,
  targetScale,
  stickyClassName = "top-0",
  verticalAlign = "center",
  segmentMinClassName = "min-h-0",
  children,
}: CardProps) {
  const scale = useTransform(progress, range, [1, targetScale]);

  const alignClasses =
    verticalAlign === "start"
      ? "items-start justify-start pt-0 pb-6"
      : "items-center justify-center py-6";

  const motionTop =
    verticalAlign === "start"
      ? `${id === 2 ? 52 : id * 24}px`
      : `calc(-5vh + ${id * 30}px)`;

  return (
    <div
      className={cn(
        "sticky flex w-full",
        segmentMinClassName,
        alignClasses,
        stickyClassName,
      )}
    >
      <motion.div
        style={{
          scale,
          top: motionTop,
        }}
        className={cn("relative w-full", className)}
      >
        {children}
      </motion.div>
    </div>
  );
}
