"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { HEADER_PROFILE_NAV_LINK_ON_LIGHT } from "@/components/layout/header-config";
import { useActiveProfile } from "@/lib/profile-content";
import { cn } from "@/lib/utils";
import { PROFILE_TAB_IDS, type ProfileTabId } from "@/lib/profile-tabs";

const LABELS: Record<ProfileTabId, string> = {
  distribuidor: "Distribuidor",
  representante: "Representante",
  profissional: "Profissional",
};

/** Mesmo tipo/hover da primeira faixa; aba ativa só reforça cor (como destaque de seção). */
const profileLinkBase = "rounded-full px-3 py-1.5";
const profileLinkActive =
  "border-0 bg-[#2f7f7e] text-white shadow-none outline-none ring-0 focus-visible:outline-none focus-visible:ring-0 hover:text-white transition-none";

const barVariants = {
  barrav1:
    "relative mx-auto w-fit max-w-[calc(100vw-2rem)] rounded-full border-[0.5px] border-solid border-[rgba(226,228,232,0.95)] bg-[rgba(170,255,216,0.126)] p-2 shadow-[0_2px_10px_rgba(0,0,0,0.045)] backdrop-blur-[16px] backdrop-saturate-[1.40] transition-all hover:bg-[rgba(170,255,216,0.198)] hover:shadow-[0_2px_12px_rgba(0,0,0,0.055)] hover:backdrop-blur-[24px]",
  barrav2:
    "relative mx-auto w-fit max-w-[calc(100vw-2rem)] rounded-full border-[0.5px] border-solid border-[rgba(186,218,214,0.95)] bg-[rgba(224,236,234,0.9)] p-2 shadow-[0_2px_10px_rgba(0,0,0,0.045)] backdrop-blur-[16px] backdrop-saturate-[1.40] transition-all hover:bg-[rgba(214,228,226,0.93)] hover:shadow-[0_2px_12px_rgba(0,0,0,0.055)] hover:backdrop-blur-[24px]",
} as const;

const activeBarVariant = barVariants.barrav2;
const APPEAR_AFTER_SECTION_ID = "benefits";
const HIDE_AT_SECTION_ID = "faq";
const REVEAL_OFFSET_PX = 96;

/** Conteúdo compacto para o padding externo de 8px ficar visível em todos os lados. */
const dockInner =
  "relative z-10 flex w-fit items-center justify-center";

function ProfileBarContent({
  resolved,
  onSelectProfile,
}: {
  resolved: ProfileTabId;
  onSelectProfile?: (id: ProfileTabId) => void;
}) {
  return (
    <Container className="pointer-events-auto">
      <div className={activeBarVariant}>
        <div className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(135deg,rgba(255,255,255,0.20),rgba(255,255,255,0.02))]" />
        <div className={dockInner}>
          <nav
            className="flex shrink-0 items-center justify-center gap-2"
            aria-label="Escolha seu perfil"
          >
            {PROFILE_TAB_IDS.map((id) => {
              const active = resolved === id;
              return (
                <Link
                  key={id}
                  href={`/?perfil=${id}`}
                  scroll={false}
                  onClick={() => onSelectProfile?.(id)}
                  className={cn(
                    HEADER_PROFILE_NAV_LINK_ON_LIGHT,
                    "whitespace-nowrap transition-none",
                    profileLinkBase,
                    active && profileLinkActive,
                  )}
                >
                  {LABELS[id]}
                </Link>
              );
            })}
          </nav>

        </div>
      </div>
    </Container>
  );
}

export function HeaderProfileSubheader() {
  const resolved = useActiveProfile();
  const [pendingProfile, setPendingProfile] = useState<ProfileTabId | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const selectedProfile = pendingProfile ?? resolved;

  useEffect(() => {
    setPendingProfile((current) => (current === resolved ? null : current));
  }, [resolved]);

  useEffect(() => {
    const updateVisibility = () => {
      const hideSection = document.getElementById(HIDE_AT_SECTION_ID);
      if (hideSection && hideSection.getBoundingClientRect().top <= REVEAL_OFFSET_PX) {
        setIsVisible(false);
        return;
      }

      const section = document.getElementById(APPEAR_AFTER_SECTION_ID);
      if (!section) {
        setIsVisible(false);
        return;
      }
      const rect = section.getBoundingClientRect();
      setIsVisible(rect.bottom <= REVEAL_OFFSET_PX);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed left-0 right-0 z-40 top-[calc(env(safe-area-inset-top,0px)+4rem+0.375rem)] transition-[opacity,transform] duration-300 ease-out",
        isVisible ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0",
      )}
      aria-hidden={!isVisible}
    >
      <ProfileBarContent resolved={selectedProfile} onSelectProfile={setPendingProfile} />
    </div>
  );
}

/** Fallback sem `useSearchParams` (Suspense). */
export function HeaderProfileSubheaderFallback() {
  return (
    <div
      className="pointer-events-none fixed left-0 right-0 z-40 top-[calc(env(safe-area-inset-top,0px)+4rem+0.375rem)] -translate-y-1 opacity-0"
      aria-hidden
    >
      <ProfileBarContent resolved="distribuidor" />
    </div>
  );
}
