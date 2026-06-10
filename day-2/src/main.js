import "./style.css"
import gsap from "gsap"


// gsap.to(".box",{
//   x:500,
//   y:500,
//   delay:1,
//   duration:10,
//   ease: "bounce.inOut",
// })
// gsap.to(".box", {
//   y: 800,              // ground position
//   duration: 1.5,
//   delay:0.6,
//   ease: "power2.inOut", // realistic bounce
//   repeat: 3,
//   yoyo: true
// });

// gsap.set('.box',{
//   x:-300
// })

// gsap.to('.box',{
//   x:1800,
//   duration:3,
//   delay:1,
//   repeat:-1,
//   ease:"power2.inOut"
// })

// gsap.set(".box", {
//   x: -300
// });

// // Infinite marquee
// gsap.to(".box", {
//   x: window.innerWidth + 300,
//   duration: 8,
//   ease: "none", // constant speed
//   repeat: -1
// });


// Animate box and track animation lifecycle
gsap.to(".box", {
  x: 500,
  y: 500,
  delay: 1,
  duration: 10,
  ease: "bounce.inOut",

  // Runs once when animation starts
  onStart: () => {
    console.log("Animation started");
  },

  // Runs on every animation frame
  onUpdate: () => {
    console.log("Animation updating");
  },

  // Runs once when animation finishes
  onComplete: () => {
    console.log("Animation completed");
  }
});