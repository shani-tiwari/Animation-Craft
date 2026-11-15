// eslint-disable-next-line no-unused-vars
import {motion} from 'motion/react';


// tilts like an 3d button on hover 
export default function ButtonHover() {
  return (
    <div  
    style={{
        backgroundImage: `radial-gradient(circle at 0.5px 0.5px, rgba(6,182,212,0.2) 0.5px, transparent 0)`,
        backgroundSize: "8px 8px",
        backgroundRepeat: " repeat"
    }}
    className='[perspective::1000px] transform-3d    h-screen w-full bg-neutral-900 text-white flex items-center justify-center'>

      <motion.button 
    //   initial={{
    //     rotate: 0,
    //   }}
    //   animate={{
    //     // rotate: 20,
    //     rotate: [0, 10, 0],
    //   }}
    //   transition={{
    //     duration: .5,
    //     ease: 'easeInOut'
    //   }}
    whileHover={{
        rotateX: 25,
        rotateY: 10,
        y: -10,
        boxShadow: "0px 20px 50px rgba(8,112,184,0.3)"
    }}
    style={{
        translateZ: 100,
    }}
        className="relative group px-12 py-4 rounded-md bg-neutral-950 ">
        <span className='group-hover:text-cyan-500'>Shani bhai</span>
        <span className="absolute h-px inset-x-0 bottom-0 w-3/4 mx-auto bg-linear-to-r from transparent via-cyan-500 to-transparent "></span>
        <span className="absolute group-hover:opacity-100 transition-opacity duration-300 h-1 inset-x-0 bottom-0 w-full blur-sm mx-auto opacity-0 bg-linear-to-r from transparent via-cyan-500 to-transparent "></span>
      </motion.button>

    </div>
  )
}

// inset-x-0 = left:0 , right:0