import { Link } from '@inertiajs/react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Project } from '@/types';
import { home } from '@/routes';
import { WithPublicLayout } from '@/layouts/public-layout';

export const sizeIcon = 16;

type Props = {
    project: Project;
};

function ProjectShow({ project }: Props) {
    console.log(project);

    return (
        <div className='p-15'>
            <div className="view-header" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: '1.5rem' }}>
                <Link href={home()} className="back-link">
                    <ArrowLeft size={sizeIcon} />
                    Retour aux projets
                </Link>

                <p className="project-tag font-mono" style={{ marginBottom: '0.5rem' }}>
                    {project.category}
                </p>

                <h1
                    className="font-display"
                    style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', lineHeight: 1.1 }}
                >
                    {project.title}
                </h1>
            </div>

            <div className={`details-swatch ${project.swatch_class}`} style={{ background: project.image ? `url(${project.image}) center center/cover` : '' }} />

            <div className="details-grid">
                <div className="details-content">
                    <h2 className="font-display" style={{ fontSize: '1.75rem' }}>
                        Description globale
                    </h2>
                    <p>{project.long_description}</p>

                    <h3>Le Problème</h3>
                    <p>{project.problem}</p>

                    <h3>La Solution Technique</h3>
                    <p>{project.solution}</p>

                    <h3>Fonctionnalités clés développées</h3>
                    <div className="flex flex-col gap-4">
                        {project.features.map((feature) => (
                            <div key={feature.id} className="feature-card">
                                <h4>{feature.title}</h4>
                                <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.5 }}>
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="details-meta-box">
                        <h3
                            className="font-display"
                            style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '1.25rem' }}
                        >
                            Spécifications
                        </h3>

                        <div className="meta-item">
                            <span className="meta-label">Rôle</span>
                            <span className="meta-value">{project.role}</span>
                        </div>

                        <div className="meta-item">
                            <span className="meta-label">Contexte</span>
                            <span className="meta-value">{project.context}</span>
                        </div>

                        <div className="meta-item">
                            <span className="meta-label">Technologies</span>
                            <span className="meta-value" style={{ textAlign: 'right', maxWidth: '60%' }}>
                                {project.technologies.map((tech) => tech.name).join(', ')}
                            </span>
                        </div>

                        {project.live_url && (
                            <div style={{ marginTop: '2rem' }}>
                                <Link
                                    href={project.live_url}
                                    rel="noopener noreferrer"
                                    className="btn btn-primary"
                                    style={{ width: '100%', justifyContent: 'center' }}
                                >
                                    Visiter le projet live
                                    <ExternalLink size={sizeIcon} />
                                </Link>
                            </div>
                        )}
                        {project.repo_url && (
                            <div style={{ marginTop: '2rem' }}>
                                <Link
                                    href={project.repo_url}
                                    target='blank'
                                    rel="noopener noreferrer"
                                    className="btn btn-primary"
                                    style={{ width: '100%', justifyContent: 'center' }}
                                >
                                    Visiter le dépôt
                                    <ExternalLink size={sizeIcon} />
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WithPublicLayout(ProjectShow);