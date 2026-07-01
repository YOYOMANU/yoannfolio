// resources/js/pages/technology/form.tsx
import { Form, useForm } from '@inertiajs/react';
import { TopAction } from '@/components/top-action';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { MultiSelect } from '@/components/ui/multi-select';
import { BreadcrumbItem, Technology, Category } from '@/types';
import technology from '@/routes/technology';
import { SaveIcon } from 'lucide-react';
import { ImageInput } from '@/components/ui/image-input';
import { WithAppLayout } from '@/layouts/app-layout';

type Props = {
    Technology: Technology;
    categories: Category[];
};

const Breadcrumbs: BreadcrumbItem[] = [
    { title: 'Editer une Technologie', href: '#' },
];

function TechnologyEditPage({ Technology, categories }: Props) {

    const action = Technology.id
        ? technology.update.form({ technology: parseInt(Technology.id) })
        : technology.store.form();

    // IDs déjà associés à la techno
    const defaultCategories = Technology.categories?.map((c) => c.id) ?? [];

    const { data, setData } = useForm({
        category_ids: defaultCategories,
    });

    const categoryOptions = categories.map((c) => ({
        value: c.id,
        label: c.name,
    }));



    return (
        <Form {...action}>
            {({ errors, processing }) => (
                <>
                    <FormField htmlFor="image" label="Image" error={errors.image}>
                        <ImageInput
                            id="image"
                            name="image"
                            className="aspect-square w-40"
                            defaultValue={Technology.image}
                            aria-invalid={!!errors.image}
                        />
                    </FormField>

                    <FormField htmlFor="name" label="Titre" error={errors.name}>
                        <Input
                            id="name"
                            name="name"
                            defaultValue={Technology.name}
                            aria-invalid={!!errors.name}
                            placeholder="Ex. React, Laravel, Docker…"
                        />
                    </FormField>

                    <FormField
                        htmlFor="categories"
                        label="Catégories"
                        error={errors['category_ids']}
                    >
                        {/* Champs cachés pour la soumission */}
                        {data.category_ids.map((id) => (
                            <input
                                key={id}
                                type="hidden"
                                name="category_ids[]"
                                value={id}
                            />
                        ))}
                        <MultiSelect
                            id="categories"
                            options={categoryOptions}
                            value={data.category_ids}
                            onChange={(ids) =>
                                setData('category_ids', ids as string[])
                            }
                            placeholder="Associer des catégories…"
                        />
                    </FormField>

                    <TopAction>
                        <Button disabled={processing}>
                            <SaveIcon className="mr-2 h-4 w-4" />
                            {processing ? 'Enregistrement…' : 'Enregistrer'}
                        </Button>
                    </TopAction>
                </>
            )}
        </Form>
    );
}

export default WithAppLayout(Breadcrumbs, TechnologyEditPage);