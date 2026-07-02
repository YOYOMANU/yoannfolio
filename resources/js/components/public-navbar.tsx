import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { dashboard } from '@/routes';
import contact from '@/routes/contact';

export default function NavigationHome() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, is_admin } = useAuth();
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className="nav-blur">
            <div className="nav-inner">
                <Link href="/" className="font-mono logo text-[16px] font-bold">
                    YOANN<span style={{ color: 'var(--primary)' }}>·</span>EMMANUEL
                </Link>

                <nav className="nav-links">
                    <Link href="/#stack" className="nav-link">
                        Stack
                    </Link>
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

                <div className='flex flex-row gap-2'>

                    <Link href={contact.create()} className="btn btn-outline nav-cta">
                        Me contacter
                    </Link>
                    {user && is_admin && (
                        <Link className="btn btn-primary nav-cta" href={dashboard()}>
                            Dashboard
                        </Link>
                    )}
                </div>
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