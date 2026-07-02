import ProjectList from '@/components/project-list';
import { WithPublicLayout } from '@/layouts/public-layout';
import type { Project } from '@/types';

type Props = {
    Projects: Project[];
}

function ListingProjects({ Projects }: Props) {
    return (
        <section id="projects" className="section bg-background text-foreground relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                {/* Section Header */}
                <div className="section-head mb-12">
                    <div>
                        <span className="font-mono text-xs font-bold tracking-widest text-primary uppercase bg-(--accent-dim) px-3 py-1 rounded-md border border-border">
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