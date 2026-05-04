import type { ComponentPropsWithRef, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type SectionProps = PropsWithChildren<{
  id?: string;
  className?: string;
  /** `none` skips default vertical padding (for Hero and other full-bleed blocks). */
  spacing?: "default" | "none";
}> &
  Omit<ComponentPropsWithRef<"section">, "className" | "children">;

export function Section({
  id,
  className,
  children,
  spacing = "default",
  style,
  ...rest
}: SectionProps) {
  const basePadding = spacing === "none" ? "" : "py-16 md:py-20";
  return (
    <section id={id} className={twMerge(basePadding, className)} style={style} {...rest}>
      {children}
    </section>
  );
}
