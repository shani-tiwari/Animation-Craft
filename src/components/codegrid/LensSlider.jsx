import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const config = {
  slideCount: 6,
  slideMoveDist: 1, // viewport heights of scroll used to move to the next slide
  slideHoldDist: 0.25, // viewport heights of scroll the slide "rests" for
  slideEase: "power2.inOut",
  imageAspectRatio: 0.75,
  thumbnailScale: 0.35,
  thumbnailGap: 12,
  frameGutter: 15,
  entryScale: 0.25,
  entryRotation: 5,
};

// images live in /public/images/trail/1.jpg ... 6.jpg
const SLIDES = Array.from(
  { length: config.slideCount },
  (_, i) => `/images/trail/${i + 1}.jpg`
);

// All scroll maths is done in "viewport heights" (vh units), so no px
// measuring is needed for the spacer. The tall section is sized in CSS.
const STEP = config.slideMoveDist + config.slideHoldDist;
const TOTAL_SCROLL =
  (config.slideCount - 1) * config.slideMoveDist +
  (config.slideCount - 2) * config.slideHoldDist;
const SECTION_HEIGHT = `${(TOTAL_SCROLL + 1) * 100}svh`;

// Frame size is pure CSS, thumbnails derive from it via a CSS variable.
const FRAME_H = `min(87svh, calc(80vw / ${config.imageAspectRatio}))`;
const AREA_W = `calc((100% - var(--frame-h) * ${config.imageAspectRatio}) / 2 - ${config.frameGutter}px + ${config.thumbnailGap}px)`;
const THUMB_H = `calc(var(--frame-h) * ${config.thumbnailScale})`;



export default function LensSlider() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const slides = gsap.utils.toArray("[data-slide]", root);
    const slideImages = gsap.utils.toArray("[data-slide-img]", root);
    const pastThumbs = gsap.utils.toArray("[data-past]", root);
    const newThumbs = gsap.utils.toArray("[data-new]", root);
    const pastArea = root.querySelector("[data-past-area]");
    const slideWindow = root.querySelector("[data-window]");

    const ease = gsap.parseEase(config.slideEase);
    const clamp01 = gsap.utils.clamp(0, 1);

    // sizes that depend on layout; re-measured on every ScrollTrigger refresh
    let m = { area: 0, thumbW: 0, spacing: 0, slideW: 0 };
    const measure = () => {
      m.area = pastArea.clientWidth;
      m.thumbW = pastThumbs[0].offsetWidth;
      m.spacing = m.thumbW + config.thumbnailGap;
      m.slideW = slideWindow.clientWidth;
    };

    const getSlideProgress = (pos) => {
      const index = Math.floor(pos / STEP);
      const inside = pos - index * STEP;
      const moveProgress = clamp01(inside / config.slideMoveDist);
      return Math.min(index + ease(moveProgress), config.slideCount - 1);
    };

    const render = (pos) => {
      const progress = getSlideProgress(pos);

      slides.forEach((slide, i) => {
        const offset = i - progress;
        const entry = clamp01(offset);

        pastThumbs[i].style.transform = `translate3d(${
          m.area + offset * m.spacing
        }px, -50%, 0)`;
        newThumbs[i].style.transform = `translate3d(${
          offset * m.spacing - m.thumbW
        }px, -50%, 0)`;

        slide.style.transform = `translate3d(${offset * m.slideW}px, 0, 0)`;
        slide.style.opacity = Math.abs(offset) < 1 ? 1 : 0;

        slideImages[i].style.transform = `scale(${
          1 + config.entryScale * entry
        }) rotate(${config.entryRotation * entry}deg)`;
      });
    };

    // proxy value in vh; ScrollTrigger scrubs it, so it eases toward the
    // scroll position (this replaces the smoothing Lenis used to give)
    const state = { pos: 0 };

    const ctx = gsap.context(() => {
      gsap.to(state, {
        pos: TOTAL_SCROLL,
        ease: "none",
        onUpdate: () => render(state.pos),
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
          onRefresh: () => {
            measure();
            render(state.pos);
          },
        },
      });
    }, root);

    measure();
    render(0);

    return () => ctx.revert();
  }, []);

  return (
    // tall section = scroll distance. The inner sticky wrapper stays on screen.
    <section ref={sectionRef} className="relative w-full overflow-hidden" style={{ height: SECTION_HEIGHT }}>
      <div
        className="fixed top-0 w-full h-svh overflow-hidden"
        style={{ "--frame-h": FRAME_H }}
      >
        {/* past thumbnails (left) */}
        <div
          data-past-area
          className="absolute top-0 left-0 h-full overflow-hidden pointer-events-none"
          style={{ width: AREA_W }}
        >
          {SLIDES.map((src, i) => (
            <div
              key={i}
              data-past
              className="absolute top-1/2 left-0 overflow-hidden"
              style={{ height: THUMB_H, aspectRatio: config.imageAspectRatio }}
            >
              <img className="w-full h-full object-cover" src={src} alt="" />
            </div>
          ))}
        </div>

        {/* upcoming thumbnails (right) */}
        <div
          className="absolute top-0 right-0 h-full overflow-hidden pointer-events-none"
          style={{ width: AREA_W }}
        >
          {SLIDES.map((src, i) => (
            <div
              key={i}
              data-new
              className="absolute top-1/2 left-0 overflow-hidden"
              style={{ height: THUMB_H, aspectRatio: config.imageAspectRatio }}
            >
              <img className="w-full h-full object-cover" src={src} alt="" />
            </div>
          ))}
        </div>

        {/* main frame */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 border"
          style={{ height: "var(--frame-h)", aspectRatio: config.imageAspectRatio }}
        >
          <div data-window className="relative w-full h-full overflow-hidden">
            {SLIDES.map((src, i) => (
              <div
                key={i}
                data-slide
                className="absolute inset-0 overflow-hidden will-change-transform"
              >
                <img
                  data-slide-img
                  className="w-full h-full object-cover will-change-transform"
                  src={src}
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
