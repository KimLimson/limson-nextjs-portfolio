"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import AnimatedBackground from "@/components/AnimatedBackground";
import { useEffect, useMemo, useRef } from "react";
import { bio } from "@/lib/data";
import { gsap } from "gsap";
import { getAssetPath } from "@/lib/utils";

// Deterministic PRNG to avoid SSR/client hydration mismatches
function mulberry32(seed: number) {
  let t = seed >>> 0;
  return function () {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

export default function About() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgCardRef = useRef<HTMLDivElement | null>(null);
  const haloRef = useRef<HTMLDivElement | null>(null);
  const particleRefs = useRef<HTMLSpanElement[]>([]);
  const inView = useInView(containerRef, { once: true, margin: "-120px" });

  // Idle halo rotation
  useEffect(() => {
    if (!haloRef.current) return undefined;
    const tween = gsap.to(haloRef.current, {
      rotate: 360,
      duration: 20,
      repeat: -1,
      ease: "none",
      transformOrigin: "50% 50%",
    });
    return () => {
      tween.kill();
    };
  }, []);

  // Floating particle drift
  useEffect(() => {
    particleRefs.current.forEach((el) => {
      if (!el) return;
      gsap.to(el, {
        x: `+=${gsap.utils.random(-20, 20)}`,
        y: `+=${gsap.utils.random(-15, 15)}`,
        duration: gsap.utils.random(3, 6),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: gsap.utils.random(0, 1),
      });
    });
  }, []);

  const particles = useMemo(() => {
    // Fixed seed ensures server and client produce the same sequence
    const rand = mulberry32(123456);
    return Array.from({ length: 14 }, () => ({
      top: rand() * 100,
      left: rand() * 100,
      size: rand() * 3 + 1,
    }));
  }, []);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y - rect.height / 2) / rect.height) * -16;
    const ry = ((x - rect.width / 2) / rect.width) * 16;
    gsap.to(imgCardRef.current, {
      rotateX: rx,
      rotateY: ry,
      transformPerspective: 900,
      duration: 0.25,
      ease: "power2.out",
    });
  };
  const handleEnter = () => {
    gsap.to(imgCardRef.current, {
      scale: 1.03,
      z: 24,
      transformPerspective: 900,
      duration: 0.25,
      ease: "power2.out",
    });
  };
  const handleLeave = () => {
    gsap.to(imgCardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      z: 0,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  return (
    <section id="about" className="min-h-screen flex items-center justify-center relative overflow-visible">
      <AnimatedBackground />
      {/* floating particles */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {particles.map((p, i) => (
          <span
            key={i}
            ref={(el) => {
              if (el) particleRefs.current[i] = el;
            }}
            className="absolute rounded-full bg-white/30"
            style={{
              top: `${p.top}%`,
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
            }}
          />
        ))}
      </div>

      <div
        ref={containerRef}
        className="mx-auto max-w-6xl px-4 grid md:grid-cols-3 gap-10 items-center w-full"
      >
        {/* Profile image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: -20 }}
          animate={inView ? { opacity: 1, scale: 1, x: 0 } : undefined}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex justify-center"
        >
          <div
            className="relative w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] lg:w-[300px] lg:h-[300px] [transform-style:preserve-3d] [perspective:1000px] group"
            onMouseEnter={handleEnter}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
          >
            <div
              ref={imgCardRef}
              className="relative w-full h-full rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-inner shadow-[0_0_20px_rgba(34,211,238,0.15)] overflow-hidden ring-0 group-hover:ring-4 group-hover:ring-cyan-400/30 group-hover:shadow-[0_0_40px_rgba(34,211,238,0.35)] transition"
            >
              <div
                ref={haloRef}
                className="pointer-events-none absolute -inset-4 rounded-full opacity-60 blur-md bg-[conic-gradient(from_0deg,rgba(56,189,248,0.05),rgba(56,189,248,0.6),rgba(59,130,246,0.05))]"
              />
              <Image
                src={getAssetPath("/profilePic.jpg")}
                alt="Profile image"
                fill
                sizes="(min-width: 1024px) 300px, (min-width: 640px) 260px, 220px"
                className="rounded-full object-cover"
                priority
              />
            </div>
          </div>
        </motion.div>

        {/* Bio + content */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="md:col-span-2"
        >
          <div className="mx-auto max-w-6xl px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-6xl font-bold tracking-tight"
            >
              {`Hi, I'm `}<span className="text-gradient">Ivan Kim Limson</span>
            </motion.h1>

            {/* badges */}
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-zinc-300">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 shadow-inner transition will-change-transform hover:-translate-y-0.5 hover:border-cyan-400/50 hover:shadow-[0_0_18px_rgba(34,211,238,0.35)]">
                {bio.years}+ years experience
              </span>
              {bio.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 shadow-inner transition will-change-transform hover:-translate-y-0.5 hover:border-cyan-400/50 hover:shadow-[0_0_18px_rgba(34,211,238,0.35)]"
                >
                  {t}
                </span>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="mt-4 text-lg text-zinc-300 max-w-2xl"
            >
              Software Engineer crafting performant, animated web apps with
              Next.js, TypeScript, and delightful motion.
            </motion.p>

            {/* paragraphs */}
            <div className="mt-4 space-y-3 text-zinc-300 leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 }}
              >
                {bio.tagline}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.25 }}
              >
                I focus on performance, delightful motion, and accessible UX
                using React, Next.js, TypeScript, and Tailwind.
              </motion.p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <motion.a
                href="#projects"
                whileHover={{ y: -2, rotateX: 5, transformPerspective: 900 }}
                whileTap={{ scale: 0.98, rotateX: 0 }}
                className="rounded-xl px-5 py-3 bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 hover:neon-glow shadow-cyan-500/30"
              >
                View Projects
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ y: -2, rotateX: 5, transformPerspective: 900 }}
                whileTap={{ scale: 0.98, rotateX: 0 }}
                className="rounded-xl px-5 py-3 bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 hover:neon-glow shadow-cyan-500/30"
              >
                Contact Me
              </motion.a>

              {/* Download resume */}
              <motion.a
                href="/resume.pdf"
                whileHover={{ y: -2, rotateX: 5, transformPerspective: 900 }}
                whileTap={{ scale: 0.98, rotateX: 0 }}
                className="rounded-xl px-5 py-3 bg-white/5 text-white border border-white/10 bg-gradient-to-r from-cyan-500/60 to-blue-500/60 transition-colors duration-200 hover:from-cyan-400 hover:to-blue-500 active:from-cyan-300 active:to-blue-400 hover:neon-glow shadow-cyan-500/30"
              >
                Download Resume
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
