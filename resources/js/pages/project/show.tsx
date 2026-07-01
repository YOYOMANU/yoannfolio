// resources/js/Components/ProjectShow.jsx
import { Link, usePage } from '@inertiajs/react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Project } from '@/types';
import { WithPublicLayout } from '@/layouts/public-layout';
import { SharedPageProps } from '@inertiajs/core';
import { motion, Variants } from 'framer-motion';

export const sizeIcon = 16;

type Props = {
    project: Project;
};

// Orchestration de l'en-tête (Fade + Slide)
const headerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.05 }
    }
} satisfies Variants;

const headerItemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }
    }
} satisfies Variants;

// Animation pour le bouton retour (Glissement de la flèche)
const backArrowVariants = {
    rest: { x: 0 },
    hover: { x: -4, transition: { type: "spring", stiffness: 400, damping: 12 } }
} satisfies Variants;

// Dévoilement de la bannière (Scale + Fade progressif)
const swatchVariants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.8, delay: 0.25, ease: "easeOut" }
    }
} satisfies Variants;

// Apparition séquentielle pour les sections au scroll
const scrollContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12 }
    }
} satisfies Variants;

const scrollItemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }
    }
} satisfies Variants;

function ProjectShow({ project }: Props) {
    const page = usePage<SharedPageProps>();
    const previousUrl = page.props.previousUrl;

    return (
        <div className='p-15' style={{ overflow: 'hidden' }}>
            {/* En-tête animé dès le chargement */}
            <motion.div
                className="view-header"
                style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: '1.5rem' }}
                initial="hidden"
                animate="visible"
                variants={headerContainerVariants}
            >
                <motion.div variants={headerItemVariants}>
                    <motion.div initial="rest" whileHover="hover" whileTap={{ scale: 0.98 }} style={{ display: 'inline-block' }}>
                        <Link href={previousUrl} preserveScroll preserveState className="back-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                            <motion.span variants={backArrowVariants} className="inline-flex items-center">
                                <ArrowLeft size={sizeIcon} />
                            </motion.span>
                            Retour
                        </Link>
                    </motion.div>
                </motion.div>

                <motion.p className="project-tag font-mono" style={{ marginBottom: '0.5rem' }} variants={headerItemVariants}>
                    {project.category}
                </motion.p>

                <motion.h1
                    className="font-display"
                    style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', lineHeight: 1.1 }}
                    variants={headerItemVariants}
                >
                    {project.title}
                </motion.h1>
            </motion.div>

            {/* Bannière d'image avec effet d'ouverture cinématique */}
            <motion.div
                className={`details-swatch ${project.swatch_class}`}
                style={{ background: project.image ? `url(${project.image}) center center/cover` : '' }}
                initial="hidden"
                itemID={`porject${project.id}`}
                animate="visible"
                variants={swatchVariants}
            />

            {/* Grille de détails avec déclenchement au défilement (Scroll Reveal) */}
            <div className="details-grid">
                <motion.div
                    className="details-content"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={scrollContainerVariants}
                >
                    <motion.h2 className="font-display" style={{ fontSize: '1.75rem' }} variants={scrollItemVariants}>
                        Description globale
                    </motion.h2>
                    <motion.p variants={scrollItemVariants}>{project.long_description}</motion.p>

                    <motion.h3 variants={scrollItemVariants}>Le Problème</motion.h3>
                    <motion.p variants={scrollItemVariants}>{project.problem}</motion.p>

                    <motion.h3 variants={scrollItemVariants}>La Solution Technique</motion.h3>
                    <motion.p variants={scrollItemVariants}>{project.solution}</motion.p>

                    <motion.h3 variants={scrollItemVariants}>Fonctionnalités clés développées</motion.h3>
                    <motion.div className="flex flex-col gap-4" variants={scrollContainerVariants}>
                        {project.features.map((feature) => (
                            <motion.div key={feature.id} className="feature-card" variants={scrollItemVariants} whileHover={{ y: -3, transition: { duration: 0.2 } }}>
                                <h4>{feature.title}</h4>
                                <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.5 }}>
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Colonne latérale collante : Boîte de métadonnées et CTAs */}
                <motion.div
                    initial={{ opacity: 0, x: 25 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                >
                    <div className="details-meta-box">
                        <h3
                            className="font-display"
                            style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '1.25rem' }}
                        >
                            Spécifications
                        </h3>

                        <div className="meta-item">
                            <span className="meta-label">Rôle</span>
                            <span className="meta-value">{project.role}</span>
                        </div>

                        <div className="meta-item">
                            <span className="meta-label">Contexte</span>
                            <span className="meta-value">{project.context}</span>
                        </div>

                        <div className="meta-item">
                            <span className="meta-label">Technologies</span>
                            <span className="meta-value" style={{ textAlign: 'right', maxWidth: '60%' }}>
                                {project.technologies.map((tech) => tech.name).join(', ')}
                            </span>
                        </div>

                        {/* Liens Externes avec micro-animations au survol */}
                        {project.live_url && (
                            <div style={{ marginTop: '2rem' }}>
                                <motion.div whileHover={{ scale: 1.01, y: -2 }} whileTap={{ scale: 0.99 }}>
                                    <Link
                                        href={project.live_url}
                                        rel="noopener noreferrer"
                                        className="btn btn-primary"
                                        style={{ width: '100%', justifyContent: 'center', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                                    >
                                        Visiter le projet live
                                        <ExternalLink size={sizeIcon} />
                                    </Link>
                                </motion.div>
                            </div>
                        )}

                        {project.repo_url && (
                            <div style={{ marginTop: '1rem' }}>
                                <motion.div whileHover={{ scale: 1.01, y: -2 }} whileTap={{ scale: 0.99 }}>
                                    <Link
                                        href={project.repo_url}
                                        target='_blank'
                                        rel="noopener noreferrer"
                                        className="btn btn-primary"
                                        style={{ width: '100%', justifyContent: 'center', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                                    >
                                        Visiter le dépôt
                                        <ExternalLink size={sizeIcon} />
                                    </Link>
                                </motion.div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default WithPublicLayout(ProjectShow);