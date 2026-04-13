import ProgressiveBlur from "../ui/progressive_blur"
import { useLocation, useNavigate } from "react-router"
import { scrollDefaults } from "../../constants";
import { useCursor } from "../../hooks/use_cursor";
import { useState } from "react";
import "./mobile_navigation_bar.css"




export default function NavigationBar() {
    const navigate = useNavigate();
    const location = useLocation();



    // const scrollToInitial = () => {
    //     window.scrollTo(
    //         {
    //             top: 0,
    //             behavior: 'smooth'
    //         }
    //     )
    // }

    const [isDocked, setIsDocked] = useState(false);

    const handleNavigation = (path: string, section?: string) => {
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

    return (
        <>

            <nav className=" p-2 w-full px-[calc(50vw-720px+3rem)]  fixed flex mx-auto justify-between top-0 z-50">
                <ProgressiveBlur direction="top" intensity={32} offset={55} className="h-[calc(100%+3.5rem)]! " />
                <button onClick={() => handleNavigation("/", "home-section-id")}   {...cursorOnHover}>
                    <h1 className="p-2 mx-2 hover:backdrop-blur-xs font-semibold text-text  rounded-xl hover:text-accent-1 hover:bg-accent-2/10  animate-[SlideDown_0.5s_cubic-bezier(0.75,0.63,0.13,0.83)_both_2.5s]">RFLAMOSTE</h1>
                </button>
                <div className="mx-1 relative max-mobile:hidden">
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
                <div className=" relative hidden max-mobile:block">
                    <button className="m-2 mr-3 size-6   grid place-content-center" onClick={() => setIsDocked(true)}>
                        <svg width="20" height="20" className="stroke-text" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 6.5H18" strokeWidth="2" />
                            <path d="M6 14L18 14" strokeWidth="2" />
                        </svg>
                    </button>
                </div>
                {
                    isDocked &&
                    <>
                        <div className="absolute w-screen p-2 gap-2 flex flex-col left-0 top-0 h-screen bg-bg/25 mobile-nav">
                            <button className={`bg-text origin-top-right size-full    animate-[scaleIn_0.15s_ease-in-out_backwards_0.05s]  rounded-4xl`}>
                                <h1 className="font-bold uppercase text-4xl  animate-[SlideDown_0.3s_ease-out_backwards_0.1s] text-bg">About</h1>
                            </button>
                            <button className={`bg-text origin-top-right size-full    animate-[scaleIn_0.15s_ease-in-out_backwards_0.1s] rounded-4xl`}>
                                <h1 className="font-bold uppercase text-4xl  animate-[SlideDown_0.3s_ease-out_backwards_0.15s] text-bg">Skills</h1>

                            </button>
                            <button className={`bg-text origin-top-right size-full    animate-[scaleIn_0.15s_ease-in-out_backwards_0.15s] rounded-4xl`}>
                                <h1 className="font-bold uppercase text-4xl  animate-[SlideDown_0.3s_ease-out_backwards_0.2s] text-bg">Projects</h1>

                            </button>
                            <button className={`bg-text origin-top-right size-full    animate-[scaleIn_0.15s_ease-in-out_backwards_0.2s] rounded-4xl`}>
                                <h1 className="font-bold uppercase text-4xl  animate-[SlideDown_0.3s_ease-out_backwards_0.25s] text-bg">Contact</h1>

                            </button>
                            {/* <div className={`bg-text   size-0 ${isDocked ? "size-full" : ""} duration-150 delay-100 rounded-4xl`}></div>
                        <div className={`bg-text   size-0 ${isDocked ? "size-full" : ""} duration-150 delay-150 rounded-4xl`}></div>
                        <div className={`bg-text   size-0 ${isDocked ? "size-full" : ""} duration-150 delay-200  0 rounded-4xl`}></div> */}
                        </div>
                    </>
                }

            </nav>
        </>
    )


}