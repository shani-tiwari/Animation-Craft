/* eslint-disable no-unused-vars */

import {motion, useMotionValue, useTransform, animate} from 'motion/react';
import { useState } from 'react';




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
];


const StackedCard = ({item,idx,total,onSendBack}) =>{

    const stack_transition = {type: 'spring', stiffness: 380, damping: 32};
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-150, 150], [-12, 12]);
    const isTop = idx === 0;

    return (
        <motion.div
            drag={isTop ? "x" : false}
            dragConstraints={{left: -150, right: 150}}
            dragElastic={0.08}
            onDragEnd={() => {
                if(!isTop || !onSendBack) return;
                onSendBack()
                animate(x, 0, stack_transition);                         /* make sure to import it */
            }}
            className="absolute inset-0 rounded-[20px] overflow-hidden"
            animate={{y: `${-idx * 5}%`, scale: 1 - idx * 0.05}}        /* -idx(up) +idx(down)  */
            style={{ zIndex: total - idx, rotate, x }}                  /* on top of each other */
            transition={stack_transition}
        >
            <img 
                src={item.img}
                alt={item.title}
                /* drag - started working after `select, pointer` properties added on img */
                className="w-full h-full object-cover select-none pointer-events-none"
            />
            
        </motion.div>
    )
};


export default function DragCards(){
    const [stack, setStack] = useState(CardsData);
    return (
        <>
        <div className='relative flex items-center justify-center w-full h-screen bg-slate-900'>
            <motion.div className='w-80 h-96 relative'>
            {
                stack.map((item, idx) => (
                    <StackedCard 
                      item={item} 
                      idx={idx} 
                      key={item.title} /* passing the key on mapped item is must - for expected results */
                      total={stack.length} 
                      onSendBack={() => {idx === 0 ? setStack(prev => prev.slice(1).concat(prev[0])) : null}} 
                    />
                ))
            }
            </motion.div>
        </div>
        </>
    )
}