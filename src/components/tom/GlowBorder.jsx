// eslint-disable-next-line no-unused-vars
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { useEffect } from "react";
import { animate } from "motion";
import "./tom.css";


export default function GlowBorder(){

    const duration = 3;
    const turn = useMotionValue(0);
    useEffect(() => {
        animate(turn, 1, {
            duration,
            repeat: Infinity,
            ease: "linear"
        });
    }, [duration, turn]);
    const gradient = useMotionTemplate`conic-gradient(from ${turn}turn, transparent 0%, #78f047 10%, #08fb 20%, #4fffee 30%, transparent 40%)`;

    return (
        <motion.div 
            style={{
                backgroundImage: gradient
            }}
            className="relative w-80 h-50 bg-zinc-400 rounded-lg p-0.5 overflow-hidden"
        > 
            <div className="w-full h-full rounded-[inherit] bg-zinc-600 flex items-center justify-center">
                <span className="text-white font-medium text-sm">Hey</span>
            </div>
            <motion.div style={{backgroundImage: gradient}} className="ai-glow-mask absolute inset-[-40%] z-10 overflow-hidden blur-xl pointer-events-none "></motion.div>
        </motion.div>
    )
};


/**
.ai-glow-mask{
    -webkit-mask-image: radial-gradient(ellipse 100% 100% at 50% 50%, transparent 20%, black 100%);
    mask-image: radial-gradient(ellipse 100% 100% at 50% 50%, transparent 20%, black 100%);
}
 */