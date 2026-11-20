import Link from "next/link";

/* Text-only wordmark. The icon artwork lives only in public/assets/favicon.svg (browser tab). */
export default function Logo({ href = "/#inicio" }: { href?: string }) {
  return (
    <Link href={href} className="flex shrink-0 items-center" aria-label="crijolise marçal — início">
      <span className="font-display text-[20px] font-extrabold tracking-[-0.03em] whitespace-nowrap">
        crijolise marçal<span className="text-accent">.</span>
      </span>
    </Link>
  );
}
