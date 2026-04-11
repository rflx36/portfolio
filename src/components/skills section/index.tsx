import { useEffect, useState } from "react"
import { type skillActiveStateType, type skillDataType } from "../../types/types"
import { skillActiveStateDefaults, skillDataDefaults } from "../../constants"
import SkillsItem from "./skills_item";
import "./skill_state_hovers.css"
import SkillsItemContainer from "./skills_item_container";
import { useInView } from "react-intersection-observer";



export default function SkillsSection() {

    const [skillsActiveState, setSkillsActiveState] = useState<skillActiveStateType>(skillActiveStateDefaults);
    const [skillDataState, setSkillDataState] = useState<skillDataType>(skillDataDefaults);

    const { ref, inView } = useInView({ threshold: 0.8, triggerOnce: true })
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

    useEffect(() => {
        fetchSkillsData();
    }, []);

    return (
        <section id="skills-section-id" className="min-h-max h-screen max-h-[700px]  mb-32 w-[calc(100%-2rem)] mx-auto max-w-270 flex items-center flex-col-reverse " >




            <div className="skill-state-container flex justify-center w-max "
                ref={ref}
            >

                <SkillsItemContainer
                    isActiveState={skillsActiveState == "design"}
                    isLoaded={skillDataState.isLoaded}
                    data={skillDataState.design}
                    onClick={() => setSkillsActiveState("design")}
                    type="design"
                />
                <SkillsItemContainer
                    isActiveState={skillsActiveState == "frontend"}
                    isLoaded={skillDataState.isLoaded}
                    data={skillDataState.frontend}
                    onClick={() => setSkillsActiveState("frontend")}
                    type="frontend"
                />

                <SkillsItemContainer
                    isActiveState={skillsActiveState == "backend"}
                    isLoaded={skillDataState.isLoaded}
                    data={skillDataState.backend}
                    onClick={() => setSkillsActiveState("backend")}
                    type="backend"
                />

                <SkillsItemContainer
                    isActiveState={skillsActiveState == "other"}
                    isLoaded={skillDataState.isLoaded}
                    data={skillDataState.other}
                    onClick={() => setSkillsActiveState("other")}
                    type="other"
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
            <div className="w-full h-[0.0625rem] translate-y-[calc(2.25rem)] relative">
                <div className="bg-text/25 w-full h-full " />
                <div className=" bg-linear-to-r from-bg/0 to-bg w-[25%] max-w-32 h-2 z-10 absolute right-0 top-0 bottom-0 -translate-y-1/2" />
                <div className=" bg-linear-to-r from-bg to-bg/0 w-[25%] max-w-32 h-2 z-10 absolute left-0 top-0 bottom-0 -translate-y-1/2" />
            </div>
            <div className="mb-8 h-11  flex gap-2  w-max justify-center overflow-hidden  ">
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