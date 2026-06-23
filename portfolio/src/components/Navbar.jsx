"use client";

import Link from "next/link";
import TextReveal from "./TextReveal"; // Path configuration check kar lein
import useViewTransition from "@/hook/useViewTransition";

const Navbar = ({ play }) => {
  const { navigateTo } = useViewTransition();

  const handleNavigation = (e, targetUrl) => {
    e.preventDefault();
    navigateTo(targetUrl);
  };

  return (
    <nav className="fixed z-[30] px-[2rem] top-2 left-0 h-[6vh] flex items-center justify-between w-full">
      
      {/* Left Brand Side */}
      <div className="leftNameSide">
        <Link href="/" onClick={(e) => handleNavigation(e, "/")}>
          <TextReveal duration={0.9} splitBy="words" play={play}>
            <span className="text-[1.2rem] font-mono tracking-wide select-none mix-blend-difference text-[#f5eae4] cursor-pointer">
              BILAL SHAIKH
            </span>
          </TextReveal>
        </Link>
      </div>

      {/* Right Navigation Links Side */}
      <div className="rightLinkSide flex items-center gap-6">
        
        <Link 
          href="/" 
          onClick={(e) => handleNavigation(e, "/")} 
          className="text-[1rem] font-sans tracking-wider cursor-pointer text-[#f5eae4]/80 hover:text-[#f07026] transition-colors duration-300 uppercase font-medium"
        >
          <TextReveal duration={0.9} splitBy="words" play={play} delay={0.1}>
            <span>Home</span>
          </TextReveal>
        </Link>

        <Link 
          href="/about" 
          onClick={(e) => handleNavigation(e, "/about")} 
          className="text-[1rem] font-sans tracking-wider cursor-pointer text-[#f5eae4]/80 hover:text-[#f07026] transition-colors duration-300 uppercase font-medium"
        >
          <TextReveal duration={0.9} splitBy="words" play={play} delay={0.15}>
            <span>About</span>
          </TextReveal>
        </Link>

        <Link 
          href="/contact" 
          onClick={(e) => handleNavigation(e, "/contact")} 
          className="text-[1rem] font-sans tracking-wider cursor-pointer text-[#f5eae4]/80 hover:text-[#f07026] transition-colors duration-300 uppercase font-medium"
        >
          <TextReveal duration={0.9} splitBy="words" play={play} delay={0.2}>
            <span>Contact</span>
          </TextReveal>
        </Link>

      </div>

    </nav>
  );
};

export default Navbar;