import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(useGSAP, CustomEase);

/* ------------------------------------------------------------------ */
/* Reusable variables - tweak everything from here                     */
/* ------------------------------------------------------------------ */

// Layout
const MENU_W = "14rem"; // menu width (same as Tailwind w-56). Closed cards fit inside this width
const MOBILE_QUERY = "(max-width: 425px)"; // small screen behaviour
const DESKTOP_QUERY = "(min-width: 426px)"; // everything above it

// Timing
const DURATION = 0.98; // main duration for width / height moves
const EASE_CURVE = ".48, 0, .03, 1"; // cubic-bezier(.48, 0, .03, 1)
const STAGGER = 0.1; // delay between cards in a stagger
const CONTENT_LEAD = 0.2; // content shows this many seconds BEFORE its card is fully open
const CONTENT_FADE = 0.3; // content fade in / out time
const OVERLAY_FADE = 0.5; // dim overlay fade time

// Desktop sizes
const DESKTOP_OPEN_H = 300; // px, open height of every card on desktop

// Mobile sizes
const MOBILE_BASE_H = 200; // px, height of the front (last) card when open
const MOBILE_STEP = 60; // px, each card behind is this much taller, so its tag peeks out
const MOBILE_STAGGER_FROM_OPEN = "end"; // "end" = last card first, "start" = first card first
const MOBILE_STAGGER_FROM_CLOSE = "end";

// Data
const ITEMS = [
  { label: "Home", color: "#e11d48", centerBg: "#fde68a" },
  { label: "About", color: "#eab308", centerBg: "#bfdbfe" },
  { label: "Work", color: "#10b981", centerBg: "#fbcfe8" },
  { label: "Blog", color: "#0ea5e9", centerBg: "#fed7aa" },
  { label: "Contact", color: "#8b5cf6", centerBg: "#bbf7d0" },
];

// GSAP can't read a raw cubic-bezier string, so register it as a named ease
const EASE = CustomEase.create("menuEase", EASE_CURVE);

