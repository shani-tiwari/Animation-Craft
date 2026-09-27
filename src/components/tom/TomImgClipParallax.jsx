// eslint-disable-next-line no-unused-vars
import { motion, useMotionTemplate, useScroll, useTransform } from "motion/react"
import { useRef } from "react";



export default function TomImgClipParallax(){
    
    return (
        <div className="relative h-[200vh] w-full">
            <CenterImg/>
            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-b from-transparent to-white/40 w-full h-96" />
            <ParallaxImages/>
        </div>
    )
};



function ParallaxImages(){
    return (
        <>
            <div className="relative max-w-5xl mx-auto pt-50 ">
                <Img start={-150} end={20} className="w-1/2 h-56 bg-red-200 ml-auto"/>
                <Img start={-200} end={200} className="w-2/3 h-64 bg-blue-200 ml-24"/>
                <Img start={0} end={-500} className=" w-5/12 h-24 bg-yellow-200 "/>
            </div>
        </>
    );
};

function Img({start, end, className}){  // react took only 1 prop - destructure it.
    const ref = useRef();
    const {scrollYProgress} = useScroll({
        target: ref, offset:  [`start end`, `end start` ]
    });

    const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
    const y = useTransform(scrollYProgress, [0, 1], [`${start}px`, `${end}px`]); 

    return <motion.div ref={ref} style={{
        opacity, 
        y
    }} className={`${className} relative z-999 `}/>
}


function CenterImg(){
    const setionHeight = 1500; // set px values for animation section

    const { scrollY } = useScroll();

    const opacity = useTransform(scrollY, [0,setionHeight+setionHeight + 500], [1, 0]);
    const backgroundSize = useTransform(scrollY, [0,setionHeight ], ['170%', '100%']);

    const clip1 = useTransform(scrollY, [0,setionHeight], [25, 0]);
    const clip2 = useTransform(scrollY, [0,setionHeight], [75, 100]); 

    const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`
    
    return (
        <motion.div className="sticky top-0 h-screen w-full bg-cover bg-no-repeat bg-center"
            style={{
                clipPath,
                opacity,
                backgroundSize,
                backgroundImage: 'url("https://pbs.twimg.com/media/HTKC8gUbcAAUaai?format=jpg&name=medium")',
            }}
        />

    )
};