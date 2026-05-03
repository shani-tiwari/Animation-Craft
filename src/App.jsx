// import CustomSVG from "./components/CustomSVG";
// import MenuBar from "./components/MenuBar";
// import WavyUnderline from "./components/WavyUnderline";
// import MacFlip from "./components/MannuPaaji/MacFlip";
import GooeyEffect from "./components/MannuPaaji/GooeyEffect";
import ScaleLines from "./components/MannuPaaji/ScaleLines";

function App() {

  return (
    <>
      <main className="h-screen w-screen bg-black/60 flex items-center justify-center">

        {/* Animated Menu Bar */}
          {/* <MenuBar /> */}

        {/* wavy text underline animation */}
          {/* <WavyUnderline /> */}

        {/* custom styled animated svg */}
          {/* <CustomSVG/> */}

        {/* mac flip animation */}
          {/* <MacFlip/> */}
        
        {/* scale lines */}
        {/* <ScaleLines/> */}

        {/* gooey effect */}
        <GooeyEffect/>

      </main>
    </>
  );
}

export default App;