export default function MenuBtm() {
  const root = useRef(null);
  const overlayRef = useRef(null);
  const wrapRef = useRef(null);

  const isOpen = useRef(false);
  // open / close functions are filled by useGSAP below, so JSX handlers can call them
  const actions = useRef({ open: () => {}, close: () => {} });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add({ isMobile: MOBILE_QUERY, isDesktop: DESKTOP_QUERY }, (ctx) => {
        const { isMobile } = ctx.conditions;

        const q = (sel) => gsap.utils.toArray(sel, root.current);
        const wrap = wrapRef.current;
        const overlay = overlayRef.current;
        const cards = q(".card");
        const content = q(".content"); // tag (+ center div on desktop) of each card

        const closedW = wrap.offsetWidth; // closed wrapper width in px (= menu width)
        const closedH = closedW / cards.length; // closed card is a square: width / 5
        const slotLeft = (i) => `${i * (100 / cards.length)}%`; // closed left position

        isOpen.current = false;

        // Closed state: plain coloured squares, nothing else visible
        gsap.set(cards, { height: closedH });
        gsap.set(content, { autoAlpha: 0 });
        gsap.set(overlay, { autoAlpha: 0 });

        const tlOpen = gsap.timeline({ paused: true, defaults: { duration: DURATION, ease: EASE } });
        const tlClose = gsap.timeline({ paused: true, defaults: { duration: DURATION, ease: EASE } });

        if (isMobile) {
          buildMobile();
        } else {
          buildDesktop();
        }

        /* ---------------------------------------------------------- */
        /* DESKTOP timelines                                            */
        /* ---------------------------------------------------------- */
        function buildDesktop() {
          const from = "start"; // first card moves first, on open and on close

          // OPEN: overlay fades in + wrapper widens (cards are 20% of it, so they widen together),
          // then heights grow with a stagger, then content shows CONTENT_LEAD before each card finishes
          tlOpen
            .to(overlay, { autoAlpha: 1, duration: OVERLAY_FADE }, 0)
            .to(wrap, { width: "100%" }, 0)
            // .addLabel("heights") 
            // .to(cards, { height: DESKTOP_OPEN_H, stagger: { each: STAGGER, from } }, `heights`)
            // .to(content,
            //   { autoAlpha: 1, duration: CONTENT_FADE, stagger: { each: STAGGER, from } },
            //   `heights+=${DURATION - CONTENT_LEAD}`
            // );
            .to(cards, { height: DESKTOP_OPEN_H, stagger: { each: STAGGER, from } }, `-=${0.9}`)
            .to(content,
              { autoAlpha: 1, duration: CONTENT_FADE, stagger: { each: STAGGER, from } },
              `-=${0.5}`
            );

          // CLOSE: content hides, widths shrink together, then heights shrink with a stagger from the first card
          tlClose
            .to(overlay, { autoAlpha: 0, duration: OVERLAY_FADE }, 0)
            .to(content, { autoAlpha: 0, duration: CONTENT_FADE }, 0)
            .to(wrap, { width: closedW }, ">")
            .to(cards, { height: closedH, stagger: { each: STAGGER, from } }, ">");
        }

        /* ---------------------------------------------------------- */
        /* MOBILE timelines (425px and below)                           */
        /* ---------------------------------------------------------- */
        function buildMobile() {
          // last card is in front and shortest, every card behind is MOBILE_STEP taller
          const openHeight = (i) => MOBILE_BASE_H + (cards.length - 1 - i) * MOBILE_STEP;

          // OPEN: width of all cards starts together and they stack on each other,
          // heights start at the same time but finish with a stagger, tags show just before each card ends
          tlOpen
            .to(overlay, { autoAlpha: 1, duration: OVERLAY_FADE }, 0)
            .to(wrap, { width: "100%" }, 0)
            .to(cards, { width: "100%", left: "0%" }, 0)
            .to(cards, { height: openHeight, stagger: { each: STAGGER, from: MOBILE_STAGGER_FROM_OPEN } }, 0)
            .to(
              content,
              { autoAlpha: 1, duration: CONTENT_FADE, stagger: { each: STAGGER, from: MOBILE_STAGGER_FROM_OPEN } },
              DURATION - CONTENT_LEAD
            );

          // CLOSE: tags hide, cards go back to their row slots, then heights shrink with a stagger
          tlClose
            .to(overlay, { autoAlpha: 0, duration: OVERLAY_FADE }, 0)
            .to(content, { autoAlpha: 0, duration: CONTENT_FADE }, 0)
            .to(wrap, { width: closedW }, ">")
            .to(cards, { width: "20%", left: slotLeft }, "<")
            .to(cards, { height: closedH, stagger: { each: STAGGER, from: MOBILE_STAGGER_FROM_CLOSE } }, ">");
        }

        /* ---------------------------------------------------------- */
        /* Shared open / close controls                                 */
        /* ---------------------------------------------------------- */

        // Plays the open timeline. invalidate() re-reads current values, so it is safe mid-animation
        const open = () => {
          if (isOpen.current) return;
          isOpen.current = true;
          tlClose.pause();
          tlOpen.invalidate().restart();
        };

        // Plays the close timeline (not a reverse, because close has its own stagger order)
        const close = () => {
          if (!isOpen.current) return;
          isOpen.current = false;
          tlOpen.pause();
          tlClose.invalidate().restart();
        };

        actions.current = { open, close };
      });
    },
    { scope: root }
  );

  // Menu click toggles open / close
  const toggle = () => (isOpen.current ? actions.current.close() : actions.current.open());
  // Dim overlay click only closes
  const closeMenu = () => actions.current.close();

  return (
    <section
      ref={root}
      className="relative w-full h-screen bg-slate-300 overflow-hidden"
      style={{ "--menu-w": MENU_W, "--tag-h": `${MOBILE_STEP}px` }}
    >
      {/* Dim overlay: full screen, lower z-index than the items, click to close */}
      <div
        ref={overlayRef}
        onClick={closeMenu}
        className="invisible absolute inset-0 z-10 bg-black/30 cursor-pointer"
      />

      {/* Full width bar at the bottom of the viewport. Ignores pointer events so the overlay stays clickable */}
      <div className="pointer-events-none absolute bottom-0 left-0 z-20 w-full flex flex-col items-center">
        {/* Menu: always on top of the cards (z-30) */}
        <div
          onClick={toggle}
          className="menu pointer-events-auto relative z-30 w-(--menu-w) px-6 py-3 flex justify-between items-center text-white bg-orange-600 cursor-pointer select-none"
        >
          <p>Open</p>
          <p className="rotate-90">॥</p>
        </div>

        {/* Wrapper: same width as the menu, centered. Controls the absolute cards inside it */}
        <div ref={wrapRef} className="relative z-20 w-(--menu-w) h-[calc(var(--menu-w)/5)]">
          {ITEMS.map((item, i) => (
            <div
              key={item.label}
              className="card pointer-events-auto absolute bottom-0 overflow-hidden"
              style={{
                background: item.color,
                width: "20%",
                left: `${i * 20}%`,
                height: "calc(var(--menu-w)/5)",
              }}
            >
              {/* Everything inside a card lives here so the timeline shows / hides it in one go */}
              <div className="content invisible absolute inset-0">
                {/* Tag: shown on every screen, sits on the top edge of its own card */}
                <div className="tag absolute top-0 left-0 w-full h-10 max-[425px]:h-(--tag-h) px-4 flex items-center text-white text-sm">
                  {item.label}
                </div>

                {/* Center div: desktop only */}
                <div
                  className="center group absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/5 h-1/2 max-[425px]:hidden"
                  style={{ background: item.centerBg }}
                >
                  <img src={`/images/trail/${i+1}.jpg`} className='object-cover w-full h-full' alt="" />
                  {/* Same-colour blur layer, fades out on hover of the center div */}
                  <div
                    className="absolute inset-0 backdrop-blur-xs opacity-40 transition-opacity duration-500 group-hover:opacity-0 pointer-events-none"
                    style={{ background: item.color }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
