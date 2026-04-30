import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary";
  }
>;

export function Button({
  children,
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-brand-500 text-ink-inverse hover:bg-brand-700 border-transparent shadow-sm",
    secondary:
      "bg-surface-1 text-ink-strong border-border hover:bg-surface-2",
  };

  return (
    <button
      type={type}
      className={[
        "inline-flex cursor-pointer items-center justify-center rounded-md border px-4 py-2 font-sans text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300",
        variants[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
