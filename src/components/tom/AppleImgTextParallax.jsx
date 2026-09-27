// eslint-disable-next-line no-unused-vars
import {motion, useScroll, useTransform} from 'motion/react';
import { useRef } from 'react';

export default function AppleImgTextParallax(){

    const textRef = useRef(null);
    const {scrollYProgress} = useScroll({
        target: textRef, 
        offset: ["start end", "end start"] 
    });
    const yText = useTransform(scrollYProgress, [0,1], [250, -250]);  //parallax reference to image
    const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0.1, 1, 0.3]);
    

    return(
        <div className="relative h-[130vh]">
           <Image/>
           
            {/* Text */}
            <div ref={textRef} className="absolute top-0 left-0 w-full text-center h-screen flex justify-center items-center ">
                <motion.p style={{y: yText, opacity}} className="text-8xl font-bold text-black ">
                    Blossom Flowers
                </motion.p>
            </div>
        </div> 
    );
};


function Image(){
    const imgRef = useRef(null);
    const {scrollYProgress} = useScroll({
        target: imgRef,
        offset: ["end end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

    return (
         <div className="sticky top-0 h-screen">
                <motion.img
                    ref={imgRef}
                    className="w-full h-full object-cover rounded-4xl"
                    src="/images/unsplash.jpg"
                    style={{scale, opacity}}
                />
            </div>
 
    )
};