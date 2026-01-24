
import NameIntroduction from "./components/name introduciton"
import SpecializationIntroduction from "./components/specialization introduction"
import { HoverGif } from "./components/hover_gif"
import LandingContacts from "./components/landing contacts"
import NavigationBar from "./components/navigation bar"
import { useRef } from "react"
import SkillsSection from "./components/skills sections"


function App() {

  const sectionProjectsRef = useRef<HTMLDivElement>(null);
  const sectionSkillsRef = useRef<HTMLDivElement>(null);
  const sectionAboutRef = useRef<HTMLDivElement>(null);
  const sectionContactRef = useRef<HTMLDivElement>(null);



  return (
    <div className="">
      <NavigationBar
        SectionProjectsRef={sectionProjectsRef}
        SectionSkillsRef={sectionSkillsRef}
        SectionAboutRef={sectionAboutRef}
        SectionContactRef={sectionContactRef}
      />
      <div className="h-[700px] max-h-[calc(80vh)] flex flex-col sm:justify-center items-center relative">
        <NameIntroduction />
        <SpecializationIntroduction />
        <div className="mt-8">
          <HoverGif
            staticSrc="/assets/ph_flag.png"
            animatedSrc="/assets/ph_flag_anim.gif"
            className="[image-rendering:pixelated] [image-rendering:crisp-edges] "
          />
        </div>
        <LandingContacts />
      </div>
      {/* <TestComponent/> */}
      <div className="h-screen w-full bg-accent-1" />
      <SkillsSection/>
    </div>

  )
}

export default App
