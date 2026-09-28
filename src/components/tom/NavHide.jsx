// eslint-disable-next-line no-unused-vars
import {motion, useScroll, useMotionValueEvent} from 'motion/react';
import { useState } from 'react';




export default function NavHide(){

    const [hid, setHid] = useState(false);
    
    const {scrollY} = useScroll();

    useMotionValueEvent(scrollY, "change", (y)=>{
        const prev = scrollY.getPrevious();
        if (y>150 && prev < y) {
            setHid(true);
        }else if(prev>y){
            setHid(false);
        }
    });

    return (
        <div className=" h-[200vh] w-full">
            <motion.nav 
             variants={{visible:{y:0}, hidden: {y:"-100%"}}}
            //  initial={"visible"}
             animate={hid ? "hidden" : "visible"}
             transition={{duration: 0.3, ease: "easeInOut"}}
             className="sticky top-0 h-20  bg-white/40 backdrop-blur-2xl z-999"
            />
            <div className="h-screen bg-gray-900"></div> 
        </div>
    )
};