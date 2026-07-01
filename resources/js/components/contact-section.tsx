// resources/js/Components/ContactSection.jsx
import { GithubIcon, MailIcon } from 'lucide-react';
import { sizeIcon } from './selected-projects';
import { Link } from '@inertiajs/react';
import contact from '@/routes/contact';
import { motion, Variants } from 'framer-motion';

// Configuration de la cascade d'apparition au scroll
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15, // Délai entre le titre, le texte et les boutons
        },
    },
} satisfies Variants;

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.215, 0.61, 0.355, 1], // Transition fluide haut de gamme
        },
    },
} satisfies Variants;

// Effets interactifs pour les boutons
const buttonHoverTap = {
    whileHover: { scale: 1.02, y: -2, transition: { duration: 0.2 } },
    whileTap: { scale: 0.98 }
};

export default function ContactSection() {
    return (
        <section id="contact" className="contact" style={{ overflow: 'hidden' }}>
            <motion.div
                className="container"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }} // S'anime quand 30% de la section est visible
                variants={containerVariants}
            >
                <motion.h2 className="font-display" variants={itemVariants}>
                    Discutons de votre projet.
                </motion.h2>

                <motion.p variants={itemVariants}>
                    Que ce soit pour construire, refondre ou échanger sur une architecture — je réponds rapidement.
                </motion.p>

                <motion.div className="contact-ctas" variants={itemVariants}>
                    {/* Lien interne Inertia animé */}
                    <motion.div {...buttonHoverTap} style={{ display: 'inline-block' }}>
                        <Link
                            href={contact.create()}
                            className="btn btn-primary"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                            <MailIcon size={sizeIcon} />
                            <span>Écrire un message</span>
                        </Link>
                    </motion.div>

                    {/* Lien GitHub externe natif animé */}
                    <motion.a
                        href="https://github.com/YOYOMANU"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                        {...buttonHoverTap}
                    >
                        <GithubIcon size={sizeIcon} />
                        <span>Voir mon GitHub</span>
                    </motion.a>
                </motion.div>
            </motion.div>
        </section>
    );
}