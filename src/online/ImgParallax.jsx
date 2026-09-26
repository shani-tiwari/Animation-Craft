// eslint-disable-next-line no-unused-vars
import {motion, useScroll, useTransform} from 'motion/react';
import {  useRef } from 'react';


export default function ImgParallax(){

    const imgRef = useRef(null);
    const {scrollYProgress} = useScroll({
        target: imgRef, 
        offset: ["start end", "end start"] 
    });



    // i need keep changing values with scroll to change image object position
    const objectPosition = useTransform(scrollYProgress, [0, 1], ["50% 10%", "50% 90%"]);

    return(
        <div className="h-screen overflow-hidden flex items-center justify-center w-full bg-black/40">
            <div className='w-96 h-96  '>
                <motion.img ref={imgRef} style={{
                    objectPosition: objectPosition
                    
                }} className="size-full rounded-md object-cover transition-transform duration-75" src="../../public/images/unsplash.jpg" />
            </div>
        </div>
    );
};
    