"use client";

/**
 * Small animation helpers built on `motion` (Framer Motion).
 * Server components can wrap content with these without becoming client components.
 * Respects `prefers-reduced-motion` via <MotionProvider> (transforms are skipped, only opacity fades).
 */
import { MotionConfig, motion, type HTMLMotionProps, type Variants } from "motion/react";
import type { ReactNode } from "react";

export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

const VIEWPORT = { once: true, amount: 0.2 } as const;

/** Fade + slide up when scrolled into view. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  ...rest
}: { children: ReactNode; delay?: number; y?: number } & Omit<HTMLMotionProps<"div">, "children">) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, ease: EASE_OUT, delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

const staggerParent: Variants = {
  hidden: {},
  show: (stagger: number = 0.08) => ({ transition: { staggerChildren: stagger } }),
};

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

/** Container whose <StaggerItem> children appear one after another when in view. */
export function Stagger({
  children,
  as = "div",
  stagger = 0.08,
  className,
  ...rest
}: {
  children: ReactNode;
  as?: "div" | "ul";
  stagger?: number;
  className?: string;
} & Pick<HTMLMotionProps<"div">, "aria-label">) {
  const Comp = as === "ul" ? motion.ul : motion.div;
  return (
    <Comp
      variants={staggerParent}
      custom={stagger}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className={className}
      {...rest}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({
  children,
  as = "div",
  className,
  title,
}: {
  children: ReactNode;
  as?: "div" | "li";
  className?: string;
  title?: string;
}) {
  const Comp = as === "li" ? motion.li : motion.div;
  return (
    <Comp variants={staggerChild} className={className} title={title}>
      {children}
    </Comp>
  );
}

/** Progress bar that grows from the left when in view. */
export function GrowBar({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: EASE_OUT, delay: 0.2 + delay }}
      className={`origin-left ${className ?? ""}`}
    />
  );
}
