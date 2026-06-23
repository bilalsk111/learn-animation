"use client";

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import gsap from "@/libs/gsap";

const STRIP_COUNT = 7;

const createStrip = () => {
  if (typeof document === 'undefined') return null;
  
  const overlay = document.createElement("div");
  overlay.id = "page-transition-overlay";
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 99999;
    pointer-events: none;
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 100vh;
  `;

  for (let i = 0; i < STRIP_COUNT; i++) {
    const strip = document.createElement("div");
    strip.id = `page-transition-strip-${i}`;
    
    // [CRITICAL FIX]: margin-right -1px aur anti-aliasing lagane se rendering gaps permanent gayab ho jayenge
    strip.style.cssText = `
      flex: 1;
      height: 100%;
      background-color: #f07026;
      transform: scaleY(0);
      transform-origin: bottom;
      margin-right: -1px; 
      will-change: transform;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      backface-visibility: hidden;
      transform-style: preserve-3d;
    `;
    overlay.appendChild(strip);
  }
  document.body.appendChild(overlay);
  return overlay;
};

const removeOverlay = () => {
  if (typeof document === 'undefined') return;
  const overlay = document.getElementById("page-transition-overlay");
  if (overlay) overlay.remove();
};

const useViewTransition = () => {
  const router = useRouter();

  const navigateTo = useCallback((url) => {
    const overlay = createStrip();
    if (!overlay) return;

    const strip = Array.from(overlay.children);

    gsap.to(strip, {
      scaleY: 1,
      duration: 0.45,
      ease: 'power3.inOut',
      stagger: {
        each: 0.06,
        from: "center"
      },
      onComplete: () => {
        router.push(url);
        
        gsap.to(strip, {
          scaleY: 0,
          duration: 0.45,
          ease: "power3.inOut",
          delay: 0.12,
          stagger: {
            each: 0.06,
            from: "center"
          },
          transformOrigin: "top",
          onComplete: () => {
            removeOverlay();
          }
        });
      }
    });
  }, [router]);

  return { navigateTo };
};

export default useViewTransition;