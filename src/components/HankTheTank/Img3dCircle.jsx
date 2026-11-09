
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Observer from "gsap/Observer";

gsap.registerPlugin(Observer);

const slicesPerCard = 120;
const gap = 0.18;
const normalSpeed = 0.01;

const artists = [
  { name: "Elena Marchetti", role: "Artist", photo: "QmeNv2RoYW42tJuohF9cBemdKZ5gU7ScLMrD3GVBn9CrUP" },
  { name: "Kofi Mensah", role: "Curator", photo: "QmdLGVKWQMu2kmADw32js2eN3Tcj856oFfiEWdYeEZbvaP" },
  { name: "Ines Laurent", role: "Painter", photo: "QmdpN5pdZeFxPk9vYtvZ8yzbbdHFAU9y4n67fyjTxQ8SP2" },
  { name: "Julian Hart", role: "Sculptor", photo: "QmUhyQ2mqsc7H7wragKMiaoodQN4qQBhN8cSga1fM416gv" },
  { name: "Mei Tanaka", role: "Illustrator", photo: "QmSKK8QWwSb3bRhpMBKGCzmcCpV2CAJhy53braMdEt1oCR" },
  { name: "Omar Haddad", role: "Photographer", photo: "QmWPcoFTrcAbGwks69BYZXVtmqwBcuEPJRBF46c6ispW3F" },
  { name: "Lina Park", role: "Artist", photo: "Qmf5Dt5XxvjeKCof2YN9E4HixwT3FwmfzNv32gfUJZdkGB" },
  { name: "Theo Castell", role: "Collector", photo: "QmXDg4D8dGdmRvZxohErNnycCDK39nHggzanRaxibacrxY" },
];

function createCard(artist) {
  const card = document.createElement("canvas");
  card.width = 1200;
  card.height = 1600;

  const cardCtx = card.getContext("2d");
  const photo = new Image();

  // photo.onload runs async, so card is returned before its image finishes loading.
  photo.onload = () => {
    cardCtx.fillStyle = "#0b0b0b";
    cardCtx.fillRect(0, 0, card.width, card.height);

    cardCtx.drawImage(photo, 40, 40);

    cardCtx.font = "500 80px Syne";
    cardCtx.fillStyle = "white";
    cardCtx.fillText(artist.name, 40, 1420);

    cardCtx.font = "500 48px Syne";
    cardCtx.fillStyle = "#f26e33";
    cardCtx.fillText(artist.role, 40, 1505);
  };

  photo.src = `https://assets.lummi.ai/assets/${artist.photo}?w=1120&h=1240&fit=crop&crop=faces`;

  return card;
}

