import Apropos from "@/components/a-propos";
import ContactSection from "@/components/contact-section";
import Hero from "@/components/hero";
import NavigationHome from "@/components/public-navbar"
import SelectedProjects from "@/components/selected-projects";
import StackSection from "@/components/stack-section";
import { WithPublicLayout } from "@/layouts/public-layout"
import { Category, Project } from "@/types";

type Props = {
    categories: Category[];
    Projects: Project[];
}

function Home({ categories, Projects }: Props) {


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