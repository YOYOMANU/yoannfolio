import { PlusIcon, Trash2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export type FeatureInput = {
    id?: string | number;
    title: string;
    description: string;
};

type Props = {
    value: FeatureInput[];
    onChange: (features: FeatureInput[]) => void;
    errors?: Record<string, string>;
};

export function FeatureListInput({ value, onChange, errors }: Props) {
    const addFeature = () => {
        onChange([...value, { title: '', description: '' }]);
    };

    const removeFeature = (index: number) => {
        onChange(value.filter((_, i) => i !== index));
    };

    const updateFeature = (index: number, field: keyof FeatureInput, fieldValue: string) => {
        onChange(
            value.map((f, i) => (i === index ? { ...f, [field]: fieldValue } : f))
        );
    };

    return (
        <div className="space-y-4">
            {value.map((feature, index) => (
                <div key={feature.id ?? `new-${index}`} className="rounded-md border border-border p-4 space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground">
                            Fonctionnalité {index + 1}
                        </span>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFeature(index)}
                        >
                            <Trash2Icon className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>

                    {/* Champs cachés pour la soumission du formulaire Inertia */}
                    {feature.id && (
                        <input type="hidden" name={`features[${index}][id]`} value={feature.id} />
                    )}

                    <Input
                        name={`features[${index}][title]`}
                        value={feature.title}
                        onChange={(e) => updateFeature(index, 'title', e.target.value)}
                        placeholder="Titre de la fonctionnalité"
                        aria-invalid={!!errors?.[`features.${index}.title`]}
                    />
                    {errors?.[`features.${index}.title`] && (
                        <p className="text-xs text-destructive">{errors[`features.${index}.title`]}</p>
                    )}

                    <Textarea
                        name={`features[${index}][description]`}
                        value={feature.description}
                        onChange={(e) => updateFeature(index, 'description', e.target.value)}
                        placeholder="Description de la fonctionnalité"
                        rows={3}
                        aria-invalid={!!errors?.[`features.${index}.description`]}
                    />
                    {errors?.[`features.${index}.description`] && (
                        <p className="text-xs text-destructive">{errors[`features.${index}.description`]}</p>
                    )}
                </div>
            ))}

            <Button type="button" variant="outline" onClick={addFeature} className="w-full">
                <PlusIcon className="mr-2 h-4 w-4" />
                Ajouter une fonctionnalité
            </Button>
        </div>
    );
}