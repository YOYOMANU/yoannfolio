import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ArrowRight, GraduationCap, Layers, Users } from 'lucide-react';
import PhotoProfil from '@/assets/profileH.jpeg';
import contact from '@/routes/contact';
import projets from '@/routes/projets';
import { sizeIcon } from './selected-projects';
import ProfilePhoto from './profile-photo';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        },
    },
} satisfies Variants;

const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
    },
} satisfies Variants;

const glowVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 1.5, ease: "easeOut" }
    }
} satisfies Variants;

export default function Hero() {
    return (
        <section className="hero" style={{ overflow: 'hidden' }}>
            {/* Lueurs d'arrière-plan masquées ou réduites sur mobile pour la performance */}
            <motion.div className="glow" variants={glowVariants} initial="hidden" animate="visible" />
            <motion.div className="glow-2" variants={glowVariants} initial="hidden" animate="visible" />

            <div className="container mx-auto px-4 py-8 md:py-20">
                {/* L'utilisation de grid-cols-1 force l'empilement sur mobile, md:grid-cols-2 passe en côte à côte */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center hero-grid">

                    {/* Colonne de la Photo : Placée en premier sur mobile grâce à `order-first`, et reprend sa place normale sur desktop avec `md:order-last` */}
                    <div className="order-first md:order-last flex justify-center">
                        <ProfilePhoto PhotoProfil={PhotoProfil} />
                    </div>

                    {/* Colonne du Texte */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col gap-6 text-center md:text-left"
                    >
                        <motion.p className="font-mono eyebrow reveal text-sm md:text-base tracking-wider" variants={itemVariants}>
                            Ingénieur logiciel · Abidjan, Côte d'Ivoire
                        </motion.p>

                        <motion.h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold leading-tight" variants={itemVariants}>
                            Une seule personne, toutes les <em>couches</em> du produit.
                        </motion.h1>

                        <motion.p className="hero-sub text-base md:text-lg opacity-90 max-w-xl mx-auto md:mx-0" variants={itemVariants}>
                            Interfaces mobiles et web, APIs, bases de données, déploiement — je conçois
                            et je construis chaque maillon du produit, sans jamais sacrifier la cohérence.
                        </motion.p>

                        {/* CTAs : En colonne complète sur mobile (`w-full`), côte à côte sur desktop */}
                        <motion.div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 hero-ctas reveal w-full" variants={itemVariants}>
                            <Link
                                href={projets.listing()}
                                className="btn btn-primary w-full sm:w-auto justify-center"
                                preserveScroll={true}
                            >
                                Voir mes projets
                                <ArrowRight size={sizeIcon} />
                            </Link>

                            <Link
                                href={contact.create()}
                                className="btn btn-outline w-full sm:w-auto justify-center"
                                preserveScroll={true}
                            >
                                Me contacter
                            </Link>
                        </motion.div>

                        {/* Statistiques : Changement de gap et alignement pour le mobile */}
                        <motion.div className="flex flex-col sm:flex-row flex-wrap justify-center md:justify-start gap-4 md:gap-8 reveal pt-4" variants={itemVariants}>
                            <div className="flex items-center gap-3 stat justify-center md:justify-start">
                                <Layers size={sizeIcon} />
                                <span className="stat-label text-sm md:text-base">12+ technologies maîtrisées</span>
                            </div>

                            <div className="flex items-center gap-3 stat justify-center md:justify-start">
                                <Users size={sizeIcon} />
                                <span className="stat-label text-sm md:text-base">Fondateur — GeekLab</span>
                            </div>

                            <div className="flex items-center gap-3 stat justify-center md:justify-start">
                                <GraduationCap size={sizeIcon} />
                                <span className="stat-label text-sm md:text-base">3ᵉ année — Génie Logiciel</span>
                            </div>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}