export default function Img3dCircle() {

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const ring = {
      angle: 0,
      speed: normalSpeed,
      tilt: -0.28,
    }; 
    let cards = [];
    let disposed = false;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };
    
    /* calculates where a slice should appear on the ring and how big should it look?
      Accepts: 
      - angle: Current position around the circle.
      - radius: Size of the ring.

      - Math.cos(): Calculates depth.
      - Math.sin(): Calculates horizontal position.
      - scale: Makes front-facing parts look larger.
      Returns:
        - x → Horizontal position.
        - y → Vertical position.
        - scale → Size adjustment.
    */
    function pointOnRing(angle, radius) {
      const depth = Math.cos(angle); // Depth tells, whether a slice is at the front or back of the ring.
      // cos(0) → +1(front), cos(90) → 0(side), cos(180) → -1(back)
      const scale = 1 + depth * 0.25; // depth is +1,card is in front of us - so it'll appear bigger 

      return {
        x: Math.sin(angle) * radius * scale, //determines horizontal position on the circle.
        y: depth * radius * 0.2,
        scale,
      };
    };

    /* draws all cards around the ring.
        radius: Ring size.
        slotAngle: Total angular space available for one card.
        cardAngle: Actual card space after applying the gap.
        sliceAngle: Angular space occupied by one slice.
        cardHeight: Card height based on ring size.

        */
    function drawRing(side) {
         if (!cards.length) return; 
         
         const radius = Math.min(canvas.width * 0.4, canvas.height * 0.5); 
         
         const slotAngle = (Math.PI * 2) / cards.length;
         const cardAngle = slotAngle * (1 - gap);
         const sliceAngle = cardAngle / slicesPerCard;
         const cardHeight = radius * cardAngle * 1.33;
         
      cards.forEach((card, cardIndex) => {
           
           // Each slice width = 1200 / 120 = 10px
           // Each slice can be positioned independently, making the flat card appear curved in 3D space.
           const sliceWidth = card.width / slicesPerCard;
        /*
          - Takes each card one by one.
          - Calculates its slice width.  
            Loop through slices → Processes its 120 slices individually.
        */
        for (let slice = 0; slice < slicesPerCard; slice++) {

          const angle = ring.angle + cardIndex * slotAngle + slice * sliceAngle;

          const start = pointOnRing(angle, radius);
          const end = pointOnRing(angle + sliceAngle, radius);
          const height = cardHeight * start.scale;  // Adjusts height according to depth.
          const top = start.y - height / 2;

          if (side === "front" && end.x > start.x) {
            // Take one vertical slice from the original card and draw it at its calculated ring position
            ctx.drawImage(
              card,
              slice * sliceWidth,
              0,
              sliceWidth,
              card.height, 
              start.x, // Where to draw the slice horizontally
              top,
              end.x - start.x + 1,
              height
            );
          }

          if (side === "back" && end.x < start.x) {
            ctx.fillStyle = "#d8d4ce";
            ctx.fillRect(
              end.x,
              top,
              start.x - end.x + 1,
              height
            );
          }
        }
      });
    };


    /**
     * This function runs repeatedly.

      Execution:
        1. Updates ring angle to rotate it.
        2. Clears the previous frame.
        3. Saves canvas state.
        4. Moves the drawing origin to the center.
        5. Rotates the entire ring.
        6. Draws back-facing slices.
        7. Draws front-facing slices.
        8. Restores canvas state.
     */
    function render() {
      ring.angle += ring.speed * gsap.ticker.deltaRatio();

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height * 0.47);
      ctx.rotate(ring.tilt);

      drawRing("back");
      drawRing("front");

      ctx.restore();
    };

    let observer;
    let speedTween;
    let tiltTween;

    async function initialize() {
      await document.fonts.load("500 80px Syne");

      if (disposed) return;

      cards = artists.map(createCard); // 

      window.addEventListener("resize", resize);
      resize();

      gsap.ticker.add(render);

      /**
       *  Animates ring speed from 0.12 to its original 0.01.
          Creates the initial spin effect.
       */
      speedTween = gsap.from(ring, {
        speed: 0.12,
        duration: 3,
        ease: "power3.out",
      });

      /**
       *  Slowly changes ring tilt.
          Repeats forever.
          yoyo reverses the animation.
       */
      tiltTween = gsap.to(ring, {
        tilt: -0.12,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });


      /*
        deltaX and deltaY → Measure interaction movement.
        Calculates spin speed from user movement.
        GSAP gradually returns the ring to normal speed.
       */
      observer = Observer.create({
        target: canvas,
        type: "wheel,touch,pointer",
        preventDefault: true,
        onChange: (self) => {

          const spin = (self.deltaX + self.deltaY) * 0.002;

          gsap.fromTo(ring,
            { speed: spin },
            {
              speed: normalSpeed,
              duration: 2,
              overwrite: "auto",
            }
          );

        },
      });
    }

    initialize();

    return () => {
      disposed = true;

      window.removeEventListener("resize", resize);
      gsap.ticker.remove(render);

      observer?.kill();
      speedTween?.kill();
      tiltTween?.kill();

      gsap.killTweensOf(ring);
    };
  }, []);

  return (
    <main
      className="fixed inset-0 h-screen w-screen overflow-hidden"
      style={{
        background: `
          radial-gradient(
            ellipse 32% 5% at 50% 90%,
            rgba(0, 0, 0, 0.12),
            transparent
          ),
          radial-gradient(
            circle at 50% 35%,
            #ffffff,
            #e9e5df
          )
        `,
      }}
    >
      <canvas
        ref={canvasRef}
        className="fixed inset-0 h-full w-full cursor-grab touch-none active:cursor-grabbing"
      />
    </main>
  );
}
