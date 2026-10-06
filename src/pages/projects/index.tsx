import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { projectDataType } from "../../types/types";
import { projectsDataDefaults } from "../../constants";
import { useCursor } from "../../hooks/use_cursor";
import ImageSlideshowCard from "../../components/projects section/project_slideshow/project_slideshow";
import ProjectSkillList from "../../components/projects section/project_skill_list/project_skill_list";
import { useInView } from "react-intersection-observer";








export default function PageProjects() {

    const { project_title } = useParams();
    // const [viewType, setViewType] = useState<"about" | "case study">("about");
    const [projectsDataState, setProjectsDataState] = useState<projectDataType>(projectsDataDefaults);
    const [skillRef, skillsInView] = useInView({ threshold: 1 });

    const fetchProjectsData = async () => {
        const response = await fetch("/projects.json");
        const data = await response.json();

        const formattedData: projectDataType = {
            projects: data,
            isLoaded: true,
        }

        setProjectsDataState(formattedData);
    }


    useEffect(() => {
        fetchProjectsData();
        window.scrollTo({

            top: 0
        })
    }, [])


    const current_project = projectsDataState.projects.filter((x) => x.project_title == decodeURIComponent(project_title || "")).pop();


    if (current_project == undefined && projectsDataState.isLoaded) {
        return (
            <p>
                redirect to error 404 not found
            </p>
        )
    }


    const cursorOnLink = useCursor({ tooltip: "Visit Site", type: "pointer" });
    const imageList = Array.from({ length: current_project?.project_img_showcase_amount || 0 }, (_, i) => `/assets/projects/${current_project?.project_img_url.replace("project_thumbnail", "project_showcase").replace(".png", `_${i + 1}.png`)}`);




    return (
        <section className="w-[calc(100%-2rem)] max-w-270 h-full mx-auto mt-26">

            <div className="bg-container-soft-shadow w-full h-auto aspect-video rounded-2xl overflow-hidden my-8">
                {/* <ProjectsCardHover
                    imageList={imageList}
                    title={current_project?.project_title || ""}
                    isActive={true}
                    className="w-full h-full relative "
                /> */}
                <ImageSlideshowCard
                    imageList={imageList}
                    title={current_project?.project_title || ""}
                    isActive={true}
                    className="w-full h-full relative"
                />
            </div>

            {/* <button onClick={() => setViewType("about")} /> */}

            
                    <div className="flex flex-col gap-8 max-mobile:gap-4 w-full">
                        <div className="flex gap-8  max-mobile-tablet-threshold:gap-4 ">
                            <p className="w-[200px] max-tablet:w-[150px] text-left text-text font-bold text-lg max-[500px]:hidden">
                                Title
                            </p>
                            <p className="flex-1 text-left text-text text-base max-[500px]:font-bold">
                                {current_project?.project_title}
                            </p>
                        </div>
                        <div className="flex gap-8   max-mobile-tablet-threshold:gap-4 max-[500px]:absolute max-[500px]:top-18 right-4">
                            <p className="w-[200px] max-tablet:w-[150px] text-left text-text font-bold text-lg max-[500px]:hidden">
                                Date
                            </p>
                            <p className="flex-1 text-left text-text text-base max-[500px]:text-sm max-[500px]:text-text/67">
                                {current_project?.project_finished_date}
                            </p>
                        </div>
                        <div className="flex gap-8  max-[500px]:flex-col max-mobile-tablet-threshold:gap-4 max-[500px]:gap-1!">
                            <p className="w-[200px] max-tablet:w-[150px] text-left text-text font-bold text-lg max-[500px]:hidden">
                                Description
                            </p>
                            <p className="flex-1 text-left text-text text-base max-[500px]:text-sm max-[500px]:indent-10 max-mobile:text-justify">
                                {current_project?.project_description}
                            </p>
                        </div>
                        <div className="flex gap-8  max-[500px]:flex-col max-mobile-tablet-threshold:gap-4 max-[500px]:gap-2! max-mobile:my-2">
                            <p className="w-[200px] max-tablet:w-[150px] ext-left text-text font-bold text-lg">
                                Links
                            </p>
                            <div className="flex-1 min-w-0 flex flex-col text-left text-text text-base">
                                <a
                                    {...cursorOnLink}
                                    className="cursor-none w-fit max-w-full [overflow-wrap:anywhere] focus:text-accent-1 hover:text-accent-1 hover:underline"
                                    href={current_project?.project_live_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {current_project?.project_live_link}
                                </a>

                                {current_project?.project_github_link?.map((x, i) => (
                                    <a
                                        {...cursorOnLink}
                                        className="cursor-none w-fit max-w-full [overflow-wrap:anywhere] focus:text-accent-1 hover:text-accent-1 hover:underline"
                                        key={i}
                                        href={x}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {x}
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div ref={skillRef} className="flex gap-8  max-[500px]:flex-col max-mobile-tablet-threshold:gap-4 mb-10">
                            <p className="w-[200px] max-tablet:w-[150px] text-left text-text font-bold text-lg">
                                Technologies
                            </p>

                            <div className="flex-1 min-w-0 ">
                                <ProjectSkillList
                                    project_tech_stack={current_project?.project_tech_stack || []}
                                    styleState={skillsInView}
                                />
                                {/* {
                                    current_project?.project_tech_stack.map((x, i) => {
                                        const stack_name = x.toLowerCase().replace(" ","");
                                        const image_source = `/assets/skills/${stack_name == "reactnative" ? "react" : stack_name}.png`;

                                        return (

                                            <img key={i + "-" + x} className={` size-[50px] [image-rendering:pixelated] ${stack_name == "reactnative" ? "grayscale-100" : ""}`}
                                                src={image_source}
                                                alt={x}
                                                style={{
                                                    animation: `SlideUpFadeIn 0.3s ease-out ${0 + (i / 25)}s backwards`,
                                                }}
                                            />
                                        )
                                    })
                                } */}
                            </div>
                        </div>

                    </div>
                    :
                    <></>
            
        </section>
    )

}