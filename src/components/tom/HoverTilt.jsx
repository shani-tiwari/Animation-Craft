// eslint-disable-next-line no-unused-vars
import { useMotionValue, useSpring, useTransform, motion } from "motion/react";


export default function HoverTilt(){

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // running through spring hook - easing on the values
    const xSpr = useSpring(x);
    const ySpr = useSpring(y);

    // convert - to use on animation
    const rotateX = useTransform(ySpr, [-0.5, 0.5], ['17deg', '-17deg']);
    const rotateY = useTransform(xSpr, [-0.5, 0.5], ['-17deg', '17deg']);

    function handleMouseMove(e){
        const rect = e.target.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;  // get mouse posi on card in X 
        const mouseY = e.clientY - rect.top;   

        const xPer = (mouseX/width) - 0.5; // 0 to 1 - 0.5 -> -0.5(left) to 0.5(right)

        const yPer = (mouseY/height) - 0.5; // -0.5(bottom) to 0.5(top)

        x.set(xPer);
        y.set(yPer);

     };

    return (

        <div className="w-full h-screen p-12 rounded-2xl flex items-center justify-center">

            <motion.div 
                onMouseMove={handleMouseMove}
                onMouseLeave={() => {x.set(0); y.set(0); }}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }} 
                className=" w-72 h-96 bg-amber-200 rounded-xl flex items-center justify-center"
            >
                <div 
                    style={{
                        transformStyle: "preserve-3d",
                        transform:"translateZ(75px)"
                    }}
                    className="absolute inset-4 bg-red-200 rounded-2xl text-center font-bold text-2xl flex items-center justify-center">
                     Hover ME !!!
                </div>
            </motion.div>

        </div>
    )
};