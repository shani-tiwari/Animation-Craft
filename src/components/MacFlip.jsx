
//    Kudos to ---- @mannupaaji

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import '../styles/WavyUnderline.css'

export default function MacFlip() {

  // const variants = {
  //   initial: {
  //     rotateX: 0,
  //   },
  //   animate: {
  //     rotateX: -10,
  //   },
  // };

  return (
    <main className="bg-neutral-900/50 py-8 px-4 sm:py-12 sm:px-12 lg:py-16 lg:px-24 ">

        <a href="https://instagram.com/shanidevelops" className=" wavy-underline-pulse text-white/90 text-lg md:text-xl mb-2 "> ShaniDevelops </a> <br />
        <a href="https://webtree.shaniweb.com" className="text-white/90 text-md mb-2 "> try - Webtree(130+ web's in 15+ categories for dev's) </a>
        <h1 className="text-white/90 text-md mb-6 underline underline-offset-8">Mac(open-close) Hover Animation </h1>


        {/* Mac Book */}
        <motion.div 
          whileHover='animate'
          initial='initial'
          className=" flex flex-col items-center justify-center perspective-distant">

            {/* lid */}
            <motion.div 
              variants={{
                initial: {
                  rotateX: -30,
                },
                animate: {
                  rotateX: 10,
                  transition: {
                    duration: 0.9,
                    // ease: [0.9, 0.01, 0, 1.05],
                    ease: 'easeOut'
                  }
                }
              }}  
              style={{
                // transform: 'rotateX(-10deg)',
                transformOrigin: "bottom ",
              }}
              className="lid p-1 lg:p-2 flex items-center justify-center bg-neutral-300/80 rounded-t-xl w-64 h-40 md:w-80 md:h-50 lg:w-md lg:h-70
                            shadow-sm shadow-white/30 ring-1 ring-white/20">
                {/* screen */}
                <div className="screen overflow-hidden bg-linear-to-b from-neutral-400 to-neutral-500 w-full h-full rounded-t-lg lg:rounded-t-[10px] "> 
                    {/* image */}
                    <a href="https://webtree.shaniweb.com">
                      <motion.img 
                        variants={{
                          initial: {
                            opacity: 0,
                            filter: 'blur(10px)'
                          },
                          animate: {
                            opacity: 1,
                            filter: 'blur(0px)',
                            transition: {
                              duration: 0.8,
                              ease: [0.9, 0.01, 0, 1.03],
                            }
                          }
                        }}
                        src="/images/macflip.png" alt="loading" className="w-full h-full object-cover" 
                      />
                    </a>
                </div>  
            </motion.div>

            {/* base */}
            <div className="base bg-linear-to-b from-neutral-300 to-neutral-600 rounded-b-xl md:rounded-b-2xl lg:rounded-b-3xl w-68 h-4 md:w-86 md:h-5 lg:w-117 lg:h-6 rounded-t-sm lg:rounded-t-md
                            shadow-[0px_1px_0px_0px_rgba(0,0,0,0.5)_inset] ">
                {/* hinge */}
                <div className="hinge mx-auto rounded-b-md lg:rounded-b-xl w-12 h-2 md:w-16 md:h-2.5 lg:w-20 lg:h-3 bg-neutral-300
                                shadow-[0px_1px_0px_0px_rgba(0,0,0,0.1)_inset,1px_0px_5px_0px_rgba(0,0,0,0.5)_inset] ">
                                
                </div>
            </div>

        </motion.div>

    </main>
  )     
}

/** tip -- never leave or add space when using tailwind shadow arbitrary values (...._inset, ...._outset) --- won't apply due to space after comma 
 * 
 * base top-inset shadow  ---  shadow-[0px_1px_0px_0px_rgba(0,0,0,0.3)_inset] 
 * hinge shadow  ---  shadow-[0px_1px_0px_0px_rgba(0,0,0,0.1)_inset,1px_0px_5px_0px_rgba(0,0,0,0.5)_inset] 
 */