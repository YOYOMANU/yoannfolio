import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

export default function Apropos() {
    return (
        <section className="geeklab">
            <div>
                <div className="geeklab-inner">
                    <h2 className="font-display">Au-delà du code</h2>
                    <p>
                        Je suis aussi fondateur de <strong>GeekLab</strong>, un club tech étudiant où j'anime des sessions hebdomadaires et prépare les membres aux hackathons. Transmettre ce que j'apprends fait partie de la manière dont je travaille.
                    </p>

                    {/* Utilisation de Link d'Inertia pour une navigation interne fluide et respect de la charte */}
                    <Link
                        href="#contact"
                        className="card-link"
                        style={{ color: 'var(--primary)', fontWeight: 500 }}
                    >
                        Me contacter au sujet du club
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
}