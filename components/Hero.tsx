"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "motion/react";
import { useRef } from "react";
import Button from "./Button";
import CodeWindow from "./CodeWindow";
import { EASE_OUT } from "./motion";

const TICKER = [
  "HTML",
  "CSS",
  "JavaScript",
  "PHP",
  "React",
  "TypeScript",
  "Node.js",
  "Tailwind CSS",
  "MySQL",
  "PostgreSQL",
  "Docker",
  "Git",
];

const NAME = "crijolise";

/* Timeline (seconds) for the intro sequence */
const T = { label: 0.1, letters: 0.2, letterStagger: 0.045, dot: 0.75, circle: 0.35, photo: 0.5, ring: 0.9, intro: 0.95 };

function TickerRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {TICKER.map((t) => (
        <li key={t} className="flex items-center gap-6 pr-6 font-display text-[18px] font-bold whitespace-nowrap">
          {t}
          <span aria-hidden="true">✦</span>
        </li>
      ))}
    </ul>
  );
}

const introParent: Variants = {
  hidden: {},
  show: (delay: number = 0) => ({ transition: { delayChildren: delay, staggerChildren: 0.09 } }),
};
const introChild: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

/** "Portugal · Junior Full-Stack Web Developer" + buttons. */
function HeroIntro({ cvUrl, className = "", delay = 0 }: { cvUrl?: string; className?: string; delay?: number }) {
  return (
    <motion.div
      variants={introParent}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className={`flex-col items-center text-center pc:items-start pc:text-left ${className}`}
    >
      <motion.p variants={introChild} className="font-display text-[12px] font-bold tracking-[0.18em] text-text/75">
        PORTUGAL
      </motion.p>
      <motion.h2
        variants={introChild}
        className="mt-3 font-display text-[30px] leading-[1.15] font-bold tracking-[-0.01em] pc:text-[36px]"
      >
        Junior
        <br />
        <span className="text-accent">Full-Stack Web Developer</span>
      </motion.h2>
      <motion.span
        variants={{
          hidden: { scaleX: 0 },
          show: { scaleX: 1, transition: { duration: 0.6, ease: EASE_OUT } },
        }}
        className="mt-5 block h-1 w-14 origin-left rounded-full bg-accent max-pc:origin-center"
        aria-hidden="true"
      />
      <motion.div variants={introChild} className="mt-6 flex flex-wrap justify-center gap-3 pc:justify-start">
        <Button href="#projetos">Ver projetos</Button>
        <Button href={cvUrl} variant="outline" download>
          Descarregar CV
        </Button>
      </motion.div>
    </motion.div>
  );
}

export default function Hero({ cvUrl }: { cvUrl?: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Gentle parallax while scrolling out of the hero: name sinks, photo rises → depth.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const nameY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 140]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.7], reduce ? [1, 1] : [1, 0.25]);
  const photoY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -50]);
  const circleScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.08]);

  return (
    <section ref={ref} id="inicio" className="relative overflow-hidden pt-14 pc:pt-16">
      <div className="mx-auto max-w-[1280px] px-6">
        <motion.div style={{ y: nameY, opacity: nameOpacity }} className="flex flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 10, letterSpacing: "0.4em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0.18em" }}
            transition={{ duration: 0.9, ease: EASE_OUT, delay: T.label }}
            className="font-display text-[14px] font-bold tracking-[0.18em] text-accent"
          >
            OLÁ, EU SOU
          </motion.p>
          <h1
            aria-label={`${NAME}.`}
            className="relative z-0 mt-1 font-display text-[clamp(96px,19vw,260px)] leading-[0.85] font-extrabold tracking-[-0.05em]"
          >
            {NAME.split("").map((ch, i) => (
              <motion.span
                key={i}
                aria-hidden="true"
                className="inline-block"
                initial={{ opacity: 0, y: "0.35em", filter: "blur(14px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease: EASE_OUT, delay: T.letters + i * T.letterStagger }}
              >
                {ch}
              </motion.span>
            ))}
            <motion.span
              aria-hidden="true"
              className="inline-block text-accent"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 420, damping: 14, delay: T.dot }}
            >
              .
            </motion.span>
          </h1>
        </motion.div>

        {/* PC: three columns, photo in the centre. ≤900px: photo only (intro goes below the ticker). */}
        <div className="relative z-10 grid grid-cols-1 items-center pc:grid-cols-[1fr_auto_1fr] pc:gap-10">
          {/* Left (PC only): title + buttons */}
          <HeroIntro cvUrl={cvUrl} delay={T.intro} className="hidden pc:flex pc:self-end pc:pb-24" />

          {/* Centre: portrait over orange circle + dashed ring */}
          <div className="mx-auto mt-[-9vw]">
            <div className="relative mx-auto w-[min(480px,92vw)]">
              {/* Dashed ring: fades in, then rotates very slowly */}
              <div
                className="absolute bottom-0 left-1/2 aspect-square w-[min(470px,96vw)] -translate-x-1/2 translate-y-[6%]"
                aria-hidden="true"
              >
                <motion.div
                  className="size-full rounded-full border-2 border-dashed border-white/35"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1, rotate: 360 }}
                  transition={{
                    opacity: { duration: 0.8, delay: T.ring },
                    scale: { duration: 1, ease: EASE_OUT, delay: T.ring },
                    rotate: { duration: 60, ease: "linear", repeat: Infinity },
                  }}
                />
              </div>

              {/* Orange circle: springs in */}
              <div
                className="absolute bottom-0 left-1/2 aspect-square w-[min(400px,86vw)] -translate-x-1/2"
                aria-hidden="true"
              >
                <motion.div style={{ scale: circleScale }} className="size-full">
                  <motion.div
                    className="size-full rounded-full bg-accent"
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 120, damping: 16, delay: T.circle }}
                  />
                </motion.div>
              </div>

              {/* Portrait: rises into place */}
              <motion.div style={{ y: photoY }} className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 80 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.1, ease: EASE_OUT, delay: T.photo }}
                >
                  <Image
                    src="/assets/retrato.png"
                    alt="Ilustração de Crijolise Marçal com uma camisola com capuz"
                    width={830}
                    height={924}
                    preload
                    sizes="(max-width: 600px) 92vw, 480px"
                    className="h-auto w-full drop-shadow-[0_8px_14px_rgba(0,0,0,0.3)]"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Right (PC only): floating code window; on narrower PCs just a spacer so the photo stays centred */}
          <div className="hidden pc:flex pc:justify-end pc:self-end pc:pb-24">
            <CodeWindow className="hidden w-[330px] min-[1180px]:block" />
          </div>
        </div>
      </div>

      {/* Technology ticker — pulled up over the bottom edge of the photo on every screen size */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE_OUT, delay: T.photo + 0.3 }}
        className="relative z-20 -mt-8 overflow-hidden bg-accent py-4 text-on-accent pc:-mt-12"
        role="marquee"
        aria-label="Tecnologias"
      >
        <div className="flex w-max animate-ticker">
          <TickerRow />
          <TickerRow hidden />
        </div>
      </motion.div>

      {/* HP + tablet: title + buttons below the ticker */}
      <div className="mx-auto max-w-[1280px] px-6 py-12 pc:hidden">
        <HeroIntro cvUrl={cvUrl} className="flex" />
      </div>
    </section>
  );
}
