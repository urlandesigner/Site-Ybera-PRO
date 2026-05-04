"use client";

import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/layout/Container";
import { FaIcon } from "@/components/icons/FaIcon";
import { faBars, faXmark } from "@/lib/fa-icons";
import { HEADER_NAV, type HeaderAppearance } from "@/components/layout/header-config";

/**
 * onDark: Figma Header (2315:3239) — `rgba(31,102,101,0.1)`; sem backdrop-blur (evita bugs de fixed no mobile).
 */
const shell: Record<HeaderAppearance, string> = {
  onDark: "bg-[rgba(31,102,101,0.1)]",
  onLight: "bg-[rgba(255,255,255,0.97)]",
};

const navLink: Record<HeaderAppearance, string> = {
  onDark:
    "cursor-pointer font-display text-base font-medium leading-[22px] text-[#c2fffe] transition-opacity hover:opacity-85",
  onLight:
    "cursor-pointer font-display text-base font-medium leading-[22px] text-[#1f6665] transition-colors hover:text-[#155050]",
};

const cta: Record<HeaderAppearance, string> = {
  onDark:
    "rounded-xl bg-white px-3 py-2.5 font-sans text-xs font-bold leading-[18px] text-[#1f6665] transition-colors hover:bg-[#eef8f7] sm:px-4 sm:text-sm lg:px-5 lg:py-3 lg:text-sm",
  onLight:
    "rounded-xl bg-[#1f6665] px-3 py-2.5 font-sans text-xs font-bold leading-[18px] text-white transition-colors hover:bg-[#185654] sm:px-4 sm:text-sm lg:px-5 lg:py-3 lg:text-sm",
};

const mobilePanel: Record<HeaderAppearance, string> = {
  onDark: "border border-white/15 bg-[rgba(31,102,101,0.18)]",
  onLight: "border border-[#e2e1e5] bg-white",
};

const mobileToggle: Record<HeaderAppearance, string> = {
  onDark: "text-[#c2fffe]",
  onLight: "text-[#1f6665]",
};

export type HeaderProps = {
  /** `auto`: onDark enquanto o header (faixa fixa no topo) sobrepõe o #hero; onLight quando deixa de sobrepor. */
  variant?: HeaderAppearance | "auto";
};

export function Header({ variant: variantProp = "auto" }: HeaderProps) {
  const [appearance, setAppearance] = useState<HeaderAppearance>("onDark");
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerElRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (variantProp !== "auto") {
      setAppearance(variantProp);
      return;
    }

    const HEADER_ROW_PX = 64;
    let rafId = 0;

    const updateFromHeroOverlap = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const hero = document.getElementById("hero");
        if (!hero) {
          setAppearance((p) => (p === "onLight" ? p : "onLight"));
          return;
        }
        const safePad = headerElRef.current
          ? parseFloat(getComputedStyle(headerElRef.current).paddingTop) || 0
          : 0;
        const bandBottom = safePad + HEADER_ROW_PX;
        const { top, bottom } = hero.getBoundingClientRect();
        const headerOverlapsHero = bottom > 0 && top < bandBottom;
        const next = headerOverlapsHero ? "onDark" : "onLight";
        setAppearance((p) => (p === next ? p : next));
      });
    };

    updateFromHeroOverlap();
    window.addEventListener("scroll", updateFromHeroOverlap, { passive: true });
    window.addEventListener("resize", updateFromHeroOverlap);
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", updateFromHeroOverlap);
      window.visualViewport.addEventListener("scroll", updateFromHeroOverlap);
    }
    return () => {
      window.removeEventListener("scroll", updateFromHeroOverlap);
      window.removeEventListener("resize", updateFromHeroOverlap);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", updateFromHeroOverlap);
        window.visualViewport.removeEventListener("scroll", updateFromHeroOverlap);
      }
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [variantProp]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const a = appearance;

  return (
    <header
      ref={headerElRef}
      className={[
        "pointer-events-none fixed left-0 right-0 top-0 z-50 w-full pt-[env(safe-area-inset-top,0px)]",
        shell[a],
      ].join(" ")}
    >
      <Container className="pointer-events-auto relative flex h-16 max-w-full items-center justify-between gap-3 sm:gap-6">
        <a
          href="#hero"
          className="inline-flex shrink-0 cursor-pointer items-center opacity-100 transition-opacity hover:opacity-90"
          aria-label="Ybera Club PRO"
        >
          <img
            src={a === "onLight" ? "/images/logo-dark.svg" : "/images/logo-light.svg"}
            alt="Ybera Club PRO"
            width={135}
            height={30}
            className="h-[30px] w-auto"
          />
        </a>

        <nav className="hidden items-center gap-[22px] lg:flex" aria-label="Principal">
          {HEADER_NAV.map((item) => (
            <a key={item.href} href={item.href} className={navLink[a]}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            className={[
              "inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg transition-colors lg:hidden",
              a === "onDark" ? "hover:bg-white/10" : "hover:bg-black/[0.06]",
              mobileToggle[a],
            ].join(" ")}
            aria-expanded={mobileOpen}
            aria-controls="header-mobile-menu"
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span className="sr-only">{mobileOpen ? "Fechar menu" : "Abrir menu"}</span>
            {mobileOpen ? (
              <FaIcon icon={faXmark} className="h-5 w-5" aria-hidden />
            ) : (
              <FaIcon icon={faBars} className="h-[14px] w-[22px]" aria-hidden />
            )}
          </button>

          <button type="button" className={cta[a]}>
            Começar agora
          </button>
        </div>

        {mobileOpen ? (
          <div
            id="header-mobile-menu"
            className={[
              "absolute left-0 right-0 top-full z-50 mt-2 max-h-[min(70vh,calc(100dvh-5rem))] overflow-y-auto overscroll-contain rounded-xl p-4 shadow-lg lg:hidden",
              mobilePanel[a],
            ].join(" ")}
          >
            <nav className="flex flex-col gap-3" aria-label="Principal">
              {HEADER_NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={[navLink[a], "rounded-lg py-2.5 max-lg:min-h-[44px] max-lg:px-1"].join(" ")}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        ) : null}
      </Container>
    </header>
  );
}
