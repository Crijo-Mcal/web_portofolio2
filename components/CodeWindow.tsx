"use client";

import { motion, type Variants } from "motion/react";
import { EASE_OUT } from "./motion";

/* Token colours — kept to the site palette: orange accent + shades of white */
const C = {
  kw: "text-accent", // keywords
  key: "text-white/60", // object keys
  str: "text-white", // strings
  fn: "text-[#ffd08a]", // functions / booleans (light orange)
  p: "text-white/40", // punctuation
  cm: "text-white/35 italic", // comments
};

type Token = [text: string, cls?: string];

const LINES: Token[][] = [
  [["// sobre-mim.js", C.cm]],
  [["const ", C.kw], ["developer", C.fn], [" = {", C.p]],
  [["  nome", C.key], [": ", C.p], ['"Crijolise"', C.str], [",", C.p]],
  [["  papel", C.key], [": ", C.p], ['"Full-Stack"', C.str], [",", C.p]],
  [["  local", C.key], [": ", C.p], ['"Portugal"', C.str], [",", C.p]],
  [["  stack", C.key], [": [", C.p], ['"React"', C.str], [", ", C.p], ['"PHP"', C.str], [", ", C.p], ['"Node"', C.str], ["],", C.p]],
  [["  aprender", C.key], [": () => ", C.p], ["true", C.fn], [",", C.p]],
  [["};", C.p]],
  [],
  [["developer", C.fn], [".", C.p], ["construir", C.fn], ["();", C.p]],
];

const list: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 1.3, staggerChildren: 0.11 } },
};
const line: Variants = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE_OUT } },
};

/** Decorative floating code editor shown in the hero's right column (large screens only). */
export default function CodeWindow({ className = "" }: { className?: string }) {
  return (
    <motion.div
      aria-hidden="true"
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 40, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate: 2 }}
      transition={{ duration: 1, ease: EASE_OUT, delay: 1.1 }}
    >
      {/* Gentle infinite float */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
        className="overflow-hidden rounded-[10px] border border-border bg-card/90 shadow-card backdrop-blur-sm"
      >
        <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
          <span className="size-2.5 rounded-full bg-white/25" />
          <span className="size-2.5 rounded-full bg-white/25" />
          <span className="size-2.5 rounded-full bg-accent" />
          <span className="ml-3 font-mono text-[12px] text-white/50">sobre-mim.js</span>
        </div>

        <motion.pre
          variants={list}
          initial="hidden"
          animate="show"
          className="overflow-hidden px-4 py-4 font-mono text-[13px] leading-[1.7]"
        >
          {LINES.map((tokens, i) => (
            <motion.div key={i} variants={line} className="flex whitespace-pre">
              <span className="mr-4 w-4 shrink-0 text-right text-white/20 select-none">{i + 1}</span>
              <span>
                {tokens.length === 0 ? " " : tokens.map(([t, cls], j) => <span key={j} className={cls}>{t}</span>)}
                {i === LINES.length - 1 && (
                  <motion.span
                    className="ml-0.5 inline-block h-[1.1em] w-[7px] translate-y-[3px] bg-accent"
                    animate={{ opacity: [1, 1, 0, 0] }}
                    transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
                  />
                )}
              </span>
            </motion.div>
          ))}
        </motion.pre>
      </motion.div>

      {/* Small floating sticker, out of phase with the window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 16, delay: 2.4 }}
        className="absolute -top-5 -left-6"
      >
        <motion.div
          animate={{ y: [0, 8, 0], rotate: [-8, -4, -8] }}
          transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
          className="rounded-[10px] bg-accent px-3 py-1.5 font-mono text-[13px] font-bold text-on-accent shadow-accent"
        >
          &lt;/&gt;
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
