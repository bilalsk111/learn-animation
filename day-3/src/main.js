import "./style.css";
import gsap from "gsap";
import SplitType from "split-type";

// 1. Text ko target aur split karo
const nameText = new SplitType(".name", { types: "words" });
const headingText = new SplitType(".heading p", { types: "chars" });
function CursorTail() {
  const coords = { x: 0, y: 0 };
  const circles = document.querySelectorAll(".circle");

  circles.forEach(function (circle, index) {
    circle.x = 0;
    circle.y = 0;
    //   circle.style.backgroundColor = colors[index % colors.length];
  });

  window.addEventListener("mousemove", function (e) {
    coords.x = e.clientX;
    coords.y = e.clientY;
  });

  function animateCircles() {
    let x = coords.x;
    let y = coords.y;

    circles.forEach(function (circle, index) {
      circle.style.left = x - 20 + "px";
      circle.style.top = y - 20 + "px";

      circle.style.scale = (circles.length - index) / circles.length;

      circle.x = x;
      circle.y = y;

      const nextCircle = circles[index + 1] || circles[0];
      x += (nextCircle.x - x) * 0.1;
      y += (nextCircle.y - y) * 0.1;
    });

    requestAnimationFrame(animateCircles);
  }

  animateCircles();
}
CursorTail();
// 2. Glitch-free Timeline banao
let tl = gsap.timeline();

let loaderCount = { value: 0 };

tl.to(loaderCount, {
  value: 100,
  duration: 2.5, // Loading speed (2.5 seconds)
  ease: "power2.out", // Shuru mein tez, end mein thoda slow (Premium feel)
  onUpdate: function () {
    document.querySelector(".bar h3").textContent =
      Math.floor(loaderCount.value) + "%";
  },
})

  .to(".bar", {
    opacity: 0,
    duration: 0.4,
    ease: "power2.inOut",
  })

  .to(
    "#loader .line",
    {
      y: "-100%",
      duration: 1.2,
      ease: "power4.inOut",
      stagger: {
        each: 0.08,
        from: "random",
      },
    },
    "-=0.2",
  )
  .to(
    ".circle",
    {
      opacity: 1,
      duration: 0.3,
    },
    "-=0.4",
  )


  .from(
    nameText.words,
    {
      y: -40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.05,
    },
    "-=0.8",
  )

  .from(
    ".avatar",
    {
      y: 150,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
    },
    "-=0.8",
  )
  .from(
    headingText.chars,
    {
      y: 30,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
      stagger: 0.02,
    },
    "-=0.7",
  );
