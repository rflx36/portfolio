import { useEffect, useRef, useState } from "react"
import { type skillActiveStateType, type skillDataType } from "../../types/types"
import { activeRelativeSkillPositioningMap, skillActiveStateDefaults, skillDataDefaults } from "../../constants"
import "./skill_state_hovers.css"
import { useInView } from "react-intersection-observer";
import useResizeRegion from "../../hooks/use_resize_region";
import SkillsItemContainer from "./skills_item_container";



export default function SkillsSection() {

    const [skillsActiveState, setSkillsActiveState] = useState<skillActiveStateType>(skillActiveStateDefaults);
    const [skillDataState, setSkillDataState] = useState<skillDataType>(skillDataDefaults);

    const { ref, inView } = useInView({ triggerOnce: (window.innerWidth > 430), threshold: (window.innerWidth > 430) ? 0.5 : 0.1 })
    const scrollUpdateTick = useRef<boolean>(false);
    const scrollLastValue = useRef<number>(0);
    const scrollPauseUpdate = useRef<boolean>(false);
    const scrollPauseTimeout = useRef<boolean>(false);
    const resizeRegion = useResizeRegion();



    const fetchSkillsData = async () => {
        const response = await fetch("/skills.json");
        const data = await response.json();

        const formattedData: skillDataType = {
            design: data.Design,
            frontend: data.Frontend,
            backend: data.Backend,
            other: data.Other,
            isLoaded: true,
        }

        setSkillDataState(formattedData);
    }


    // console.log("render:" + inView);


    const updateActiveSkillValue = (value: skillActiveStateType, viaClick: boolean) => {
        scrollPauseUpdate.current = viaClick

        setSkillsActiveState(value);
        if (resizeRegion != "mobile") {
            return;
        }
        const container = document.getElementById("skill-state-container-id");
        switch (value) {
            case "design":
                container?.classList.remove("skill-card-container-frontend-active")
                container?.classList.remove("skill-card-container-backend-active")
                container?.classList.remove("skill-card-container-other-active")
                break;
            case "frontend":
                container?.classList.remove("skill-card-container-design-active")
                container?.classList.remove("skill-card-container-backend-active")
                container?.classList.remove("skill-card-container-other-active")
                break;
            case "backend":
                container?.classList.remove("skill-card-container-design-active")
                container?.classList.remove("skill-card-container-frontend-active")
                container?.classList.remove("skill-card-container-other-active")
                break;
            case "other":
                container?.classList.remove("skill-card-container-design-active")
                container?.classList.remove("skill-card-container-frontend-active")
                container?.classList.remove("skill-card-container-backend-active")
                break;

        }
        // container?.classList.remove(`skill-card-container-${skillsActiveState}-active`);
        container?.classList.add(`skill-card-container-${value}-active`);


    }

    const updateActiveSkillContainer = () => {

        if (resizeRegion != "mobile") {
            return;
        }

        // console.log("scroll:"+ window.scrollY);
        if (scrollPauseUpdate.current) {

            if (scrollPauseTimeout.current) {
                return;
            }

            scrollPauseTimeout.current = true;

            const scrollPause = setTimeout(() => {
                scrollPauseTimeout.current = false;
                scrollPauseUpdate.current = false;
                clearTimeout(scrollPause);
            }, 500);


        }


        if (!scrollUpdateTick.current) {
            requestAnimationFrame(() => {

                const currentScroll = window.scrollY;
                if (Math.abs(currentScroll - scrollLastValue.current) > 10) {
                    scrollLastValue.current = currentScroll;
                    const screenCenter = window.innerHeight / 2;

                    let nearestSkill: skillActiveStateType = "frontend";
                    let minDistance = Infinity;

                    const containers: Array<skillActiveStateType> = ["design", "frontend", "backend", "other"];

                    containers.forEach((type) => {
                        const element = document.getElementById(`skill-item-container-${type}-id`);
                        // console.log(element);
                        // console.log(`skill-item-container-${type}-id`);
                        if (element) {
                            const rect = element.getBoundingClientRect();
                            const elementCenter = rect.top + rect.height / 2;
                            const distance = Math.abs(elementCenter - screenCenter);

                            if (distance < minDistance) {
                                minDistance = distance;
                                nearestSkill = type;
                                // element.click();
                            }
                        }
                    })
                    updateActiveSkillValue(nearestSkill, false);
                }
                scrollUpdateTick.current = false;
            })
            scrollUpdateTick.current = true;
        }

    }


    console.log("updated");
    useEffect(() => {
        fetchSkillsData();
    }, [])

    useEffect(() => {

        window.removeEventListener("scroll", updateActiveSkillContainer)

        if (resizeRegion == "mobile") {
            window.addEventListener("scroll", updateActiveSkillContainer, { passive: true });
        }

        return () => {
            window.removeEventListener("scroll", updateActiveSkillContainer)
        }
    }, [resizeRegion]);



    const getRelativeSkillPositioningMap = () => {
        const activeIndex = activeRelativeSkillPositioningMap[skillsActiveState];
        return activeIndex;

    }


    console.log("re rendered");

    // console.log("active:" + skillsActiveState);

    console.log("parent resize region:" + resizeRegion);

    return (
        <section id="skills-section-id" className="min-h-max h-screen max-h-[700px] overflow-clip mb-32  w-[calc(100%-2rem)] max-tablet:w-full mx-auto max-w-270 flex max-mobile:h-max max-mobile:max-h-max justify-start  max-mobile:items-start items-center flex-col-reverse " >




            <div className={`skill-state-container  w-max flex max-tablet:w-full min-w-max justify-center gap-0 overflow-clip ${skillDataState.isLoaded ? "h-max" : "h-full"}  max-mobile:flex-col  max-mobile:items-center  max-mobile:gap-8   `}
                ref={ref}
                id="skill-state-container-id"
            >

                <SkillsItemContainer
                    isActiveState={skillsActiveState == "design"}
                    isLoaded={skillDataState.isLoaded}
                    data={skillDataState.design}
                    onClick={() => updateActiveSkillValue("design", true)}
                    type="design"
                    indexPositioning={getRelativeSkillPositioningMap()}
                    resizeRegion={resizeRegion}
                />
                <SkillsItemContainer
                    isActiveState={skillsActiveState == "frontend"}
                    isLoaded={skillDataState.isLoaded}
                    data={skillDataState.frontend}
                    onClick={() => updateActiveSkillValue("frontend", true)}
                    type="frontend"
                    indexPositioning={getRelativeSkillPositioningMap()}
                    resizeRegion={resizeRegion}


                />

                <SkillsItemContainer
                    isActiveState={skillsActiveState == "backend"}
                    isLoaded={skillDataState.isLoaded}
                    data={skillDataState.backend}
                    onClick={() => updateActiveSkillValue("backend", true)}
                    type="backend"
                    indexPositioning={getRelativeSkillPositioningMap()}
                    resizeRegion={resizeRegion}


                />

                <SkillsItemContainer
                    isActiveState={skillsActiveState == "other"}
                    isLoaded={skillDataState.isLoaded}
                    data={skillDataState.other}
                    onClick={() => updateActiveSkillValue("other", true)}
                    type="other"
                    indexPositioning={getRelativeSkillPositioningMap()}
                    resizeRegion={resizeRegion}


                />


                {/* <SkillsItemContainer
                    isActiveState={skillsActiveState === "design"}
                    isLoaded={skillDataState.isLoaded}
                    onClick={() => setSkillsActiveState("design")}
                    text="design"
                >
                    {
                        skillDataState?.design?.map((skill, index) => (

                            <SkillsItem key={index} index={index} skill={skill} styleState={skillsActiveState === "design"} />
                        ))
                    }
                </SkillsItemContainer>

                <SkillsItemContainer
                    isActiveState={skillsActiveState === "frontend"}
                    isLoaded={skillDataState.isLoaded}
                    onClick={() => setSkillsActiveState("frontend")}
                    text="frontend"
                >
                    {
                        skillDataState?.frontend?.map((skill, index) => (
                            <SkillsItem key={index} index={index} skill={skill} styleState={skillsActiveState === "frontend"} />
                        ))
                    }
                </SkillsItemContainer>
                <SkillsItemContainer
                    isActiveState={skillsActiveState === "backend"}
                    isLoaded={skillDataState.isLoaded}
                    onClick={() => setSkillsActiveState("backend")}
                    text="backend"
                >
                    {
                        skillDataState?.backend?.map((skill, index) => (
                            <SkillsItem key={index} index={index} skill={skill} styleState={skillsActiveState === "backend"} />
                        ))
                    }
                </SkillsItemContainer>
                <SkillsItemContainer
                    isActiveState={skillsActiveState === "other"}
                    isLoaded={skillDataState.isLoaded}
                    onClick={() => setSkillsActiveState("other")}
                    text="other"
                >
                    {
                        skillDataState?.other?.map((skill, index) => (
                            <SkillsItem key={index} index={index} skill={skill} styleState={skillsActiveState === "other"} />
                        ))
                    }
                </SkillsItemContainer> */}
            </div>
            <div className="w-full h-[0.0625rem] translate-y-[calc(2.25rem)] max-mobile:translate-y-0 relative">
                <div className="bg-text/25 w-full h-full " />
                <div className=" bg-linear-to-r from-bg/0 to-bg w-[25%] max-w-32 h-2 z-10 absolute right-0 top-0 bottom-0 -translate-y-1/2" />
                <div className=" bg-linear-to-r from-bg to-bg/0 w-[25%] max-w-32 h-2 z-10 absolute left-0 top-0 bottom-0 -translate-y-1/2" />
            </div>
            <div className="mb-8 h-11  flex gap-2  w-max  max-mobile:w-full justify-center overflow-hidden  ">
                {inView &&
                    ["My", "Technical", "Skills"].map((word, index) => {
                        return (
                            <h1 key={index} className={`text-[2rem] text-text ease-in-out duration-250 font-bold animate-[SlideUp_0.5s_cubic-bezier(0.29,0.98,0.29,0.99)_backwards]`}
                                style={{
                                    animationDelay: `${((index * 0.05))}s`,
                                }}
                            >
                                {word}
                            </h1>
                        )
                    })
                }
            </div>
        </section>
    )
}