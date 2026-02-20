import { useEffect, useRef, useState } from "react";
import { projectsDataDefaults } from "../../constants";
import type { ProjectDataType } from "../../types";
import ProjectsCard from "./projects_card";








export default function ProjectsSection() {
    const [projectsDataState, setProjectsDataState] = useState<ProjectDataType>(projectsDataDefaults);
    const [triggerAnimation, setTriggerAnimation] = useState(false);


    const fetchProjectsData = async () => {
        const response = await fetch("/projects.json");
        const data = await response.json();

        const formattedData: ProjectDataType = {
            projects: data,
            isLoaded: true,
        }
        setProjectsDataState(formattedData);

        setTimeout(() => {
            setTriggerAnimation(true);
        }, 100);
    }

    useEffect(() => {
        fetchProjectsData();
    }, []);

    console.log(projectsDataState);
    const dampening = 100;
    const featuredAmountLimit = 4;
    const randomizedInverseBoolValue = Math.random() < 0.5;

    return (
        <>
            {/* <h1 className="font-sans font-semibold text-text text-lg w-full text-center">SELECTED PROJECTS</h1> */}
            <div className="w-[calc(100%-4rem)] bg-container-soft-shadow/75 overflow-hidden mx-auto my-6 py-[calc(2.5%+1rem)] max-h-[480px] h-max relative rounded-3xl flex flex-col justify-center items-center">
                <div className={`aspect-268/133 w-[calc(25%+${dampening.toString()}px-1rem)] max-w-[calc(480px+${dampening.toString()}px)]`} />
                <div className="w-[calc(100%-8rem)] mx-auto max-w-[1920px] h-full absolute top-0 flex items-center justify-start ">
                    {
                        projectsDataState.isLoaded ? (
                            projectsDataState.projects?.map((project, index) => {
                                if (!project.project_is_featured) {
                                    return
                                }

                                return (
                                    <ProjectsCard
                                        key={index}
                                        index={index}
                                        projectTitle={project.project_title}
                                        projectImageUrl={project.project_img_url}
                                        DisplayProperties={{
                                            dampening: dampening,
                                            featuredAmountLimit: featuredAmountLimit,
                                            inverseBoolValue: randomizedInverseBoolValue,
                                            loadAnimation: triggerAnimation,
                                        }}
                                    />
                                )
                            })
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <p className="text-white text-xl">Loading Projects...</p>
                            </div>
                        )
                    }

                </div>
            </div>
        </>
    )
}