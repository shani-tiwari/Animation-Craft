
import { cn } from "../../lib/utils"
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useRef, useState } from "react"


export default function MagneticButton({children}) {
    
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const ref = useRef(null);

    function handleMoseMove(e){
      if(!ref.current) return ;
  
      const {width, height, left, top} = ref.current.getBoundingClientRect();
      const x = e.clientX - (left + width / 2);
      const y = e.clientY - (top + height / 2);
      setPosition({x,y});
    };
    
    function handleMouseLeave(){
        setPosition({x: 0, y: 0});
    };
    const {x, y} = position;


    // const hasMoved = position.x !== 0 || position.y !== 0;
    // it will work when function called by parent of targeted element
    
  return (
    <div 
      className={cn("w-28 h-28 flex items-center justify-center cursor-pointer",
      // className={cn( hasMoved && 'bg-purple-800/30 border border-dashed border-purple-400')}
    )}>
        <motion.div 
          onMouseMove={handleMoseMove}
          onMouseLeave={handleMouseLeave}
          ref={ref} 
          animate={{ x, y }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
          🔥
            {/* <button 
              className={cn("text-white/80 text-sm  text-shadow-xs text-shadow-black font-semibold px-4 py-2 rounded-xl bg-linear-to-b from-purple-700 to-purple-950 border border-white/60 cursor-pointer ")}>
                {children}
            </button> */}
        </motion.div>
    </div>
  )
}
