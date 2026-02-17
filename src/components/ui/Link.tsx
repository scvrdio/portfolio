type Variant = "up-right" | "right" | "left";

export function Link({
  href,
  children,
  variant = "up-right",
}: {
  href?: string | null;
  children: React.ReactNode;
  variant?: Variant;
}) {
  if (!href || href.trim() === "" || href === "#") return null;

  const arrow =
    variant === "right" ? "→" :
    variant === "left" ? "←" :
    "↗";

  const shouldOpenNewTab = variant !== "left";

  const Arrow = (
    <span className="t-accent ty-body text-black/60 transition-colors duration-100 group-hover:text-[#0033ff]">
      {arrow}
    </span>
  );

  return (
    <a
      href={href}
      className="group inline-flex items-center gap-1 t-accent ty-body"
      target={shouldOpenNewTab ? "_blank" : undefined}
      rel={shouldOpenNewTab ? "noreferrer" : undefined}
    >
      {variant === "left" && Arrow}
      <span>{children}</span>
      {variant !== "left" && Arrow}
    </a>
  );
}
