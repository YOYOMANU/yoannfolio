import { GithubIcon, MailIcon } from 'lucide-react';
import { sizeIcon } from './selected-projects';
import { Link } from '@inertiajs/react';
import contact from '@/routes/contact';
export default function ContactSection() {
    return (
        <section id="contact" className="contact">
            <div className="reveal reveal-visible">
                <h2 className="font-display">Discutons de votre projet.</h2>
                <p>Que ce soit pour construire, refondre ou échanger sur une architecture — je réponds rapidement.</p>

                <div className="contact-ctas">
                    {/* Lien mailto natif (externe à Inertia) */}
                    <Link href={contact.create()} className="btn btn-primary">
                        <MailIcon size={sizeIcon} />
                        <span>Écrire un message</span>
                    </Link>

                    {/* Lien GitHub externe natif avec sécurité target="_blank" */}
                    <a
                        href="https://github.com/YOYOMANU"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline"
                    >
                        <GithubIcon size={sizeIcon} />
                        <span>Voir mon GitHub</span>
                    </a>
                </div>
            </div>
        </section>
    );
}