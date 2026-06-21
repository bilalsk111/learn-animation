"use client"
import { useEffect, useRef } from "react";
import CarouselCard from "./CarouselCard";
import gsap from "@/libs/gsap";

const CARD_W = 280;
const CARD_H = 420;
const SCALE = 1.35;
const CARD_GAP = 25;

const DURATION = 10;
const TRACK_H = CARD_H * SCALE;

const InfiniteCarousel = ({ projects }) => {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    // Pure mathematical loop width base formula
    const singleWidth = projects.length * (CARD_W + CARD_GAP);

    tweenRef.current = gsap.to(trackRef.current, {
      repeat: -1,
      ease: "none",
      duration: DURATION,
      x: -singleWidth,
    });

    return () => tweenRef.current?.kill();
  }, [projects]);

  const doubled = [...projects, ...projects];

  return (
    <div
      style={{
        padding: `${TRACK_H * 0.2}px 0 40px`,
      }}
      className="overflow-hidden w-full rotate-2"
    >
      <div
        ref={trackRef}
        style={{
          gap: `${CARD_GAP}px`,
          width: "max-content",
          height: `${TRACK_H}px`,
        }}
        className="track flex items-center"
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