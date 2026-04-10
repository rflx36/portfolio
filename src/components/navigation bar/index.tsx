import type React from "react"
import ProgressiveBlur from "../ui/progressive_blur"
import { useLocation, useNavigate } from "react-router"
import { scrollDefaults } from "../../constants";
import { useEffect } from "react";
import { useCursorStore } from "../../stores/cursor_store";
import { useCursor } from "../../hooks/use_cursor";





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


    const handleNavigation = (path: string, section?: string) => {
        if (location.pathname == path) {

            if (section) {
                document.getElementById(section)?.scrollIntoView(scrollDefaults)
            }
        }
        else {

            if (path == "/") {
                navigate(path);
            }
            else {

                navigate(path, {
                    state: { scrollTo: section }
                })
            }
        }
    }

    const cursorOnHover = useCursor({ type: "pointer" })

    return (
        <>

            <nav className=" p-2 w-full px-[calc(50vw-720px+3rem)]  fixed flex mx-auto justify-between top-0 z-50">
                <ProgressiveBlur direction="top" intensity={32} offset={55} className="h-[calc(100%+3.5rem)]! " />
                <button onClick={() => handleNavigation("/", "home-section-id")}   {...cursorOnHover}>
                    <h1 className="p-2 mx-2 hover:backdrop-blur-xs font-semibold text-text  rounded-xl hover:text-accent-1 hover:bg-accent-2/10  animate-[SlideDown_0.5s_cubic-bezier(0.75,0.63,0.13,0.83)_both_2.5s]">RFLAMOSTE.DEV</h1>
                </button>
                <div className="mx-1 relative ">
                    <div className="aspect-video h-auto w-full  absolute "></div>
                    <button onClick={() => handleNavigation("/projects")} className="focus:bg-accent-1 text-text"   {...cursorOnHover}>
                        {/* Add something like icon upon hover */}
                        <h1 className="p-2 mx-1 hover:backdrop-blur-xs font-semibold text-text  rounded-xl hover:text-accent-1 hover:bg-accent-2/10  animate-[SlideDown_0.5s_cubic-bezier(0.75,0.63,0.13,0.83)_both_2.6s]">Projects</h1>

                    </button>
                    <button onClick={() => handleNavigation("/", "skills-section-id")}   {...cursorOnHover}>
                        <h1 className="p-2 mx-1  hover:backdrop-blur-xs font-semibold text-text  rounded-xl hover:text-accent-1 hover:bg-accent-2/10  animate-[SlideDown_0.5s_cubic-bezier(0.75,0.63,0.13,0.83)_both_2.7s]">Skills</h1>
                    </button>
                    <button onClick={() => handleNavigation("/about")}   {...cursorOnHover}>
                        <h1 className="p-2 mx-1  hover:backdrop-blur-xs font-semibold text-text  rounded-xl hover:text-accent-1 hover:bg-accent-2/10  animate-[SlideDown_0.5s_cubic-bezier(0.75,0.63,0.13,0.83)_both_2.8s]">About</h1>
                    </button>
                    <button onClick={() => handleNavigation("/", "contact-section-id")}   {...cursorOnHover}>
                        <h1 className="p-2 mx-1  hover:backdrop-blur-xs font-semibold text-text  rounded-xl hover:text-accent-1 hover:bg-accent-2/10  animate-[SlideDown_0.5s_cubic-bezier(0.75,0.63,0.13,0.83)_both_2.9s]">Contact</h1>
                    </button>
                </div>
            </nav>
        </>
    )


}