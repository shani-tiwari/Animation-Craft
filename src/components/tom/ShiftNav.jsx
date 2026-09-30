// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";




export default function ShiftNav(){
    return (
        <div className="flex h-full w-full justify-start bg-neutral-950 p-8 text-neutral-200">
            <Tabs />
        </div>
    )
}

function Tabs(){
    const [selected, setSelected] = useState(1);
    const [direction, setDirection] = useState(null);

    const handleSelected = (val) => {
       if (typeof selected === "number" && typeof val === "number") {
            setDirection(selected > val ? "right" : "left"); 
        } else if (val === null) {
            setDirection(null);
        };

        setSelected(val);
    };

    return (
        <div 
            className="relative flex gap-6 bg-neutral-800 w-fit h-fit mx-auto text-center"
            onMouseLeave={ () => handleSelected(null) }
        >
            {TABS.map(tab => (
                <TAB 
                    key={tab.id} 
                    selected={selected} 
                    handleSelected={handleSelected} 
                    tab={tab.id2}
                >
                    {tab.title}
                </TAB>
            ))}
            {/* render content */}
            <AnimatePresence>
                {
                    selected  &&  
                    <Content 
                        direction={direction} 
                        selected={selected} 
                    />
                }
            </AnimatePresence>

        </div>
    )
};

function TAB({ selected, handleSelected, tab, children }){
    return( 
        <div 
            id={`tab-${tab}`}
            className={`relative text-2xl h-fit flex flex-col gap-1 rounded-full px-3 py-1.5 transition-colors `}
            onMouseEnter={() => handleSelected(tab)}
            onClick={() => handleSelected(tab)}
        >

            {/* render tab */}
            <div className={`px-2 py-1 rounded-xl transition-colors ${ selected === tab
                ? "  text-neutral-100 bg-black/60" 
                : " text-neutral-400"
            }`}>
                {children}
            </div>

        </div>
    )
};

function Content({ direction, selected }){
    return (
        <motion.div id="overlay-content" initial={{opacity: 0, y: 12}}
            animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: 12}}
            className="absolute left-0 top-[calc(100%+24px)] w-96 h-32 bg-gray-700 rounded-xl flex items-center justify-center"
        >
            <Bridge/>
            <Nub selected={selected}/>
            {
                TABS.map(tab => {
                    return <div id={tab.id2}>
                        {selected === tab.id2 && (
                            <motion.div 
                              initial={{opacity: 0, 
                                x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0}}
                              animate={{opacity: 1, x: 0}}
                            >
                                {tab.content}
                            </motion.div>
                        )}
                    </div>
                })
            }
        </motion.div>
    )
};

function Bridge(){
    return <div className="absolute -top-6 left-0 right-0 h-6 "></div>
};
function Nub({selected}){
    const [left, setLeft] = useState(0);
    // const nubRef = useRef(null);

    
    function moveNub(){
        if(selected){
            const hovered = document.getElementById(`tab-${selected}`);
            const overlay = document.getElementById(`overlay-content`);

            if(!hovered || !overlay) return;

            const  {left: contentLeft} = overlay.getBoundingClientRect();
            const tabRect = hovered.getBoundingClientRect();

            setLeft(tabRect.left - contentLeft + (tabRect.width / 2) - 12);
        };    
    };

    useEffect(() => {
        moveNub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected]);

    return <motion.div 
        animate={{left}}
        className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-inherit size-6 rounded-sm" 
    />
};


const TABS = [
    {
        title: 'home',
        content: (
            <p>home </p>
        ),
        id: 1
    },
    {
        title: 'profile',
        content: (
            <p>profile </p>
        ),
        id: 2
    },
    {
        title: 'about',
        content: (
            <p>about </p>
        ),
        id: 4
    }
].map((tab, idx) => ({...tab, id2: idx + 5}) ); // dynamic id generation;