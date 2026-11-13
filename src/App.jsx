import WorksSlider from "./components/awwards/WorksSlider";





function App() {
  return (
    <>
      <main className="relative w-full h-screen bg-black/90 flex gap-4 items-center justify-center">

        <WorksSlider />
        {/* <svg  viewBox='0 0 350 130'>
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