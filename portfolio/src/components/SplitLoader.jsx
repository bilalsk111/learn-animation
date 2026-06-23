"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import LOGO_PATH from "@/libs/svgPath";

export default function FluidLoader({ onComplete }) {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const maskPathRef = useRef(null);
  const strokePathRef = useRef(null);

  const [count, setCount] = useState(0);
  const [isDone, setIsDone] = useState(false);

  // Smooth GSAP rendering
  useEffect(() => {
    gsap.config({
      force3D: true,
      autoSleep: 60,
    });

    gsap.ticker.lagSmoothing(1000, 16);
  }, []);

  // Percentage logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }

        const next = prev + Math.floor(Math.random() * 4) + 1;

        return next > 100 ? 100 : next;
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  // Progress bar animation
  useGSAP(() => {
    if (!lineRef.current) return;

    gsap.to(lineRef.current, {
      scaleX: count / 100,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
      force3D: true,
    });
  }, [count]);

  // SVG animation (RUN ONLY ONCE)
  useGSAP(() => {
    if (
      !containerRef.current ||
      !maskPathRef.current ||
      !strokePathRef.current
    ) {
      return;
    }

    gsap.set([strokePathRef.current, maskPathRef.current], {
      force3D: true,
      transformPerspective: 1000,
      willChange: "stroke-dashoffset, opacity",
    });

    const strokeLength =
      strokePathRef.current.getTotalLength();

    gsap.set(strokePathRef.current, {
      strokeDasharray: strokeLength,
      strokeDashoffset: strokeLength,
      opacity: 1,
    });

    const maskLength =
      maskPathRef.current.getTotalLength();

    gsap.set(maskPathRef.current, {
      strokeDasharray: maskLength,
      strokeDashoffset: maskLength,
    });

    const tl = gsap.timeline();

    tl.to(strokePathRef.current, {
      strokeDashoffset: 0,
      duration: 2,
      ease: "none",
    })
      .to(
        maskPathRef.current,
        {
          strokeDashoffset: 0,
          duration: 2.5,
          ease: "none",
        },
        "-=1.6"
      )
      .to(
        strokePathRef.current,
        {
          opacity: 0,
          duration: 0.5,
        },
        "-=0.25"
      );
  }, []);

  // Split animation
  useGSAP(() => {
    if (count !== 100) return;

    const tl = gsap.timeline();

    tl.to(".loader-center-content", {
      opacity: 0,
      y: -15,
      duration: 0.3,
      ease: "power2.in",
    })
      .to(
        ".left-curtain",
        {
          xPercent: -100,
          duration: 0.7,
          ease: "power3.inOut",
          force3D: true,
        },
        "-=0.1"
      )
      .to(
        ".right-curtain",
        {
          xPercent: 100,
          duration: 0.7,
          ease: "power3.inOut",
          force3D: true,
        },
        "<"
      )
      .add(() => {
        setIsDone(true);
        onComplete?.();
      });
  }, [count]);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden select-none pointer-events-none"
    >
      {/* LEFT CURTAIN */}
      <div
        className="left-curtain absolute top-0 left-0 w-1/2 h-full bg-[#1e1412] pointer-events-auto"
        style={{
          willChange: "transform",
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
        }}
      />

      {/* RIGHT CURTAIN */}
      <div
        className="right-curtain absolute top-0 right-0 w-1/2 h-full bg-[#1e1412] pointer-events-auto"
        style={{
          willChange: "transform",
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
        }}
      />

      {/* CENTER CONTENT */}
      <div className="loader-center-content z-10 flex flex-col items-center justify-center text-[#f5eae4] pointer-events-auto w-full max-w-lg px-6">
        <svg
          width="430"
          height="78"
          viewBox="0 0 430 78"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-72 md:w-96 h-auto mb-6"
          style={{
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
            willChange: "transform",
          }}
        >
          <defs>
            <mask id="fluidRevealMask" maskUnits="userSpaceOnUse">
              <path
                ref={maskPathRef}
                d={LOGO_PATH}
                fill="none"
                stroke="white"
                strokeWidth="60"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </mask>
          </defs>

          <path
            d={LOGO_PATH}
            fill="#f07026"
            mask="url(#fluidRevealMask)"
          />

          <path
            ref={strokePathRef}
            d={LOGO_PATH}
            stroke="#f07026"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0"
          />
        </svg>

        {/* Counter */}
        <div className="text-xl font-light tracking-widest font-mono opacity-80 mb-6">
          {count}%
        </div>

        {/* Progress Bar */}
        <div className="w-48 h-[2px] bg-[#f5eae4]/20 rounded-full overflow-hidden relative">
          <div
            ref={lineRef}
            className="absolute top-0 left-0 h-full bg-[#f5eae4] origin-left w-full"
            style={{
              transform: "scaleX(0)",
              willChange: "transform",
            }}
          />
        </div>
      </div>
    </div>
  );
}