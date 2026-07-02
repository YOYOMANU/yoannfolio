import confetti from "canvas-confetti";
import Apropos from "@/components/a-propos";
import ContactSection from "@/components/contact-section";
import Hero from "@/components/hero";
import SelectedProjects from "@/components/selected-projects";
import StackSection from "@/components/stack-section";
import { WithPublicLayout } from "@/layouts/public-layout"
import type { Category, Project } from "@/types";

type Props = {
    categories: Category[];
    Projects: Project[];
}



function Home({ categories, Projects }: Props) {
    confetti({ particleCount: 150, spread: 90 })

    return (
        <>
            <Hero />
            <StackSection categories={categories} />
            <SelectedProjects Projects={Projects} />
            <Apropos />
            <ContactSection />
        </>
    );
};


export default WithPublicLayout(Home)