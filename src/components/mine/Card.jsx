
import { useState } from "react"
// eslint-disable-next-line no-unused-vars
import {AnimatePresence, motion} from 'motion/react';


// card fades out on click with smooth blur animation
export default function Card() {

  const [open, setOpen] = useState(true);
  return (
    <>
     <AnimatePresence>
        {/* ensure to run the exit animation, when conditionals are there, it should direct above the boolean who decided to render */}
        {
            open &&
            <motion.div 
            initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1,    filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
            transition={{ duration: 0.5 }}
            className="w-90 h-120 bg-gray-600 rounded-xl p-6 flex flex-col">
                <h2 className="font-bold text-[20px] mx-auto ">Aceternity UI Component</h2>
                <p className="text-neutral-400 mt-2 text-[14px] text-wrap">A Collection of beautiful UI Components, let's get started</p>
                <div className="w-full text-center">
                    <button onClick={() => setOpen(false)} className="px-6 py-1 mt-2 rounded-xl bg-neutral-300">Aceternity</button>
                </div>
        
                    <motion.div 
                    initial={{ opacity : 0, scale: 0.89, filter: 'blur(10px)' }}
                    whileHover={{ opacity : 1, scale: 1.05, filter: 'blur(0px)' }}
                    transition={{ duration : .5, }}
                    className="relative flex-1 rounded-xl  mt-4">
                        <div className="absolute inset-0 h-full w-full bg-amber-700 rounded-xl "></div>
                    </motion.div>
            </motion.div>
        }
     </AnimatePresence>
    </>
  )
}

// inset-x-0 = left:0 , right:0