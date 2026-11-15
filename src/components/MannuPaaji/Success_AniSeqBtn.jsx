// eslint-disable-next-line no-unused-vars
import { motion, stagger, useAnimate } from "motion/react";

export default function AniSeqBtn() {
  const [scope, animate] = useAnimate();

  // executed one after the other
  const sequence = [
      [ ".text",  { display: "none" }, { duration: 0.1 }],
      [ "button", { width: "5rem", border: "none", borderRadius: "1000px" }, { duration: 0.3 } ],
      [ "button", { opacity: 1, scale: [1, 0.5, 0.7, 0.4, 1.3, 0.6, 1], backgroundImage: "linear-gradient(to right, #00ff99, #00ccff)"},{ duration: 0.7, ease: "easeInOut" }],
      [ ".check", { opacity: 1, scale: [0.5, 0.7, 0.4, 1.3, 0.6, 1], }, { duration: 0.5, ease: "easeInOut", at: "-0.7" } ],
  ];

  const startAnimate = async() => animate(sequence);

  return (
    <>
      <div
        ref={scope}
        className="h-screen relative flex items-center justify-center bg-gray-800 text-white text-2xl"
      >
        <motion.button
          onClick={() => startAnimate()}
          style={{ width: "20rem" }}
          className="h-20 font-medium bg-amber-800 rounded-2xl cursor-pointer text-center border"
        >
          <span className="text">Purchase Now</span>
        </motion.button>
        <motion.p className="check h-8 w-8 absolute inset-0 opacity-0  m-auto">
          ✔️
        </motion.p>
      </div>
    </>
  );
}

// can't set px, py if we animating on onCLick so width, height should be specified
// imp** h,w if absolute
