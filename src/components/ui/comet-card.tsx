"use client";
import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { cn } from "@/lib/utils";

const DEFAULT_CARD_SHADOW =
  "rgba(0, 0, 0, 0.01) 0px 520px 146px 0px, rgba(0, 0, 0, 0.04) 0px 333px 133px 0px, rgba(0, 0, 0, 0.26) 0px 83px 83px 0px, rgba(0, 0, 0, 0.29) 0px 21px 46px 0px";

export const CometCard = ({
  rotateDepth = 17.5,
  translateDepth = 20,
  className,
  surfaceClassName = "rounded-2xl",
  glareClassName = "rounded-2xl",
  disableHoverScale = false,
  dropShadow = true,
  children,
}: {
  rotateDepth?: number;
  translateDepth?: number;
  className?: string;
  /** Classes on the tilted surface (radius, overflow, optional shadow). */
  surfaceClassName?: string;
  /** Corner radius for the glare layer only (avoid duplicating shadows onto the overlay). */
  glareClassName?: string;
  /** Large surfaces: keep tilt, skip hover zoom. */
  disableHoverScale?: boolean;
  /** Omit the default mac-window shadow (use your own on `surfaceClassName`). */
  dropShadow?: boolean;
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [`-${rotateDepth}deg`, `${rotateDepth}deg`],
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [`${rotateDepth}deg`, `-${rotateDepth}deg`],
  );

  const translateX = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [`-${translateDepth}px`, `${translateDepth}px`],
  );
  const translateY = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [`${translateDepth}px`, `-${translateDepth}px`],
  );

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]);

  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.9) 10%, rgba(255, 255, 255, 0.75) 20%, rgba(255, 255, 255, 0) 80%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || reduceMotion) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className={cn("perspective-distant transform-3d", className)}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          translateX,
          translateY,
          ...(dropShadow ? { boxShadow: DEFAULT_CARD_SHADOW } : {}),
        }}
        initial={{ scale: 1, z: 0 }}
        whileHover={
          reduceMotion || disableHoverScale
            ? undefined
            : {
                scale: 1.05,
                z: 50,
                transition: { duration: 0.2 },
              }
        }
        className={cn("relative", surfaceClassName)}
      >
        {children}
        <motion.div
          className={cn(
            "pointer-events-none absolute inset-0 z-50 h-full w-full mix-blend-overlay",
            glareClassName,
          )}
          style={{
            background: glareBackground,
            opacity: reduceMotion ? 0 : 0.6,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </div>
  );
};
