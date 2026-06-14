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

  const hero = document.querySelector(".hero");

  const state = Flip.getState([clicked, hero]);

  // swap
  document.querySelector(".imgs").appendChild(hero);

  document.querySelector(".imgshow").appendChild(clicked);

  // class swap
  clicked.classList.remove("thumb");
  clicked.classList.add("hero");

  hero.classList.remove("hero");
  hero.classList.add("thumb");

  // animate
  Flip.from(state, {
    duration: 1,

    ease: "power2.inOut",

    absolute: true,

    nested: true,

    scale: true,

    onComplete: () => {
      gsap.set([clicked, hero], {
        clearProps: "transform,width,height",
      });
    },
  });
});
