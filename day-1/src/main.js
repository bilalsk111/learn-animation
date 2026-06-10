import gsap from "gsap";
import "./style.css"


// Animates current state → target state
gsap.to(".box", { 
  delay: 1.5,
  duration: 2,
  x: 400,
  rotation: 360,
});

// Animates from custom start state → end state
gsap.fromTo(".box", {
  y: 0,
  x: 0
}, { 
  delay: 1.5,
  duration: 3,
  x: 200,
  y: 500,
  rotation: 360,
});

// Instantly sets values (no animation, delay/duration ignored)
gsap.set(".box", { 
  delay: 1,      // ignored
  duration: 4,   // ignored
  x: 300,
  y: 300,
  borderRadius: "50%",
  scale: 1.5,
  rotation: 360,
});