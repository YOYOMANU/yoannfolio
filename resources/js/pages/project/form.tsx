import { Form, useForm } from '@inertiajs/react';
import {
    SaveIcon,
    ImageIcon,
    Layers,
    ListChecks,
    BookOpen,
    Settings2,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import ProjectPreviewCard from '@/components/project-preview-card';
import Section from '@/components/section';
import { TopAction } from '@/components/top-action';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import type { FeatureInput } from '@/components/ui/feature-list-input';
import { FeatureListInput } from '@/components/ui/feature-list-input';
import { FormField } from '@/components/ui/form-field';
import { ImageInput } from '@/components/ui/image-input';
import { Input } from '@/components/ui/input';
import { MultiSelect } from '@/components/ui/multi-select';
import { SelectWithItems } from '@/components/ui/select-with-items';
import { Textarea } from '@/components/ui/textarea';
import { WithAppLayout } from '@/layouts/app-layout';
import project from '@/routes/project';
import type { BreadcrumbItem, PreviewState, Project, SelectOption, Technology } from '@/types';

const Breadcrumbs: BreadcrumbItem[] = [
    { title: 'Projet', href: project.index().url },
    { title: 'Éditer', href: '#' },
];

type Props = {
    Project: Project;
    technologies: Technology[];
};

const statusOptions: SelectOption[] = [
    { value: 'draft', label: 'Brouillon' },
    { value: 'published', label: 'Publié' },
];

function ProjectEditPage({ Project, technologies }: Props) {

    const action = Project.id
        ? project.update.form({ project: parseInt(Project.id) })
        : project.store.form();

    const [preview, setPreview] = useState<PreviewState>({
        title: Project.title ?? '',
        category: Project.category ?? '',
        short_description: Project.short_description ?? '',
        swatch_class: Project.swatch_class ?? '',
        role: Project.role ?? '',
        context: Project.context ?? '',
        live_url: Project.live_url ?? '',
        repo_url: Project.repo_url ?? '',
        status: Project.status ?? 'draft',
        is_featured: Boolean(Project.is_featured),
        image: Project.image ?? null,
    });

    const updatePreview = <K extends keyof PreviewState>(key: K, value: PreviewState[K]) =>
        setPreview((p) => ({ ...p, [key]: value }));

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            updatePreview('image', URL.createObjectURL(file));
        }
    };

    const defaultTechnologies = Project.technologies?.map((t) => t.id) ?? [];
    const { data, setData } = useForm({
        technology_ids: defaultTechnologies,
    });

    const technologyOptions = technologies.map((t) => ({
        value: t.id,
        label: t.name,
    }));

    useEffect(() => {
        return () => {
            if (preview.image?.startsWith('blob:')) {
                URL.revokeObjectURL(preview.image);
            }
        };
    }, [preview.image]);

    const [features, setFeatures] = useState<FeatureInput[]>(
        Project.features?.map((f) => ({ id: f.id, title: f.title, description: f.description })) ?? []
    );

    return (
        <Form {...action}>
            {({ errors, processing }) => (
                <>
                    <div className="mb-8 space-y-1">
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">
                            {Project.id ? 'Modifier le projet' : 'Nouveau projet'}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            L'aperçu à droite se met à jour en direct pendant que tu remplis le formulaire.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:gap-10">
                        <div className="space-y-6">
                            {/* Visuel + Identité, regroupés */}
                            <Section title="Identité" description="Image et titre du projet" icon={ImageIcon}>
                                <div className="flex gap-4">
                                    <FormField htmlFor="image" label="Image" error={errors.image}>
                                        <ImageInput
                                            id="image"
                                            className="aspect-square w-32"
                                            name="image"
                                            defaultValue={Project.image}
                                            onChange={handleImageChange}
                                        />
                                    </FormField>

                                    <div className="flex-1">
                                        <FormField htmlFor="title" label="Titre" error={errors.title}>
                                            <Input
                                                id="title"
                                                name="title"
                                                defaultValue={Project.title}
                                                onChange={(e) => updatePreview('title', e.target.value)}
                                                aria-invalid={!!errors.title}
                                                placeholder="Ex. Villa moderne avec piscine à Cocody"
                                            />
                                        </FormField>
                                    </div>
                                </div>
                            </Section>

                            {/* Stack technique */}
                            <Section title="Stack technique" description="Technologies utilisées sur ce projet" icon={Layers}>
                                <FormField
                                    htmlFor="technologies"
                                    label="Technologies"
                                    error={errors['technology_ids']}
                                >
                                    {data.technology_ids.map((id) => (
                                        <input
                                            key={id}
                                            type="hidden"
                                            name="technology_ids[]"
                                            value={id}
                                        />
                                    ))}
                                    <MultiSelect
                                        id="technologies"
                                        options={technologyOptions}
                                        value={data.technology_ids}
                                        onChange={(ids) => setData('technology_ids', ids as string[])}
                                        placeholder="Associer des technologies…"
                                    />
                                </FormField>
                            </Section>

                            {/* Fonctionnalités clés */}
                            <Section
                                title="Fonctionnalités clés"
                                description="Ce que tu as concrètement développé sur ce projet"
                                icon={ListChecks}
                            >
                                <FeatureListInput
                                    value={features}
                                    onChange={setFeatures}
                                    errors={errors}
                                />
                            </Section>

                            {/* Présentation + Storytelling, regroupés */}
                            <Section
                                title="Contenu éditorial"
                                description="Ce que les visiteurs liront : présentation et storytelling"
                                icon={BookOpen}
                            >
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <FormField htmlFor="short_description" label="Description courte" error={errors.short_description}>
                                        <Textarea
                                            id="short_description"
                                            name="short_description"
                                            rows={3}
                                            defaultValue={Project.short_description}
                                            onChange={(e) => updatePreview('short_description', e.target.value)}
                                            aria-invalid={!!errors.short_description}
                                            placeholder="Résumé en une phrase pour les cartes/listes"
                                        />
                                    </FormField>

                                    <FormField htmlFor="long_description" label="Description complète" error={errors.long_description}>
                                        <Textarea
                                            id="long_description"
                                            name="long_description"
                                            rows={3}
                                            defaultValue={Project.long_description}
                                            aria-invalid={!!errors.long_description}
                                            placeholder="Décris le projet : contexte, ambiance, fonctionnalités..."
                                        />
                                    </FormField>

                                    <FormField htmlFor="problem" label="Problème" error={errors.problem}>
                                        <Textarea
                                            id="problem"
                                            name="problem"
                                            rows={3}
                                            defaultValue={Project.problem}
                                            aria-invalid={!!errors.problem}
                                            placeholder="Quel problème ce projet résout-il ?"
                                        />
                                    </FormField>

                                    <FormField htmlFor="solution" label="Solution" error={errors.solution}>
                                        <Textarea
                                            id="solution"
                                            name="solution"
                                            rows={3}
                                            defaultValue={Project.solution}
                                            aria-invalid={!!errors.solution}
                                            placeholder="Comment as-tu résolu ce problème ?"
                                        />
                                    </FormField>
                                </div>
                            </Section>
                        </div>

                        {/* Aperçu + panneau compact de détails, sticky */}
                        <aside className="lg:sticky lg:top-24 lg:h-fit lg:self-start">
                            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Aperçu de la carte
                            </p>
                            <ProjectPreviewCard data={preview} />

                            {/* Détails rapides — juste après la preview, dans la même colonne sticky */}
                            <div className="mt-6">
                                <Section title="Détails rapides" description="Classification, rôle et liens" icon={Settings2}>
                                    <div className="grid gap-4 grid-cols-2">
                                        <FormField htmlFor="category" label="Catégorie" error={errors.category}>
                                            <Input
                                                id="category"
                                                name="category"
                                                defaultValue={Project.category}
                                                aria-invalid={!!errors.category}
                                                className='w-50'
                                                placeholder="Ex. Immobilier"
                                            />
                                        </FormField>

                                        <div className="ml-15 text-center">

                                            <FormField htmlFor="status" label="Statut" error={errors.status}>
                                                <SelectWithItems
                                                    items={statusOptions}
                                                    value={preview.status}
                                                    onValueChange={(value) => updatePreview('status', value)}
                                                    aria-invalid={!!errors.status}
                                                    name="status"

                                                />
                                            </FormField>
                                        </div>
                                    </div>

                                    <FormField htmlFor="role" label="Rôle" error={errors.role}>
                                        <Input
                                            id="role"
                                            name="role"
                                            defaultValue={Project.role}
                                            onChange={(e) => updatePreview('role', e.target.value)}
                                            aria-invalid={!!errors.role}
                                            placeholder="Ex. Développeur fullstack solo"
                                        />
                                    </FormField>

                                    <FormField htmlFor="context" label="Contexte" error={errors.context}>
                                        <Textarea
                                            id="context"
                                            name="context"
                                            rows={2}
                                            defaultValue={Project.context}
                                            onChange={(e) => updatePreview('context', e.target.value)}
                                            aria-invalid={!!errors.context}
                                            placeholder="Ex. Projet personnel, stage, hackathon..."
                                        />
                                    </FormField>

                                    <FormField
                                        htmlFor="swatch_class"
                                        label="Couleur de repli (swatch)"
                                        error={errors.swatch_class}
                                    >
                                        <Input
                                            id="swatch_class"
                                            name="swatch_class"
                                            defaultValue={Project.swatch_class}
                                            onChange={(e) => updatePreview('swatch_class', e.target.value)}
                                            aria-invalid={!!errors.swatch_class}
                                            placeholder="Ex. swatch-shoplite"
                                        />
                                        <p className="mt-1.5 text-xs text-muted-foreground">
                                            Utilisée tant qu'aucune image n'est définie.
                                        </p>
                                    </FormField>

                                    <div className="grid gap-4 grid-cols-2">
                                        <FormField htmlFor="live_url" label="URL démo" error={errors.live_url}>
                                            <Input
                                                id="live_url"
                                                name="live_url"
                                                type="url"
                                                defaultValue={Project.live_url}
                                                onChange={(e) => updatePreview('live_url', e.target.value)}
                                                aria-invalid={!!errors.live_url}
                                                placeholder="https://..."
                                            />
                                        </FormField>

                                        <FormField htmlFor="repo_url" label="URL dépôt" error={errors.repo_url}>
                                            <Input
                                                id="repo_url"
                                                name="repo_url"
                                                type="url"
                                                defaultValue={Project.repo_url}
                                                onChange={(e) => updatePreview('repo_url', e.target.value)}
                                                aria-invalid={!!errors.repo_url}
                                                placeholder="https://github.com/..."
                                            />
                                        </FormField>
                                    </div>

                                    <FormField htmlFor="is_featured" label="Mise en avant" error={errors.is_featured}>
                                        <div className="flex h-9 items-center gap-2">
                                            <input type="hidden" name="is_featured" value={preview.is_featured ? '1' : '0'} />
                                            <Checkbox
                                                id="is_featured"
                                                checked={preview.is_featured}
                                                onCheckedChange={(checked) => updatePreview('is_featured', Boolean(checked))}
                                                aria-invalid={!!errors.is_featured}
                                            />
                                            <label htmlFor="is_featured" className="text-sm text-muted-foreground">
                                                Afficher en vedette
                                            </label>
                                        </div>
                                    </FormField>
                                </Section>
                            </div>
                        </aside>
                    </div>
                    <TopAction>
                        <Button className='mt-2' disabled={processing}>
                            <SaveIcon className="mr-2 h-4 w-4" />
                            {processing ? 'Enregistrement…' : 'Enregistrer'}
                        </Button>
                    </TopAction>
                </>
            )}
        </Form>
    );
}

export default WithAppLayout(Breadcrumbs, ProjectEditPage);