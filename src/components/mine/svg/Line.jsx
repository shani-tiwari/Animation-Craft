
/**
 * svg     - picture frame, holds entire drawing
 * viewbox - how much of the drawing you are looking at. (smaller-zoom in | larger - zoom out)
 */



export default function Line () {
    // (function animate(){
    //     let distance = 0;
    //     setInterval(()=>{
    //         distance += 4;
    //         document.querySelector('.ball').style.offsetDistance = distance + "%";
    //     }, 50);
    // })()
    return (
        <div>
            <svg className="bg-white/4" width="200" height="200" viewBox="0 0 600 600" fill="none" >
                {/* <circle r="50" stroke="red" strokeWidth={4} />   */}
                {/* <rect x='25' y='50' width='150' height='100' fill="#afafaf" />  x,y  --- top left co-ordinate */}
                {/* <path  d="M 50, 100 L 150, 100" stroke="#fafa" strokeWidth={18} strokeLinecap="round" /> */}
                <path  
                    d="M 50, 40 L 150, 40
                    M 50, 100 L 150, 100
                    M 50, 160 L 150, 160"  
                    stroke="#fafafa"
                    strokeWidth={18}
                    strokeLinecap="round"
                />
            </svg>
            <svg className="bg-white/2" width={600} height={600} viewBox="0 0 400 400" fill="none">
                <path id='track'
                    d="M40, 200 C 10, 10 190, 190 190, 40"  
                    stroke="#fafafa"
                    strokeWidth={0}
                    strokeLinecap="round"
                /> 
                {/* <circle style={{offsetPath: 'url(#track)'}} className='ball' cx='10' cy='10' r='10' fill="red"/> */}
                <text fontSize={24} class='ball' fill="red">
                    <textPath href="#track" startOffset='0%'>
                        hello
                        <animate
                            attributeName="startOffset"
                            from='0%'
                            to='100%'
                            dur='6s'
                            repeatCount='indefinite'
                        />
                    </textPath>
                </text>
            </svg>
        </div>
    )
}