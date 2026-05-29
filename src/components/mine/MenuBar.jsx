import { useState } from "react";
import { cn } from "../../lib/utils";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react";

function MenuBar() {
  const [active, setActive] = useState(false);

  return (
    <>
      <main
        className={cn(
          "h-full w-full bg-neutral-500 flex items-center justify-center "
        )}
      >
        <div
          className={cn("container relative flex justify-end h-[70%] w-[30%]")}
        >
          {/* btn wrapper */}
          <div 
           onClick={() => setActive(!active)}
           className={` ${!active && "border-3 border-white/70" }
           overflow-hidden relative flex justify-center items-center mt-6 mr-6 w-22 h-11 rounded-full cursor-pointer shadow-xl/20 hover:border-white `}>
            <button
              className={cn(`${active && "-top-12"} bg-green-500/60 z-99 uppercase outline-none absolute text-lg px-4 
                lg:px-6 py-1 lg:py-2 rounded-full cursor-pointer group perspective-500
                 `)}
              >
              <span className="inline-block group-hover:-rotate-x-360 transform-3d transition-all duration-1000">Menu</span>
            </button>
            <button
              className={cn(`${active ? "bottom-0 scale-100" : "-bottom-12 scale-50"} uppercase bg-black/80 text-white/70 z-99 
                absolute right-0 text-base lg:text-lg px-4 py-[6px] group perspective-500 border-2 border-white/60 rounded-full cursor-pointer `)}
            >
              <span className="inline-block group-hover:-rotate-x-360 transform-3d transition-all duration-1000">Close</span>
            </button>
          </div>

        {/* menu wrapper */}
          <motion.div
            initial={{ width: 0, height: 0, right: "24px", top: "24px" }}
            animate={{
              width:  active ? "100%" : "0%",
              height: active ? "100%" : "0%",
              right:  active ? "0px" : "24px",
              top:    active ? "0px" : "24px",
            }}
            transition={{
              duration: 0.4,
              type: "spring",
              stiffness: 100,
              damping: 15
              // ease: [0.1 , 0, 0.7, 1],
            }}
            style={{ transformOrigin: "top right" }}
            whileTap={{ scale: 0.99 }}
            exit={{
              delay: 2,
              duration: 0.4,
              ease: [0.86, 0, 0.7, 1],
            }}
            className={cn(`${active && "border-2 border-white/20 shadow-xl/50 shadow-zinc-800"}
              menu-bar absolute z-0 px-[24px] py-[12px] lg:px-[44px] lg:py-[22px] bg-green-500/20 rounded-3xl cursor-pointer `,
            )}
          >
            <motion.div 
              layout='position'
              initial={{opacity: 0 }}
              animate={{
                opacity: active ? 1 : 0
              }}
              transition={{
                duration: 0.2,
                type: "tween",
                ease: "bounce in",
                delay: 0.2
              }}

              // style={{ position: 'absolute', left: 16, top: 16 }} /
              className={`absolute left-4 top-4 lg:px-4 pt-10 ${active && 'w-[90%]'}  `}
            >

                { ['Projects', 'About', 'Contact', 'Skills', 'Experience'].map((item, idx) => 
                  (
                    <AnimatePresence>
                      <motion.div 
                      initial={{opacity: 0}}
                      style={{ transformOrigin: "top" }}
                      animate={{
                        opacity: active ? 1 : 0,
                        rotateX: active ? 0 : 90,
                        scale: active ? 1 : 0.1
                      }}
                      exit={{
                        opacity: 0, 
                        scale: !active ? 0 : 1,
                        // x: -100
                      }}
                      transition={{
                        duration: 0.2,
                        ease: "bounce in",
                        delay: active ? 0.2 + (idx * 0.15) : 0,
                        type: "tween",
                      }}

                      className=" text-xl lg:text-3xl lg:px-2 px-1 text-white/80 pt-2 lg:pt-4  tracking-wider mb-2 w-full group">
                        <span className="group-hover:text-white/90 text-neutral-300 transition-all duration-400 mr-2 group-hover:ml-2">•</span>  
                        <span className="group-hover:text-shadow-2xs text-shadow-green-100/70  ">{item}</span>
                        <span className=" absolute group-hover:pl-6 transition-all duration-500 ml-2 ">→</span> 
                      </motion.div>  
                    </AnimatePresence>
                  )
                )};

              </motion.div>

          </motion.div>

        </div>
      </main>
    </>
  );
}

export default MenuBar;
