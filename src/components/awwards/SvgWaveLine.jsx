import { useEffect, useRef } from "react";
import gsap from "gsap";


 const RIPPLE_CONFIG = {
  // SVG size (px)
  width: 700,
  height: 2,

  // Line points (equally spaced, fixed in place – only their Y moves)
  pointCount: 350, // more points = smoother wave

  // Ripple shape
  rippleSizePercent: 80, // ripple length as % of svg width (10 = 70px of 700px)
  wavesPerRipple: 1, // how many up/down waves inside one ripple (more = tighter waves)
  amplitude: 4, // up/down movement in px (use 4 to 6)

  // Continuous flow
  spawnAt: 0.5, // next ripple is born when the previous one has finished this fraction of its trip
  //               0.5 = at 50% (2 ripples on screen), 0.25 = at 25% (4 ripples), 1 = next one starts when previous ends

  // Smooth blend in / out (removes the jerk when a ripple appears or ends)
  fadeInPercent: 20, // % of the ripple's trip used to grow from flat to full height (0 = no fade)
  fadeInEase: "sine.inOut", // any GSAP ease for the grow
  fadeOutPercent: 20, // % of the ripple's trip used to shrink back to flat at the end (0 = no fade)
  fadeOutEase: "sine.inOut", // any GSAP ease for the shrink

  // Motion
  direction: 1, // 1 = ripples are born at left end and travel right, 0 = born at right end and travel left
  duration: 5, // seconds for ONE ripple to travel end to end
  ease: "none", // any GSAP ease: "none", "sine.inOut", "power1.inOut"...
  phaseSpeed: 1, // how fast the waves move inside a ripple (1 = same speed as ripple, higher = crests run forward faster)
  delay: 0, // seconds before the first ripple

  // Line style
  stroke: "#ffffff",
  strokeWidth: 1,
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function RippleLine({ config = {}, className = "" }) {
  const cfg = { ...RIPPLE_CONFIG, ...config };
  const {
    width,
    height,
    pointCount,
    rippleSizePercent,
    wavesPerRipple,
    amplitude,
    spawnAt,
    fadeInPercent,
    fadeInEase,
    fadeOutPercent,
    fadeOutEase,
    direction,
    duration,
    ease,
    phaseSpeed,
    delay,
    stroke,
    strokeWidth,
  } = cfg;

  const pathRef = useRef(null);

  useEffect(() => {
    const mid = height / 2;
    const rippleWidth = (rippleSizePercent / 100) * width;
    const step = width / (pointCount - 1);
    const from = direction === 1 ? 0 : width; // where ripples are born
    const to = direction === 1 ? width : 0; // where they end
    const easeFn = gsap.parseEase(ease);
    const maxRipples = Math.ceil(1 / spawnAt); // ripples that can be alive at once
    const fadeInFn = gsap.parseEase(fadeInEase);
    const fadeOutFn = gsap.parseEase(fadeOutEase);
    const fadeIn = fadeInPercent / 100;
    const fadeOut = fadeOutPercent / 100;

    // 0 -> 1 -> 0 strength over a ripple's life, shaped by the chosen eases
    const strength = (age) => {
      const grow = fadeIn > 0 ? fadeInFn(Math.min(age / fadeIn, 1)) : 1;
      const shrink = fadeOut > 0 ? fadeOutFn(Math.min((1 - age) / fadeOut, 1)) : 1;
      return grow * shrink;
    };

    // time: 0 -> spawnAt (loops). Ripple k has age = time + k * spawnAt (0 = born, 1 = finished).
    const draw = (time) => {
      const ripples = [];
      for (let k = 0; k < maxRipples; k++) {
        const age = time + k * spawnAt;
        if (age >= 1) continue;
        const progress = easeFn(age);
        ripples.push({
          center: from + (to - from) * progress,
          phaseShift: from + (to - from) * progress * phaseSpeed,
          strength: strength(age),
        });
      }

      let d = "";
      for (let i = 0; i < pointCount; i++) {
        const x = i * step;
        let offset = 0;

        for (const r of ripples) {
          const rel = (x - r.center) / rippleWidth; // -0.5 .. 0.5 inside a ripple
          if (Math.abs(rel) < 0.5) {
            const envelope = Math.pow(Math.cos(Math.PI * rel), 2); // soft edges
            const phase = ((x - r.phaseShift) / rippleWidth) * Math.PI * 2 * wavesPerRipple;
            offset += Math.sin(phase) * amplitude * envelope * r.strength;
          }
        }

        d += (i === 0 ? "M" : "L") + x.toFixed(2) + " " + (mid + offset).toFixed(2) + " ";
      }
      pathRef.current.setAttribute("d", d);
    };

    draw(0);

    const ctx = gsap.context(() => {
      const state = { t: 0 };
      // Loops seamlessly: when time wraps from spawnAt to 0, every ripple is
      // exactly where the next older one was, so the flow never pauses or jumps.
      gsap.to(state, {
        t: spawnAt,
        duration: duration * spawnAt,
        ease: "none", // easing is applied per ripple above, so the loop stays seamless
        delay,
        repeat: -1,
        onUpdate: () => draw(state.t),
      });
    });

    return () => ctx.revert();
  }, [
    width,
    height,
    pointCount,
    rippleSizePercent,
    wavesPerRipple,
    amplitude,
    spawnAt,
    fadeInPercent,
    fadeInEase,
    fadeOutPercent,
    fadeOutEase,
    direction,
    duration,
    ease,
    phaseSpeed,
    delay,
  ]);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={`overflow-visible ${className}`}
      aria-hidden="true"
    >
      <path
        ref={pathRef}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
 