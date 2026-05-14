type BackgroundSnippetsProps = {
  variant?: "light" | "dark";
};

export function BackgroundSnippets({ variant = "light" }: BackgroundSnippetsProps) {
  if (variant === "dark") {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 h-full w-full">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_0%,rgba(31,102,101,0.35),transparent_65%)]" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]" />
    </div>
  );
}

/** Alias para compatibilidade com o snippet original (tema claro). */
export const Component = () => <BackgroundSnippets variant="light" />;
