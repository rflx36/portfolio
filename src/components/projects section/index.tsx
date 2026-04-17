import {  useEffect,  useRef, useState } from "react";
import { animationLoadStateDefaults, projectsDataDefaults } from "../../constants";
import { type resizeRegion, type animationLoadStateType, type projectDataType } from "../../types/types";
import ProjectsCard from "./projects_card";
import "./project_container_hovers.css";
import { useNavigate } from "react-router";
import ProjectsCardMobile from "./projects_card_mobile";
// import isMobile from "../../utils/is_mobile";




export default function ProjectsSection() {
    const [projectsDataState, setProjectsDataState] = useState<projectDataType>(projectsDataDefaults);
    const [animationLoadState, setAnimationLoadState] = useState<animationLoadStateType>(animationLoadStateDefaults);
    // const [resizeRegion, setResizeRegion] = useState<res izeRegion>("desktop")
    const [focus, setFocus] = useState(-1);
    const [remountKey, setRemountKey] = useState(0);
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

        console.log(formattedData);
        setTimeout(() => {
            setAnimationLoadState(prev => ({ ...prev, preload: true }));
            handleHovers();
        }, 100);

        setTimeout(() => {
            setAnimationLoadState(prev => ({ ...prev, postload: true }));

            if (screenWidth.current > 820) {
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
                    console.log("")
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



    const getFocusedProjectDetails = projectsDataState.projects?.find((x, i) => i == focus && x.project_is_featured)



    return (
        <>
            {/* <h1 className="font-sans font-semibold text-text text-lg w-full text-center">SELECTED PROJECTS</h1> */}

            <div key={remountKey} className={`w-[calc(100%-4rem)] max-mobile:w-[calc(100%-2rem)] bg-container-soft-shadow/75 max-mobile:py-2.5 max-mobile:rounded-2xl max-mobile:mt-2   mx-auto mt-6  py-[calc(2.5%+1rem)] ${resizeRegion.current == "desktop" && animationLoadState.postload ? "overflow-visible" : " overflow-hidden"}    max-h-[480px] h-max relative rounded-3xl flex flex-col justify-center items-center`} id="project-section">
                {/* <div className={`aspect-268/133 w-[${widthContainerStringified}] max-w-[${maxWidthContainerStringified}]`} /> */}
                <div className="aspect-268/133 relative"
                    style={{
                        width: screenWidth.current <= 820 ? 360 : widthContainerStringified,
                        maxWidth: screenWidth.current <= 430 ? `calc(100% - 20px)` : maxWidthContainerStringified
                    }}
                />
                <div className="w-[calc(100%-8rem)]  max-laptop:w-[calc(100%-20px)]   mx-auto max-w-[1920px] pointer-events-none select-none h-full absolute top-0 flex  items-center justify-start " id="project-container-id">
                    {
                        projectsDataState.isLoaded ? (
                            projectsDataState.projects?.map((project, index) => {
                                if (!project.project_is_featured) {
                                    return
                                }

                                if (resizeRegion.current == "mobile") {
                                    return (
                                        <ProjectsCardMobile
                                            key={index}
                                            index={index}
                                            projectTitle={project.project_title}
                                            projectInformation={project.project_description}
                                            projectImageUrl={project.project_img_url}
                                            projectDate={project.project_finished_date}
                                            projectStacks={project.project_tech_stack}
                                            onClick={() => handleOnclick(project.project_title, index)}
                                            focus={focus}
                                        />
                                    )
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
            <div className="mt-9 max-mobile:mt-4  mb-96 w-[calc(100%-2rem)] mx-auto  h-10 flex flex-col gap-4">
                {
                    resizeRegion.current != "desktop" &&
                    <>
                        <p className="text-text font-semibold ">{getFocusedProjectDetails?.project_title}</p>
                        <div className="max-h  relative">
                            <p className="text-sm  text-text/75">{getFocusedProjectDetails?.project_description_minified}</p>
                            {/* <div className="bg-linear-to-b from-transparent bottom-0 to-bg absolute h-32 w-full"/> */}
                        </div>
                        <div className="flex gap-2">
                            {
                                getFocusedProjectDetails?.project_tech_stack.map((x, i) => {
                                    const stack_name = x.toLowerCase().replace(" ", "");
                                    const image_source = `/assets/skills/${stack_name == "reactnative" ? "react" : stack_name}_3.png`;
                                    
                                    return (
                                        <img key={i} className={`size-[25px] [image-rendering:pixelated]  ${stack_name == "reactnative" ? "grayscale-100 " : ""}`}
                                            src={image_source}
                                            alt={x}
                                        />
                                    )
                                })
                            }
                        </div>
                    </>


                }

                <button onClick={() => setFocus(x => x - 1)}>-</button>
                <button onClick={() => setFocus(x => x + 1)}>+</button>
            </div>
        </>
    )
}