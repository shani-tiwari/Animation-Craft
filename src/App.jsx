import NavBarSlide from "./components/tom/NavBarSlide";







function App() {
 return (
    <>
      <main className="w-full min-h-screen bg-white  p-4">
        <NavBarSlide/>
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