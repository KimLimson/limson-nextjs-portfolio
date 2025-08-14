"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { skills as allSkills } from "@/lib/data";

const tabs = ["All", "Frontend", "Backend", "Tools"] as const;

type Tab = (typeof tabs)[number];

function Icon({ id }: { id?: string }) {
  const common = "w-6 h-6";
  switch (id) {
    case "ts":
      return (
        <svg className={common} viewBox="0 0 256 256" aria-hidden>
          <rect width="256" height="256" rx="16" fill="#3178C6" />
          <path
            fill="#fff"
            d="M144 116h-20v12h20v60h16v-72h28v-16h-64v16h20z"
          />
        </svg>
      );
    case "react":
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="12" r="2" fill="#61DAFB" />
          <g fill="none" stroke="#61DAFB">
            <ellipse cx="12" cy="12" rx="11" ry="4" />
            <ellipse
              cx="12"
              cy="12"
              rx="11"
              ry="4"
              transform="rotate(60 12 12)"
            />
            <ellipse
              cx="12"
              cy="12"
              rx="11"
              ry="4"
              transform="rotate(120 12 12)"
            />
          </g>
        </svg>
      );
    case "tailwind":
      return (
        <svg className={common} viewBox="0 0 48 48" aria-hidden>
          <path
            fill="#38BDF8"
            d="M24 12c-5.333 0-8.667 2.667-10 8 2-2.667 4.333-3.667 7-3 1.714.428 2.952 1.69 4.214 2.976C27.667 22.333 30.333 25 36 25c5.333 0 8.667-2.667 10-8-2 2.667-4.333 3.667-7 3-1.714-.428-2.952-1.69-4.214-2.976C32.333 14.667 29.667 12 24 12Z"
          />
        </svg>
      );
    default:
      return <div className="w-6 h-6" />;
  }
}

function useFloatingAnimation(
  refs: React.RefObject<HTMLDivElement[]>,
  tweensRef: React.MutableRefObject<gsap.core.Tween[]>
) {
  useEffect(() => {
    if (!refs.current) return;
    const tweens: gsap.core.Tween[] = [];
    refs.current.forEach((el, idx) => {
      if (!el) return;
      const offset = (idx % 5) + 1;
      const tw = gsap.to(el, {
        y: `+=${6 + offset}`,
        duration: 3.2 + (idx % 3) * 0.6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        overwrite: "auto",
        force3D: true,
      });
      tweens[idx] = tw;
    });
    tweensRef.current = tweens;
    return () => tweens.forEach((t) => t.kill());
  }, [refs, tweensRef]);
}

export default function Skills() {
  const [tab, setTab] = useState<Tab>("All");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const floatTweens = useRef<gsap.core.Tween[]>([]);
  const inView = useInView(containerRef, { margin: "-120px", once: true });

  useFloatingAnimation(cardRefs, floatTweens);

  const skills = useMemo(() => {
    if (tab === "All") return allSkills;
    return allSkills.filter((s) => s.category === tab);
  }, [tab]);
  const handleCardEnter = (i: number) => {
    const el = cardRefs.current[i];
    const tw = floatTweens.current[i];
    if (tw) tw.pause();
    if (el)
      gsap.to(el, {
        y: 0,
        duration: 0.15,
        ease: "power2.out",
        overwrite: "auto",
      });
  };

  const handleCardLeave = (i: number) => {
    const el = cardRefs.current[i];
    const old = floatTweens.current[i];
    const createFloat = () => {
      if (!el) return;
      const offset = (i % 5) + 1;
      const tw = gsap.to(el, {
        y: `+=${6 + offset}`,
        duration: 3.2 + (i % 3) * 0.6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        overwrite: "auto",
        force3D: true,
      });
      floatTweens.current[i] = tw;
    };
    if (old) old.kill();
    if (el)
      gsap.to(el, {
        y: 0,
        duration: 0.18,
        ease: "power2.out",
        onComplete: createFloat,
      });
  };

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* floating gradient blobs */}
      <div className="pointer-events-none absolute -inset-20 -z-10 opacity-40">
        <div className="absolute -top-16 left-10 w-60 h-60 rounded-full blur-3xl bg-cyan-500/20" />
        <div className="absolute bottom-0 right-10 w-72 h-72 rounded-full blur-3xl bg-blue-500/20" />
      </div>

      <div className="mx-auto max-w-6xl px-4" ref={containerRef}>
        <div className="flex justify-center">
          <div className="relative inline-block">
            <h2 className="text-2xl sm:text-3xl font-semibold">Skills</h2>
            <motion.span
              initial={{ width: 0 }}
              animate={inView ? { width: "100%" } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute -bottom-1 left-0 h-0.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500/70 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
            />
          </div>
        </div>

        {/* Filter bar */}
        <div className="mt-6 flex justify-center">
          <div className="relative flex gap-2 rounded-full bg-white/5 border border-white/10 p-1">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative px-4 py-1.5 text-sm rounded-full transition-colors ${
                  tab === t ? "text-white" : "text-zinc-300 hover:text-white"
                }`}
              >
                {t}
                {tab === t && (
                  <motion.span
                    layoutId="tab-underline"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.05, when: "beforeChildren" },
            },
          }}
          className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 place-items-center"
        >
          {skills.map((s, i) => (
            <motion.div
              key={s.name}
              variants={{
                hidden: { opacity: 0, y: 14, scale: 0.98 },
                show: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{
                type: "spring",
                stiffness: 140,
                damping: 18,
                mass: 0.6,
              }}
              whileHover={{
                rotateX: 6,
                rotateY: -4,
                scale: 1.02,
                transition: { type: "spring", stiffness: 260, damping: 20 },
              }}
              whileTap={{ scale: 0.99 }}
              className="group relative z-0 hover:z-50 w-full max-w-[180px] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4 text-center card-3d"
              style={{ perspective: 900, transformStyle: "preserve-3d" }}
              onMouseEnter={() => handleCardEnter(i)}
              onMouseLeave={() => handleCardLeave(i)}
              ref={(el) => {
                if (el) cardRefs.current[i] = el;
              }}
            >
              <motion.div
                layout
                className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 shadow-inner"
              >
                <Icon id={s.icon} />
              </motion.div>
              <div className="text-sm text-zinc-200 font-medium">{s.name}</div>
              <div className="text-xs text-zinc-400">{s.level}</div>

              {/* glow on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-cyan-400/40 group-hover:shadow-[0_0_24px_rgba(34,211,238,0.25)] transition-all will-change-transform" />

              {/* tooltip */}
              {s.description && (
                <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 w-max -translate-x-1/2 rounded-md bg-black/70 px-2 py-1 text-xs text-zinc-200 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                  {s.description}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
