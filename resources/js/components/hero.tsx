// resources/js/Components/Hero.jsx
import { Link } from '@inertiajs/react';
import { ArrowRight, GraduationCap, Layers, Users } from 'lucide-react';
import { sizeIcon } from './selected-projects';

export default function Hero() {
    return (
        <section className="hero">
            <div className="glow"></div>
            <div className="glow-2"></div>

            <div className="container">
                <div className="hero-grid">
                    {/* Colonne de gauche : Texte */}
                    <div>
                        <p className="font-mono eyebrow reveal">
                            Ingénieur logiciel · Abidjan, Côte d'Ivoire
                        </p>

                        <h1 className="font-display" style={{ transitionDelay: '80ms' }}>
                            Une seule personne, toutes les <em>couches</em> du produit.
                        </h1>

                        <p className="hero-sub" style={{ transitionDelay: '160ms' }}>
                            Interfaces mobiles et web, APIs, bases de données, déploiement — je conçois
                            et je construis chaque maillon du produit, sans jamais sacrifier la cohérence.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-wrap items-center gap-4 hero-ctas reveal" style={{ transitionDelay: '240ms' }}>
                            <Link
                                href="/#projets"
                                className="btn btn-primary"
                                preserveScroll={true}
                            >
                                Voir mes projets
                                <ArrowRight size={sizeIcon} />
                            </Link>

                            <Link
                                href="/#contact"
                                className="btn btn-outline"
                                preserveScroll={true}
                            >
                                Me contacter
                            </Link>
                        </div>

                        {/* Statistiques */}
                        <div className="flex flex-wrap gap-8 reveal" style={{ transitionDelay: '320ms' }}>
                            <div className="flex items-center gap-2 stat">
                                <Layers size={sizeIcon} />
                                <span className="stat-label">12+ technologies maîtrisées</span>
                            </div>

                            <div className="flex items-center gap-2 stat">
                                <Users size={sizeIcon} />
                                <span className="stat-label">Fondateur — GeekLab</span>
                            </div>

                            <div className="flex items-center gap-2 stat">
                                <GraduationCap size={sizeIcon} />
                                <span className="stat-label">3ᵉ année — Génie Logiciel</span>
                            </div>
                        </div>
                    </div>

                    {/* Colonne de droite : Photo */}
                    <div className="reveal" style={{ transitionDelay: '200ms' }}>
                        <div className="photo-section">
                            <div className="photo-container">
                                {/* <img
                                    src={photoUrl}
                                    alt="Yoann Emmanuel"

                                /> */}
                                <div className="photo-placeholder" style={{ display: 'flex' }}>
                                    YE
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}