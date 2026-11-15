// eslint-disable-next-line no-unused-vars
import { motion, stagger, useAnimate } from "motion/react";
import { useEffect } from "react";


// sentences appears with an stagger animation,  y: 10
export default function AnimatedText () {
  const [scope, animate] = useAnimate();
  const text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque vel omnis doloremobcaecati commodi placeat a sit.Neque vel omnis doloremobcaecati commodi placeat a ";

    useEffect(() => {
      const startAnimating = () => {
        animate( "span",
          {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
          },
          {
            duration: 0.7,
            ease: "easeIn",
            delay: stagger(0.03),
          }
        );
      };
      startAnimating();
  });

  return (
    <>
      <div
        ref={scope}
        className="h-screen flex items-center justify-center bg-gray-800 text-white text-4xl"
      >
        {/* <motion.p ref={scope} style={{ opacity: 0}} className=' max-w-3xl text-center'>{text}</motion.p> */}
        <div className="max-w-4xl leading-12 text-center inline-block">
          {text.split(" ").map((word, idx) => (
            <motion.span
              key={word + idx}
              style={{ opacity: 0, filter: "blur(3px)", y: 10 }}
              className="inline-block"  // imp****
            >
              {word}&nbsp;
            </motion.span>
          ))}
        </div>
        {/*  i used ()=>{}  -- ()=>() */}
      </div>
    </>
  );
}

// inset-x-0 = left:0 , right:0
