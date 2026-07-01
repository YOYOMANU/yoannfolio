// resources/js/Components/ProjectsSection.jsx
import ProjectList from '@/components/project-list';
import { WithPublicLayout } from '@/layouts/public-layout';
import { Project } from '@/types';
import { useState } from 'react';

const PROJECTS = [
    {
        id: "shoplite",
        title: "ShopLite",
        tag: "Immobilier • Premium",
        desc: "Plateforme immobilière haut de gamme mettant l'accent sur une hiérarchie visuelle stricte et un design épuré. Comprend un tableau de bord utilisateur complet et une interface intuitive de publication d'annonces de propriétés.",
        stack: ["Laravel", "React", "Inertia.js", "Tailwind", "PostgreSQL"],
        link: "#",
        featured: true, // Ce projet prendra 2 colonnes sur grand écran
        swatchClass: "swatch-shoplite"
    },
    {
        id: "techbook",
        title: "TechBook",
        tag: "Réseau Social",
        desc: "Application web dynamique connectant les passionnés de technologie. Développée avec un backend découplé, une base de données NoSQL distribuée et un pipeline de déploiement automatisé.",
        stack: ["Laravel", "React", "MongoDB Atlas", "Docker", "Railway"],
        link: "#",
        featured: false,
        swatchClass: "swatch-techbook"
    },
    {
        id: "myuns",
        title: "MyUNS Portal",
        tag: "Éducation • Écosystème",
        desc: "Interface moderne centralisant les ressources académiques et le suivi des modules de formation pour étudiants, maximisant l'accessibilité sur desktop et mobile.",
        stack: ["React", "TypeScript", "Tailwind", "NestJS"],
        link: "#",
        featured: false,
        swatchClass: "swatch-myuns"
    }
];

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

                {/* Filtres de technologies (Style .tag / .interactive) */}
                <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-border">
                    <button
                        onClick={() => setFilterStack(null)}
                        className={`tag interactive ${!filterStack ? 'active-filter' : ''}`}
                    >
                        Tous les projets
                    </button>
                    {allUniqueTags.map((tech, index) => (
                        <button
                            key={index}
                            // onClick={() => setFilterStack(tech === filterStack ? null : tech)}
                            className={`tag interactive ${tech === filterStack ? 'active-filter' : ''}`}
                        >
                            {tech.name}
                        </button>
                    ))}
                </div>

                {/* Grille des projets (.projects-grid) */}
                <ProjectList Projects={Projects} />

            </div>
        </section>
    );
}

export default WithPublicLayout(ListingProjects);