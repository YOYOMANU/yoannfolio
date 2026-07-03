// resources/js/Components/ProjectShow.jsx
import type { SharedPageProps } from '@inertiajs/core';
import { Link, usePage } from '@inertiajs/react';
import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, GithubIcon } from 'lucide-react';
import { WithPublicLayout } from '@/layouts/public-layout';
import type { Project } from '@/types';

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

const backArrowVariants = {
    rest: { x: 0 },
    hover: { x: -4, transition: { type: "spring", stiffness: 400, damping: 12 } }
} satisfies Variants;

const swatchVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.8, delay: 0.15, ease: "easeOut" }
    }
} satisfies Variants;

const scrollContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12 }
    }
} satisfies Variants;

const scrollItemVariants = {
    hidden: { opacity: 0, y: 20 },
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
        // Remplacement de p-15 par des paddings fluides et responsives
        <div className="px-4 py-8 md:p-12 lg:p-16 max-w-7xl mx-auto">

            {/* En-tête du projet */}
            <motion.div
                className="view-header"
                style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: '2rem' }}
                initial="hidden"
                animate="visible"
                variants={headerContainerVariants}
            >
                <motion.div variants={headerItemVariants} className="mb-4">
                    <motion.div initial="rest" whileHover="hover" whileTap={{ scale: 0.98 }} style={{ display: 'inline-block' }}>
                        <Link href={previousUrl} preserveScroll preserveState className="back-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                            <motion.span variants={backArrowVariants} className="inline-flex items-center">
                                <ArrowLeft size={sizeIcon} />
                            </motion.span>
                            Retour
                        </Link>
                    </motion.div>
                </motion.div>

                <motion.p className="project-tag font-mono text-xs md:text-sm uppercase tracking-wider text-primary" style={{ marginBottom: '0.5rem' }} variants={headerItemVariants}>
                    {project.category}
                </motion.p>

                <motion.h1
                    className="font-display font-bold text-3xl sm:text-4xl md:text-5xl"
                    style={{ lineHeight: 1.15 }}
                    variants={headerItemVariants}
                >
                    {project.title}
                </motion.h1>
            </motion.div>

            {/* Bannière d'image avec hauteur adaptative */}
            <motion.div
                className={`details-swatch ${project.swatch_class} rounded-2xl mb-8 md:mb-12 h-[200px] sm:h-[350px] md:h-[450px]`}
                style={{
                    background: project.image ? `url(${project.image}) center 20%/cover` : '',
                }}
                initial="hidden"
                animate="visible"
                variants={swatchVariants}
            />

            {/* Grille principale : 1 colonne sur mobile, 3 colonnes (2/3 contenu, 1/3 sidebar) sur desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-start">

                {/* Colonne de Description (Prioritaire sur mobile) */}
                <motion.div
                    className="lg:col-span-2 flex flex-col gap-6 md:gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.05 }}
                    variants={scrollContainerVariants}
                >
                    <div>
                        <motion.h2 className="font-display text-xl md:text-2xl mb-3 font-semibold" variants={scrollItemVariants}>
                            Description globale
                        </motion.h2>
                        <motion.p className="text-muted-foreground leading-relaxed text-sm md:text-base" variants={scrollItemVariants}>
                            {project.long_description}
                        </motion.p>
                    </div>

                    <div>
                        <motion.h3 className="text-lg font-semibold mb-2" variants={scrollItemVariants}>Le Problème</motion.h3>
                        <motion.p className="text-muted-foreground leading-relaxed text-sm md:text-base" variants={scrollItemVariants}>
                            {project.problem}
                        </motion.p>
                    </div>

                    <div>
                        <motion.h3 className="text-lg font-semibold mb-2" variants={scrollItemVariants}>La Solution Technique</motion.h3>
                        <motion.p className="text-muted-foreground leading-relaxed text-sm md:text-base" variants={scrollItemVariants}>
                            {project.solution}
                        </motion.p>
                    </div>

                    <div>
                        <motion.h3 className="text-lg font-semibold mb-4" variants={scrollItemVariants}>Fonctionnalités clés développées</motion.h3>
                        <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4" variants={scrollContainerVariants}>
                            {project.features.map((feature) => (
                                <motion.div
                                    key={feature.id}
                                    className="feature-card p-5 rounded-xl border border-white/5 bg-white/[0.02]"
                                    variants={scrollItemVariants}
                                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                                >
                                    <h4 className="font-medium text-base mb-1">{feature.title}</h4>
                                    <p className="text-sm" style={{ color: 'var(--muted-foreground)', lineHeight: 1.5 }}>
                                        {feature.description}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>

                {/* Colonne latérale de spécifications : Se place naturellement en dessous sur mobile */}
                <motion.div
                    className="lg:col-span-1 lg:sticky lg:top-24 w-full"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.05 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                >
                    <div className="details-meta-box p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md">
                        <h3
                            className="font-display font-semibold"
                            style={{ marginTop: 0, marginBottom: '1.25rem', fontSize: '1.25rem' }}
                        >
                            Spécifications
                        </h3>

                        {/* Flex-row sur les items pour garder les labels et valeurs propres sur mobile */}
                        <div className="meta-item flex justify-between items-center py-3 border-b border-white/5 gap-4">
                            <span className="meta-label text-sm text-muted-foreground">Rôle</span>
                            <span className="meta-value text-sm font-medium text-right">{project.role}</span>
                        </div>

                        <div className="meta-item flex justify-between items-center py-3 border-b border-white/5 gap-4">
                            <span className="meta-label text-sm text-muted-foreground">Contexte</span>
                            <span className="meta-value text-sm font-medium text-right">{project.context}</span>
                        </div>

                        <div className="meta-item flex justify-between items-start py-3 border-b border-white/5 gap-4">
                            <span className="meta-label text-sm text-muted-foreground pt-0.5">Technologies</span>
                            <span className="meta-value text-sm font-medium text-right max-w-[65%]">
                                {project.technologies.map((tech) => tech.name).join(', ')}
                            </span>
                        </div>

                        {/* Liens Externes adaptés au tactile mobile (w-full) */}
                        <div className="flex flex-col gap-3 mt-6">
                            {project.live_url && (
                                <motion.div whileHover={{ scale: 1.01, y: -1 }} whileTap={{ scale: 0.99 }}>
                                    <Link
                                        href={project.live_url}
                                        rel="noopener noreferrer"
                                        className="btn btn-outline w-full py-3 text-sm font-medium"
                                        style={{ justifyContent: 'center', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                                    >
                                        Visiter le projet live
                                        <ExternalLink size={sizeIcon} />
                                    </Link>
                                </motion.div>
                            )}

                            {project.repo_url && (
                                <motion.div whileHover={{ scale: 1.01, y: -1 }} whileTap={{ scale: 0.99 }}>
                                    <Link
                                        href={project.repo_url}
                                        target='_blank'
                                        rel="noopener noreferrer"
                                        className="btn btn-outline w-full py-3 text-sm font-medium"
                                        style={{ justifyContent: 'center', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                                    >
                                        Visiter le dépôt
                                        <GithubIcon size={sizeIcon} />
                                    </Link>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default WithPublicLayout(ProjectShow);