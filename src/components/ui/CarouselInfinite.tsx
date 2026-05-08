"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

export type CarouselSlideDimension = { width: string; height: string };

export interface CarouselInfiniteProps {
  images?: string[];
  alts?: string[];
  /** Um par width/height por imagem (índice alinhado a `images`). Se omitido, usa `imageWidth` / `imageHeight` em todos. */
  slideDimensions?: readonly CarouselSlideDimension[];
  backgroundColor?: string;
  imageBgColor?: string;
  imageBorderRadius?: string;
  imageOpacity?: number;
  /** Se definido, aplica `gap` fixo no track; se omitido, usa `gap-8 md:gap-24` (dobro de gap-4 / md:gap-12). */
  imageGap?: string;
  imageHeight?: string;
  imageWidth?: string;
  imageObjectFit?: "cover" | "contain";
  animationDuration?: number;
  maskGradient?: string;
  maxWidth?: string;
}

export function CarouselInfinite({
  images = [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
    "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80",
    "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80",
    "https://images.unsplash.com/photo-1549417229-aa67d3263c09?w=800&q=80",
  ],
  alts,
  slideDimensions,
  backgroundColor = "transparent",
  imageBgColor = "#e4e4e7",
  imageBorderRadius = "0.5rem",
  imageOpacity = 0.8,
  imageGap,
  imageHeight = "6rem",
  imageWidth = "8rem",
  imageObjectFit = "cover",
  animationDuration = 20,
  maskGradient = "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
  maxWidth = "32rem",
}: CarouselInfiniteProps) {
  const duplicatedImages = [...images, ...images, ...images];
  const trackRef = useRef<HTMLDivElement>(null);
  const [loopPx, setLoopPx] = useState(0);
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.scrollWidth / 3;
      setLoopPx(Number.isFinite(w) && w > 0 ? w : 0);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [images, imageGap, imageHeight, imageWidth, slideDimensions]);

  return (
    <div
      className="w-full overflow-hidden whitespace-nowrap"
      style={{
        backgroundColor,
        maxWidth,
        maskImage: maskGradient,
        WebkitMaskImage: maskGradient,
      }}
    >
      <motion.div
        ref={trackRef}
        className={cn(
          "inline-flex w-max flex-nowrap items-center",
          imageGap == null && "gap-8 md:gap-24",
        )}
        style={imageGap != null ? { gap: imageGap } : undefined}
        animate={
          reduceMotion || loopPx <= 0
            ? { x: 0 }
            : {
                x: [0, -loopPx],
              }
        }
        transition={{ repeat: Infinity, duration: animationDuration, ease: "linear" }}
      >
        {duplicatedImages.map((src, i) => {
          const idx = i % images.length;
          const dim = slideDimensions?.[idx];
          const slideW = dim?.width ?? imageWidth;
          const slideH = dim?.height ?? imageHeight;
          return (
          <div
            key={`${src}-${i}`}
            className="flex shrink-0 items-center justify-center overflow-hidden"
            style={{
              height: slideH,
              width: slideW,
              borderRadius: imageBorderRadius,
              backgroundColor: imageBgColor,
            }}
          >
            <img
              src={src}
              className="max-h-full max-w-full"
              style={{ opacity: imageOpacity, objectFit: imageObjectFit }}
              alt={alts?.[idx] ?? `Slide ${idx + 1}`}
              loading="lazy"
              decoding="async"
            />
          </div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default CarouselInfinite;
