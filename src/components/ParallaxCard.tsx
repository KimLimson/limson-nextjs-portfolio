"use client";

import { ReactNode, useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function ParallaxCard({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current!;
    const bounds = () => el.getBoundingClientRect();

    const onMove = (e: MouseEvent) => {
      const b = bounds();
      const relX = (e.clientX - b.left) / b.width; // 0..1
      const relY = (e.clientY - b.top) / b.height; // 0..1
      const rotY = (relX - 0.5) * 16; // -8..8
      const rotX = (0.5 - relY) * 12; // -6..6
      gsap.to(el, { rotateX: rotX, rotateY: rotY, transformPerspective: 800, duration: 0.4, ease: "power2.out" });
    };

    const onLeave = () => {
      gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "elastic.out(1,0.4)" });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className="card-3d" style={{ perspective: 800 }}>
      {children}
    </div>
  );
}

