
import NameIntroduction from "./components/name introduciton"
import SpecializationIntroduction from "./components/specialization introduction"
import { HoverGif } from "./components/hover_gif"
import NavigationBar from "./components/navigation bar"
import { useRef } from "react"
import SkillsSection from "./components/skills section"
import BackgroundSection from "./components/background section"
import ProjectsSection from "./components/projects section"
import { useModalStore } from "./stores/modal_store"
import ProjectsModal from "./components/projects section/projects_modal"
import LandingContacts from "./components/contact section/landing contacts"
import ContactSection from "./components/contact section"
import { useInView } from "react-intersection-observer"
import ProcessSection from "./components/process section"
import Footer from "./components/footer"


function App() {
  const modalState = useModalStore();
  const sectionProjectsRef = useRef<HTMLDivElement>(null);
  const sectionSkillsRef = useRef<HTMLDivElement>(null);
  const sectionAboutRef = useRef<HTMLDivElement>(null);
  const sectionContactRef = useRef<HTMLDivElement>(null);

  const [projectsRef, projectsInView] = useInView({ threshold: 1 });

  return (
    <>
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

        <div className="absolute bottom-0 w-[calc(100%-2rem)] max-w-270 flex flex-col items-center">
          <div className="h-max overflow-hidden w-full">

            <div className={` duration-300 ease-in-out ${projectsInView && "translate-y-full"}`}>
              <LandingContacts />
            </div>
          </div>
          <div className="w-full h-[0.0625rem] relative">
            <div className="bg-text/25 w-full h-full " />
            <div className=" bg-linear-to-r from-bg/0 to-bg w-[25%] max-w-32 h-2 z-10 absolute right-0 top-0 bottom-0 -translate-y-1/2" />
            <div className=" bg-linear-to-r from-bg to-bg/0 w-[25%] max-w-32 h-2 z-10 absolute left-0 top-0 bottom-0 -translate-y-1/2" />
          </div>
          <div className="w-full h-8 flex justify-center overflow-hidden">
            <h1 className={`text-text font-bold text-xl ease-in-out py-2 duration-300 ${!projectsInView && "-translate-y-full"}`}>SELECTED PROJECTS</h1>
          </div>

        </div>
      </div>
      <section ref={projectsRef} >
        <ProjectsSection />
      </section>
      <SkillsSection />
      <BackgroundSection />
      <ProcessSection />
      <ContactSection />
      <Footer/>
      {
        modalState.get.activeModal != null &&
        (
          <div className="w-full h-full top-0 left-0 right-0 z-55 grid place-content-center fixed">
            <div className="w-full h-full bg-black opacity-20 z-56 absolute animate-[fadeInQuadrant_0.5s_cubic-bezier(0.130,0.835,0.130,0.830)_forwards]" />
            <div className="z-60 w-full h-full absolute">
              {(modalState.get.activeModal == "projects") && <ProjectsModal />}
            </div>
          </div>
        )
      }
    </>

  )
}

export default App
