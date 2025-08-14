"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(containerRef, { margin: "-120px", once: true });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 600));
    setSent(true);
  };

  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-6xl px-4" ref={containerRef}>
        <div className="flex justify-start">
          <div className="relative inline-block">
            <h2 className="text-2xl sm:text-3xl font-semibold">Contact</h2>
            <motion.span
              initial={{ width: 0 }}
              animate={inView ? { width: "100%" } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute -bottom-1 left-0 h-0.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500/70 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              onSubmit={onSubmit}
              className="mt-8 space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-zinc-400">Name</label>
                  <input
                    required
                    className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400/40"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400">Email</label>
                  <input
                    required
                    type="email"
                    className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400/40"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-zinc-400">Message</label>
                <textarea
                  required
                  rows={5}
                  className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400/40"
                  placeholder="How can I help?"
                />
              </div>
              <motion.button
                whileHover={{ y: -2, rotateX: 6 }}
                whileTap={{ scale: 0.98, rotateX: 0 }}
                className="rounded-xl px-5 py-3 bg-cyan-500/20 text-cyan-300 border border-cyan-400/30"
              >
                Send Message
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-emerald-200"
            >
              Thanks! Your message has been sent.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
