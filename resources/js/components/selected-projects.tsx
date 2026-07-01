import projects from '@/routes/projects';
import { Project } from '@/types';
import { router } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import ProjectList from './project-list';

export const sizeIcon = 18;

type Props = {
    Projects: Project[]
}

export default function SelectedProjects({ Projects }: Props) {

    return (
        <section id="projets" className="section">
            <div className="container">

                {/* Section Head rigoureusement identique à votre HTML avec variables CSS */}
                <div className="reveal reveal-visible">
                    <div className="section-head">
                        <div>
                            <h2 className="font-display">Projets sélectionnés</h2>
                            <p>Des produits réels, pensés de l'interface jusqu'à l'infrastructure.</p>
                        </div>

                        {/* Action pour basculer sur la vue globale 'listing' */}
                        <button
                            onClick={() => router.visit(projects.listing())}
                            className="card-link"
                            style={{ color: 'var(--primary)', fontWeight: 500 }}
                        >
                            Voir tous les projets
                            <ArrowRight size={sizeIcon} />
                        </button>
                    </div>
                </div>

                {/* Grille de projets (.projects-grid) */}
                <ProjectList Projects={Projects} />

            </div>
        </section>
    );
}