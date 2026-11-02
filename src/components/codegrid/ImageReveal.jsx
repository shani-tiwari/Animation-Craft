import {gsap} from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";



const strips = 20;
gsap.registerPlugin(ScrollTrigger);



export default function ImageReveal(){

    const ref = useRef(null);

    useGSAP(() => {
        const imageContainers = gsap.utils.toArray(".images", ref.current);
        const stripWidth = 100 / strips;
        const overlap = 0.1;

        imageContainers.forEach((container) => {
            const stripElements = container.querySelectorAll(".strip");

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "top bottom",
                    end: "top 30%",
                    scrub: true,
                },
            });

            stripElements.forEach((strip, i) => {
                const clipLeft = Math.max(i * stripWidth - overlap, 0);
                const clipRight = Math.max((strips - i - 1) * stripWidth - overlap, 0);

                const hideLeft = i * stripWidth;
                const hideRight = 100 - hideLeft;

                tl.fromTo( strip,
                    { clipPath: `inset(0% ${hideRight}% 0% ${hideLeft}%)` },
                    {
                        clipPath: `inset(0% ${clipRight}% 0% ${clipLeft}%)`,
                        ease: "none",
                        duration: 1,
                    },
                    i * 0.1
                );
            });
        });
    }, { scope: ref });

    return (
        <section ref={ref} className="w-full h-fit flex flex-col gap-0" >

            <div className="intro h-screen w-full bg-slate-700"></div>

            <div className=" w-full h-full">
                {
                    [1,2,3,4].map((img, i) => {
                        return (
                            <div className="images h-screen w-full flex items-center justify-center relative" key={i}> 
                                {
                                    Array.from({length: strips}).map((_,idx) => { 

                                        const stripWidth = 100 / strips;
                                        const hideLeft = idx * stripWidth;
                                        const hideRight = 100 - hideLeft;

                                        return (
                                            <img 
                                             className="strip w-2/3 h-2/3 object-cover absolute top-0 left-0" 
                                             src={`/images/trail/${img}.jpg`} 
                                             alt="img" 
                                             style={{
                                                clipPath: `inset(0% ${hideRight}% 0% ${hideLeft}%)`,
                                                zIndex: strips - idx
                                             }}
                                            />
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>

            <div className="outro h-screen w-full bg-slate-700"></div>

        </section>
    )
};