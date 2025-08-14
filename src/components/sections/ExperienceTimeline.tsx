"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { experience } from "@/lib/data";

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(containerRef, { margin: "-120px", once: true });

  return (
    <section id="experience" className="py-20">
      <div className="mx-auto max-w-6xl px-4" ref={containerRef}>
        <div className="flex justify-center">
          <div className="relative inline-block">
            <h2 className="text-2xl sm:text-3xl font-semibold">
              Experience
            </h2>
            <motion.span
              initial={{ width: 0 }}
              animate={inView ? { width: "100%" } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute -bottom-1 left-0 h-0.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500/70 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
            />
          </div>
        </div>
        <div className="mt-10 relative">
          <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-500/40 to-transparent" />
          <div className="space-y-12">
            {experience.map((item, idx) => (
              <motion.div
                key={item.company}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="relative grid sm:grid-cols-2 gap-6"
              >
                <div className="sm:text-right">
                  <div className="text-cyan-300 text-sm">{item.period}</div>
                  <div className="font-medium">{item.company}</div>
                </div>
                <div>
                  <div className="font-semibold">{item.role}</div>
                  <ul className="mt-2 list-disc pl-5 text-zinc-300 text-sm space-y-1">
                    {item.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
                <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-2 -translate-x-1/2 size-2 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.6)]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
