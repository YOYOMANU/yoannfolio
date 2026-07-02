// resources/js/Components/ProjectList.jsx
import type { Variants } from "framer-motion";
import { motion } from "framer-motion"
import type { Project } from "@/types"
import ProjectItem from "./project-item"

type Props = {
    Projects: Project[]
}

// Animation d'apparition individuelle pour chaque carte de projet
const projectItemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.215, 0.61, 0.355, 1], // Transition fluide et naturelle
        },
    },
} satisfies Variants;

export default function ProjectList({ Projects }: Props) {
    return (
        <div className="projects-grid">
            {Projects.map((project) => (
                <motion.div
                    key={project.id}
                    itemID={`porject${project.id}`}
                    variants={projectItemVariants}
                    whileHover={{
                        y: -6,
                        scale: 1.01,
                        transition: { duration: 0.2, ease: "easeInOut" }
                    }}
                    whileTap={{ scale: 0.99 }}
                    className="h-full" // Assure que le wrapper respecte la hauteur de la grille
                >
                    <ProjectItem project={project} />
                </motion.div>
            ))}
        </div>
    );
}