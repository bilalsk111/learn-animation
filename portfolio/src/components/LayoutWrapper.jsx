"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import SplitLoader from "@/components/SplitLoader"; // <-- Aapka original SplitLoader import

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const [isAnimationComplete, setIsAnimationComplete] = useState(true);
  const [checkingStorage, setCheckingStorage] = useState(true);

  useEffect(() => {
    const hasLoaderRun = sessionStorage.getItem("hasVisitedIntro");

    if (!hasLoaderRun && pathname === "/") {
      setIsAnimationComplete(false);
    } else {
      setIsAnimationComplete(true);
    }
    setCheckingStorage(false);
  }, [pathname]);

  const handleComplete = () => {
    sessionStorage.setItem("hasVisitedIntro", "true");
    setIsAnimationComplete(true);
  };

  if (checkingStorage) {
    return <div className="min-h-screen bg-black" />;
  }

  return (
    <>
      {/* 1. Intro Preloader: Sirf pehli baar website open hone par chalega */}
      {!isAnimationComplete && (
        <SplitLoader onComplete={handleComplete} />
      )}

      {/* 2. Main Site Structure */}
      <div className="min-h-full flex flex-col">
        <Navbar play={isAnimationComplete} />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </>
  );
}