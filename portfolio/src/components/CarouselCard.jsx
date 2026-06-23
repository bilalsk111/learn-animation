"use client"
import gsap from "@/libs/gsap";
import TextReveal from "./TextReveal";
import { useRef } from "react";
import useViewTransition from "@/hook/useViewTransition";

const CARD_W = 280;
const CARD_H = 420;
const SCALE = 1.25; 

// UI/UX LUXURY MATHEMATICS
const EXPANDED_WIDTH = CARD_W * SCALE; // 350px
const SHIFT_X = -((EXPANDED_WIDTH - CARD_W) / 2); // -35px centering shift
const SHIFT_Y = -50; // Perfect breathing gap after top edge expansion

const CarouselCard = ({ project, onHoverStart, onHoverEnd }) => {
  const cardRef = useRef(null);
  const innerContainerRef = useRef(null); 
  const textPanelRef = useRef(null); 
  const imgRef = useRef(null);
  const yearRef = useRef(null);
  const numberRef = useRef(null);
  const titleRef = useRef(null);

  const onEnter = () => {
    onHoverStart?.();

    // 1. Elevate layer priority instantly
    gsap.set(cardRef.current, { zIndex: 50 });

    // 2. Smooth Image Container Expansion
    gsap.to(innerContainerRef.current, {
      scale: SCALE,
      duration: 0.5,
      ease: "power3.out",
      overwrite: "auto",
    });

    // 3. Parallax Inner Image Effect
    gsap.to(imgRef.current, {
      scale: 1,
      duration: 0.52,
      ease: "power3.out",
      overwrite: "auto",
    });

    // 4. FIX: Dynamic width and placement matching the expanded card edges perfectly
    gsap.to(textPanelRef.current, {
      width: EXPANDED_WIDTH,
      x: SHIFT_X,
      y: SHIFT_Y, 
      duration: 0.5,
      ease: "power3.out",
      overwrite: "auto",
    });

    numberRef.current?.play();
    titleRef.current?.play();
    yearRef.current?.play();
  };

  const onLeave = () => {
    onHoverEnd?.();

    // 1. Reset Card Scale
    gsap.to(innerContainerRef.current, {
      scale: 1,
      duration: 0.35,
      ease: "power3.out",
      overwrite: "auto",
      onComplete: () => {
        gsap.set(cardRef.current, { zIndex: 1 });
      }
    });

    // 2. Reset Image Zoom
    gsap.to(imgRef.current, {
      scale: 1.6,
      duration: 0.35,
      ease: "power3.out",
      overwrite: "auto",
    });

    // 3. Reset Text Panel Width and Coordinates smoothly
    gsap.to(textPanelRef.current, {
      width: CARD_W,
      x: 0,
      y: 0,
      duration: 0.35,
      ease: "power3.out",
      overwrite: "auto",
    });

    numberRef.current?.reverse();
    titleRef.current?.reverse();
    yearRef.current?.reverse();
  };

  const { navigateTo } = useViewTransition();
  const handleClick = () => {
    if (project.slug) {
      navigateTo(`/project/${project.slug}`);
    }
  };

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        width: CARD_W,
        height: CARD_H,
        flexShrink: 0,
        overflow: "visible",
        cursor: "pointer",
        position: "relative",
        zIndex: 1,
      }}
      className="flex items-center justify-center"
    >
      {/* TITLE PANEL: Handles real-time width recalculation flawlessly */}
      <div
        ref={textPanelRef}
        style={{
          position: "absolute",
          bottom: "calc(100% + 0.6rem)", 
          width: CARD_W, // Initial base width matching the card
          left: 0,
        }}
        className="pointer-events-none flex flex-col gap-1 overflow-visible will-change-transform"
      >
        {/* Number Wrapper */}
        <div className="flex overflow-visible -mb-2 leading-none">
          <TextReveal
            ref={numberRef}
            trigger="manual"
            splitBy="chars"
            className="text-[1.2rem] font-mono font-medium text-[#f07026] tracking-tighter block leading-[1.2]"
          >
            {project.number ? String(project.number) : ""}
          </TextReveal>
        </div>

        {/* Title & Year Row */}
        <div className="flex justify-between items-end w-full whitespace-nowrap gap-4 overflow-visible leading-none">
          <TextReveal
            ref={titleRef}
            trigger="manual"
            splitBy="words"
            className="text-white text-[1.4rem] font-medium tracking-tighter block leading-none"
          >
            {project.title || ""}
          </TextReveal>

          <TextReveal
            ref={yearRef}
            trigger="manual"
            splitBy="words"
            className="text-white/60 text-sm font-light block leading-[1.3]"
          >
            {project.year ? String(project.year) : ""}
          </TextReveal>
        </div>
      </div>

      {/* INNER CONTAINER */}
      <div
        ref={innerContainerRef}
        style={{
          width: "100%",
          height: "100%",
          transformOrigin: "center center",
        }}
        className="absolute inset-0 bg-zinc-900 shadow-2xl flex items-center justify-center will-change-transform"
      >
        {/* Image Div */}
        <div className="imageDiv absolute h-full w-full overflow-hidden pointer-events-none">
          <img
            ref={imgRef}
            style={{ transformOrigin: "center center", userSelect: "none" }}
            className="h-full scale-[1.6] w-full object-cover will-change-transform"
            src={project.coverImage}
            alt={project.title}
          />
        </div>
      </div>
    </div>
  );
};

export default CarouselCard;