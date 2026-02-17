import type React from "react"
import ProgressiveBlur from "../ui/progressive_blur"



const scrollDetails: ScrollIntoViewOptions = {
    behavior: 'smooth',
    block: 'start'
}


export default function NavigationBar(props: {
    SectionProjectsRef: React.RefObject<HTMLDivElement | null>,
    SectionSkillsRef: React.RefObject<HTMLDivElement | null>,
    SectionAboutRef: React.RefObject<HTMLDivElement | null>,
    SectionContactRef: React.RefObject<HTMLDivElement | null>
}) {

    const scrollToInitial = () => {
        window.scrollTo(
            {
                top: 0,
                behavior: 'smooth'
            }
        )
    }

    const scrollToProjects = () => {
        props.SectionProjectsRef.current?.scrollIntoView(scrollDetails);
    }

    const scrollToSkills = () => {
        props.SectionSkillsRef.current?.scrollIntoView(scrollDetails);
    }

    const scrollToAbout = () => {
        props.SectionAboutRef.current?.scrollIntoView(scrollDetails);
    }

    const scrollToContact = () => {
        props.SectionContactRef.current?.scrollIntoView(scrollDetails);
    }


    return (
        <nav className="p-2 w-full px-[calc(50vw-720px+3rem)]  sticky flex mx-auto justify-between top-0 z-50">
            <ProgressiveBlur direction="top" intensity={32} offset={80} className="h-[calc(100%+2rem)]! "/>
            <button onClick={scrollToInitial}>
                <h1 className="p-2 mx-2 hover:backdrop-blur-sm backdrop-contrast-50 font-semibold text-text cursor-pointer rounded-xl hover:text-accent-1 hover:bg-accent-2/10  animate-[SlideDown_0.5s_cubic-bezier(0.75,0.63,0.13,0.83)_both_2.5s]">RFLAMOSTE.DEV</h1>
            </button>
            <div className="mx-1">
                <button onClick={scrollToProjects}>
                    {/* Add something like icon upon hover */}
                    <h1 className="p-2 mx-1 hover:backdrop-blur-sm font-semibold text-text cursor-pointer rounded-xl hover:text-accent-1 hover:bg-accent-2/10  animate-[SlideDown_0.5s_cubic-bezier(0.75,0.63,0.13,0.83)_both_2.6s]">Projects</h1>
                </button>
                <button onClick={scrollToSkills}>
                    <h1 className="p-2 mx-1  hover:backdrop-blur-sm font-semibold text-text cursor-pointer rounded-xl hover:text-accent-1 hover:bg-accent-2/10  animate-[SlideDown_0.5s_cubic-bezier(0.75,0.63,0.13,0.83)_both_2.7s]">Skills</h1>
                </button>
                <button onClick={scrollToAbout}>
                    <h1 className="p-2 mx-1  hover:backdrop-blur-sm font-semibold text-text cursor-pointer rounded-xl hover:text-accent-1 hover:bg-accent-2/10  animate-[SlideDown_0.5s_cubic-bezier(0.75,0.63,0.13,0.83)_both_2.8s]">About</h1>
                </button>
                <button onClick={scrollToContact}>
                    <h1 className="p-2 mx-1  hover:backdrop-blur-sm font-semibold text-text cursor-pointer rounded-xl hover:text-accent-1 hover:bg-accent-2/10  animate-[SlideDown_0.5s_cubic-bezier(0.75,0.63,0.13,0.83)_both_2.9s]">Contact</h1>
                </button>
            </div>
        </nav>
    )


}