import { useEffect, useState } from "react"
import { type skillActiveStateType, type skillDataType } from "../../types"
import { skillActiveStateDefaults, skillDataDefaults } from "../../constants"
import SkillsItem from "./skills_item";
import "./skill_state_hovers.css"
import SkillsItemContainer from "./skills_item_container";



export default function SkillsSection() {

    const [skillsActiveState, setSkillsActiveState] = useState<skillActiveStateType>(skillActiveStateDefaults);
    const [skillDataState, setSkillDataState] = useState<skillDataType>(skillDataDefaults);


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
        <div className="h-screen w-[calc(100%-2rem)] mx-auto max-w-270 " >
            <h1 className="text-text">Skills Section</h1>
            {/* <div className="animate-pulse bg-gray-300 rounded">sKELETON</div> */}
            <div className="skill-state-container flex justify-center ">

                <SkillsItemContainer
                    isActiveState={skillsActiveState === "design"}
                    onClick={() => setSkillsActiveState("design")}
                    text="design"
                >
                    {
                        skillDataState?.design?.map((skill, index) => (
                            <SkillsItem key={index} skill={skill} styleState={skillsActiveState === "design"} />
                        ))
                    }
                </SkillsItemContainer>

                <SkillsItemContainer
                    isActiveState={skillsActiveState === "frontend"}
                    onClick={() => setSkillsActiveState("frontend")}
                    text="frontend"
                >
                    {
                        skillDataState?.frontend?.map((skill, index) => (
                            <SkillsItem key={index} skill={skill} styleState={skillsActiveState === "frontend"} />
                        ))
                    }
                </SkillsItemContainer>
                <SkillsItemContainer
                    isActiveState={skillsActiveState === "backend"}
                    onClick={() => setSkillsActiveState("backend")}
                    text="backend"
                >
                    {
                        skillDataState?.backend?.map((skill, index) => (
                            <SkillsItem key={index} skill={skill} styleState={skillsActiveState === "backend"} />
                        ))
                    }
                </SkillsItemContainer>
                <SkillsItemContainer
                    isActiveState={skillsActiveState === "other"}
                    onClick={() => setSkillsActiveState("other")}
                    text="other"
                >
                    {
                        skillDataState?.other?.map((skill, index) => (
                            <SkillsItem key={index} skill={skill} styleState={skillsActiveState === "other"} />
                        ))
                    }
                </SkillsItemContainer>
            </div>

            <div className="w-full h-[0.0625rem] relative">
                <div className="bg-text/25 w-full h-full " />
                <div className=" bg-linear-to-r from-bg/0 to-bg w-[25%] max-w-32 h-2 z-10 absolute right-0 top-0 bottom-0 -translate-y-1/2" />
                <div className=" bg-linear-to-r from-bg to-bg/0 w-[25%] max-w-32 h-2 z-10 absolute left-0 top-0 bottom-0 -translate-y-1/2" />
            </div>
        </div>
    )
}