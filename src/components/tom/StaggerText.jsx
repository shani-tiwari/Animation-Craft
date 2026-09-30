/* eslint-disable no-unused-vars */
import {motion, stagger} from 'motion/react';



export default function StaggerText(){

    const text = 'shani';

    return (
     <motion.div initial="initial" whileHover="whileHover">
        <motion.span
            variants={{
                initial: { x: 0 },
                whileHover: { x: -16 },
            }}
            transition={{
                type: "spring",
                delay: 0.25,
                delayChildren: stagger(0.75),
            }}
            className="bg-black/40 px-42 py-6 size-fit text-white font-bold text-2xl flex justify-center items-center rounded-lg"
        >
            {text.split("").map((char, i) => (
            <motion.span
                key={i}
                variants={{
                    initial: { x: 0 },
                    whileHover: { x: 16 },
                }}
                transition={{
                    type: "spring",
                    delay: 0.25,
                }}
                className="inline-block w-fit text-2xl"
            >
                {char}
            </motion.span>
            ))}
        </motion.span>
    </motion.div>
    )
}