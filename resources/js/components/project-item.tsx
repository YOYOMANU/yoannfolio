import { Project } from "@/types";
import { sizeIcon } from "./selected-projects";
import { ArrowRight } from "lucide-react";
import { router } from "@inertiajs/react";
import projects from "@/routes/projects";

type Props = {
    project: Project;
}
export default function ProjectItem({ project }: Props) {
    return <div
        key={project.id}
        className={`project-card ${project.is_featured ? 'featured' : ''}`}
    >
        {/* Échantillon visuel dynamique injecté par vos classes CSS (.swatch-*) */}
        <div className={`swatch ${project.swatch_class}`} style={{ background: project.image ? `url(${project.image}) center center/cover` : '' }}></div>

        {/* Contenu textuel de la carte */}
        <div className="project-body">
            <span className="project-tag">
                {project.category}
            </span>

            <h3 className="project-title">
                {project.title}
            </h3>

            <p className="project-desc">
                {project.short_description}
            </p>

            {/* Badges technologiques (.project-stack) */}
            <div className="project-stack">
                {project.technologies.map((tech) => (
                    <span key={tech.id} className="tag">
                        {tech.name}
                    </span>
                ))}
            </div>

            {/* Lien vers le détail du projet */}
            <button
                onClick={() => router.visit(projects.show(project))}
                className="card-link group"
                style={{ marginTop: 'auto', alignSelf: 'flex-start', color: 'var(--foreground)' }}
            >
                <span className=' group-hover:text-(--primary)'>Explorer le projet</span>
                <ArrowRight size={sizeIcon} className=' group-hover:text-(--primary)' />
            </button>
        </div>
    </div>
}