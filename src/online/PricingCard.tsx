import * as React from "react";
import {cn} from '../lib/utils'


type SpotlightBorderProps = {
  children: React.ReactNode;
  className?: string;
  radius?: "xl";
  size?: number;
  intensity?: number;
};

export function SpotlightBorder({
  children,
  className,
  radius = "xl",
  size = 200,
  intensity = 0.5,
}: SpotlightBorderProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  const updateSpot = React.useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }, []);

  const clearSpot = React.useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--spot-x", "-9999px");
    el.style.setProperty("--spot-y", "-9999px");
  }, []);

  const radiusClass = radius === "xl" ? "rounded-xl" : "rounded-xl";

  return (
    <div
      ref={ref}
      onPointerMove={updateSpot}
      onPointerLeave={clearSpot}
      className={cn("group relative", className)}
      style={
        {
          "--spot-x": "-9999px",
          "--spot-y": "-9999px",
          "--size": `${size}px`,
          "--intensity": intensity,
        } as React.CSSProperties
      }
    >
      <div
        aria-hidden="true"
        className={cn("pointer-events-none absolute inset-0 border border-white/10", radiusClass)}
      />
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 p-px opacity-80 transition-opacity duration-300 group-hover:opacity-100",
          radiusClass
        )}
        style={{
          background: "radial-gradient(circle var(--size) at var(--spot-x) var(--spot-y), rgba(255,255,255, var(--intensity)), transparent 60%)",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 p-px opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          radiusClass
        )}
        style={{
          background:
            "radial-gradient(circle var(--size) at var(--spot-x) var(--spot-y), rgba(255,255,255, calc(var(--intensity) + 0.18)), transparent 56%)",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <div className="relative h-full pointer-events-auto">
        {children}
      </div>
    </div>
  );
};


export default function PricingCard() {
  return (
    <SpotlightBorder radius="xl" size={460} intensity={0.5} className="relative size-100 p-2 sm:p-3">
      <div className="relative flex h-full flex-col rounded-2xl border border-white/20 p-7 sm:p-8">
      </div>
    </SpotlightBorder>
  );
}


