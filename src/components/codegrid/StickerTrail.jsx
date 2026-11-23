
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "gsap";

const THRESHOLD = 100;

export default function StickerTrail() {
    const ref = useRef(null);
    const lastPos = useRef(null);

    useGSAP((context, contextSafe) => {

        const spawnImage = contextSafe((from, to) => {
            const img = document.createElement("img");

            img.src = `/images/trail/${gsap.utils.random(1, 10, 1)}.jpg`;

            img.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 60px;
                height: 60px;
                z-index: 1;
                pointer-events: none;
            `;

            ref.current.appendChild(img);

            gsap.timeline({
                onComplete: () => img.remove()
            })
            .fromTo(img, {
                x: from.x,
                y: from.y,
                xPercent: -50,
                yPercent: -50,
                rotation: gsap.utils.random(-25, 25),
                scale: 0
            }, {
                x: to.x + (to.x - from.x) * 0.75,
                y: to.y + (to.y - from.y) * 0.75,
                scale: 1,
                duration: 1,
                ease: "expo.out"
            })
            .to(img, {
                scale: 0,
                duration: 0.65,
                ease: "power2.inOut"
            }, "+=0.15");
        });

        const handleMouseMove = (e) => {
            const rect = ref.current.getBoundingClientRect();

            const pos = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };

            if (!lastPos.current) {
                lastPos.current = pos;
                return;
            }

            const distance = Math.hypot(
                pos.x - lastPos.current.x,
                pos.y - lastPos.current.y
            );

            if (distance < THRESHOLD) return;

            spawnImage(lastPos.current, pos);
            lastPos.current = pos;
        };

        const handleMouseLeave = () => {
            lastPos.current = null;
        };

        const container = ref.current;

        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseleave", handleMouseLeave);
        };

    }, { scope: ref });

    return (
        <section
            ref={ref}
            className="relative overflow-hidden w-full h-screen bg-slate-400"
        />
    );
}
