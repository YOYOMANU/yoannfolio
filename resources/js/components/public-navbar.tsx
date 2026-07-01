import { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function NavigationHome() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className="nav-blur">
            <div className="nav-inner">
                <Link href="/" className="font-mono logo text-[16px] font-bold">
                    YOANN<span style={{ color: 'var(--primary)' }}>·</span>EMMANUEL
                </Link>

                <nav className="nav-links">
                    <Link href="/#projets" className="nav-link">
                        Projets
                    </Link>
                    <Link href="/#apropos" className="nav-link">
                        À propos
                    </Link>
                    <Link href="/#contact" className="nav-link">
                        Contact
                    </Link>
                </nav>

                <Link href="/#contact" className="btn btn-outline nav-cta">
                    Me contacter
                </Link>

                <button
                    className="nav-toggle"
                    aria-label="Ouvrir le menu"
                    aria-expanded={isMenuOpen}
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                >
                    <span className="icon" style={{ display: isMenuOpen ? 'none' : 'inline-flex' }}>
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            width="22"
                            height="22"
                        >
                            <line x1="4" x2="20" y1="6" y2="6" />
                            <line x1="4" x2="20" y1="12" y2="12" />
                            <line x1="4" x2="20" y1="18" y2="18" />
                        </svg>
                    </span>
                    <span className="icon" style={{ display: isMenuOpen ? 'inline-flex' : 'none' }}>
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            width="22"
                            height="22"
                        >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    </span>
                </button>
            </div>

            <div className="nav-mobile" id="navMobile" style={{ display: isMenuOpen ? 'block' : 'none' }}>
                <div className="flex flex-col">
                    <Link href="/#projets" className="nav-link" onClick={closeMenu}>
                        Projets
                    </Link>
                    <Link href="/#apropos" className="nav-link" onClick={closeMenu}>
                        À propos
                    </Link>
                    <Link href="/#contact" className="nav-link" onClick={closeMenu}>
                        Contact
                    </Link>
                </div>
            </div>
        </header>
    );
}