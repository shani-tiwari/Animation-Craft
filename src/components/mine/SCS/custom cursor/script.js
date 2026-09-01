// import "./style.css";



const lerp = (a, b, n) => (1 - n) * a + n * b;
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const dist = (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1);
// cursor animation



const cursor = document.querySelector(".cursor");

// these value keeps the cursor at this position, far from the viewport.
let mouseX = 9999; 
let mouseY = 9999;

// as we enter the screen with mouse, cursor co-ords change to be with mouse
window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// these variables will keep track of the cursor's co-ords and its previous co-ords
let cx = mouseX,
  cy = mouseY,
  lastX = mouseX,
  lastY = mouseY;

function animate() {
  // move the cursor toward the real cursor a little each frame -> the "lag"
  cx = lerp(cx, mouseX, 0.18);  
  cy = lerp(cy, mouseY, 0.18);  
  /*
    0.18   ->   it moves to the mouse position with 18% of the distance.
    cx     ->   X position of the previous cursor
    cy     ->   Y position of the previous cursor
    mouseX ->   X position of the current  cursor
    mouseY ->   Y position of the current  cursor
  */


  // speed + direction from how far the mouse moved since last frame -> coz we have to animate it during the path.
  const vx = mouseX - lastX;
  const vy = mouseY - lastY;
  lastX = mouseX;
  lastY = mouseY;
  const speed = clamp(Math.hypot(vx, vy), 0, 40);
  const stretch = 1 + speed / 60;
  const angle = Math.atan2(vy, vx) * (180 / Math.PI);

  cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0) rotate(${angle}deg) scaleX(${stretch}) scaleY(${1 / (stretch * 0.4 + 0.6)}) `;

  requestAnimationFrame(animate);
}
animate();


// ------------------ Pointer fiels animation 

const title = document.getElementById("hero-title");

// split each word into one <span class="ch"> per character
title.querySelectorAll(".word").forEach((word) => {
  const text = word.textContent;
  word.textContent = "";
  [...text].forEach((ch) => {
    const span = document.createElement("span");
    span.className = "ch";
    span.textContent = ch;
    word.appendChild(span);
  });
});

const chars = [...title.querySelectorAll(".ch")];
const state = chars.map(() => ({ x: 0, y: 0, tx: 0, ty: 0 }));
let rects = [];

// measure each character's center once, and again on resize —
// never inside the animation loop, it's expensive
function measure() {
  rects = chars.map((el) => {
    const r = el.getBoundingClientRect();
    return { cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
  });
}
measure();
window.addEventListener("resize", measure);

const RADIUS = 200;
const STRENGTH = 25;

function animate2() {
  for (let i = 0; i < chars.length; i++) {
    const r = rects[i];
    const d = dist(mouseX, mouseY, r.cx, r.cy);

    if (d < RADIUS) {
      const falloff = 1 - d / RADIUS; // 1 = right at the cursor, 0 = at the edge
      const angle = Math.atan2(r.cy - mouseY, r.cx - mouseX);
      state[i].tx = Math.cos(angle) * falloff * STRENGTH;
      state[i].ty = Math.sin(angle) * falloff * STRENGTH;
    } else {
      state[i].tx = 0;
      state[i].ty = 0;
    }

    state[i].x = lerp(state[i].x, state[i].tx, 0.14);
    state[i].y = lerp(state[i].y, state[i].ty, 0.14);
    chars[i].style.transform = `translate3d(${state[i].x}px, ${state[i].y}px, 0)`;
  }
  requestAnimationFrame(animate2);
}
animate2();