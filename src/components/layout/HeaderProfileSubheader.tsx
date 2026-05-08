"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { HEADER_PROFILE_NAV_LINK_ON_LIGHT } from "@/components/layout/header-config";
import { GlassProCta } from "@/components/ui/GlassProCta";
import { cn } from "@/lib/utils";
import { PROFILE_TAB_IDS, profileTabFromSearchParam, type ProfileTabId } from "@/lib/profile-tabs";

const LABELS: Record<ProfileTabId, string> = {
  distribuidor: "Distribuidor",
  representante: "Representante",
  profissional: "Profissional",
};

/** Mesmo tipo/hover da primeira faixa; aba ativa só reforça cor (como destaque de seção). */
const profileLinkActive = "text-[#155050]";

const barVariants = {
  barrav1:
    "relative mx-auto w-full max-w-[1040px] rounded-[16px] border-[0.5px] border-solid border-[rgba(226,228,232,0.95)] bg-[rgba(170,255,216,0.126)] pl-3 shadow-[0_2px_10px_rgba(0,0,0,0.045)] backdrop-blur-[16px] backdrop-saturate-[1.40] transition-all hover:bg-[rgba(170,255,216,0.198)] hover:shadow-[0_2px_12px_rgba(0,0,0,0.055)] hover:backdrop-blur-[24px]",
  barrav2:
    "relative mx-auto w-full max-w-[1040px] rounded-[16px] border-[0.5px] border-solid border-[rgba(226,228,232,0.95)] bg-[rgba(255,255,255,0.828)] pl-3 shadow-[0_2px_10px_rgba(0,0,0,0.045)] backdrop-blur-[16px] backdrop-saturate-[1.40] transition-all hover:bg-[rgba(255,255,255,0.864)] hover:shadow-[0_2px_12px_rgba(0,0,0,0.055)] hover:backdrop-blur-[24px]",
} as const;

const activeBarVariant = barVariants.barrav2;

/** Espelha `mainRow` dentro do Container: `h-16`, gaps e cluster direito iguais ao header branco. */
const dockInner =
  "relative z-10 flex h-16 w-full items-center justify-between gap-3 px-[10px] sm:gap-6";

function HeaderProfileSubheaderInner() {
  const searchParams = useSearchParams();
  const resolved = profileTabFromSearchParam(searchParams.get("perfil")) ?? "distribuidor";

  return (
    <Container className="pointer-events-auto mt-3">
      <div className={activeBarVariant}>
        <div className="pointer-events-none absolute inset-0 rounded-[16px] bg-[linear-gradient(135deg,rgba(255,255,255,0.20),rgba(255,255,255,0.02))]" />
        <div className={dockInner}>
          <a
            href="#hero"
            className="inline-flex shrink-0 cursor-pointer items-center pr-12 opacity-100 transition-opacity hover:opacity-90"
            aria-label="Ybera Club PRO"
          >
            <img
              src="/images/logo-dark.svg"
              alt="Ybera Club PRO"
              width={135}
              height={30}
              className="h-[30px] w-auto"
            />
          </a>

          <nav
            className="flex shrink-0 items-center justify-center gap-[22px]"
            aria-label="Escolha seu perfil"
          >
            {PROFILE_TAB_IDS.map((id) => {
              const active = resolved === id;
              return (
                <Link
                  key={id}
                  href={`/?perfil=${id}#final-cta`}
                  scroll={false}
                  className={cn(
                    HEADER_PROFILE_NAV_LINK_ON_LIGHT,
                    "whitespace-nowrap",
                    active && profileLinkActive,
                  )}
                >
                  {LABELS[id]}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2 pl-12 sm:gap-3">
            <GlassProCta href="#final-cta" tone="light" size="compact" showArrow={false}>
              Começar agora
            </GlassProCta>
          </div>
        </div>
      </div>
    </Container>
  );
}

/** Segunda faixa do header (logo + perfis + CTA), só em `onLight`. */
export function HeaderProfileSubheader() {
  return <HeaderProfileSubheaderInner />;
}

/** Fallback sem `useSearchParams` (Suspense). */
export function HeaderProfileSubheaderFallback() {
  const resolved: ProfileTabId = "distribuidor";
  return (
    <Container className="pointer-events-auto mt-3">
      <div className={activeBarVariant}>
        <div className="pointer-events-none absolute inset-0 rounded-[16px] bg-[linear-gradient(135deg,rgba(255,255,255,0.20),rgba(255,255,255,0.02))]" />
        <div className={dockInner}>
          <a
            href="#hero"
            className="inline-flex shrink-0 cursor-pointer items-center pr-12 opacity-100 transition-opacity hover:opacity-90"
            aria-label="Ybera Club PRO"
          >
            <img
              src="/images/logo-dark.svg"
              alt="Ybera Club PRO"
              width={135}
              height={30}
              className="h-[30px] w-auto"
            />
          </a>
          <nav
            className="flex shrink-0 items-center justify-center gap-[22px]"
            aria-label="Escolha seu perfil"
          >
            {PROFILE_TAB_IDS.map((id) => {
              const active = resolved === id;
              return (
                <Link
                  key={id}
                  href={`/?perfil=${id}#final-cta`}
                  scroll={false}
                  className={cn(
                    HEADER_PROFILE_NAV_LINK_ON_LIGHT,
                    "whitespace-nowrap",
                    active && profileLinkActive,
                  )}
                >
                  {LABELS[id]}
                </Link>
              );
            })}
          </nav>
          <div className="flex shrink-0 items-center gap-2 pl-12 sm:gap-3">
            <GlassProCta href="#final-cta" tone="light" size="compact" showArrow={false}>
              Começar agora
            </GlassProCta>
          </div>
        </div>
      </div>
    </Container>
  );
}
