// resources/js/Components/ProjectsSection.jsx
import ProjectList from '@/components/project-list';
import { WithPublicLayout } from '@/layouts/public-layout';
import { Project } from '@/types';
import { useState } from 'react';

type Props = {
    Projects: Project[];
}

function ListingProjects({ Projects }: Props) {
    const [filterStack, setFilterStack] = useState(null);

    // Extraction unique de toutes les technos pour le système de filtrage optionnel
    const allUniqueTags = Array.from(new Set(Projects.flatMap(p => p.technologies)));

    const filteredProjects = filterStack
        ? Projects.filter(p => p.technologies.includes(filterStack))
        : Projects;

    return (
        <section id="projects" className="section bg-background text-foreground relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                {/* Section Header */}
                <div className="section-head mb-12">
                    <div>
                        <span className="font-mono text-xs font-bold tracking-widest text-primary uppercase bg-[var(--accent-dim)] px-3 py-1 rounded-md border border-border">
                            Portfolio
                        </span>
                        <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            Projets sélectionnés.
                        </h2>
                    </div>
                    <p className="max-w-md text-sm text-muted-foreground lg:text-right lg:mt-0 mt-4">
                        Une sélection d'applications combinant rigueur architecturale, interfaces léchées et infrastructures scalables.
                    </p>
                </div>

                {/* Grille des projets (.projects-grid) */}
                <ProjectList Projects={Projects} />

            </div>
        </section>
    );
}

export default WithPublicLayout(ListingProjects);