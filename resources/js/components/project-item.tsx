import { router } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";
import projets from "@/routes/projets";
import type { Project } from "@/types";
import { sizeIcon } from "./selected-projects";

type Props = {
    project: Project;
}

export default function ProjectItem({ project }: Props) {
    return <div
        key={project.id}
        className={`project-card ${project.is_featured ? 'featured' : ''}`}
    >
        {/* CORRECTION : On force une hauteur (ou un ratio aspect-video) et un débordement caché */}
        <div className={`swatch ${project.swatch_class} w-full h-48 sm:h-56 md:h-64 overflow-hidden relative`}>
            {project.image && (
                <img
                    src={project.image}
                    alt={project.title}
                    /* CORRECTION : w-full h-full object-cover empêche la déformation et remplit le conteneur */
                    className="w-full h-full object-cover object-center block"
                />
            )}
        </div>

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
                onClick={() => router.visit(projets.show(project))}
                className="card-link group"
                style={{ marginTop: 'auto', alignSelf: 'flex-start', color: 'var(--foreground)' }}
            >
                <span className='group-hover:text-(--primary)'>Explorer le projet</span>
                <ArrowRight size={sizeIcon} className='group-hover:text-(--primary)' />
            </button>
        </div>
    </div>
}