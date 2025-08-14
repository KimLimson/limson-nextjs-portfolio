"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
];

export default function NavBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("id");
          if (id) {
            const link = document.querySelector(`a[href="#${id}"]`);
            if (link) {
              if (entry.isIntersecting) link.classList.add("text-cyan-400");
              else link.classList.remove("text-cyan-400");
            }
          }
        });
      },
      { rootMargin: "-40% 0% -55% 0%" }
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      sectionObserver.observe(section);
    });

    return () => sectionObserver.disconnect();
  }, []);

  return (
    <nav ref={ref} className="fixed top-0 inset-x-0 z-50 backdrop-blur border-b border-white/10 bg-black/30">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="#home" className="font-semibold text-zinc-200 hover:text-white">
          KimCoder
        </Link>
        <ul className="hidden md:flex gap-6 text-sm text-zinc-300">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="hover:text-white transition-colors">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="hidden sm:inline-block rounded-full px-4 py-2 text-sm font-medium bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-400/30">
          Contact
        </a>
      </div>
      <motion.div className="h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500" style={{ scaleX, transformOrigin: "0% 50%" }} />
    </nav>
  );
}

