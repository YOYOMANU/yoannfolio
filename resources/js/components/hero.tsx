import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ArrowRight, GraduationCap, Layers, Users } from 'lucide-react';
import PhotoProfil from '@/assets/profileH.jpeg';
import contact from '@/routes/contact';
import projets from '@/routes/projets';
import { sizeIcon } from './selected-projects';
import { MouseEvent, Ref, RefObject, useRef } from 'react';
import { useMotionValue, useTransform, useSpring } from 'framer-motion';
// Configuration de l'animation en cascade pour le texte (Conteneur principal)
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15, // Délai entre l'apparition de chaque enfant
            delayChildren: 0.1,   // Délai initial avant le début de l'animation
        },
    },
} satisfies Variants;

// Animation pour chaque bloc de texte / éléments à gauche
const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }, // Équivalent d'un ease-out subtil
    },
} satisfies Variants;

// Animation de fondu pour les lueurs d'arrière-plan
const glowVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 1.5, ease: "easeOut" }
    }
} satisfies Variants;



function ProfilePhoto({ PhotoProfil }: { PhotoProfil: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 });

    function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            x.set((e.clientX - rect.left) / rect.width - 0.5);
            y.set((e.clientY - rect.top) / rect.height - 0.5);
        }
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="reveal"
        >
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="photo-section"
                style={{ rotateX, rotateY, transformPerspective: 1000 }}
            >
                <div className="photo-frame">
                    <div className="photo-container">
                        {PhotoProfil ? (
                            <img src={PhotoProfil} alt="Yoann Emmanuel" />
                        ) : (
                            <div className="photo-placeholder" style={{ display: 'flex' }}>YE</div>
                        )}
                    </div>
                    <span className="frame-corner tl" />
                    <span className="frame-corner br" />
                </div>
            </motion.div>
        </motion.div>
    );
}

// export default ProfilePhoto;

export default function Hero() {

    return (
        <section className="hero" style={{ overflow: 'hidden' }}>
            {/* Lueurs d'arrière-plan animées */}
            <motion.div className="glow" variants={glowVariants} initial="hidden" animate="visible" />
            <motion.div className="glow-2" variants={glowVariants} initial="hidden" animate="visible" />

            <div className="container">
                <div className="hero-grid">

                    {/* Colonne de gauche : Texte (Conteneur animé) */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.p className="font-mono eyebrow reveal" variants={itemVariants}>
                            Ingénieur logiciel · Abidjan, Côte d'Ivoire
                        </motion.p>

                        <motion.h1 className="font-display" variants={itemVariants}>
                            Une seule personne, toutes les <em>couches</em> du produit.
                        </motion.h1>

                        <motion.p className="hero-sub" variants={itemVariants}>
                            Interfaces mobiles et web, APIs, bases de données, déploiement — je conçois
                            et je construis chaque maillon du produit, sans jamais sacrifier la cohérence.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div className="flex flex-wrap items-center gap-4 hero-ctas reveal" variants={itemVariants}>
                            <Link
                                href={projets.listing()}
                                className="btn btn-primary"
                                preserveScroll={true}
                            >
                                Voir mes projets
                                <ArrowRight size={sizeIcon} />
                            </Link>

                            <Link
                                href={contact.create()}
                                className="btn btn-outline"
                                preserveScroll={true}
                            >
                                Me contacter
                            </Link>
                        </motion.div>

                        {/* Statistiques */}
                        <motion.div className="flex flex-wrap gap-8 reveal" variants={itemVariants}>
                            <div className="flex items-center gap-2 stat">
                                <Layers size={sizeIcon} />
                                <span className="stat-label">12+ technologies maîtrisées</span>
                            </div>

                            <div className="flex items-center gap-2 stat">
                                <Users size={sizeIcon} />
                                <span className="stat-label">Fondateur — GeekLab</span>
                            </div>

                            <div className="flex items-center gap-2 stat">
                                <GraduationCap size={sizeIcon} />
                                <span className="stat-label">3ᵉ année — Génie Logiciel</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Colonne de droite : Photo */}
                    <ProfilePhoto PhotoProfil={PhotoProfil} />

                </div>
            </div>
        </section>
    );
}