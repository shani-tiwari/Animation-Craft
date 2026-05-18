

// eslint-disable-next-line no-unused-vars
import {AnimatePresence, motion} from 'motion/react'
import { useState } from 'react'

const CardsData = [
    {
        title : "CAPTAIN AMERICA",
        img: "https://i.pinimg.com/736x/0e/f3/2b/0ef32ba41130c40d9dd94b1b495baae0.jpg"
    },
    {
        title : "DEADPOOL",
        img: "https://i.pinimg.com/736x/89/99/98/8999987b440ee7152fb05d4648fb5e5b.jpg"
    },
    {
        title : "DR.STRANGE",
        img: "https://i.pinimg.com/736x/3e/26/2d/3e262dc490b9cd99b7e923ec9845cb06.jpg"
    },
    {
        title : "IRONMAN",
        img: "https://i.pinimg.com/736x/0e/4b/0f/0e4b0fadd1a33a3301425ee21a62370a.jpg"
    },
    {
        title : "WANDA",
        img: "https://i.pinimg.com/736x/fd/36/b0/fd36b0028f1cc02e8f1ef890dece9a94.jpg"
    },
    {
        title : "THOR",
        img: "https://i.pinimg.com/736x/22/96/1e/22961efa0faa5b5211a23119ae269182.jpg"
    },
]




export default function Carousel() {

    // gives an initial padding to content - which is removed when user scrolls
    // so, scroll is added to state - start scrolling from here only - else it will start from beginning

    // const startEndPoints = "pl-[max(1rem,calc((100vw-72rem)/2+1rem))]" + 
    //                        "pr-[max(1rem,calc((100vw-72rem)/2+1rem))]" + 
    //                        "scroll-px-[max(1rem,calc((100vw-72rem)/2+1rem))]"
    // ;

    const [open, setOpen] = useState(false);
    

  return (
        <section className=" w-full  overflow-hidden  p-4">
            <div className="max-w-6xl mx-auto px-22">
                <h1 className="text-white/90 text-md mb-6 text-4xl tracking-tight">Who the f*** are they........ </h1>
            </div>

            {/* container */}
            {/* so we can have exit animation as well */}
            <AnimatePresence>
                {
                    open && 
                    <motion.div 
                      onClick={() => setOpen(prev => !prev)} 
                      className='fixed inset-0 size-full bg-black/70 z-99 p-4 flex items-center backdrop-blur-md'
                      initial={{opacity: 0}}
                      animate={{opacity: 1}}
                      exit={{opacity: 0, transition:{delay: 0.25}}}
                      transition={{duration: 0.5}}
                    >
                        <motion.div 
                          onClick={(e) => e.stopPropagation()} 
                          className='w-[50%] mx-auto h-[80%] bg-white/20 flex items-center justify-center rounded-xl shadow-2xl shadow-black/30'
                          initial={{opacity: 0, scale: 0.9}}
                          animate={{opacity: 1, scale: 1}}
                          exit={{opacity: 0, scale: 0.9, transition: { duration: 0.4, delay: 0}}}
                          transition={{duration: 0.4, delay: 0.2}}
                        >
                            <img className="size-full object-center object-cover rounded-2xl" src={CardsData[1].img} />
                        </motion.div>
                    </motion.div>
                }
            </AnimatePresence>

            {/* images container */}
            <div className={`pl-[max(1rem,calc((100vw-67rem)/2+1rem))] pr-[max(1rem,calc((100vw-67rem)/2+1rem))] 
                scroll-px-[max(1rem,calc((100vw-67rem)/2+1rem))] 
                overflow-x-auto flex gap-4 p-6 bg-amber-600/10  [scrollbar-width:none] text-white snap-x snap-mandatory relative`}>
                {/* make 8 cards of same data */}
                {CardsData.map((item, idx) => (
                    <motion.div 
                        onClick={() => setOpen(prev => !prev)}
                        initial={{opacity: 0, x: -50}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.5, delay: idx * 0.1}}
                        whileHover={{
                            scale: 1.02,
                            transition:{type: "spring", stiffness: 200, damping: 30}
                        }}
                        className={` snap-start h-100 w-60 rounded-2xl shrink-0 relative overflow-hidden cursor-pointer`} key={idx}
                    >
                        <img className="absolute inset-0 size-full object-cover" src={item.img} />
                        <div className="absolute inset-0 h-fit z-10 flex flex-col gap-1 p-4 bg-black/40 backdrop-blur-xs">
                            <h1 className="text-sm font-semibold tracking-tight"> 
                                {item.title}
                            </h1>
                        </div> 
                    </motion.div>
                ))}
            </div>

        </section>
  )
};


/** Learnings
 * img is a void element - can't have children 
 * scroll snap is used to snap the scroll to the nearest element
 * 
 */
