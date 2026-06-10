import gsap from "gsap";
import "./style.css"


gsap.fromTo(".box",{
y:500
}, { 
  duration: 1,
  x: 200,
  rotation: 360,
  ease:"power2.inOut"
});