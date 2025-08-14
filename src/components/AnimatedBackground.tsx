"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const setSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setSize();
    let width = window.innerWidth;
    let height = window.innerHeight;

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r: Math.random() * 1.8 + 0.5,
    }));

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "rgba(0,191,255,0.12)");
    gradient.addColorStop(1, "rgba(0,119,255,0.10)");

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "rgba(255,255,255,0.6)";
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf.current = requestAnimationFrame(render);
    };

    render();

    const onResize = () => {
      setSize();
      width = window.innerWidth;
      height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    // subtle parallax scroll
    const onScroll = () => {
      const offset = window.scrollY * 0.05;
      gsap.to(canvas, { y: -offset, ease: "power2.out", duration: 0.4 });
    };
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 -z-10 will-change-transform"
    />
  );
}

