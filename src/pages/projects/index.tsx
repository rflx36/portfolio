import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { projectDataType } from "../../types/types";
import { projectsDataDefaults, scrollDefaults } from "../../constants";








export default function PageProjects() {

    const { project_title } = useParams();
    const [viewType, setViewType] = useState<"about" | "case study">("about");
    const [projectsDataState, setProjectsDataState] = useState<projectDataType>(projectsDataDefaults);


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

    return (
        <div className="w-[calc(100%-2rem)] max-w-270 h-full mx-auto mt-26">

            <div className="bg-container-soft-shadow w-full h-auto aspect-video rounded-2xl my-8">

            </div>

            {/* <button onClick={()=>setViewType("about")} */}

            {
                viewType == "about" ?
                    <div className="flex flex-col gap-8 w-full">
                        <div className="flex gap-8">
                            <p className="w-[200px] text-left text-text font-bold text-lg">
                                Title
                            </p>
                            <p className="flex-1 text-left text-text text-base">
                                {current_project?.project_title}
                            </p>
                        </div>
                        <div className="flex gap-8">
                            <p className="w-[200px] text-left text-text font-bold text-lg">
                                Date
                            </p>
                            <p className="flex-1 text-left text-text text-base">
                                {current_project?.project_finished_date}
                            </p>
                        </div>
                        <div className="flex gap-8">
                            <p className="w-[200px] text-left text-text font-bold text-lg">
                                Description
                            </p>
                            <p className="flex-1 text-left text-text text-base">
                                {current_project?.project_description}
                            </p>
                        </div>
                        <div className="flex gap-8">
                            <p className="w-[200px] text-left text-text font-bold text-lg">
                                Links
                            </p>
                            <p className="flex-1 text-left text-text text-base">
                                {current_project?.project_live_link}
                                {current_project?.project_github_link}
                            </p>
                        </div>
                    </div>
                    :
                    <></>
            }
        </div>
    )

}