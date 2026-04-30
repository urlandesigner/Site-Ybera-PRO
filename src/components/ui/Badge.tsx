import type { HTMLAttributes, PropsWithChildren } from "react";

type BadgeProps = PropsWithChildren<HTMLAttributes<HTMLSpanElement>>;

export function Badge({ children, className, ...props }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border border-brand-300 bg-brand-50 px-3 py-1 font-sans text-xs font-semibold uppercase tracking-wide text-brand-700",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </span>
  );
}
