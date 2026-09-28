// eslint-disable-next-line no-unused-vars
import {motion, useMotionValue, useTransform} from 'motion/react'
import { useState } from 'react';

export default function DragCard(){

    const [cards, setCards] = useState(
        Array.from({length: 6}).map((_, idx) => ({ id: idx }))
    );
    
    return (
        // <div className="h-screen w-full flex items-center justify-center">
        <div className="h-screen w-full grid place-items-center">
            {
                cards.map((_, idx) => (
                    <Card key={idx} id={idx} setCards={setCards} cards={cards} />
                ))
            }
        </div>
    )
};

function Card({setCards, id, cards}){

    const x = useMotionValue(0);
    // to listen change in motion value
        // useMotionValueEvent(x, "change", (latest) => {
        //     console.log(latest);
        // });

    const opacity = useTransform(x, [-150, 0, 150], [0.3, 1, 0.3]);
    const rotateRaw = useTransform(x, [-150, 150], [-30, 30]); 

    const isFront = id === cards.length -1
    
    const rotate = useTransform(() => {
        const offset = isFront ? 0 : id%2 ? 6 : -6;
        return `${rotateRaw.get() + offset}deg`;
    })

    function handleDrag(){
        if(Math.abs(x.get()) > 50){
            setCards(prev => prev.filter(c => c.id !== id))
        }
    }

    return (
        <motion.div 
            drag="x" 
            dragConstraints={{
                left: -50,
                right: 50,
            }}
            style={{
                gridRow: "1",
                gridColumn: "1",  
                opacity,
                rotate, 
                x , // remember to add
                transition: '0.125s transform'
            }}
            animate={{ scale: isFront ? 1 : 0.98 }}
            onDragEnd={handleDrag}
            className={`w-56 h-76 rounded-2xl origin-bottom bg-gray-600 hover:cursor-grab active:cursor-grabbing`}
        />
    )
}