import { Project } from "@/types"
import { ArrowRight } from "lucide-react"
import { sizeIcon } from "./selected-projects"
import ProjectItem from "./project-item"

type Props = {
    Projects: Project[]
}
export default function ProjectList({ Projects }: Props) {
    return <div className="projects-grid">
        {Projects.map((project) => (
            <ProjectItem key={project.id} project={project} />
        ))}
    </div>
}