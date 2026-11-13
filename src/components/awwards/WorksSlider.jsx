
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(Observer);

const cards = Array.from({ length: 8 }, (_, i) => i + 1);
const scrollSensitivity = 0.003;



export default function Carousel() {

  const container = useRef(null);
  const track = useRef(null);

  useGSAP(() => {

    const firstGroup = track.current.children[0];
    const loopWidth = firstGroup.offsetWidth;
    const cards = gsap.utils.toArray(".carousel-card", track.current);

    const setters = cards.map(card =>
      gsap.quickSetter(card, "clipPath")
    );

    // Create repeating timeline
    const tl = gsap.timeline({
      paused: true,
      repeat: -1,
    });

    tl.to(track.current, {
      x: -loopWidth,
      duration: 10,
      ease: "none",
    });

    tl.eventCallback("onUpdate", () => {
      const viewportWidth = window.innerWidth;

      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();

        const progress = gsap.utils.clamp(
          0,
          1,
          (rect.right) / (viewportWidth + rect.width)
        );

        const height = gsap.utils.interpolate(
          60,
          100,
          progress
        );

        setters[i](`inset(0% 0% ${100 - height}% 0%)`);
      });

    });

    // Scroll controls timeline progress
    const observer = Observer.create({
        target: container.current,
        type: "wheel,touch",
        preventDefault: true,
        tolerance: 0,

        onChange: (self) => {
            const duration = tl.duration();

            const delta = self.deltaY || self.deltaX;

            const nextTime = gsap.utils.wrap(
                0,
                duration,
                tl.time() + delta * scrollSensitivity
            );

            tl.time(nextTime);
        },
    });

    return () => {
      observer.kill();
      tl.kill();
    };
  }, { scope: container });

  return (
    <section
      ref={container}
      className="h-screen w-full bg-gray-300 overflow-hidden flex items-center"
    >
      <div ref={track} className="flex gap-1 w-max">

        {/* First set */}
        <div className="flex gap-1">
          {cards.map((i) => (
            <div
              key={i}
              className="carousel-card relative w-96 h-96 shrink-0 bg-white flex items-center justify-center text-5xl"
            >
              <img src={`/images/trail/${i+1}.jpg`} alt="img" className='h-full w-full object-cover' />
            </div>
          ))}
        </div>

        {/* Duplicate set */}
        <div className="flex gap-1">
          {cards.map((i) => (
            <div
            key={`duplicate-${i}`}
            className="carousel-card relative w-96 h-96 shrink-0 bg-white flex items-center justify-center text-5xl"
            >
            <img src={`/images/trail/${i+1}.jpg`} alt="img" className='h-full w-full object-cover' />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
