"use client";
import { useRef } from "react";
import TextReveal from "./TextReveal";
import gsap, { ScrollTrigger, useGSAP } from "@/libs/gsap";
import useViewTransition from "@/hook/useViewTransition";

const ProjectPage = ({ project, nextProject }) => {
    const containerRef = useRef(null);
    const imageRef = useRef(null);

    useGSAP(
        () => {
            const sections = gsap.utils.toArray("section.gallery-section");

            // Intro Clip-path reveal animation for main cover image
            gsap.to(imageRef.current, {
                clipPath: "inset(0 0 0% 0)",
                scale: 1,
                duration: 1.6,
                ease: "expo.out",
                delay: 0.7,
            });

            // Entry animation for back button
            gsap.fromTo(
                ".back-button",
                {
                    opacity: 0,
                    y: 15,
                    scale: 0.9,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.4,
                    ease: "power4.out",
                    delay: 0.8,
                    clearProps: "transform",
                }
            );

            // Fluid stacking loop for gallery images with correct pinning overrides
            sections.forEach((section, idx) => {
                const container = section.querySelector(".sectionContainer");

                if (container) {
                    gsap.to(container, {
                        rotate: 0,
                        scale: 1,
                        ease: "power2.out", // Sweeter dynamic adjustment
                        scrollTrigger: {
                            trigger: section,
                            start: "top bottom",
                            end: "top top",
                            scrub: 1, // Smooth scrolling catching effect
                        },
                    });
                }

                ScrollTrigger.create({
                    trigger: section,
                    start: "bottom bottom",
                    end: "bottom top",
                    pin: true,
                    pinSpacing: false,
                    anticipatePin: 1,
                });
            });
        },
        { scope: containerRef },
    );

    const { navigateTo } = useViewTransition();

    const handleClick = () => {
        navigateTo(`/project/${nextProject.slug}`);
    };

    const handleBackClick = () => {
        navigateTo("/");
    };

    return (
        <>
            <main ref={containerRef} className="bg-black text-[#f5eae4] min-h-screen overflow-x-hidden">
                {/* Back Button */}
                <button
                    onClick={handleBackClick}
                    className="back-button fixed top-[4.5rem] right-[3rem] z-[50] 
                               flex items-center gap-3 px-5 py-2.5 cursor-pointer group 
                               bg-transparent border border-[#f5eae4]/20 hover:border-amber-500/80
                               rounded-full overflow-hidden transition-all duration-500 ease-out"
                    style={{ opacity: 0 }}
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

                {/* Hero Section */}
                <section className="h-screen w-full relative z-10 bg-black">
                    <div className="h-full w-full flex pt-[8rem] pb-[4rem] px-[4rem] gap-[2rem]">
                        <div className="w-[8%]">
                            <TextReveal>
                                <h3 className="text-[1.8rem] font-mono opacity-40">{project.number}</h3>
                            </TextReveal>
                        </div>
                        
                        <div className="h-[80%] w-[35%] overflow-hidden rounded-lg shadow-2xl bg-zinc-900">
                            <img
                                ref={imageRef}
                                style={{ clipPath: "inset(0 0 100% 0)" }}
                                className="h-full scale-[1.3] w-full object-cover transition-transform duration-700"
                                src={project.coverImage}
                                alt=""
                            />
                        </div>

                        <div className="pl-[4rem] h-[80%] w-[57%] flex flex-col justify-end">
                            <div className="heading mb-4">
                                <TextReveal delay="0.6" ease="power4.out" splitBy="chars">
                                    <h1 className="text-[5.5rem] font-light leading-[1.05] tracking-tight">
                                        {project.title}
                                    </h1>
                                </TextReveal>
                            </div>
                            <div className="subHeading flex gap-[2rem] items-center mb-6 border-b border-[#f5eae4]/10 pb-4">
                                <TextReveal delay="0.7" splitBy="words">
                                    <h2 className="text-[1.5rem] text-amber-500/90 font-medium">{project.subtitle}</h2>
                                </TextReveal>
                                <span className="opacity-30">|</span>
                                <TextReveal delay="0.7" splitBy="chars">
                                    <h2 className="text-[1.5rem] font-mono opacity-60">{project.year}</h2>
                                </TextReveal>
                            </div>
                            <div className="description w-[85%] text-balance">
                                <TextReveal delay="0.8" splitBy="lines">
                                    <p className="text-[1.15rem] leading-relaxed text-[#f5eae4]/80 font-light">
                                        {project.description}
                                    </p>
                                </TextReveal>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Gallery Scroll Sections */}
                {project.gallery.map((elem, idx) => (
                    <section key={idx} className="gallery-section h-screen w-full relative overflow-hidden bg-black z-20">
                        <div
                            className="sectionContainer rotate-[12deg] scale-[1.2] h-full w-full will-change-transform shadow-2xl"
                        >
                            <img className="h-full w-full object-cover" src={elem} alt={`Gallery frame ${idx}`} />
                        </div>
                    </section>
                ))}

                {/* Footer / Next Project Section */}
                <footer className="h-screen flex flex-col items-center justify-center w-full bg-zinc-950 relative z-30 border-t border-[#f5eae4]/5">
                    <span className="font-mono text-[0.8rem] tracking-[0.4em] uppercase opacity-40 mb-4">Next Project</span>
                    <h1 
                        onClick={handleClick} 
                        className="text-[6rem] tracking-tight font-light cursor-pointer hover:text-amber-500 hover:scale-105 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] select-none"
                    >
                        {nextProject.title}
                    </h1>
                </footer>
            </main>
        </>
    );
};

export default ProjectPage;