"use client"
import { useEffect, useRef } from "react";
import CarouselCard from "./CarouselCard";
import gsap from "@/libs/gsap";

const CARD_W = 280;
const CARD_H = 420;
const SCALE = 1.25; 

const CARD_GAP = 45;

const DURATION = 15; // Thoda uniform spacing duration build kiya h loop smooth karne ke liye
const TRACK_H = CARD_H * SCALE;

const InfiniteCarousel = ({ projects }) => {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const singleWidth = projects.length * (CARD_W + CARD_GAP);

    tweenRef.current = gsap.to(trackRef.current, {
      x: -singleWidth,
      duration: DURATION,
      repeat: -1,
      ease: "none",
    });

    return () => tweenRef.current?.kill();
  }, [projects]);

  // Infinite jumping visual break khatam karne ke liye simple multiplier loop
  const doubled = [...projects, ...projects, ...projects, ...projects];

return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        // Pehle 20vh tha, ab 8vh kiya hai taaki carousel screen ke aur neeche (bottom ke paas) shift ho jaye
        paddingBottom: "10vh", 
      }}
      className="overflow-hidden w-full select-none"
    >
      <div
        ref={trackRef}
        style={{
          gap: `${CARD_GAP}px`,
          width: "max-content",
          height: `${TRACK_H}px`,
        }}
        className="track flex items-center will-change-transform"
      >
        {doubled.map((project, i) => (
          <CarouselCard
            key={i}
            project={project}
            onHoverStart={() => tweenRef.current?.pause()}
            onHoverEnd={() => tweenRef.current?.play()}
          />
        ))}
      </div>
    </div>
  );
};

export default InfiniteCarousel;