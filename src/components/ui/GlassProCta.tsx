"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

type BaseProps = {
  children: ReactNode;
  className?: string;
  /** @default true */
  showArrow?: boolean;
  /** Fundo escuro/teal → `dark`; cartões ou header claro → `light`. */
  tone?: "dark" | "light";
  /** `ghost`: vidro só com borda (ex.: secundário na hero). */
  variant?: "solid" | "ghost";
  /** Com `tone="light"` e `solid`: `secondary` = verde claro (menos destaque). */
  emphasis?: "primary" | "secondary";
  /** `compact`: header; `small`: CTAs em cards (altura reduzida). */
  size?: "comfortable" | "compact" | "small";
};

type GlassProCtaLinkProps = BaseProps & {
  href: string;
} & Omit<ComponentPropsWithoutRef<"a">, "className" | "children" | "href">;

type GlassProCtaButtonProps = BaseProps & {
  href?: undefined;
  type?: "button" | "submit";
} & Omit<ComponentPropsWithoutRef<"button">, "className" | "children" | "type">;

export type GlassProCtaProps = GlassProCtaLinkProps | GlassProCtaButtonProps;

function shellClass(
  tone: "dark" | "light",
  variant: "solid" | "ghost",
  size: "comfortable" | "compact" | "small",
  emphasis: "primary" | "secondary",
) {
  const sizing =
    size === "small"
      ? "h-9 min-h-9 px-3 text-xs font-bold leading-4 sm:min-h-9 sm:px-3.5 sm:text-sm sm:leading-5"
      : size === "compact"
        ? "h-11 min-h-[44px] px-3 text-sm font-bold leading-5 sm:px-4 sm:text-base"
        : "h-[52px] min-h-[44px] px-5 text-base font-bold leading-5 sm:px-8";

  const base = cn(
    "group relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl font-sans transition-[background-color,box-shadow,border-color,color,transform] duration-300 overflow-hidden",
    sizing,
  );

  if (variant === "ghost") {
    if (tone === "dark") {
      return cn(
        base,
        "border border-white/25 bg-transparent text-white shadow-none hover:border-white/40 hover:bg-white/10 active:scale-[0.99]",
      );
    }
    return cn(
      base,
      "border border-[#d2dddd] bg-white text-[#1f6665] shadow-none hover:bg-[#eef8f7] hover:border-[#c9c8cc] active:scale-[0.99]",
    );
  }

  if (tone === "dark") {
    return cn(
      base,
      "border border-transparent bg-white text-[#1f6665] shadow-none hover:bg-[#eef8f7] hover:shadow-[0_2px_8px_0_rgba(5,5,5,0.12)] active:scale-[0.99]",
    );
  }

  if (variant === "solid" && emphasis === "secondary") {
    return cn(
      base,
      "border border-[#4aaaa9]/35 bg-[rgba(74,170,169,0.1)] text-[#1f6665] shadow-none hover:bg-[rgba(74,170,169,0.18)] hover:border-[#4aaaa9]/45 active:scale-[0.99]",
    );
  }

  return cn(
    base,
    "border border-transparent bg-[#1f6665] text-white shadow-none hover:bg-[#185654] active:bg-[#144848] active:scale-[0.99]",
  );
}

function glowClass(
  tone: "dark" | "light",
  variant: "solid" | "ghost",
  emphasis: "primary" | "secondary",
) {
  if (variant === "ghost") return null;
  if (tone === "dark") return null;
  if (emphasis === "secondary") return null;
  return "pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-tr from-white/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100";
}

export function GlassProCta(props: GlassProCtaProps) {
  const {
    children,
    className,
    showArrow = true,
    tone = "dark",
    variant = "solid",
    emphasis = "primary",
    size = "comfortable",
  } = props;

  const shell = cn(shellClass(tone, variant, size, emphasis), className);
  const glow = glowClass(tone, variant, emphasis);

  const inner = (
    <>
      {glow ? <div className={glow} aria-hidden /> : null}
      <span className="relative z-10 flex items-center justify-center gap-2 text-center">
        {children}
        {showArrow ? (
          <ArrowRight
            size={size === "small" ? 12 : size === "compact" ? 14 : 16}
            className="shrink-0 transition-transform group-hover:translate-x-1"
            aria-hidden
          />
        ) : null}
      </span>
    </>
  );

  if ("href" in props && props.href != null) {
    const {
      href,
      className: _c,
      children: _ch,
      showArrow: _sa,
      tone: _to,
      variant: _va,
      emphasis: _em,
      size: _si,
      ...anchorRest
    } = props as GlassProCtaLinkProps;
    return (
      <a href={href} className={cn(shell, "no-underline")} {...anchorRest}>
        {inner}
      </a>
    );
  }

  const {
    type = "button",
    className: _c,
    children: _ch,
    showArrow: _sa,
    tone: _to,
    variant: _va,
    emphasis: _em,
    size: _si,
    ...btnRest
  } = props as GlassProCtaButtonProps;
  return (
    <button type={type} className={shell} {...btnRest}>
      {inner}
    </button>
  );
}
