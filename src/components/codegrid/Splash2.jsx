import { gsap } from "gsap";
import { useRef } from "react";

const config = {
    count    : 20,
    sizeMin  : 15,
    sizeMax  : 30,
    burst    : 900,  // how far the particle fire upwords
    spread   : 1000,  // how far left/right they ran out 
    gravity  : 1600,
    fadeAfter: 2000,
};


function createParticle(originX, originY) {
  const particle = document.createElement("div");
  const icons = ["🎉", "🍷"];
  const size = config.sizeMin + Math.random() * (config.sizeMax - config.sizeMin);
  particle.textContent = icons[Math.floor(Math.random() * icons.length)];
  
  Object.assign(particle.style, {
      position: "fixed",
      top: "0px",
      left: "0px",
      pointerEvents: "none",
      zIndex: "9999",
      lineHeight: "1",
      fontSize: size + "px",
    });
  

  particle.style.fontSize = size + "px";
  document.body.appendChild(particle);

//   gsap.set(particle, { x: originX - size / 2, y: originY - size / 2 });

//   const driftX = (Math.random() - 0.5) * config.spread;
//   const rise   = 250 + Math.random() * 300;   // how high it goes
//   const fall   = rise + 300 + Math.random() * 200;
//   const spin   = (Math.random() - 0.5) * 720;
 // bottom of the emoji sits exactly on the top edge of the text
  gsap.set(particle, { x: originX - size / 2, y: originY - size });

  const driftX = (Math.random() - 0.5) * 100;   // small sideways drift
  const rise   = 15 + Math.random() ;     // how high above the text
  const spin   = (Math.random() - 0.5) * 360;


  const tl = gsap.timeline({ onComplete: () => particle.remove() });

  tl.to(particle, { x: "+=" + driftX, duration: 1, ease: "none" }, 0)
    .to(particle, { rotation: spin, duration: 1, ease: "none" }, 0)
    .to(particle, { y: "-=" + rise, duration: 0.6, ease: "power2.out" }, 0)
    // .to(particle, { y: "+=" + fall, duration: 1.0, ease: "power2.in" }, 0.6)  
    .to(particle, { y: "+=" + rise, duration: 1.0, ease: "power2.in" }, 0.6)  
    .to(particle, { opacity: 0, duration: 0.5, ease: "power1.in" }, 1.1);
};

export default function Splash2(){
        const ref = useRef(null);
        function triggerBurst() {
            const bounds = ref.current.getBoundingClientRect();
            const originY = bounds.top;

            for (let i = 0; i < config.count; i++) {
                const originX = bounds.left + bounds.width/2;
                createParticle(originX, originY);
            }
        }
    //      function triggerBurst(){
    //     const bounds  = ref.current.getBoundingClientRect();
    //     const originX = bounds.left + bounds.width / 2;
    //     // const originX = bounds.left + Math.random() * bounds.width;
    //     const originY = bounds.top  + bounds.height / 2;
    
    //     for(let i = 0; i < config.count; i++){
    //         createParticle(originX, originY);
    //     };
    // };

    return(
        <div className="relative px-12 py-4 bg-amber-100 flex items-center justify-center rounded-md border border-white/60">

            <p ref={ref} 
               onMouseEnter={() => triggerBurst()} 
               className=" text-4xl font-bold cursor-pointer"
            >
                Shani Develops
            </p>

        </div>
    )
}