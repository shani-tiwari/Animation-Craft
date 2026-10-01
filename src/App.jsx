
import BubbleText from './components/tom/BubbleText'






function App() {
 return (
    <>
      <main className="w-full h-screen bg-black flex items-center justify-center">
        {/* <BubbleText /> */}

        {/* <span className='text-7xl font-bold text-white' 
          style={{ filter: "url(#material)"}}>
            Mike Bespalov
        </span> */}

        <svg  viewBox='0 0 350 130'>
          <defs>

            <linearGradient id='stripe' x2='486' spreadMethod='repeat'>
              <stop stopColor='#fff' offset='0.3' />
              <stop stopColor='#000000' offset='.5' />
              <stop stopColor='#ffffff' offset='1' />
              <animateTransform type='translate' attributeName='gradientTransform' to='486 0' dur='4.4s' repeatCount='indefinite'/>
            </linearGradient>

            <filter id='material'>
              <feGaussianBlur SourceGraphic='SourceAlpha' stdDeviation='4.5' />
              <feComposite in2='SourceAlpha' operator='arithmetic'k2='-1' k3='1' />
              <feBlend in='SourceGraphic' mode='overlay' />
            </filter>

            <filter id='color'>
              <feGaussianBlur stdDeviation='7.3' />
              <feTurbulence baseFrequency='4' />
              <feComponentTransfer>
                <feFuncR type='table' tableValues='0'/>
                <feFuncG type='table' tableValues='0'/>
                <feFuncB type='table' tableValues='0'/>
              </feComponentTransfer>
            </filter>

          </defs>
              <g filter='url(#color)'>
                <path d='M0 2.7h59.4c13.1 0 23.3 3.3'
                 filter='url(#material)' fill='url(#stripe)'/>
              </g>
        </svg>

      {/* claude */}
          <svg viewBox="0 0 900 130" className="w-full max-w-4xl">
            <defs>
              <linearGradient
                id="stripe"
                gradientUnits="userSpaceOnUse"
                x1="0" y1="0" x2="486" y2="0"
                spreadMethod="repeat"
              >
                <stop offset="0" stopColor="#fff" />
                <stop offset=".5" stopColor="#000" />
                <stop offset="1" stopColor="#fff" />
                <animateTransform
                  attributeName="gradientTransform"
                  type="translate"
                  from="0 0"
                  to="486 0"
                  dur="4.4s"
                  repeatCount="indefinite"
                />
              </linearGradient>

              <filter id="material" x="-5%" y="-20%" width="110%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="4.5" result="blur" />
                <feComposite
                  in="blur" in2="SourceAlpha"
                  operator="arithmetic" k2="-1" k3="1"
                  result="inner"
                />
                <feBlend in="SourceGraphic" in2="inner" mode="overlay" />
              </filter>
            </defs>

            <text
              x="0" y="95"
              fontSize="90" fontWeight="700"
              fill="url(#stripe)"
              filter="url(#material)"
            >
              Mike Bespalov
            </text>
          </svg>

      {/* glowing text */}
        {/* <svg width="0" height="0" className="absolute">
          <defs>
            <filter id="material">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="4.5"
                result="blur"
              />

              <feComposite
                in="SourceGraphic"
                in2="blur"
                operator="arithmetic"
                k2="-1"
                k3="0.5"
                result="material"
              />

              <feBlend
                in="SourceGraphic"
                in2="material"
                mode="overlay"
              />
            </filter>
          </defs>
        </svg> */}

      </main>
    </>
  );
}

export default App;


// aurora effect

/* const colors = ['#0727ff', '#dd335c', '#50d5dc', '#02ac17'];
  const color = useMotionValue(colors[0]);
  const backgroundImage = useMotionTemplate`radial-gradient(100% 100% at 50% 0%, #020617 0%, ${color} 50%)`;
  
  useEffect(() => {
    const controls = animate(color, colors, {
      duration: 10,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
    });

    return () => controls.stop();
  }); */