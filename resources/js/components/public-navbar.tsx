import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { dashboard } from '@/routes';
import contact from '@/routes/contact';
import { Menu, X, Sun, Moon, Laptop } from 'lucide-react';

// Importations des composants shadcn
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function NavigationHome() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, is_admin } = useAuth();
    const [theme, setThemeState] = useState<"light" | "dark" | "system">("system");

    const closeMenu = () => setIsMenuOpen(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Empêcher le scroll quand le menu est ouvert
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    // Logique basique de synchronisation du thème avec la classe globale 'dark' (Tailwind)
    useEffect(() => {
        const root = window.document.documentElement;
        const localTheme = localStorage.getItem("theme") as "light" | "dark" | "system" | null;
        const initialTheme = localTheme || "system";

        setThemeState(initialTheme);
        applyTheme(initialTheme, root);
    }, []);

    const applyTheme = (newTheme: "light" | "dark" | "system", root: HTMLElement) => {
        root.classList.remove("light", "dark");

        if (newTheme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            root.classList.add(systemTheme);
        } else {
            root.classList.add(newTheme);
        }
    };

    const changeTheme = (newTheme: "light" | "dark" | "system") => {
        const root = window.document.documentElement;
        setThemeState(newTheme);
        localStorage.setItem("theme", newTheme);
        applyTheme(newTheme, root);
    };

    // Composant réutilisable pour éviter la duplication Desktop / Mobile
    const ModeToggle = () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="w-10 h-10 rounded-xl bg-transparent border-gray-200 dark:border-gray-800 text-foreground">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Changer le thème</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl border border-gray-200 dark:border-gray-800 bg-background text-foreground">
                <DropdownMenuItem onClick={() => changeTheme("light")} className="gap-2 cursor-pointer rounded-lg">
                    <Sun size={16} /> Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeTheme("dark")} className="gap-2 cursor-pointer rounded-lg">
                    <Moon size={16} /> Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeTheme("system")} className="gap-2 cursor-pointer rounded-lg">
                    <Laptop size={16} /> Système
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );

    return (
        <>
            {/* Header principal */}
            <header className="fixed top-0 left-0 right-0 nav-blur z-50 bg-background/80 border-b border-gray-200/50 dark:border-gray-800/50">
                <div className="nav-inner flex items-center justify-between px-4 py-3 sm:py-4 max-w-7xl mx-auto">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="font-mono logo text-sm sm:text-[16px] font-bold z-50 relative text-foreground"
                        onClick={closeMenu}
                    >
                        YOANN<span style={{ color: 'var(--primary)' }}>·</span>EMMANUEL
                    </Link>

                    {/* Navigation Desktop */}
                    <nav className="nav-links hidden md:flex items-center gap-6">
                        <Link href="/#stack" className="nav-link">Stack</Link>
                        <Link href="/#projets" className="nav-link">Projets</Link>
                        <Link href="/#apropos" className="nav-link">À propos</Link>
                        <Link href="/#contact" className="nav-link">Contact</Link>
                    </nav>

                    {/* Actions Desktop */}
                    <div className="hidden md:flex flex-row gap-2 items-center">
                        <ModeToggle />
                        <Link href={contact.create()} className="btn btn-outline nav-cta">
                            Me contacter
                        </Link>
                        {user && is_admin && (
                            <Link className="btn btn-primary nav-cta" href={dashboard()}>
                                Dashboard
                            </Link>
                        )}
                    </div>

                    {/* Boutons Mobile (Toggle + Burger) */}
                    <div className="flex items-center gap-2 md:hidden z-50 relative">
                        <ModeToggle />
                        <button
                            onClick={toggleMenu}
                            className="p-2 -mr-2 text-foreground hover:text-primary transition-colors focus:outline-none"
                            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                            aria-expanded={isMenuOpen}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Overlay + Menu Mobile */}
            <div className={`fixed inset-0 z-40 md:hidden ${isMenuOpen ? 'visible' : 'invisible'}`}>
                {/* Fond sombre avec blur */}
                <div
                    className={`absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'
                        }`}
                    onClick={closeMenu}
                />

                {/* Panneau de menu */}
                <div
                    className={`absolute right-0 top-0 bottom-0 w-[85%] max-w-[320px] bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 shadow-2xl transform transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    <div className="h-full flex flex-col p-6 pt-24 overflow-y-auto">
                        {/* Navigation */}
                        <nav className="flex-1 flex flex-col gap-2">
                            {[
                                { href: "/#stack", num: "01.", label: "Stack" },
                                { href: "/#projets", num: "02.", label: "Projets" },
                                { href: "/#apropos", num: "03.", label: "À propos" },
                                { href: "/#contact", num: "04.", label: "Contact" },
                            ].map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="block px-4 py-4 text-lg font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-primary transition-all duration-200 border border-gray-200/50 dark:border-gray-700/30"
                                    onClick={closeMenu}
                                    Mention
                                >
                                    <span className="flex items-center gap-3">
                                        <span className="text-primary">{item.num}</span>
                                        {item.label}
                                    </span>
                                </Link>
                            ))}
                        </nav>

                        {/* CTAs en bas */}
                        <div className="flex flex-col gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                            <Link
                                href={contact.create()}
                                className="btn btn-outline w-full justify-center py-4 text-base font-medium"
                                onClick={closeMenu}
                            >
                                Me contacter
                            </Link>
                            {user && is_admin && (
                                <Link
                                    className="btn btn-primary w-full justify-center py-4 text-base font-medium"
                                    href={dashboard()}
                                    onClick={closeMenu}
                                >
                                    Dashboard
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}