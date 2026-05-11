
import { cn } from "../../lib/utils"
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useRef, useState } from "react"

/**
 * @param {string} text - The text to display on the button.
 * @returns {JSX.Element} - The button component.
 */
export default function MagneticButton({text}) {
    
    const [position, setPosition] = useState({ x: 0, y: 0 });

    function handleMoseMove(e){
        if(!ref.current) return ;

        const {width, height, left, top} = ref.current.getBoundingClientRect();
        const {clientX, clientY} = e;
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        setPosition({x,y});
    };

    // function handleMouseLeave(){
    //     setPosition({x: 0, y: 0});
    // };

    const ref = useRef(null);

    const hasMoved = position.x !== 0 || position.y !== 0;
    
  return (
    <div 
      onMouseMove={handleMoseMove} 
      onMouseLeave={() => setPosition({x: 0, y: 0})}   
      className={cn(" flex items-center justify-center rounded-xl  transition-all duration-300",
        hasMoved && 'bg-purple-800/30 border border-dashed border-purple-400'
      )}>
        <motion.div 
          ref={ref} 
          animate={{ x: position.x, y: position.y }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
          >
            <button 
              className={cn("text-white text-shadow-xs text-shadow-black font-semibold px-4 py-2 rounded-xl bg-linear-to-b from-purple-700 to-purple-950 border border-white/60 active:scale-98 transition-all duration-150 select-none cursor-pointer hover:border-white/50 ")}>
                {text}
            </button>
        </motion.div>
    </div>
  )
}
