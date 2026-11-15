// eslint-disable-next-line no-unused-vars
import {motion} from 'motion/react';

export default function CustomSVG() {
  return (

    // my design and animation 
    <div className=" relative  w-[50vw] ">
        <svg 
         className=" absolute top-2 -left-[0.2px] rotate-180 "  
         viewBox="0 0 300 70" 
         preserveAspectRatio="xMidYMid meet"
         fill="none">
            <motion.path 
             initial={{pathLength: 0}}
             animate={{pathLength: 1}}
             transition={{duration:1}}
             d="
                M10 70  
                Q10 60 50 60
                Q140 60 150 40
            " 
            stroke="black"
            strokeWidth="0.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"

            />
        </svg>

        <svg
            className=" absolute top-2 left-[0.3px] rotate-y-360 rotate-x-180 "
            viewBox="0 0 300 70"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
        >
            <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1 }}
                d="
                    M10 70
                    Q10 60 50 60
                    Q140 60 150 40
                "
                stroke="black"
                strokeWidth="0.5" 
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="scaling-stroke" 
            />
        </svg>

    </div>
  )
}




// export default function CustomSVG() {
//   return (
//     <div className=" relative bg-amber-900">
//         {/* <svg width="300" height="120" viewBox="0 0 300 120" fill="none">
//             <path 
//             d="
//                 M20 60

//                 Q60 60 100 60
//                 Q130 60 150 90
                
//                 Q170 60 200 60 
//                 Q240 60 280 60 
//             " 
//             stroke="black"
//             strokeWidth="2"
//             fill="none"
//             />
//         </svg> */}
//         {/* <svg className="rotate-180" width="300" height="120" viewBox="0 0 300 120" fill="none">
//             <path 
//             d="
//                 M20 80 
//                 Q60 40 100 60
//                 Q130 60 150 40
//                 Q170 60 200 60 
//                 Q240 40 280 80 
//             " 
//             stroke="black"
//             strokeWidth="2"
//             fill="none"
//             />
//         </svg> */}


//         {/*  with animation */}
//         <svg 
//          className=" absolute top-2 -left-[0.2px] rotate-180 w-fit min-w-[120vw] rounded-2xl"  
//          viewBox="0 0 300 120" 
//          preserveAspectRatio="xMidYMid meet"
//          fill="none">
//             <motion.path 
//              initial={{pathLength: 0}}
//              animate={{pathLength: 1}}
//              transition={{duration:1}}
//              d="
//                 M10 70  
//                 Q10 60 50 60
//                 Q140 60 150 40
//             " 
//             stroke="black"
//             strokeWidth="1"
//             fill="none"
//             strokeLinecap="round"
//             strokeLinejoin="round"

//             />
//         </svg>



//         {/* my version */}
//         {/* <svg className="absolute top-0 left-[0.35px] rotate-y-360 rotate-x-180" 
//             width="300" 
//             height="120" 
//             viewBox="0 0 300 120" 
//             fill="none">
//             <motion.path 
//              initial={{pathLength: 0}}
//              animate={{pathLength: 1}}
//              transition={{duration:2}}
//             d="
//                 M10 70  

//                 Q10 60 50 60
//                 Q140 60 150 40

//             " 
//             stroke="black"
//             strokeWidth="0.3"
//             fill="none"
//             />
//         </svg> */}

//         {/*  ai version */}
//             <svg
//                 className=" block absolute top-2 left-[0.3px] rotate-y-360 rotate-x-180 w-fit min-w-[120vw]"
//                 viewBox="0 0 300 120"
//                 fill="none"
//                 preserveAspectRatio="xMidYMid meet"
//             >
//             <motion.path
//                 initial={{ pathLength: 0 }}
//                 animate={{ pathLength: 1 }}
//                 transition={{ duration: 1 }}
//                 d="
//                     M10 70
//                     Q10 60 50 60
//                     Q140 60 150 40
//                 "
//                 stroke="black"
//                 strokeWidth="1" 
//                 fill="none"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"

//                 // vectorEffect="scaling-stroke" 
//             />
//             </svg>

        

//     </div>
//   )
// }


// Q160 60 200 60 
// Q240 60 280 70 

