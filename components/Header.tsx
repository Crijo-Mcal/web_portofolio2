"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { EASE_OUT } from "./motion";

const NAV = [
  { id: "inicio", label: "Início" },
  { id: "sobre", label: "Sobre" },
  { id: "experiencia", label: "Experiência" },
  { id: "competencias", label: "Competências" },
  { id: "projetos", label: "Projetos" },
  { id: "contactos", label: "Contactos" },
];

export default function Header({ emailUrl }: { emailUrl: string }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("inicio");

  // Highlight the section currently in view: the last section whose top has passed
  // a line just below the sticky header. The last section (Contactos) can't scroll
  // up to that line, so once the page is scrolled to the bottom it becomes active.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
      if (!sections.length) return;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) return setActive(sections[sections.length - 1].id);
      // Just below the point where a clicked section lands (html scroll-padding-top),
      // so a short section like Sobre stays active after clicking it.
      const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 88;
      const line = padding + 48;
      let current = sections[0].id;
      for (const s of sections) if (s.getBoundingClientRect().top <= line) current = s.id;
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Close the mobile menu with Escape or when resizing to desktop.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 901px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      className="sticky top-0 z-50 border-b border-border bg-bg/85 backdrop-blur-md"
    >
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between gap-6 px-6">
        <Logo />

        <nav aria-label="Navegação principal" className="hidden pc:block">
          <ul className="flex items-center gap-7">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`/#${n.id}`}
                  aria-current={active === n.id ? "true" : undefined}
                  className={`relative py-2 font-display text-[14px] font-medium transition-colors ${
                    active === n.id ? "text-text" : "text-text/75 hover:text-text"
                  }`}
                >
                  {n.label}
                  {active === n.id && (
                    // Shared layout: the underline glides to the active item
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={emailUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center rounded-full bg-accent px-5 font-display text-[14px] font-bold text-on-accent shadow-accent transition-colors hover:bg-[#ffb94d] tab:inline-flex"
          >
            Contacte-me
          </a>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-xl bg-card shadow-icon pc:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="menu-movel"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3.5 w-5" aria-hidden="true">
              <span
                className={`absolute left-0 h-0.5 w-5 rounded bg-text transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute top-1.5 left-0 h-0.5 w-5 rounded bg-text transition-opacity ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`absolute left-0 h-0.5 w-5 rounded bg-text transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            id="menu-movel"
            aria-label="Navegação móvel"
            className="overflow-hidden border-t border-border bg-bg pc:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
          >
            <motion.ul
              className="mx-auto flex max-w-[1280px] flex-col px-6 py-4"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } } }}
            >
              {NAV.map((n) => (
                <motion.li key={n.id} variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}>
                  <a
                    href={`/#${n.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === n.id ? "true" : undefined}
                    className={`flex min-h-12 items-center border-b border-border font-display text-[16px] font-medium ${
                      active === n.id ? "text-accent" : "text-text"
                    }`}
                  >
                    {n.label}
                  </a>
                </motion.li>
              ))}
              <li className="pt-4 tab:hidden">
                <a
                  href={emailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center justify-center rounded-full bg-accent font-display text-[14px] font-bold text-on-accent"
                >
                  Contacte-me
                </a>
              </li>
            </motion.ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
