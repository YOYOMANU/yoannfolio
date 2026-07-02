// resources/js/Components/StackSection.jsx
import type { Variants } from 'framer-motion';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import type { Category } from '@/types';

type Props = {
    categories: Category[];
}

// Variantes pour les animations d'entrée séquentielle (Stagger)
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1, // Délai entre chaque enfant
            delayChildren: 0.2, // Délai avant de commencer
        },
    },
} satisfies Variants;

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1] },
    },
} satisfies Variants;

// Variantes pour le panneau de détails (Focus) avec AnimatePresence
const detailsVariants = {
    initial: { opacity: 0, x: 20 },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut",
            staggerChildren: 0.05, // Pour les tags tech à l'intérieur
            delayChildren: 0.1
        }
    },
    exit: {
        opacity: 0,
        x: -10,
        transition: { duration: 0.2, ease: "easeIn" }
    }
} satisfies Variants;

const techTagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
} satisfies Variants;
export default function StackSection({ categories }: Props) {
    const [activeId, setActiveId] = useState(categories[0]?.id);
    const activeCategory = categories.find((c) => c.id === activeId) ?? categories[0];


    return (
        <section id="stack" className="bg-background py-24 text-foreground border-t border-border sm:py-32 relative overflow-hidden">
            {/* Lueurs d'arrière-plan animées (Optionnel, subtil) */}
            <motion.div
                className="absolute top-0 right-0 w-150 h-150 bg-[radial-gradient(circle,rgba(232,163,61,0.05),transparent_70%)] pointer-events-none"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            />

            <motion.div
                className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10"
                initial="hidden"
                whileInView="visible" // S'anime quand visible à l'écran
                viewport={{ once: true, amount: 0.2 }} // S'active une seule fois, quand 20% est visible
                variants={containerVariants}
            >

                <motion.div className="mx-auto max-w-2xl text-center mb-16 lg:mb-20" variants={itemVariants}>
                    <span className="font-mono text-xs font-bold tracking-widest text-primary uppercase bg-(--accent-dim) px-3 py-1 rounded-md border border-border">
                        Technique
                    </span>
                    <h2 className="font-display mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        La stack que je maîtrise.
                    </h2>
                    <p className="mt-4 text-base leading-7 text-muted-foreground">
                        Chaque couche est un levier — du pixel jusqu'à l'infrastructure.
                        Sélectionnez une catégorie pour explorer l'écosystème associé.
                    </p>
                </motion.div>

                {/* Grille principale animée */}
                <motion.div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" variants={itemVariants}>

                    <motion.div className="lg:col-span-7 flex flex-col gap-4" variants={containerVariants}>
                        {categories.map((c, idx) => {
                            const isActive = c.id === activeId;

                            return (
                                <motion.div
                                    key={c.id}
                                    onClick={() => setActiveId(c.id)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            setActiveId(c.id);
                                        }
                                    }}
                                    aria-pressed={isActive}
                                    className={`group relative p-6 rounded-lg border cursor-pointer text-left outline-none focus-visible:ring-2 focus-visible:ring-(--primary)
                                        ${isActive
                                            ? 'bg-(--secondary) border-(--primary) shadow-sm'
                                            : 'bg-card border-border hover:bg-(--secondary) hover:border-border'
                                        }`}
                                    style={isActive ? {
                                        background: 'linear-gradient(135deg, var(--accent-dim), var(--secondary))',
                                        boxShadow: '0 8px 30px rgba(232, 163, 61, 0.08)'
                                    } : {}}
                                    variants={itemVariants} // Chaque item s'anime à l'entrée
                                    whileHover={{ scale: 1.01, x: 2, transition: { duration: 0.2 } }} // Effet survol
                                    whileTap={{ scale: 0.99 }} // Effet clic
                                >
                                    {/* Barre latérale active */}
                                    <div className={`absolute left-0 top-1/4 bottom-1/4 w-1 rounded-r-md transition-all duration-300
                                        ${isActive ? 'bg-(--primary)' : 'bg-transparent group-hover:bg-muted-foreground/30'}`}
                                    />

                                    <div className="flex items-center justify-between gap-4 pl-2">
                                        <div className="flex items-center gap-4">
                                            <span className="font-mono text-xs px-2 py-0.5 rounded bg-(--accent) text-(--accent-foreground) font-semibold transition-colors duration-300">
                                                {String(idx + 1).padStart(2, '0')}
                                            </span>
                                            <h3 className="font-semibold tracking-wide text-base text-foreground">
                                                {c.name}
                                            </h3>
                                        </div>

                                        <ChevronRight size={18} className={isActive ? "text-(--primary)" : ''} />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* Panneau de détails animé avec AnimatePresence */}
                    <div className="lg:col-span-5 h-full relative min-h-[350px]"> {/* min-h pour éviter le saut de layout */}
                        <AnimatePresence mode="wait"> {/* Attend que l'ancien sorte avant de faire entrer le nouveau */}
                            {activeCategory && (
                                <motion.div
                                    key={activeCategory.id} // Clé unique essentielle pour AnimatePresence
                                    className="h-full bg-card border-l-2 border-l-[var(--primary)] border-y border-r border-border rounded-[var(--radius-lg)] p-8 flex flex-col justify-between shadow-sm"
                                    variants={detailsVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                >
                                    <div>
                                        <span className="font-mono text-xs text-primary font-semibold uppercase tracking-wider">
                                            Focus — {activeCategory.name}
                                        </span>
                                        <h3 className="text-xl font-bold text-foreground mt-2 mb-4 tracking-tight">
                                            {activeCategory.name}
                                        </h3>
                                        {activeCategory.description && (
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {activeCategory.description}
                                            </p>
                                        )}
                                    </div>

                                    {/* Section Technologies Clés */}
                                    <div className="mt-8 pt-6 border-t border-border">
                                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                                            Technologies clés
                                        </h4>
                                        <motion.div className="flex flex-wrap gap-2" variants={containerVariants} initial="hidden" animate="visible">
                                            {activeCategory.technologies.map((tech) => (
                                                <motion.span
                                                    key={tech.id}
                                                    className="inline-flex items-center font-mono text-[11px] font-medium bg-card text-muted-foreground px-2.5 py-1 rounded border border-border hover:border-[var(--primary)] hover:text-foreground transition-colors duration-200 uppercase tracking-wider"
                                                    variants={techTagVariants} // Animation tag par tag
                                                    whileHover={{ y: -2, scale: 1.05 }} // Petit effet survol tag
                                                >
                                                    {tech.name}
                                                </motion.span>
                                            ))}
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </motion.div>
            </motion.div>
        </section>
    );
}