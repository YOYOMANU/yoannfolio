import { Form } from '@inertiajs/react';
import { TopAction } from '@/components/top-action';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { BreadcrumbItem, Technology } from '@/types';
import technology from '@/routes/technology';
import WithAppLayout from '@/layouts/app-layout';
import { SaveIcon } from 'lucide-react';

type Props = {
    Technology: Technology
}

const Breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Editer une Technologie",
        href: "#"
    }
]

function TechnologyEditPage({ Technology }: Props) {
    const action = Technology.id
        ? technology.update.form({ technology: parseInt(Technology.id) })
        : technology.store.form();

    return (
        <Form {...action}>
            {({ errors, processing }) => (
                <>
                    <FormField htmlFor="name" label="Titre" error={errors.name}>
                        <Input
                            id="name"
                            name="name"
                            defaultValue={Technology.name}
                            aria-invalid={!!errors.name}
                            placeholder="Ex. Villa moderne avec piscine à Cocody"
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