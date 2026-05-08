"use client";

import { Suspense, useEffect, useRef, useState } from "react";

import { Container } from "@/components/layout/Container";
import { FaIcon } from "@/components/icons/FaIcon";
import { faBars, faXmark } from "@/lib/fa-icons";
import {
  HEADER_DARK_GLASS_SURFACE,
  HEADER_LIGHT_GLASS_STRIP_BORDER,
  HEADER_LIGHT_GLASS_SURFACE,
  HEADER_NAV,
  HEADER_NAV_LINK_ON_DARK,
  HEADER_NAV_LINK_ON_LIGHT,
  type HeaderAppearance,
} from "@/components/layout/header-config";
import {
  HeaderProfileSubheader,
  HeaderProfileSubheaderFallback,
} from "@/components/layout/HeaderProfileSubheader";
import { GlassProCta } from "@/components/ui/GlassProCta";
import { cn } from "@/lib/utils";

/** Fundo tipo Mobbin: vidro fosco (blur + saturate), translúcido; sombra só de profundidade (sem hairline). */
const shell: Record<HeaderAppearance, string> = {
  onDark: HEADER_DARK_GLASS_SURFACE,
  onLight: [HEADER_LIGHT_GLASS_SURFACE, HEADER_LIGHT_GLASS_STRIP_BORDER].join(" "),
};

/**
 * Vidro só na primeira faixa (`onLight`). O `<header>` fica transparente para a segunda
 * linha não virar faixa branca em largura total; a ilha de perfil usa `.header-profile-bar` em `globals.css`.
 */
const shellLightFirstRow = [HEADER_LIGHT_GLASS_SURFACE, HEADER_LIGHT_GLASS_STRIP_BORDER].join(" ");

const navLink: Record<HeaderAppearance, string> = {
  onDark: HEADER_NAV_LINK_ON_DARK,
  onLight: HEADER_NAV_LINK_ON_LIGHT,
};

const loginLink: Record<HeaderAppearance, string> = {
  onDark:
    "inline-flex h-11 items-center justify-center rounded-xl px-3 font-sans text-base font-bold leading-5 text-white transition-colors hover:bg-white/12 sm:px-4",
  onLight:
    "inline-flex h-11 items-center justify-center rounded-xl px-3 font-sans text-base font-bold leading-5 text-[#1f6665] transition-colors hover:bg-[#eef8f7] sm:px-4",
};

const mobilePanel: Record<HeaderAppearance, string> = {
  onDark: "bg-[rgba(31,102,101,0.18)]",
  onLight: "bg-white",
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

  const handleNavClick = (href: string, closeMobile = false) => {
    if (closeMobile) setMobileOpen(false);
    if (href !== "#audience-tabs") return;

    const target = document.getElementById("audience-tabs");
    if (!target) return;

    // For this specific section, ignore global scroll-padding and pin it at viewport top.
    const top = Math.max(0, window.scrollY + target.getBoundingClientRect().top);
    window.scrollTo({ top, behavior: "smooth" });
  };

  const mainRow = (
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
          <a
            key={item.href}
            href={item.href}
            className={navLink[a]}
            onClick={(e) => {
              if (item.href !== "#audience-tabs") return;
              e.preventDefault();
              handleNavClick(item.href);
            }}
          >
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

        <a href="#" className={loginLink[a]}>
          Login
        </a>

        <GlassProCta
          href="#final-cta"
          tone={a === "onDark" ? "dark" : "light"}
          size="compact"
          showArrow={false}
        >
          Começar agora
        </GlassProCta>
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
                onClick={(e) => {
                  if (item.href === "#audience-tabs") {
                    e.preventDefault();
                    handleNavClick(item.href, true);
                    return;
                  }
                  setMobileOpen(false);
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </Container>
  );

  return (
    <header
      ref={headerElRef}
      className={cn(
        "pointer-events-none fixed left-0 right-0 top-0 z-50 w-full pt-[env(safe-area-inset-top,0px)]",
        "transition-[background-color,backdrop-filter,box-shadow] duration-300 ease-out motion-reduce:transition-none",
        a === "onLight" ? "bg-transparent shadow-none" : shell[a],
      )}
    >
      <div
        className={cn(
          "relative w-full transition-[min-height] duration-300 ease-out motion-reduce:transition-none",
          a === "onLight" ? "min-h-[5.25rem]" : "min-h-16",
        )}
      >
        <div
          className={cn(
            "w-full transition-[opacity,transform,filter] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:transform-none",
            a === "onDark"
              ? "pointer-events-auto relative z-20 translate-y-0 opacity-100"
              : "pointer-events-none absolute inset-x-0 top-0 z-10 -translate-y-2 opacity-0 blur-[1px] motion-reduce:translate-y-0 motion-reduce:blur-none",
          )}
          aria-hidden={a !== "onDark"}
        >
          {mainRow}
        </div>

        <div
          className={cn(
            "w-full transition-[opacity,transform,filter] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:transform-none",
            a === "onLight"
              ? "pointer-events-auto relative z-20 translate-y-0 opacity-100"
              : "pointer-events-none absolute inset-x-0 top-0 z-10 translate-y-2 opacity-0 blur-[1px] motion-reduce:translate-y-0 motion-reduce:blur-none",
          )}
          aria-hidden={a !== "onLight"}
        >
          <Suspense fallback={<HeaderProfileSubheaderFallback />}>
            <HeaderProfileSubheader />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
