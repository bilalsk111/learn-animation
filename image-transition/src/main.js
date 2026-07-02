import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Raycaster,Vector2 } from "three";
import gsap from "gsap";



const canvas = document.querySelector("canvas");

const scene = new THREE.Scene();

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};


const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.1,
  100,
);

camera.position.z = 5;

scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});

renderer.setSize(size.width, size.height);

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.outputColorSpace = THREE.SRGBColorSpace;


const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;

window.addEventListener("resize", () => {
  size.width = window.innerWidth;

  size.height = window.innerHeight;

  camera.aspect = size.width / size.height;

  camera.updateProjectionMatrix();

  renderer.setSize(size.width, size.height);
});


scene.add(new THREE.AmbientLight(0xffffff, 2));


const loader = new THREE.TextureLoader();

const img1 = loader.load("./img1.jpg");
const img2 = loader.load("./img2.jpg");

const uniforms = {
  uTime: {
    value: 0,
  },
  uTexA: {
    value: img1,
  },
  uTexB: {
    value: img2,
  },
  uProgress:{
    value: 0.0
    }
};


const geometry = new THREE.PlaneGeometry(3, 3, 150, 150);

const material = new THREE.ShaderMaterial({
  uniforms,

  side: THREE.DoubleSide,
  vertexShader: `
  uniform float uTime;
varying vec2 vUv;

void main(){

vec3 pos = position;

gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
vUv = uv;
}
`,
  fragmentShader: `
varying vec2 vUv;
uniform sampler2D uTexA;
uniform sampler2D uTexB;
uniform float uProgress; // Added missing type declaration here

void main(){
  vec2 uv = vUv;
  vec4 colorA =  texture2D(uTexA, vUv);
  vec4 colorB =  texture2D(uTexB  , vUv);
  vec4 mixedColor = mix(colorA, colorB, uProgress); 
// gl_FragColor = vec4(vUv, 0.0, 1.0);
gl_FragColor = mixedColor;

}

`,
});

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();


window.addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

window.addEventListener('click',()=>{
raycaster.setFromCamera(mouse, camera);
  const intersect = raycaster.intersectObject(plane
  );

  if (intersect.length > 0) {
    gsap.to(material.uniforms.uProgress, {
      value: 1.0,
      duration: 3,
      ease: "power3.out",
    });
  }
})

const plane = new THREE.Mesh(geometry, material);

scene.add(plane);

// =================
// Animation
// =================

const timer = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  uniforms.uTime.value = timer.getElapsedTime();

  controls.update();

  renderer.render(scene, camera);
}

animate();