
import "./tom.css";

export default function BubbleText(){
    return (
        <div 
        className="relative"
        >
            <h1 className="text-5xl font-extralight text-white/40 ">
               {"Shaniiiiiii Tiwari".split('').map((char,i)=>{
                return(
                    <span 
                     className="hoverText transition-all"
                     key={i}
                    >
                        {char}
                    </span>
                )
               })}
            </h1>

        </div>
    )
}