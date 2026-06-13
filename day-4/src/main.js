import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './style.css'
import gsap from 'gsap'

//timeline control

// const playBtn = document.querySelector('.play');
// const pauseBtn = document.querySelector('.pause');
// const restartBtn = document.querySelector('.restart');
// const reverseBtn = document.querySelector('.reverse');
// const seekBtn = document.querySelector('.seek'); 

// let tl = gsap.timeline({paused:true})

// tl.to(".box1",{
//   x:500,
//   duration:2,
//   ease:"power1.out",
// })
// .addLabel("sk")
// .to(".box2",{
//   x:500,
//   duration:2,
//   ease:"power1.out",
// })
// .to(".box3",{
//   x:500,
//   duration:2,
//   ease:"power1.out",
// })
// // .addLabel("sk")

// // Event Listeners
// playBtn.addEventListener('click', () => {
//   tl.play();
// });

// pauseBtn.addEventListener('click', () => {
//   tl.pause();
// });

// restartBtn.addEventListener('click', () => {
//   tl.restart();
// });

// // Optional: Reverse functionality
// reverseBtn.addEventListener('click', () => {
//   tl.reverse();
// });

// // Optional: Seek functionality (jumps to 50% of timeline)
// seekBtn.addEventListener('click', () => {
//   // tl.progress(0.5).pause();
// tl.seek("sk")
// });

//nested timeline
// const loadingTimeline=()=>{
//   return gsap.timeline().to(Element,{})
// }
// const navTimeline=()=>{
//   return gsap.timeline().to(Element,{})
// }
// const master = gsap.timeline();
// master.add(loadingTimeline,"-=0.4").add(navTimeline)


gsap.registerPlugin(ScrollTrigger)

gsap.to(".sec2 .box1", {
  x: 800,
  duration: 2,
  scrollTrigger: {
    trigger: ".sec2 .box1", 
    start: "top 90%",             
    scrub:true,
    // pin:true,
    onEnter:()=>{},
    onLeave:()=>{},
    onUpdate:()=>{},
    onEnterBack:()=>{},
    onLeaveBack:()=>{}
  }
});