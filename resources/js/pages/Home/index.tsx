import Apropos from "@/components/a-propos";
import ContactSection from "@/components/contact-section";
import Hero from "@/components/hero";
import NavigationHome from "@/components/public-navbar"
import SelectedProjects from "@/components/selected-projects";
import StackSection from "@/components/stack-section";
import { WithPublicLayout } from "@/layouts/public-layout"
import { Category, Project } from "@/types";
import confetti from "canvas-confetti";
import { useEffect } from "react";

type Props = {
    categories: Category[];
    Projects: Project[];
}



function Home({ categories, Projects }: Props) {
    confetti({ particleCount: 150, spread: 100 })
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