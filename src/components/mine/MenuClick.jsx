import { useState, useRef, useEffect } from "react";



const DEFAULT_QUADRANT = "top-right"; // keyboard / no-coordinate fallback

const DEFAULT_ITEMS = [
  { label: "New note", onSelect: () => console.log("New note") },
  { label: "Upload", onSelect: () => console.log("Upload") },
  { label: "Share", onSelect: () => console.log("Share") },
  { label: "Settings", onSelect: () => console.log("Settings") },
];

export default function QuadrantMenu({ items = DEFAULT_ITEMS }) {
  const [open, setOpen] = useState(false);
  // Only written when opening. Closing never touches it, so the close
  // animation shrinks back toward the same corner it grew from.
  const [quadrant, setQuadrant] = useState(DEFAULT_QUADRANT);

  const wrapRef = useRef(null);
  const btnRef = useRef(null);

  const getQuadrant = (e) => {
    // Enter/Space fire a click with detail === 0 and no real coordinates
    if (e.detail === 0) return DEFAULT_QUADRANT;

    const rect = btnRef.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);

    const vertical = dy < 0 ? "top" : "bottom";
    const horizontal = dx < 0 ? "left" : "right";
    return `${vertical}-${horizontal}`;
  };

  const handleToggle = (e) => {
    if (open) {
      setOpen(false); // close: quadrant stays locked
    } else {
      setQuadrant(getQuadrant(e)); // open: compute once, then lock
      setOpen(true);
    }
  };

  // Outside click + Escape close the menu, still without touching quadrant
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="qm-wrap" ref={wrapRef}>
      <style>{css}</style>

      <button
        ref={btnRef}
        type="button"
        className="qm-button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Menu"
        onClick={handleToggle}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path
            d="M12 5v14M5 12h14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <ul
        role="menu"
        className={`qm-menu qm-${quadrant}${open ? " qm-open" : ""}`}
      >
        {items.map((item) => (
          <li key={item.label} role="none">
            <button
              type="button"
              role="menuitem"
              className="qm-item"
              onClick={() => {
                item.onSelect?.();
                setOpen(false);
              }}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/*
  Quadrant the user CLICKED  ->  where the menu sits / its transform-origin
  top-right                  ->  above-right of button, origin bottom left
  top-left                   ->  above-left of button,  origin bottom right
  bottom-right               ->  below-right of button, origin top left
  bottom-left                ->  below-left of button,  origin top right

  The menu sits diagonally off the button's corner, so it never covers
  the button and the button can always be clicked again to close.
*/
const css = `
.qm-wrap {
  position: relative;
  display: inline-block;
}

.qm-button {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 0;
  display: grid;
  place-items: center;
  background: #1f2a44;
  color: #fff;
  cursor: pointer;
}
.qm-button:focus-visible,
.qm-item:focus-visible {
  outline: 2px solid #4f7cff;
  outline-offset: 2px;
}

.qm-menu {
  position: absolute;
  margin: 0;
  padding: 6px;
  list-style: none;
  min-width: 160px;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);

  opacity: 0;
  transform: scale(0.7);
  visibility: hidden;
  pointer-events: none;
  /* position/origin are not transitioned, so a quadrant change while
     closed is invisible; visibility delays so close can finish animating */
  transition:
    opacity 0.18s ease,
    transform 0.18s ease,
    visibility 0s linear 0.18s;
}
.qm-menu.qm-open {
  opacity: 1;
  transform: scale(1);
  visibility: visible;
  pointer-events: auto;
  transition-delay: 0s;
}

.qm-top-right    { bottom: calc(100% + 4px); left:  calc(100% + 4px); transform-origin: bottom left;  }
.qm-top-left     { bottom: calc(100% + 4px); right: calc(100% + 4px); transform-origin: bottom right; }
.qm-bottom-right { top:    calc(100% + 4px); left:  calc(100% + 4px); transform-origin: top left;     }
.qm-bottom-left  { top:    calc(100% + 4px); right: calc(100% + 4px); transform-origin: top right;    }

.qm-item {
  display: block;
  width: 100%;
  padding: 10px 12px;
  border: 0;
  border-radius: 8px;
  background: none;
  text-align: left;
  font: inherit;
  color: #1f2a44;
  cursor: pointer;
}
.qm-item:hover { background: #eef1f8; }

@media (prefers-reduced-motion: reduce) {
  .qm-menu { transition: none; }
}
`;