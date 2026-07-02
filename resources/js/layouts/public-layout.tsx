import type { SharedPageProps } from '@inertiajs/core';
import { usePage } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import {  useEffect } from "react";
import type { ReactNode} from "react";
import type {FC} from "react";
import { toast } from "sonner";
import NavigationHome from "@/components/public-navbar";
import { Toaster } from "@/components/ui/sonner";
import Footer from "../components/footer";

interface PublicLayoutProps {
    children: ReactNode,
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
    const page = usePage<SharedPageProps>();

    useEffect(() => {
        if (page.props.flash?.success) {
            toast.success(page.props.flash?.success)
        }

        if (page.props.flash?.error) {
            toast.error(page.props.flash?.error)
        }

    }, [page.props.flash]);

    return (
        <div className="flex min-h-screen flex-col">
            <NavigationHome />
            <AnimatePresence mode="popLayout">
                <motion.main
                    className="flex-1"
                    key={page.url}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {children}
                </motion.main>
            </AnimatePresence>
            <Footer />
            <Toaster richColors position="top-center" closeButton />

        </div>
    )
}

export function WithPublicLayout<T>(component: FC<T>) {
    //@ts-expect-error layout exist for inertia
    component.layout = (page: ReactNode) => (
        <PublicLayout>
            {page}
        </PublicLayout>
    );

    return component;
}

export default PublicLayout;