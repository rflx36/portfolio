import React, { useEffect, useRef, useState } from "react";
import { animationLoadStateDefaults, projectsDataDefaults } from "../../constants";
import type { animationLoadStateType, projectDataType, projectInfo } from "../../types/types";
import ProjectsCard from "./projects_card";
import "./project_container_hovers.css";
import { useModalStore } from "../../stores/modal_store";
import { useNavigate } from "react-router";




export default function ProjectsSection() {
    const [projectsDataState, setProjectsDataState] = useState<projectDataType>(projectsDataDefaults);
    const [animationLoadState, setAnimationLoadState] = useState<animationLoadStateType>(animationLoadStateDefaults);
    const modalState = useModalStore();
    const navigate = useNavigate();
    const screenWidth = useRef(window.innerWidth);
    const persistRandomizedValue = useRef(Math.random() < 0.5);

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

        const formattedData: projectDataType = {
            projects: data,
            isLoaded: true,
        }
        setProjectsDataState(formattedData);

        setTimeout(() => {
            setAnimationLoadState(prev => ({ ...prev, preload: true }));
            handleHovers();
        }, 100);

        setTimeout(() => {
            setAnimationLoadState(prev => ({ ...prev, postload: true }));
            const projectSection = document.getElementById("project-section");
            projectSection!.style.overflow = "visible";
        }, 450);
    }

    useEffect(() => {
        fetchProjectsData();

    }, []);

    const dampening = Math.min(Math.max((screenWidth.current / 1920 * 100), 0), 100);
    const featuredAmountLimit = 4;
    const randomizedInverseBoolValue = persistRandomizedValue.current;

    const widthContainerStringified = `calc(${100 / featuredAmountLimit}% + ${dampening}px - 1rem)`;
    const maxWidthContainerStringified = `calc(480px + ${dampening}px)`;

    const OpenProjectsModal = (projectInfo: projectInfo) => {
        // modalState.get.activeModal = "projects";
        // modalState.get.modalInfo = projectInfo;
        // modalState.set();
        // console.log(modalState.get);
        encodeURIComponent
    }


    const handleRedirect = (projectTitle: string) => {
        const encoded = encodeURIComponent(projectTitle);
        navigate(`/projects/${encoded}`);
    }

    

    return (
        <>
            {/* <h1 className="font-sans font-semibold text-text text-lg w-full text-center">SELECTED PROJECTS</h1> */}

            <div className={`w-[calc(100%-4rem)] bg-container-soft-shadow/75   mx-auto mt-6 py-[calc(2.5%+1rem)] overflow-hidden max-h-[480px] h-max relative rounded-3xl flex flex-col justify-center items-center`} id="project-section">
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
                                        projectDate={project.project_finished_date}
                                        projectStacks={project.project_tech_stack}
                                        DisplayProperties={{
                                            dampening: dampening,
                                            featuredAmountLimit: featuredAmountLimit,
                                            inverseBoolValue: randomizedInverseBoolValue,
                                            loadAnimation: animationLoadState,
                                        }}
                                        // onClick={() => OpenProjectsModal(project)}
                                        onClick={() => handleRedirect(project.project_title)}
                                        isSelected={modalState.get.modalInfo?.project_title == project.project_title}
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
            <div className="mt-9 mb-96 w-[calc(100%-8rem)] mx-auto max-w-[1920px] h-10">
            </div>
        </>
    )
}