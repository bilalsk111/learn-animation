import "./style.css";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { Draggable } from "gsap/Draggable";
import { Flip } from "gsap/Flip";
import InertiaPlugin from "gsap/InertiaPlugin";

gsap.registerPlugin(SplitText, Draggable, InertiaPlugin, Flip);
// let text = new SplitText("h1",{type:"chars"})

// gsap.from(text.chars,{
//   yPercent:100,
//   opacity:0,
//   ease:'expo.out',
//   stagger:{
//     each:0.08,
//     from:"random"
//   }
// })

Draggable.create(".box", {
  bounds: "#app",
  type: "x,y",
  edgeResistance: 1,
  inertia: true,
  dragResistance: 0.2,
});

const thumbsContainer = document.querySelector(".imgs");

thumbsContainer.addEventListener("click", (e) => {
  const clicked = e.target;

  if (!clicked.classList.contains("thumb")) return;

  const hero =document.querySelector(".hero");

  const state = Flip.getState(clicked);
  const state2 = Flip.getState(hero);

  // swap
  hero.parentNode.appendChild(clicked);
  thumbsContainer.appendChild(hero);

  // swap classes
  clicked.classList.replace(
    "thumb",
    "hero"
  );

  hero.classList.replace(
    "hero",
    "thumb"
  );

  Flip.from(state, {
    duration: 0.9,

    ease: "power3.inOut",
  });
  Flip.from(state2, {
    duration: 0.9,

    ease: "power3.inOut",
  });
});
