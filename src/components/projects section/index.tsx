import { useEffect, useState } from "react";
import { projectsDataDefaults } from "../../constants";
import type { ProjectDataType } from "../../types";
import ProjectsCard from "./projects_card";








export default function ProjectsSection() {
    const [projectsDataState, setProjectsDataState] = useState<ProjectDataType>(projectsDataDefaults);

    const fetchProjectsData = async () => {
        const response = await fetch("/projects.json");
        const data = await response.json();

        const formattedData: ProjectDataType = {
            projects: data,
            isLoaded: true,
        }
        setProjectsDataState(formattedData);
    }

    useEffect(() => {
        fetchProjectsData();
    }, []);

    console.log(projectsDataState);

    return (
        <div className="w-[calc(100%-4rem)] flex justify-center relative rounded-3xl mx-auto my-6 h-96  bg-container-soft-shadow/75">
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
                        />
                    )})
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <p className="text-white text-xl">Loading Projects...</p>
                    </div>
                )
            }
           
        </div>
    )
}