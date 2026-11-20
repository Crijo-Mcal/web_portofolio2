import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "dark";

const base =
  "relative inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 font-display text-[14px] font-medium leading-none whitespace-nowrap transition-colors";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-on-accent shadow-accent hover:bg-[#ffb94d]",
  outline: "border border-white/80 text-text hover:bg-white hover:text-on-accent",
  dark: "bg-on-accent text-text hover:bg-[#262626]",
};

type ButtonProps = {
  href?: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
  /** Open in a new tab (external links). */
  external?: boolean;
  /** Download attribute for files. */
  download?: boolean;
  ariaLabel?: string;
};

/**
 * Link styled as a button. Without an href it renders a disabled <button>
 * (used for demo/repo/CV links that are not available yet).
 */
export default function Button({
  href,
  variant = "primary",
  children,
  className = "",
  external,
  download,
  ariaLabel,
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${className}`;

  if (!href) {
    return (
      <button type="button" disabled className={`${cls} cursor-not-allowed opacity-45`} aria-label={ariaLabel}>
        {children}
      </button>
    );
  }

  const isExternal = external ?? /^(https?:|mailto:)/.test(href);
  // Same-page anchors ("#projetos") use a native <a>: Next's <Link> skips the scroll
  // when the URL already has that hash, so a second click would do nothing.
  const isHash = href.startsWith("#");
  if (isExternal || download || isHash) {
    return (
      <a
        href={href}
        className={cls}
        aria-label={ariaLabel}
        {...(download ? { download: true } : {})}
        {...(isExternal && href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
