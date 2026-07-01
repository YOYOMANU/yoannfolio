import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { SharedPageProps } from '@inertiajs/core'
import { type FC, ReactNode, useEffect } from 'react';
import { toast } from 'sonner';


interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

const AppLayout = ({
    breadcrumbs = [],
    children,
    ...props
}: AppLayoutProps) => {

    const page = usePage<SharedPageProps>();
    useEffect(() => {
        if (page.props.flash.success) {
            toast.success(page.props.flash.success);
        }

        if (page.props.flash.error) {
            toast.error(page.props.flash.error)
        }

    }, [page.props.flash]);

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
        </AppLayoutTemplate>
    );
}

export function WithAppLayout<T>(
    breadcrumbs: BreadcrumbItem[],
    component: FC<T>,
) {
    //@ts-expect-error layout exist for inertia
    component.layout = (page: ReactNode) => (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-4 lg:p-6">{page}</div>
        </AppLayout>
    );

    return component;
}

export default AppLayout;