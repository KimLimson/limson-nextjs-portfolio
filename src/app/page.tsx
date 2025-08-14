import NavBar from "@/components/NavBar";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import ExperienceTimeline from "@/components/sections/ExperienceTimeline";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div>
      <NavBar />
      <main className="space-y-6">
        <About />
        <Projects />
        <ExperienceTimeline />
        <Skills />
        <Contact />
      </main>
      <footer className="py-4 text-center text-xs text-zinc-500 border-t border-white/5">
        © {new Date().getFullYear()} Limson. Built with Next.js, Tailwind,
        Framer Motion, GSAP.
      </footer>
    </div>
  );
}
