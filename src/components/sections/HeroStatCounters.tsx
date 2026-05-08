"use client";

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 2000;

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(value);
}

type StatConfig = {
  target: number;
  /** Texto colado ao número formatado, ex: "K+", "+", "%" */
  suffix: string;
  label: string;
};

const STATS: StatConfig[] = [
  { target: 90, suffix: "K+", label: "Vendas realizadas" },
  { target: 5, suffix: "K+", label: "Profissionais ativos " },
  { target: 200, suffix: "+", label: "Distribuidores conectados" },
];

export function HeroStatCounters({
  imgLineSrc,
}: {
  imgLineSrc: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [values, setValues] = useState<number[]>(() => STATS.map(() => 0));

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setStarted(true);
        io.disconnect();
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setValues(STATS.map((s) => s.target));
      return;
    }

    const targets = STATS.map((s) => s.target);
    let frameId = 0;
    const t0 = performance.now();

    function tick(now: number) {
      const elapsed = now - t0;
      const t = Math.min(1, elapsed / DURATION_MS);
      const eased = easeOutCubic(t);
      setValues(targets.map((target) => Math.round(eased * target)));
      if (t < 1) frameId = requestAnimationFrame(tick);
    }

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [started]);

  return (
    <div
      ref={rootRef}
      className="flex w-full max-w-[500px] flex-wrap items-center gap-6 text-[#c2fffe]"
      aria-label="Indicadores da plataforma"
    >
      {STATS.map((stat, i) => (
        <div key={stat.label} className="contents">
          <div className="min-w-0">
            <p className="font-display text-[32px] font-semibold leading-10 tracking-normal [font-feature-settings:'lnum'_1,'tnum'_1]">
              <span className="tabular-nums">{formatNumber(values[i] ?? 0)}</span>
              {stat.suffix}
            </p>
            <p className="font-sans text-[13px] font-normal leading-5 tracking-normal">{stat.label}</p>
          </div>
          {i < STATS.length - 1 ? (
            <img src={imgLineSrc} alt="" className="h-[38px] w-[15px] shrink-0" aria-hidden />
          ) : null}
        </div>
      ))}
    </div>
  );
}
