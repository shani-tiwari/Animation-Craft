import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import {motion} from 'motion/react';


const PLAY = {
    left: "M7 5L13 8.5L13 15.5L7 19Z",
    right: "M13 8.5L19 12L19 12L13 15.5Z"
};
const PAUSE = {
    left: "M5 5L9 5L9 19L5 19Z",
    right: "M15 5L19 5L19 19L15 19Z"
}

export default function IconMorph(){

    const [isPlaying, setIsPlaying] = useState(false);
    const target = isPlaying ? PLAY : PAUSE;
    const transition = { type: 'spring', damping: 30, stiffness: 360, mass: 0.9};


    return(
        <div className="h-62 w-96 bg-neutral-600/50 rounded-md flex items-center justify-center shadow-sm shadow-neutral-700">
            <button onClick={() => setIsPlaying(p => !p)} className="h-24 w-24 bg-neutral-500/50 rounded-full overflow-hidden flex items-center justify-center">
                <svg
                    viewBox="0 0 24 24"
                    fill="#eee"
                    stroke="#eee"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    // xmlns="http://www.w3.org/2000/svg"
                    className="p-4"
                >
                    <motion.path
                        initial={false}
                        animate={{d:target.left}}
                        transition={transition}
                    />
                    <motion.path
                        initial={false}
                        animate={{d:target.right}}
                        transition={transition}
                    /> 

                </svg>

            </button>
        </div>
    )
}