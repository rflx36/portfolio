import ProgressiveBlur from "../ui/progressive_blur"
import { useLocation, useNavigate } from "react-router"
import { scrollDefaults } from "../../constants";
import { useCursor } from "../../hooks/use_cursor";
import { useEffect, useState } from "react";
import "./mobile_navigation_bar.css"
import ToggleNavigation from "../ui/toggle/navigation";
import isMobile from "../../utils/is_mobile";




export default function NavigationBar() {
    const navigate = useNavigate();
    const location = useLocation();



    const [isDocked, setIsDocked] = useState(false);
    const [elementsInitialized, setElementsInitialized] = useState(false);
    const [isAtTop, setIsAtTop] = useState(true)

    const handleNavigation = (path: string, section?: string) => {
        if (isDocked) {
            setIsDocked(false);
        }

        if (location.pathname == path) {

            if (section) {
                document.getElementById(section)?.scrollIntoView(scrollDefaults)
            }
        }
        else {


            navigate(path, {
                state: { scrollTo: section }
            })

        }
    }

    const cursorOnHover = useCursor({ type: "pointer" })

    useEffect(() => {


        const InitializeElements = setTimeout(() => {
            setElementsInitialized(isDocked)
        }, 50);

        const handleScroll = () => {
            if (window.scrollY >= 350 || window.scrollY <= 250) {
                return;
            }

            const scrollPastLimit = window.scrollY >= 300;

            setIsAtTop(!scrollPastLimit);


        }

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            clearTimeout(InitializeElements);
            window.removeEventListener("scroll", handleScroll);
        }
    }, [isDocked])

    return (
        <>

            <nav className=" p-2 w-full px-[calc(50vw-720px+3rem)] pointer-events-none  fixed flex mx-auto justify-between top-0 z-50">

                <ProgressiveBlur direction="top" intensity={32} offset={55} className="h-[calc(100%+3.5rem)]! select-none pointer-events-none" />

                {
                    (((location.pathname == "/" && !isAtTop) || location.pathname != "/") || !isMobile()) &&
                    <button className="pointer-events-auto" onClick={() => handleNavigation("/", "home-section-id")}   {...cursorOnHover}>
                        <h1 className={`p-2  origin-top-left mx-2 hover:backdrop-blur-xs font-semibold text-text  rounded-xl hover:text-accent-1 hover:bg-accent-2/10  animate-[SlideDown_0.5s_cubic-bezier(0.75,0.63,0.13,0.83)_both_2.5s] max-mobile:animate-[SlideDown_0.5s_cubic-bezier(0.75,0.63,0.13,0.83)_both]`}>RFLAMOSTE</h1>
                    </button>
                }
                <div className="mx-1 relative max-mobile:hidden pointer-events-auto">
                    <div className="aspect-video h-auto w-full  absolute "></div>
                    <button onClick={() => handleNavigation("/projects")} className="focus:bg-accent-1 text-text"   {...cursorOnHover}>
                        {/* Add something like icon upon hover */}
                        <h1 className="p-2 mx-1 max-tablet:mx-0 max-tablet:text-sm hover:backdrop-blur-xs font-semibold text-text  rounded-xl hover:text-accent-1 hover:bg-accent-2/10  animate-[SlideDown_0.5s_cubic-bezier(0.75,0.63,0.13,0.83)_both_2.6s]">Projects</h1>

                    </button>
                    <button onClick={() => handleNavigation("/", "skills-section-id")}   {...cursorOnHover}>
                        <h1 className="p-2 mx-1 max-tablet:mx-0 max-tablet:text-sm  hover:backdrop-blur-xs font-semibold text-text  rounded-xl hover:text-accent-1 hover:bg-accent-2/10  animate-[SlideDown_0.5s_cubic-bezier(0.75,0.63,0.13,0.83)_both_2.7s]">Skills</h1>
                    </button>
                    <button onClick={() => handleNavigation("/about")}   {...cursorOnHover}>
                        <h1 className="p-2 mx-1 max-tablet:mx-0 max-tablet:text-sm  hover:backdrop-blur-xs font-semibold text-text  rounded-xl hover:text-accent-1 hover:bg-accent-2/10  animate-[SlideDown_0.5s_cubic-bezier(0.75,0.63,0.13,0.83)_both_2.8s]">About</h1>
                    </button>
                    <button onClick={() => handleNavigation("/", "contact-section-id")}   {...cursorOnHover}>
                        <h1 className="p-2 mx-1 max-tablet:mx-0 max-tablet:text-sm  hover:backdrop-blur-xs font-semibold text-text  rounded-xl hover:text-accent-1 hover:bg-accent-2/10  animate-[SlideDown_0.5s_cubic-bezier(0.75,0.63,0.13,0.83)_both_2.9s]">Contact</h1>
                    </button>
                </div>
                <div className=" absolute right-0 pointer-events-auto top-0 z-50 hidden max-mobile:block">

                    <ToggleNavigation isChecked={isDocked} onClick={(e) => setIsDocked(e)} className="mt-1 " />
                </div>
                {
                    isDocked &&

                    <div className="pointer-events-auto absolute not-max-mobile:hidden  w-screen h-dvh flex flex-col left-0 top-0 mobile-nav-container">
                        <div className="w-full h-1/3 flex items-center gap-2 pb-4 flex-col-reverse aspect-square  mx-auto">
                            <h1 className={`font-semibold mobile-nav-name ease-bezier-in delay-100 duration-1500 ${elementsInitialized ? "text-text" : "text-accent-1"}`}>Roland Fonz Lamoste</h1>
                            <button onClick={() => handleNavigation("/", "home-section-id")} className="size-[100px] bg-bg p-0.5 shadow-2xl rounded-full overflow-hidden animate-[scaleIn_0.3s_cubic-bezier(0.65,0.56,0.27,0.86)_backwards]">
                                <img src="/assets/profile.png" className=" size-full rounded-full object-cover " />
                            </button>
                        </div>
                        <div className="grow flex flex-col justify-center gap-2 p-2 items-center">

                            <button className="relative text-text flex-1 w-full mobile-nav-button" onClick={() => handleNavigation("/about")}>
                                {/* <div className=" bg-accent-3 " style={{ animationDelay: "0.1s" }} /> */}
                                {/* <div className=" bg-accent-2 " style={{ animationDelay: "0.2s" }} /> */}
                                {/* <div className=" bg-accent-1 " style={{ animationDelay: "0.3s" }} /> */}
                                <div className={` bg-text grid place-content-center delay-300 duration-1500 transition-colors  ease-bezier-in ${elementsInitialized ? " text-bg" : " text-accent-1"}`} style={{ animationDelay: "0.32s" }} >
                                    <h1 className="text-2xl uppercase font-bold">About</h1>
                                </div>
                            </button>
                            <button className="relative text-text flex-1 w-full mobile-nav-button" onClick={() => handleNavigation("/", "skills-section-id")}>

                                {/* <div className=" bg-accent-3 " style={{ animationDelay: "0.25s" }} /> */}
                                {/* <div className=" bg-accent-2 " style={{ animationDelay: "0.35s" }} /> */}
                                {/* <div className=" bg-accent-1 " style={{ animationDelay: "0.45s" }} /> */}
                                <div className={` bg-text grid place-content-center delay-450 duration-1500 transition-colors ease-bezier-in ${elementsInitialized ? " text-bg" : "text-accent-1"}`} style={{ animationDelay: "0.47s" }}>
                                    <h1 className="text-2xl uppercase font-bold">Skills</h1>
                                </div>
                            </button>
                            <button className="relative text-text flex-1 w-full  mobile-nav-button" onClick={() => handleNavigation("/projects")}>

                                {/* <div className=" bg-accent-3 " style={{ animationDelay: "0.4s" }} /> */}
                                {/* <div className=" bg-accent-2 " style={{ animationDelay: "0.5s" }} /> */}
                                {/* <div className=" bg-accent-1 " style={{ animationDelay: "0.6s" }} /> */}
                                <div className={` bg-text grid place-content-center delay-600 duration-1500 transition-colors  ease-bezier-in ${elementsInitialized ? " text-bg" : "text-accent-1"}`} style={{ animationDelay: "0.62s" }}>
                                    <h1 className="text-2xl uppercase font-bold">Projects</h1>
                                </div>
                            </button>
                            <button className="relative text-text flex-1 w-full mobile-nav-button" onClick={() => handleNavigation("/contact", "contact-section-id")}>

                                {/* <div className=" bg-accent-3 " style={{ animationDelay: "0.55s" }} /> */}
                                {/* <div className=" bg-accent-2 " style={{ animationDelay: "0.65s" }} /> */}
                                {/* <div className=" bg-accent-1 " style={{ animationDelay: "0.75s" }} /> */}
                                <div className={` bg-text grid place-content-center delay-750 duration-1500 transition-colors  ease-bezier-in ${elementsInitialized ? " text-bg" : "text-accent-1"}`} style={{ animationDelay: "0.77s" }}>
                                    <h1 className="text-2xl uppercase font-bold">Contact</h1>
                                </div>
                            </button>
                        </div>
                    </div>
                }

            </nav>
        </>
    )


}