import { useEffect, useRef, useState } from "react";
import { animationLoadStateDefaults, projectsDataDefaults } from "../../constants";
import { type resizeRegion, type animationLoadStateType, type projectDataType } from "../../types/types";
import ProjectsCard from "./projects_card";
import "./project_container_hovers.css";
import { useModalStore } from "../../stores/modal_store";
import { useNavigate } from "react-router";
// import isMobile from "../../utils/is_mobile";




export default function ProjectsSection() {
    const [projectsDataState, setProjectsDataState] = useState<projectDataType>(projectsDataDefaults);
    const [animationLoadState, setAnimationLoadState] = useState<animationLoadStateType>(animationLoadStateDefaults);
    // const [resizeRegion, setResizeRegion] = useState<res izeRegion>("desktop")
    const [focus, setFocus] = useState(-1);
    const [remountKey, setRemountKey] = useState(0);
    const modalState = useModalStore();
    const navigate = useNavigate();
    const screenWidth = useRef(window.innerWidth);
    const resizeRegion = useRef<resizeRegion>("desktop");

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

            if (!(screenWidth.current <= 820)) {
                initializeDetailsVisibility();
            }
        }, 450);
    }

    const initializeDetailsVisibility = () => {
        const projectSection = document.getElementById("project-section");

        projectSection!.style.overflow = "visible";

    }

    const getResizeRegion = (width: number): resizeRegion => {
        if (width <= 430) {
            return "mobile";
        }
        if (width <= 820) {
            return "tablet";
        }
        return "desktop";
    }

    const setFocusUpdate = (region: resizeRegion) => {
        switch (region) {
            case "mobile":
                setFocus(0)
                break;
            case "tablet":
                setFocus(1);
                break;
            case "desktop":
                setFocus(-1);
                break;
        }
    }

    useEffect(() => {
        fetchProjectsData();
        const initialRegion = (getResizeRegion(window.innerWidth));
        resizeRegion.current = initialRegion;
        setFocusUpdate(initialRegion);



        const handleResize = () => {
            // const newWidth = window.innerWidth;
            const newRegion = getResizeRegion(window.innerWidth)

            if (resizeRegion.current != newRegion) {
                // setResizeRegion(newRegion);
                resizeRegion.current = newRegion
                console.log(newRegion);
                screenWidth.current = window.innerWidth;
                setRemountKey((prevkey) => prevkey + 1);

                setFocusUpdate(newRegion)


                if (resizeRegion.current == "desktop") {
                    initializeDetailsVisibility();
                }
            }
        }

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }

    }, []);

    console.log(remountKey);
    const dampening = Math.min(Math.max((screenWidth.current / 1920 * 100), 0), 100);
    const featuredAmountLimit = 4;
    const randomizedInverseBoolValue = persistRandomizedValue.current;

    const widthContainerStringified = `calc(${100 / featuredAmountLimit}% + ${dampening}px - 1rem)`;
    const maxWidthContainerStringified = `calc(480px + ${dampening}px)`;



    const handleRedirect = (projectTitle: string) => {
        const encoded = encodeURIComponent(projectTitle);
        navigate(`/projects/${encoded}`);
    }

    console.log(dampening);


    const handleOnclick = (redirect: string, index: number) => {
        if (resizeRegion.current != "desktop") {

            if (focus == index) {
                handleRedirect(redirect);

            }
            else {
                setFocus(index);
            }
        }
        else {
            handleRedirect(redirect);
        }
    }

    console.log("focus value:" + focus + "resize:" + resizeRegion.current);
    return (
        <>
            {/* <h1 className="font-sans font-semibold text-text text-lg w-full text-center">SELECTED PROJECTS</h1> */}

            <div key={remountKey} className={`w-[calc(100%-4rem)] bg-container-soft-shadow/75   mx-auto mt-6 py-[calc(2.5%+1rem)] overflow-hidden   max-h-[480px] h-max relative rounded-3xl flex flex-col justify-center items-center`} id="project-section">
                {/* <div className={`aspect-268/133 w-[${widthContainerStringified}] max-w-[${maxWidthContainerStringified}]`} /> */}
                <div className="aspect-268/133 relative"
                    style={{
                        width: screenWidth.current <= 820 ? 360 : widthContainerStringified,
                        maxWidth: maxWidthContainerStringified
                    }}
                />
                <div className="w-[calc(100%-8rem)]  max-laptop:w-[calc(100%-20px)]  mx-auto max-w-[1920px] pointer-events-none select-none h-full absolute top-0 flex  items-center justify-start " id="project-container-id">
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
                                        onClick={() => handleOnclick(project.project_title, index)}
                                        isSelected={modalState.get.modalInfo?.project_title == project.project_title}
                                        focus={focus}
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
                <button onClick={() => setFocus(x => x - 1)}>-</button>
                <button onClick={() => setFocus(x => x + 1)}>+</button>
            </div>
        </>
    )
}