"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { projects } from "@/lib/data";
import ParallaxCard from "@/components/ParallaxCard";

export default function Projects() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(containerRef, { margin: "-120px", once: true });

  return (
    <section id="projects" className="py-20">
      <div className="mx-auto max-w-6xl px-4" ref={containerRef}>
        <div className="flex justify-start">
          <div className="relative inline-block">
            <h2 className="text-2xl sm:text-3xl font-semibold">
              Personal Projects
            </h2>
            <motion.span
              initial={{ width: 0 }}
              animate={inView ? { width: "100%" } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute -bottom-1 left-0 h-0.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500/70 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
            />
          </div>
        </div>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ParallaxCard key={p.title}>
              <motion.article
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                className="card-3d group rounded-2xl overflow-hidden bg-white/5 border border-white/10"
              >
                <div className="relative h-40 bg-gradient-to-br from-cyan-500/15 to-blue-500/15">
                  {p.image && (
                    <Image
                      src={p.image}
                      alt=""
                      fill
                      className="object-contain p-8"
                    />
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-medium text-lg">{p.title}</h3>
                  <p className="mt-2 text-sm text-zinc-300">{p.description}</p>
                  <div className="mt-4 flex gap-3">
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        className="text-cyan-300 hover:text-white text-sm"
                      >
                        GitHub
                      </a>
                    )}
                    {p.demo && (
                      <a
                        href={p.demo}
                        target="_blank"
                        className="text-cyan-300 hover:text-white text-sm"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            </ParallaxCard>
          ))}
        </div>
      </div>
    </section>
  );
}
