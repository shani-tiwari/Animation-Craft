// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const COPY = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, tenetur.";


export const ScrollText = () => {

    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"],
    });

    const chars = [...COPY];
    const total = chars.length;

    return (
        <div ref={container} className="h-[400vh] bg-black ">
            <h1 className="max-w-6xl text-5xl text-white sticky top-1/2">

                {chars.map((char,i) => (
                    <ScrollCharacter key={i} index={i} char={char} progress={scrollYProgress} total={total} />
                ))}
            </h1>
        </div>

    );

};

const wave_factor = 0.12;


const ScrollCharacter = ({ char, progress, total, index }) => {

    const start = index / Math.max(total, 1);
    const end = Math.min(start + wave_factor, 1);

    const opacity = useTransform(progress, [start, end], [0.2, 1]);
    const y = useTransform(progress, [start, end], [14, 1]);

    return (
        <motion.span 
          style={{ opacity, y, display: 'inline-block' }}
        >
            {char === ' ' ? '\u00A0' : char}
        </motion.span>
    )
};