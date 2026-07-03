import { Link } from '@inertiajs/react';
import { BookOpen, Code2Icon, FolderGit2, FolderOpenDotIcon, Grid2X2Check, HomeIcon, LayoutGrid } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard, home } from '@/routes';
import category from '@/routes/category';
import project from '@/routes/project';
import technology from '@/routes/technology';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Accueil',
        href: home(),
        icon: HomeIcon,
    },
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Projets',
        href: project.index(),
        icon: FolderOpenDotIcon,
    },
    {
        title: 'Technologies',
        href: technology.index(),
        icon: Code2Icon,
    },
    {
        title: 'Categories',
        href: category.index(),
        icon: Grid2X2Check,
    }
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/YOYOMANU/yoannfolio',
        icon: FolderGit2,
    },
    // {
    //     title: 'Documentation',
    //     href: 'https://laravel.com/docs/starter-kits#react',
    //     icon: BookOpen,
    // },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
