/**
 * onBlur() event --- on click on input box or outside of it we get this event
 */


/* eslint-disable no-unused-vars */
import { motion } from "framer-motion"
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react"

export default function GooeyEffect() {

    const [isExpanded, setIsExpanded] = useState(false);
    const [searchText, setSearchText] = useState('');
    const inputRef = useRef(null);

    const buttonVariants = {
      collapsed:{ width: 145, marginLeft: 0 },
      expanded:{ width: 200, marginLeft: 46 }
    };

    const bubbleVariants = {
      hidden: { scale: 0, opacity: 0 },
      visible:{ scale: 1, opacity: 1 }
    };

    const Transition = { transition: { duration: 0.5, type: "spring", bounce: 0.25 } }

    useEffect(() => {
      if(isExpanded) {
        inputRef.current?.focus();
      }else {
        // inputRef.current?.blur();
        // setSearchText('');
      }
    }, [isExpanded])

  return (
    <div className="relative flex items-center justify-center ">

      {/* gooey effect component */}
      <SVGFilter />

        <div className="relative flex justify-center h-12 items-center" style={{ filter: "url(#gooeyEffect)" }}>
            <motion.div 
             variants={buttonVariants}
             initial='collapsed'
             animate={isExpanded ? 'expanded' : 'collapsed'}
             transition={Transition}
             className="h-10 z-99 flex items-center gap-4 bg-black rounded-full px-4">
                {
                  !isExpanded && 
                  <motion.button 
                    layoutId="search"
                    // onClick={() => setIsExpanded(true)}
                    className="h-10 w-10 text-white flex items-center justify-center gap-2 font-medium cursor-point rounded-full">
                    <Search size={22} strokeWidth={2}/>
                  </motion.button>
                }
                <motion.input 
                  layoutId="input"
                  transition={Transition}
                  ref={inputRef}
                  className="h-full w-full ml-2 bg-transparent text-white text-md placeholder-white/50 outline-none" 
                  type="text" 
                  placeholder="Search..." 
                  value={searchText}
                  onFocus={()=>setIsExpanded(true)}
                  onBlur={()=> !searchText && setIsExpanded(false)}
                  onChange={(e)=>setSearchText(e.target.value)}
                />
            </motion.div>
            <motion.button 
              layoutId="button"
              variants={bubbleVariants}
              initial='hidden'
              animate={isExpanded ? 'visible' : 'hidden'}
              transition={Transition}
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-10 w-10 z-8 absolute left-0 text-white bg-black flex items-center justify-center font-medium cursor-point rounded-full"
            >
              <Search size={22} color="white" strokeWidth={2}/>
            </motion.button>
        </div>
    </div>
  )
}

const SVGFilter = () => {
  return (
    <svg className="absolute hidden h-0 w-0">
      <defs>
        <filter id="gooeyEffect" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="
            1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            0 0 0 20 -10
          " result="gooey" />
          <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
        </filter>
      </defs>
    </svg>
  )
}