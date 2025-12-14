
import NameIntroduction from "./components/name introduciton"
import SpecializationIntroduction from "./components/specialization introduction"
import { HoverGif } from "./components/hover_gif"
import LandingContacts from "./components/landing contacts"


function App() {

  return (
    <div className="">
      <div className="h-screen flex flex-col sm:justify-center items-center relative">
        <NameIntroduction />
        <SpecializationIntroduction />
        <div className="mt-8">
          <HoverGif
            staticSrc="/assets/ph_flag.png"
            animatedSrc="/assets/ph_flag_anim.gif"
            className="[image-rendering:pixelated] [image-rendering:crisp-edges] "
          />
        </div>
        <LandingContacts/>
      </div>
      {/* <TestComponent/> */}
      <div className="h-screen w-full bg-accent-1"/>
    </div>

  )
}

export default App
