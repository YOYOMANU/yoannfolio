// resources/js/components/ui/multi-select.tsx
import { useState, useRef, useEffect } from 'react';
import { CheckIcon, ChevronDownIcon, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type Option = { value: string | number; label: string };

type MultiSelectProps = {
    options: Option[];
    value: (string | number)[];
    onChange: (value: (string | number)[]) => void;
    placeholder?: string;
    className?: string;
    id?: string;
};

export function MultiSelect({
    options,
    value,
    onChange,
    placeholder = 'Sélectionner…',
    className,
    id,
}: MultiSelectProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const toggle = (id: string | number) => {
        onChange(value.includes(id) ? value.filter((v) => v !== id) : [...value, id]);
    };

    const remove = (id: string | number, e: React.MouseEvent) => {
        e.stopPropagation();
        onChange(value.filter((v) => v !== id));
    };

    const selectedLabels = options.filter((o) => value.includes(o.value));

    return (
        <div ref={ref} className={cn('relative', className)} id={id}>
            {/* Trigger — div+role="button" au lieu de <button> pour éviter l'imbrication avec les boutons "x" internes */}
            <div
                role="button"
                tabIndex={0}
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => setOpen((o) => !o)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setOpen((o) => !o);
                    }
                }}
                className={cn(
                    'flex min-h-9 w-full cursor-pointer flex-wrap items-center gap-1.5 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm ring-offset-background',
                    'transition-colors hover:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    open && 'border-ring ring-2 ring-ring',
                )}
            >
                {selectedLabels.length === 0 ? (
                    <span className="text-muted-foreground">{placeholder}</span>
                ) : (
                    selectedLabels.map((o) => (
                        <span
                            key={o.value}
                            className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                        >
                            {o.label}
                            <button
                                type="button"
                                onClick={(e) => remove(o.value, e)}
                                className="rounded hover:text-destructive"
                            >
                                <XIcon className="h-3 w-3" />
                            </button>
                        </span>
                    ))
                )}
                <ChevronDownIcon
                    className={cn(
                        'ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform',
                        open && 'rotate-180',
                    )}
                />
            </div>

            {/* Dropdown */}
            {open && (
                <div className="absolute z-50 mt-1 w-full rounded-md border border-border bg-popover shadow-md">
                    <ul className="max-h-56 overflow-y-auto p-1">
                        {options.length === 0 && (
                            <li className="px-3 py-2 text-sm text-muted-foreground">
                                Aucune option
                            </li>
                        )}
                        {options.map((o) => {
                            const selected = value.includes(o.value);
                            return (
                                <li
                                    key={o.value}
                                    onClick={() => toggle(o.value)}
                                    className={cn(
                                        'flex cursor-pointer items-center gap-2 rounded px-3 py-2 text-sm select-none',
                                        'hover:bg-accent hover:text-accent-foreground',
                                        selected && 'font-medium text-primary',
                                    )}
                                >
                                    <span
                                        className={cn(
                                            'flex h-4 w-4 shrink-0 items-center justify-center rounded border border-primary',
                                            selected ? 'bg-primary' : 'bg-transparent',
                                        )}
                                    >
                                        {selected && (
                                            <CheckIcon className="h-3 w-3 text-primary-foreground" />
                                        )}
                                    </span>
                                    {o.label}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}