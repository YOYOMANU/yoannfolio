// resources/js/Components/Apropos.jsx
import { Link } from '@inertiajs/react';
import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import contact from '@/routes/contact';

// Configuration de la cascade d'apparition au scroll
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15, // Délai entre le titre, le texte et le lien
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
            ease: [0.215, 0.61, 0.355, 1],
        },
    },
} satisfies Variants;

// Animation de la flèche au survol
const arrowVariants = {
    rest: { x: 0 },
    hover: { x: 4, transition: { type: "spring", stiffness: 400, damping: 12 } },
} satisfies Variants;

export default function Apropos() {
    return (
        <section id='apropos' className="geeklab" style={{ overflow: 'hidden' }}>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }} // Déclenche l'animation quand 30% de la section est visible
                variants={containerVariants}
            >
                <div className="geeklab-inner">
                    <motion.h2 className="font-display" variants={itemVariants}>
                        Au-delà du code
                    </motion.h2>

                    <motion.p variants={itemVariants}>
                        Je suis aussi fondateur de <strong>GeekLab</strong>, un club tech étudiant où j'anime des sessions hebdomadaires et prépare les membres aux hackathons. Transmettre ce que j'apprends fait partie de la manière dont je travaille.
                    </motion.p>

                    {/* Lien d'Inertia encapsulé dans un composant motion pour l'interactivité */}
                    <motion.div
                        variants={itemVariants}
                        initial="rest"
                        whileHover="hover"
                        whileTap={{ scale: 0.99 }}
                        style={{ display: 'inline-block' }}
                    >
                        <Link
                            href={contact.create()}
                            className="card-link"
                            style={{
                                color: 'var(--primary)',
                                fontWeight: 500,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            Me contacter au sujet du club
                            <motion.span variants={arrowVariants} className="inline-flex items-center">
                                <ArrowRight size={18} />
                            </motion.span>
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}