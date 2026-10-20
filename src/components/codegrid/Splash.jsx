import { gsap } from "gsap";
import { useRef } from "react";


const config = {
    count    : 20,
    sizeMin  : 15,
    sizeMax  : 30,
    burst    : 900,  // how far the particle fire upwords
    spread   : 400,  // how far left/right they ran out 
    gravity  : 1600,
    fadeAfter: 400,
};

const activeParticles = [];

function createParticle(originX, originY) {

  const particle = document.createElement("div");
  const icons = ['🎉', '🍷', '🎓'];

  const randomIndex    = Math.floor(Math.random() * icons.length);
  particle.textContent = icons[randomIndex];

  const size = config.sizeMin + Math.random() * (config.sizeMax - config.sizeMin);

  Object.assign(particle.style, {
    position: "fixed",
    top: "0px",
    left: "0px",
    pointerEvents: "none",
    zIndex: "9999",
    lineHeight: "1",
    fontSize: size + "px",
  });

  document.body.appendChild(particle);

  const horizontalVelocity = (Math.random() - 0.5) * config.spread;
  const verticalVelocity = -(0.5 + Math.random() * 0.5) * config.burst;

  activeParticles.push({
    element: particle,
    posX: originX - size / 2,
    posY: originY - size / 2,
    velocityX: horizontalVelocity,
    velocityY: verticalVelocity,
    angle: (Math.random() - 0.5) * 360,
    spinSpeed: (Math.random() - 0.5) * 800,
    totalDistance: 0
  });
  
};

function updateParticle(){
    // const deltaRatio = gsap.ticker.deltaRatio(60);
    // const step = deltaRatio / 60; 

    for(let i = activeParticles.length-1; i >= 0; i--){
        const particle = activeParticles[i];

        particle.velocityY += config.gravity * 0.05;

        particle.posX +=  particle.velocityX * 0.05;
        particle.posY += particle.velocityY * 0.05;

        particle.angle += particle.spinSpeed * 0.05;

        particle.totalDistance += Math.abs(particle.velocityX * 0.05) + Math.abs(particle.velocityY * 0.05);

        let opacity = 1;

        if (particle.totalDistance > config.fadeAfter) {
            const fadeProgress = (particle.totalDistance - config.fadeAfter) / 150;
            opacity = Math.max(0, 1 - fadeProgress);
        }

        gsap.set(particle.element, {
            x: particle.posX,
            y: particle.posY,
            opacity: opacity,
            rotate: particle.angle
        });

        if(opacity <= 0 ){
            particle.element.remove();
            activeParticles.splice(i, 1);
        };
    }
};


gsap.ticker.add(updateParticle);



export default function Splash(){

    const ref = useRef(null);
    
    function triggerBurst(){
        const bounds  = ref.current.getBoundingClientRect();
        const originX = bounds.left + bounds.width / 2;
        // const originX = bounds.left + Math.random() * bounds.width;
        const originY = bounds.top  + bounds.height / 2;
    
        for(let i = 0; i < config.count; i++){
            createParticle(originX, originY);
        };
    };

    return(
        <div className="px-12 py-4 bg-amber-100 flex items-center justify-center rounded-md border border-white/60">

            <p ref={ref} onMouseEnter={() => triggerBurst()} className=" text-4xl font-bold cursor-pointer">Shani Develops</p>

        </div>
    )
}