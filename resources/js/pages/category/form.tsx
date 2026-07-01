import { Form } from '@inertiajs/react';
import { TopAction } from '@/components/top-action';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { BreadcrumbItem, Category, Technology } from '@/types';
import technology from '@/routes/technology';
import { WithAppLayout } from '@/layouts/app-layout';
import { SaveIcon } from 'lucide-react';
import category from '@/routes/category';
import { Textarea } from '@/components/ui/textarea';

type Props = {
    Category: Category
}

const Breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Editer une Categorie",
        href: "#"
    }
]

function CategoryEditPage({ Category }: Props) {
    const action = Category.id
        ? category.update.form({ category: parseInt(Category.id) })
        : category.store.form();

    return (
        <Form {...action}>
            {({ errors, processing }) => (
                <>
                    <FormField htmlFor="name" label="Titre" error={errors.name}>
                        <Input
                            id="name"
                            name="name"
                            defaultValue={Category.name}
                            aria-invalid={!!errors.name}
                            placeholder="Ex. Front-end"
                        />
                    </FormField>


                    <FormField htmlFor="description" label="Description" error={errors.description}>
                        <Textarea
                            id="description"
                            name="description"
                            rows={5}
                            defaultValue={Category.description}
                            aria-invalid={!!errors.description}
                            placeholder="Description..."
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

export default WithAppLayout(Breadcrumbs, CategoryEditPage);