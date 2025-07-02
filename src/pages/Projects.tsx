import ProjectCard from "../components/ProjectCard"
export default function Projects(){
    return(
    <div className="flex flex-wrap gap-4 justify-center px-40 h-full">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
    </div>
    )
}