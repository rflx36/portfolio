
import { Suspense, useEffect, useState } from "react"
import NameIntroduction from "./components/name introduciton"
import SpecializationIntroduction from "./components/specialization introduction"
import ProjectsSection from "./components/projects section"
import LandingContacts from "./components/contact_section/landing contacts"
// import ContactSection from "./components/contact section"
import { useInView } from "react-intersection-observer"
// import ProcessSection from "./components/process section"
import { useLocation, useNavigate } from "react-router"
import { scrollDefaults } from "./constants"
import isMobile from "./utils/is_mobile"
import useAdaptiveScroll from "./hooks/use_adaptive_scroll"
import lazyImport from "./lazy_import"
import ShadowRays from "./components/ui/shadowrays"
// import PathNodeVisualizer from "./components/ui/path node/visualizer"


const BackgroundSection = lazyImport("./components/background_section");
const SkillsSection = lazyImport("./components/skills_section");
const ProcessSection = lazyImport("./components/process_section");
const ContactSection = lazyImport("./components/contact_section");

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [projectsRef, projectsInView] = useInView({ threshold: 1 });
  const [introductionLoaded, setIntroductionLoaded] = useState(false);



  const hasScrolled = useAdaptiveScroll("use once", 200);

  useEffect(() => {


    
    const redirectTimeout = setTimeout(()=>{

      if (location.state?.scrollTo) {
        
        const section = document.getElementById(location.state.scrollTo);
        if (section) {
          section.scrollIntoView();
        }
        
        navigate(location.pathname, { replace: true });
      }
    },1000)

    const introTimeout = setTimeout(() => {
      setIntroductionLoaded(true);
    }, 2900);


    return () => {
      clearTimeout(redirectTimeout);
      clearTimeout(introTimeout)
    }
  }, []);
  // const projectSectionRef = !isMobile() ? {
  //   ref: projectsRef
  // } : {}

  return (
    <>
      {/* <CustomCursor/> */}
      {/* <StarField /> */}
      {!isMobile() && <ShadowRays />}
      <section id="home-section-id" className=" h-[900px] max-h-[calc(85vh)] max-mobile:max-h-[640px]  max-mobile:h-[calc(100vh-160px)]  max-mobile-tablet-threshold:min-h-[400px] max-mobile:min-h-[556px]! flex flex-col max-mobile:pt-24  max-mobile:justify-start justify-center  items-center relative">
        {/* <ShadowRays className="h-full absolute top-0 w-full -z-20" ></ShadowRays> */}
        <NameIntroduction />
        <SpecializationIntroduction />


        <div className="absolute bottom-0 w-[calc(100%-2rem)] max-w-270 flex flex-col items-center">
          <div className="h-max overflow-hidden w-full">

            <div className={` duration-300 ease-in-out ${(projectsInView && !isMobile()) && "translate-y-full"}`}>
              <LandingContacts />
            </div>
          </div>
          <div className="w-full h-[0.0625rem] relative opacity-0 animate-[fadeIn_0.5s_cubic-bezier(0.130,0.835,0.130,0.830)_forwards_2.5s]">
            <div className="bg-text/25 w-full h-full " />
            <div className=" bg-linear-to-r from-bg/0 to-bg w-[25%] max-w-32 h-2 z-10 absolute right-0 top-0 bottom-0 -translate-y-1/2" />
            <div className=" bg-linear-to-r from-bg to-bg/0 w-[25%] max-w-32 h-2 z-10 absolute left-0 top-0 bottom-0 -translate-y-1/2" />
          </div>
          <div className="w-full h-8   flex  justify-center overflow-hidden">
            <h1 className={`text-text font-bold text-xl max-mobile:text-lg ease-in-out py-2  duration-300 ${(!projectsInView || !introductionLoaded) && "-translate-y-full opacity-0"}`}>SELECTED PROJECTS</h1>
          </div>

        </div>

      </section>


      <section ref={projectsRef} id="project-featured-section-id">
        {
          (introductionLoaded || hasScrolled || !isMobile()) ?
            <div className={`max-mobile:animate-[SlideUpFadeIn_0.5s_ease-in-out_forwards]`}>

              <ProjectsSection />
            </div>
            :
            <>
              <div className="w-full  h-56" />
            </>
        }
      </section>
      <Suspense  fallback={<div className="bg-container-soft-shadow animate-pulse mx-auto my-4 rounded-xl size-20 h-auto max-mobile:w-[calc(100%-4rem)] aspect-square" />}>
        <SkillsSection />
      </Suspense>
      <Suspense fallback={<div className="bg-container-soft-shadow animate-pulse mx-auto my-4 rounded-xl size-20 h-auto max-mobile:w-[calc(100%-4rem)] aspect-square" />}>
        <BackgroundSection />
      </Suspense>
      <Suspense fallback={<div className="bg-container-soft-shadow animate-pulse mx-auto my-4 rounded-xl size-20 h-auto max-mobile:w-[calc(100%-4rem)] aspect-square" />}>
        <ProcessSection />
      </Suspense>
      <Suspense fallback={<div className="bg-container-soft-shadow animate-pulse mx-auto my-4 rounded-xl size-20 h-auto max-mobile:w-[calc(100%-4rem)] aspect-square" />}>
        <ContactSection />
      </Suspense>


      {/* <PathNodeVisualizer /> */}


    </>

  )
}

export default App
