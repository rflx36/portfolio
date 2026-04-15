
import NameIntroduction from "./components/name introduciton"
import SpecializationIntroduction from "./components/specialization introduction"
import { useEffect } from "react"
import SkillsSection from "./components/skills section"
import BackgroundSection from "./components/background section"
import ProjectsSection from "./components/projects section"
import { useModalStore } from "./stores/modal_store"
import LandingContacts from "./components/contact section/landing contacts"
import ContactSection from "./components/contact section"
import { useInView } from "react-intersection-observer"
import ProcessSection from "./components/process section"
import ModalProjects from "./components/ui/modal/modal projects"
import { useLocation, useNavigate } from "react-router"
import { scrollDefaults } from "./constants"
import isMobile from "./utils/is_mobile"


function App() {
  const modalState = useModalStore();
  const location = useLocation();
  const navigate = useNavigate();

  const [projectsRef, projectsInView] = useInView({ threshold: 1 });



  useEffect(() => {
    if (location.state?.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) {
        section.scrollIntoView(scrollDefaults)
      }
      navigate(location.pathname, { replace: true });
    }
  }, [])

  return (
    <>
      {/* <CustomCursor/> */}
      {/* <StarField /> */}
      <section id="home-section-id" className=" h-[900px] max-h-[calc(85vh)] max-mobile:max-h-[640px]  max-mobile:h-[calc(100vh-200px)] max-mobile:min-h-[420px] max-tablet:min-h-[400px] flex flex-col max-mobile:mt-24  max-mobile:justify-start justify-center  items-center relative">
        <NameIntroduction />
        <SpecializationIntroduction />
       

        <div className="absolute bottom-0 w-[calc(100%-2rem)] max-w-270 flex flex-col items-center">
          <div className="h-max overflow-hidden w-full">

            <div className={` duration-300 ease-in-out ${(projectsInView && !isMobile())  && "translate-y-full"}`}>
              <LandingContacts />
            </div>
          </div>
          <div className="w-full h-[0.0625rem] relative opacity-0 animate-[fadeIn_0.5s_cubic-bezier(0.130,0.835,0.130,0.830)_forwards_2.5s]">
            <div className="bg-text/25 w-full h-full " />
            <div className=" bg-linear-to-r from-bg/0 to-bg w-[25%] max-w-32 h-2 z-10 absolute right-0 top-0 bottom-0 -translate-y-1/2" />
            <div className=" bg-linear-to-r from-bg to-bg/0 w-[25%] max-w-32 h-2 z-10 absolute left-0 top-0 bottom-0 -translate-y-1/2" />
          </div>
          <div className="w-full h-8 flex max-mobile:hidden justify-center overflow-hidden">
            <h1 className={`text-text font-bold text-xl ease-in-out py-2 duration-300 ${!projectsInView && "-translate-y-full"}`}>SELECTED PROJECTS</h1>
          </div>

        </div>

      </section>
      <section ref={projectsRef} >
        <ProjectsSection />
      </section>
      <SkillsSection />
      <BackgroundSection />
      <ProcessSection />
      <ContactSection />
     



      {
        modalState.get.activeModal != null &&
        (
          <div className="w-full h-full top-0 left-0 right-0 z-55 grid place-content-center fixed">
            <div className="w-full h-full bg-black opacity-20 z-56 absolute animate-[fadeInQuadrant_0.5s_cubic-bezier(0.130,0.835,0.130,0.830)_forwards]" />
            <div className="z-60 w-full h-full absolute flex justify-center items-center">
              {(modalState.get.activeModal == "projects") && <ModalProjects />}
            </div>
          </div>
        )
      }
    </>

  )
}

export default App
