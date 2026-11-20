import type { ReactNode } from "react";

type Variant = "default" | "dark" | "badge";

const variants: Record<Variant, string> = {
  /** Technology tag on dark cards. */
  default: "border border-border bg-white/[0.04] text-text/90",
  /** Tag on the orange featured card. */
  dark: "bg-on-accent text-text",
  /** Section badge (accent-soft background). */
  badge: "bg-accent-soft text-accent",
};

export default function Tag({
  children,
  variant = "default",
  className = "",
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-display text-[12px] font-medium tracking-[0.04em] ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

/** Uppercase section badge, e.g. "SOBRE MIM". */
export function SectionBadge({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-accent-soft px-3.5 py-1.5 font-display text-[12px] font-bold uppercase tracking-[0.16em] text-accent ${className}`}
    >
      {children}
    </span>
  );
}

/** Section heading: 40px PC · 32px tablet · 28px HP. */
export function SectionTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={`font-display text-[28px] font-bold leading-[1.1] tracking-[-0.02em] tab:text-[32px] pc:text-[40px] ${className}`}
    >
      {children}
    </h2>
  );
}
