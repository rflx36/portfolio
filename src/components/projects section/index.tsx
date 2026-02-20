import { useEffect, useRef, useState } from "react";
import { projectsDataDefaults } from "../../constants";
import type { ProjectDataType } from "../../types";
import ProjectsCard from "./projects_card";
import "./project_container_hovers.css";







export default function ProjectsSection() {
    const [projectsDataState, setProjectsDataState] = useState<ProjectDataType>(projectsDataDefaults);
    const [triggerAnimation, setTriggerAnimation] = useState(false);

    const handleHovers = () => {
        const projectsCard = document.getElementById("project-container-id");
        projectsCard?.addEventListener("mouseover", () => {
            projectsCard.classList.add("project-container");
        })

        projectsCard?.addEventListener("mouseleave", () => {
            projectsCard?.classList.remove("project-container");
        })

    }

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
            handleHovers();
        }, 100);

        setTimeout(() => {
            const projectSection = document.getElementById("project-section");

            projectSection!.style.overflow = "visible";
        }, 350);
    }

    useEffect(() => {
        fetchProjectsData();

    }, []);

    const dampening = 100;
    const featuredAmountLimit = 4;
    const randomizedInverseBoolValue = Math.random() < 0.5;

    const widthContainerStringified = `calc(${100 / featuredAmountLimit}% + ${dampening}px - 1rem)`;
    const maxWidthContainerStringified = `calc(480px + ${dampening}px)`;



    return (
        <>
            {/* <h1 className="font-sans font-semibold text-text text-lg w-full text-center">SELECTED PROJECTS</h1> */}
            <div className={`w-[calc(100%-4rem)] bg-container-soft-shadow/75   mx-auto my-6 py-[calc(2.5%+1rem)] overflow-hidden max-h-[480px] h-max relative rounded-3xl flex flex-col justify-center items-center`} id="project-section">
                {/* <div className={`aspect-268/133 w-[${widthContainerStringified}] max-w-[${maxWidthContainerStringified}]`} /> */}
                <div className="aspect-268/133 relative"
                    style={{
                        width: widthContainerStringified,
                        maxWidth: maxWidthContainerStringified
                    }}
                />
                <div className="w-[calc(100%-8rem)] mx-auto max-w-[1920px] pointer-events-none select-none h-full absolute top-0 flex items-center justify-start " id="project-container-id">
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
                                        projectInformation={project.project_description}
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
                                {/* <p className="text-white text-xl">Loading Projects...</p> */}
                            </div>
                        )
                    }

                </div>
            </div>
            <div className="mt-9 mb-36 w-[calc(100%-8rem)] mx-auto max-w-[1920px] h-10">
            </div>
        </>
    )
}