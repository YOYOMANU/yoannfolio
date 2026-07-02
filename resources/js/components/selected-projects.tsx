// resources/js/Components/SelectedProjects.jsx
import { router } from '@inertiajs/react';
import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import projets from '@/routes/projets';
import type { Project } from '@/types';
import ProjectList from './project-list';

export const sizeIcon = 18;

type Props = {
    Projects: Project[]
}

// Configuration de l'apparition globale de la section (Stagger)
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2, // L'en-tête apparaît, puis la liste des projets suit
        }
    }
} satisfies Variants;

const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.215, 0.61, 0.355, 1],
        },
    },
} satisfies Variants;

const arrowVariants = {
    rest: { x: 0 },
    hover: { x: 5, transition: { type: "spring", stiffness: 400, damping: 10 } }
} satisfies Variants;

export default function SelectedProjects({ Projects }: Props) {
    return (
        <motion.section
            id="projets"
            className="section"
            style={{ overflow: 'hidden' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }} // Déclenche la cascade globale au scroll
            variants={containerVariants}
        >
            <div className="container">
                {/* En-tête de section */}
                <motion.div variants={headerVariants}>
                    <div className="section-head">
                        <div>
                            <h2 className="font-display">Projets sélectionnés</h2>
                            <p>Des produits réels, pensés de l'interface jusqu'à l'infrastructure.</p>
                        </div>

                        {/* Action pour basculer sur la vue globale 'listing' */}
                        <motion.button
                            onClick={() => router.visit(projets.listing())}
                            className="card-link"
                            style={{
                                color: 'var(--primary)',
                                fontWeight: 500,
                                display: 'inline-flex',
                                alignItems: 'center', // Corrigé ici
                                gap: '0.5rem',
                                cursor: 'pointer',
                                background: 'transparent',
                                border: 'none'
                            }}
                            initial="rest"
                            whileHover="hover"
                            whileTap={{ scale: 0.98 }}
                        >
                            Voir tous les projets
                            <motion.span variants={arrowVariants} className="inline-flex items-center">
                                <ArrowRight size={sizeIcon} />
                            </motion.span>
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* Liste/Grille des projets enveloppée pour hériter de la transition de cascade */}
            <motion.div variants={headerVariants}>
                <ProjectList Projects={Projects} />
            </motion.div>
        </motion.section>
    );
}