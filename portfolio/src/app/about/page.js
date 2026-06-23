"use client";
import { useRef } from "react";
import gsap, { useGSAP } from "@/libs/gsap";
import useViewTransition from "@/hook/useViewTransition";

const Page = () => {
  const containerRef = useRef(null);
  const { navigateTo } = useViewTransition();

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Main header layout stagger entry
      tl.fromTo(
        ".reveal-text",
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1.2, ease: "power4.out", stagger: 0.1 }
      );

      // Tech tags structural staggered fade-in
      tl.fromTo(
        ".tech-tag",
        { opacity: 0, scale: 0.8, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.4)", stagger: 0.03 },
        "-=0.6"
      );

      // Glass panels slide setup
      tl.fromTo(
        ".glass-panel",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.15 },
        "-=0.8"
      );
    },
    { scope: containerRef }
  );

  return (
    <main
      ref={containerRef}
      className="min-h-screen w-full bg-black text-[#f5eae4] pt-[8rem] pb-[6rem] px-[4rem] overflow-x-hidden relative"
    >
      {/* Dynamic Back Navigation Action Trigger */}
      <button
        onClick={() => navigateTo("/")}
        className="back-button fixed top-[4.5rem] right-[3rem] z-[50] 
                   flex items-center gap-3 px-5 py-2.5 cursor-pointer group 
                   bg-transparent border border-[#f5eae4]/20 hover:border-amber-500/80
                   rounded-full overflow-hidden transition-all duration-500 ease-out"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-[#f07026] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] -z-10" />
        <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:-translate-x-1">
          <svg className="w-4 h-4 text-[#f5eae4] transition-colors duration-300 group-hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </div>
        <span className="font-mono text-[0.7rem] font-medium tracking-[0.25em] text-[#f5eae4]/70 group-hover:text-black transition-colors duration-300 uppercase select-none">
          Back
        </span>
      </button>

      {/* Grid Layout Setup */}
      <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-[4rem] items-start">
        
        {/* Left Column: Heading & Core Manifesto Statements */}
        <div className="lg:col-span-7 flex flex-col setup-intro">
          <div className="overflow-hidden mb-2">
            <span className="reveal-text block font-mono text-[0.8rem] tracking-[0.4em] text-amber-500/80 uppercase">
              Creative Developer & Architect
            </span>
          </div>
          
          <div className="overflow-hidden mb-8">
            <h1 className="reveal-text text-[5.5rem] font-light leading-[1.05] tracking-tight">
              Engineering <br />
              <span className="font-medium italic text-transparent bg-clip-text bg-gradient-to-r from-[#f07026] to-amber-400">
                Interactive Chaos.
              </span>
            </h1>
          </div>

          <div className="overflow-hidden w-[90%] text-balance mb-12">
            <p className="reveal-text text-[1.25rem] leading-relaxed text-[#f5eae4]/80 font-light">
              I balance the visual precision of fine-art motion interactions with heavy-lifting architectural full-stack frameworks. From compiling high-performance real-time GPU compute loops to secure server-side infrastructure models, I build immersive applications that don't just work—they make users feel.
            </p>
          </div>

          {/* Specialized Tech Matrix Hub */}
          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-[0.75rem] uppercase tracking-[0.2em] opacity-40">Core Stack Expertise</h3>
            <div className="flex flex-wrap gap-2 max-w-[90%]">
              {["React / Next.js", "WebGL / Three.js", "GSAP / Framer Motion", "Node.js (CLI Ecosystem)", "LangGraph / LLM Orchestration", "MongoDB Security Hardening", "TailwindCSS Architecture", "Redux Toolkit State Slicing"].map((tech, i) => (
                <span
                  key={i}
                  className="tech-tag px-4 py-2 border border-[#f5eae4]/10 bg-zinc-900/40 text-[0.8rem] tracking-wide text-[#f5eae4]/90 rounded-full font-mono hover:border-amber-500/40 hover:bg-black transition-colors duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Architectural Core Insights & Social Node Interfaces */}
        <div className="lg:col-span-5 flex flex-col gap-6 w-full lg:pl-[2rem]">
          
          {/* Manifesto Card */}
          <div className="glass-panel p-8 rounded-2xl bg-zinc-950/50 border border-[#f5eae4]/5 backdrop-blur-xl hover:border-[#f5eae4]/10 transition-all duration-500">
            <h2 className="font-mono text-[0.8rem] tracking-[0.2em] uppercase text-amber-500/90 mb-4">// System Philosophy</h2>
            <p className="text-[0.95rem] leading-relaxed text-[#f5eae4]/70 font-light">
              Whether deploying high-stakes code routing matrices or crafting subtle glassmorphic UI interactions, my objective is pushing functional performance thresholds. Everything is optimized directly for hardware accelerators via hardware transitions and clean structural states.
            </p>
          </div>

          {/* High-Fidelity Social Gateway Matrices */}
          <div className="glass-panel p-8 rounded-2xl bg-zinc-950/50 border border-[#f5eae4]/5 backdrop-blur-xl flex flex-col gap-4">
            <h2 className="font-mono text-[0.8rem] tracking-[0.2em] uppercase text-amber-500/90 mb-2">// Network Handshakes</h2>
            
            <div className="flex flex-col gap-3">
              {/* GitHub */}
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 border border-[#f5eae4]/5 bg-black/40 hover:bg-zinc-900 rounded-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[0.7rem] opacity-30 group-hover:text-amber-500 transition-colors">01</span>
                  <span className="text-[1.1rem] font-light tracking-wide group-hover:translate-x-1 transition-transform">GitHub Engine</span>
                </div>
                <svg className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:text-amber-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 border border-[#f5eae4]/5 bg-black/40 hover:bg-zinc-900 rounded-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[0.7rem] opacity-30 group-hover:text-amber-500 transition-colors">02</span>
                  <span className="text-[1.1rem] font-light tracking-wide group-hover:translate-x-1 transition-transform">LinkedIn Portal</span>
                </div>
                <svg className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:text-amber-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>

              {/* Instagram */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 border border-[#f5eae4]/5 bg-black/40 hover:bg-zinc-900 rounded-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[0.7rem] opacity-30 group-hover:text-amber-500 transition-colors">03</span>
                  <span className="text-[1.1rem] font-light tracking-wide group-hover:translate-x-1 transition-transform">Instagram Grid</span>
                </div>
                <svg className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:text-amber-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default Page;