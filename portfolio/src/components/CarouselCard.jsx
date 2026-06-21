"use client"
import gsap from "@/libs/gsap";
import TextReveal from "./TextReveal";
import { useRef } from "react";
// import useViewTransition from "@/hooks/useViewTransition";

const CARD_W = 280;
const CARD_H = 420;
const SCALE = 1.35;

const CarouselCard = ({ project, onHoverStart, onHoverEnd }) => {
  const cardRef = useRef(null);      // Flex layout ko stable rakhne ke liye fixed outer container
  const containerRef = useRef(null); // Smoothly scale hone wala inner container
  const imgRef = useRef(null);
  const yearRef = useRef(null);
  const numberRef = useRef(null);
  const titleRef = useRef(null);

  const onEnter = () => {
    onHoverStart?.();

    // Hover karte hi card ko sabse upar layer par lao
    gsap.set(cardRef.current, { zIndex: 10 });

    // Inner container ko smooth bada karo
    gsap.to(containerRef.current, {
      width: CARD_W * SCALE,
      height: CARD_H * SCALE,
      duration: 0.4,
      ease: "power3.out",
    });

    // Image scale duration ko container ke sath perfectly sync kiya (No popping!)
    gsap.to(imgRef.current, {
      scale: 1,
      duration: 0.4,
      ease: "power3.out",
    });

    numberRef.current?.play();
    titleRef.current?.play();
    yearRef.current?.play(); 
  };

  const onLeave = () => {
    onHoverEnd?.();

    // Inner container ko wapas smoothly normal size par lao
    gsap.to(containerRef.current, {
      width: CARD_W,
      height: CARD_H,
      duration: 0.3,
      ease: "power3.out",
      onComplete: () => {
        // Animation poori hone ke baad zIndex reset karo taaki overlapping glitch na ho
        gsap.set(cardRef.current, { zIndex: 1 });
      }
    });

    // Image shrink duration bhi completely synced hai
    gsap.to(imgRef.current, {
      scale: 1.6,
      duration: 0.3,
      ease: "power3.out",
    });

    numberRef.current?.reverse();
    titleRef.current?.reverse();
    yearRef.current?.reverse(); 
  };

//   const { navigateTo } = useViewTransition();

//   const handleClick = () => {
//     navigateTo(`/project/${project.slug}`);
//   };

  return (
    <div
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        width: CARD_W,
        height: CARD_H,
        flexShrink: 0,
        overflow: "visible",
        cursor: "pointer",
        zIndex: 1,
        position: "relative",
      }}
      className="flex items-center justify-center"
    >
      {/* INNER CONTAINER: Ye center se smoothly expand hota hai bina track ko hilaye */}
      <div
        ref={containerRef}
        style={{
          width: CARD_W,
          height: CARD_H,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        className="bg-zinc-900 overflow-visible rounded-md shadow-2xl"
      >
        {/* TITLE PANEL */}
        <div
          style={{ 
            bottom: "calc(100% + 1.2rem)", 
            width: "100%", 
          }}
          className="absolute left-0 pointer-events-none flex flex-col gap-2 overflow-visible will-change-transform"
        >
          {/* Number */}
          <div className="flex overflow-visible">
            <TextReveal
              ref={numberRef}
              trigger="manual"
              splitBy="chars"
              className="text-[1.2rem] font-mono font-medium text-amber-500 tracking-wider block"
            >
              {project.number ? String(project.number) : ""}
            </TextReveal>
          </div>

          {/* Title & Year Row */}
          <div className="flex justify-between items-end w-full whitespace-nowrap gap-4 overflow-visible">
            <TextReveal
              ref={titleRef}
              trigger="manual"
              splitBy="words"
              className="text-white text-[1.4rem] font-medium tracking-wide block"
            >
              {project.title || ""}
            </TextReveal>

            <TextReveal
              ref={yearRef}
              trigger="manual"
              splitBy="words"
              className="text-white/60 text-sm font-light pb-0.5 block"
            >
              {project.year ? String(project.year) : ""}
            </TextReveal>
          </div>
        </div>

        {/* Image Div */}
        <div className="imageDiv absolute h-full w-full overflow-hidden rounded-md">
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