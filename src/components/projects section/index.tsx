import ProjectsCard from "./projects_card";








export default function ProjectsSection() {


    return (
        <div className="w-[calc(100%-4rem)] rounded-3xl mx-auto my-6 h-96  bg-container-soft-shadow/75">
            <ProjectsCard
                projectTitle={"Sample Project"}
                projectImageUrl={"/sample-project.png"}
            />
        </div>
    )
}