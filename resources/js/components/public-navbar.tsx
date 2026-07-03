import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { dashboard } from '@/routes';
import contact from '@/routes/contact';
import { Menu, X } from 'lucide-react';

export default function NavigationHome() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, is_admin } = useAuth();

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

    return (
        <>
            {/* Header principal */}
            <header className="fixed top-0 left-0 right-0 nav-blur z-50">
                <div className="nav-inner flex items-center justify-between px-4 py-3 sm:py-4 max-w-7xl mx-auto">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="font-mono logo text-sm sm:text-[16px] font-bold z-50 relative"
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
                        <Link href={contact.create()} className="btn btn-outline nav-cta">
                            Me contacter
                        </Link>
                        {user && is_admin && (
                            <Link className="btn btn-primary nav-cta" href={dashboard()}>
                                Dashboard
                            </Link>
                        )}
                    </div>

                    {/* Bouton Burger Mobile */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden p-2 -mr-2 text-current hover:text-primary transition-colors focus:outline-none z-50 relative"
                        aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                        aria-expanded={isMenuOpen}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </header>

            {/* Overlay + Menu Mobile */}
            <div className={`fixed inset-0 z-40 md:hidden ${isMenuOpen ? 'visible' : 'invisible'}`}>
                {/* Fond sombre avec blur */}
                <div
                    className={`absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'
                        }`}
                    onClick={closeMenu}
                />

                {/* Panneau de menu */}
                <div
                    className={`absolute right-0 top-0 bottom-0 w-[85%] max-w-[320px] bg-gray-900 border-l border-gray-800 shadow-2xl transform transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    {/* Container avec padding et défilement si nécessaire */}
                    <div className="h-full flex flex-col p-6 pt-24 overflow-y-auto">
                        {/* Navigation */}
                        <nav className="flex-1 flex flex-col gap-2">
                            <Link
                                href="/#stack"
                                className="block px-4 py-4 text-lg font-medium text-white bg-gray-800/50 rounded-xl hover:bg-gray-800 hover:text-primary transition-all duration-200 border border-gray-700/30"
                                onClick={closeMenu}
                            >
                                <span className="flex items-center gap-3">
                                    <span className="text-primary">01.</span>
                                    Stack
                                </span>
                            </Link>
                            <Link
                                href="/#projets"
                                className="block px-4 py-4 text-lg font-medium text-white bg-gray-800/50 rounded-xl hover:bg-gray-800 hover:text-primary transition-all duration-200 border border-gray-700/30"
                                onClick={closeMenu}
                            >
                                <span className="flex items-center gap-3">
                                    <span className="text-primary">02.</span>
                                    Projets
                                </span>
                            </Link>
                            <Link
                                href="/#apropos"
                                className="block px-4 py-4 text-lg font-medium text-white bg-gray-800/50 rounded-xl hover:bg-gray-800 hover:text-primary transition-all duration-200 border border-gray-700/30"
                                onClick={closeMenu}
                            >
                                <span className="flex items-center gap-3">
                                    <span className="text-primary">03.</span>
                                    À propos
                                </span>
                            </Link>
                            <Link
                                href="/#contact"
                                className="block px-4 py-4 text-lg font-medium text-white bg-gray-800/50 rounded-xl hover:bg-gray-800 hover:text-primary transition-all duration-200 border border-gray-700/30"
                                onClick={closeMenu}
                            >
                                <span className="flex items-center gap-3">
                                    <span className="text-primary">04.</span>
                                    Contact
                                </span>
                            </Link>
                        </nav>

                        {/* CTAs en bas */}
                        <div className="flex flex-col gap-3 mt-8 pt-6 border-t border-gray-800">
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