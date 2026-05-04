// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";


/**
 * @param name 
 */
export default function MotionBtn({name = '@shani.develops'}) {
    
  return (
    <motion.button
            initial="initial"
            whileHover="hover"
            exit="exit" 
            className="group relative px-4 py-2 rounded-full overflow-hidden"
          >
            <motion.span
              variants={{
                initial: { color: "#000" },
                hover: { color: "#fff", scale: 2 },
                exit: { color: "#000" },
              }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
             {name}
            </motion.span>
            <motion.span
              variants={{
                initial: { scaleX: 0, originX: 0 },
                hover: { scaleX: 1, originX: 1 },
                // exit: { scaleX: 0, originX: 0 },
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute top-0 left-0 h-full w-full bg-black"
            />
          </motion.button>
  )
}
