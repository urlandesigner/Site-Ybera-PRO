import type { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type ContainerProps = PropsWithChildren<{
  className?: string;
}>;

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={twMerge(
        "mx-auto w-full max-w-[1280px] px-[20px] md:px-[32px] lg:px-[40px]",
        className
      )}
    >
      {children}
    </div>
  );
}
