import { useState, useRef, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Button off when last card is at end on container - so no blank space should be in UI.
 * add mask blur - to show a blur effect
 * enable scrollbar for more better UX*
 */

const REVIEWS = [
//   {
//     id: 1,
//     quote:
//       "The design quality exceeded our expectations. Viktor brought a level of polish and professionalism that elevated our entire brand.",
//     name: "Rachel Foster",
//     role: "Co-founder, Nexus Labs",
//     initials: "RF",
//   },
//   {
//     id: 2,
//     quote:
//       "Incredible work from start to finish. The team's ability to understand our vision and execute flawlessly was remarkable.",
//     name: "David Zhang",
//     role: "Head of Design, Paradigm Labs",
//     initials: "DZ",
//   },
  {
    id: 3,
    quote:
      "A complete game changer for our conversion rates. The attention to micro-interactions and performance is unmatched.",
    name: "Sophia Martinez",
    role: "Product Lead, Aurora AI",
    initials: "SM",
  },
  {
    id: 4,
    quote:
      "Working with them was effortless. Fast turnarounds, brilliant aesthetics, and clean code that our engineering team loved.",
    name: "Marcus Vance",
    role: "CTO, Horizon Digital",
    initials: "MV",
  },
  {
    id: 5,
    quote:
      "The interactive animations brought our product story to life. Customer engagement skyrocketed within days of launching.",
    name: "Elena Rostova",
    role: "VP of Growth, PulseWave",
    initials: "ER",
  },
  {
    id: 6,
    quote:
      "They took complex workflows and simplified them into an intuitive, beautiful interface. Outstanding craftsmanship.",
    name: "Liam O'Connor",
    role: "Founding Engineer, Spectra Systems",
    initials: "LO",
  },
  {
    id: 7,
    quote:
      "Exceptional eye for detail and modern typography. Our brand identity feels cohesive and truly high-end now.",
    name: "Amina Al-Sayed",
    role: "Creative Director, Veloce Studio",
    initials: "AA",
  },
  {
    id: 8,
    quote:
      "Reliable, inventive, and deeply committed to craft. Highly recommended for any team looking to build top-tier software.",
    name: "Julian Keller",
    role: "Managing Director, Nova Ventures",
    initials: "JK",
  },
];

export default function ReviewSlider() {

  const [activeIndex, setActiveIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(440);

  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const gap = 24;

  // Dynamically calculate card dimensions for responsive layout
  useEffect(() => {
    const updateDimensions = () => {
      if (cardRef.current) {
        setCardWidth(cardRef.current.offsetWidth);
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(REVIEWS.length - 1, prev + 1));
  };

  const isAtStart = activeIndex === 0;
  const isAtEnd = activeIndex === REVIEWS.length - 1;


  return (
    <div className="w-full max-w-6xl mx-auto sm:px-6 py-10 select-none">
      {/* Cards Viewport Container */}
      <div
        ref={containerRef}
        className="w-full relative overflow-hidden py-6 md:px-6 mask-fade-edges "
      >
        <motion.div
          className="flex gap-6 items-stretch"
          animate={{
            x: -(activeIndex * (cardWidth + gap)),
          }}
          transition={{
            type: "spring",
            stiffness: 240,
            damping: 28,
            mass: 0.8,
            delay: 0.02
          }}
        >
          {
            REVIEWS.map((review, index) => {
                const isExited = index < activeIndex;
                const isActive = index === activeIndex;

                return (
                <motion.div
                    key={review.id}
                    ref={index === 0 ? cardRef : null}
                    className="w-full md:w-110 shrink-0 flex flex-col justify-between bg-[#eceef0] rounded-3xl p-7 sm:p-8 md:p-9 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-black/20"
                    animate={{
                      scale: isExited ? 0.7 : isActive ? 1 : 0.95,
                      opacity: isExited ? 0 : 1,
                      y: isExited ? 10 : 0,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: [0.25, 1, 0.25, 1],
                    }}
                    style={{
                      transformOrigin: "left center",
                    }}
                >
                    {/* Quote Icon & Content */}
                    <div>
                      {/* Styled Quote Mark matching design */}
                      <div className="mb-4 text-neutral-900 font-serif text-5xl sm:text-6xl font-black leading-none opacity-90 select-none tracking-tighter">
                        “
                      </div>

                  {/* Review Text */}
                  <p className="text-neutral-700 text-sm sm:text-base md:text-[1.05rem] leading-relaxed font-normal">
                    {review.quote}
                  </p>
                    </div>

                    {/* Author Info Section */}
                    <div className="flex items-center gap-3.5 mt-8 pt-2">
                    {/* Gray circular avatar div */}
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-neutral-300/90 border border-neutral-400/20 shrink-0 flex items-center justify-center text-neutral-600 text-xs font-semibold tracking-wider">
                        {review.initials}
                    </div>

                    {/* Author Details */}
                    <div className="flex flex-col min-w-0">
                        <span className="text-neutral-900 font-semibold text-sm sm:text-base leading-tight truncate">
                        {review.name}
                        </span>
                        <div className="flex items-center gap-1 text-neutral-500 text-xs sm:text-sm mt-0.5 leading-tight truncate">
                        <span className="text-neutral-400 font-mono text-[11px] leading-none">↳</span>
                        <span className="truncate">{review.role}</span>
                        </div>
                    </div>
                    </div>
                </motion.div>
                );
            })
          }
        </motion.div>
      </div>

      {/* Navigation Arrows at Bottom Left */}
      <div className="flex items-center gap-3 mt-4 ml-1 px-6">
        <button
          onClick={handlePrev}
          disabled={isAtStart}
          aria-label="Previous review"
          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border border-black/8 transition-all duration-200 ${
            isAtStart
              ? "bg-[#e2e4e7]/60 text-neutral-400 cursor-not-allowed opacity-50"
              : "bg-[#e8eaed] hover:bg-[#dfe1e4] active:scale-95 text-neutral-700 shadow-sm cursor-pointer"
          }`}
        >
          <ChevronLeft className="w-5 h-5 stroke-2" />
        </button>

        {/* cards count */}
        <span className="text-neutral-400 text-sm">{activeIndex + 1}/{REVIEWS.length}</span>

        <button
          onClick={handleNext}
          disabled={isAtEnd}
          aria-label="Next review"
          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border border-black/8 transition-all duration-200 ${
            isAtEnd
              ? "bg-[#e2e4e7]/60 text-neutral-400 cursor-not-allowed opacity-50"
              : "bg-[#e8eaed] hover:bg-[#dfe1e4] active:scale-95 text-neutral-700 shadow-sm cursor-pointer"
          }`}
        >
          <ChevronRight className="w-5 h-5 stroke-2" />
        </button>
      </div>
    </div>
  );
}