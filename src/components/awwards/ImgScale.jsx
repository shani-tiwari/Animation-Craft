import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const COLORS = ["bg-red-500", "bg-green-500", "bg-blue-500"];

export default function Projects() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const assets = gsap.utils.toArray(".project-item__asset");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".projects__track",
          start: "top top",
          end: "bottom bottom",
          scrub: true, 
        },
      });

      assets.forEach((asset, i) => {
        tl.fromTo(asset,
          { scale: 0, transformOrigin: "100% 50%" },
          { scale: 1, ease: "none", duration: 1 },
          i // grow starts at i
        )
          .set(asset, { transformOrigin: "0% 50%" }, i + 1) // flip origin while scale is 1
          .to(asset, { scale: 0, ease: "none", duration: 1 }, i + 1); // shrink starts at i + 1
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="projects w-full">
      {/* (3 assets + 1) x 100vh of height */}
      <div className="projects__track relative h-[600vh]">
        <div className="sticky top-0 flex flex-col h-screen w-full overflow-hidden"> 
          {COLORS.map((color, i) => ( 
            <div
              key={i}
              className={`project-item__asset relative h-screen w-full ${color}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}