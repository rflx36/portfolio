
import NameIntroduction from "./components/name introduciton"
import SpecializationIntroduction from "./components/specialization introduction"
import { HoverGif } from "./components/hover_gif"
import LandingContacts from "./components/landing contacts"
import NavigationBar from "./components/navigation bar"
import { useRef } from "react"
import SkillsSection from "./components/skills section"
import BackgroundSection from "./components/background section"
import ProjectsSection from "./components/projects section"
import { useModalStore } from "./stores/modal_store"
import ProjectsModal from "./components/projects section/projects_modal"


function App() {
  const modalState = useModalStore();
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
      <ProjectsSection />
      <SkillsSection />
      <BackgroundSection />
      {
        modalState.get.activeModal != null &&
        (
          <div className="w-full h-full top-0 left-0 right-0 z-55 grid place-content-center fixed">
            <div className="w-full h-full bg-black opacity-20 z-56 absolute animate-[fadeInQuadrant_0.5s_cubic-bezier(0.130,0.835,0.130,0.830)_forwards]" />
            <div className="z-60">
              {(modalState.get.activeModal == "projects") && <ProjectsModal/>}
            </div>
          </div>
        )
      }

    </div>

  )
}

export default App
