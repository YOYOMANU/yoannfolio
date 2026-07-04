import { SearchIcon, XIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { Button } from '@/components/ui/button';

type Props = PropsWithChildren<{
    /** Replie le contenu derrière une icône loupe sur mobile (listing avec recherche). */
    collapsibleSearch?: boolean;
}>;

export function TopAction({ children, collapsibleSearch = false }: Props) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) {
            return;
        }

        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open]);

    // Mode par défaut : toujours visible (ex. bouton "Enregistrer" sur un formulaire).
    if (!collapsibleSearch) {
        return (
            <div className="relative mb-4 flex flex-wrap items-center justify-end gap-2 lg:absolute lg:top-1.5 lg:right-6 lg:mb-0">
                {children}
            </div>
        );
    }

    // Mode recherche : icône loupe repliable sur mobile, toujours visible sur desktop.
    return (
        <div ref={ref} className="absolute top-4 right-4 lg:right-6">
            {/* Mobile : icône seule, sur la même ligne que le breadcrumb */}
            <div className="lg:hidden">
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setOpen((v) => !v)}
                    aria-label={open ? 'Fermer la recherche' : 'Rechercher'}
                >
                    {open ? <XIcon size={16} /> : <SearchIcon size={16} />}
                </Button>

                {open && (
                    <div className="absolute top-full right-0 z-20 mt-2 w-[calc(100vw-2rem)] max-w-80 rounded-lg border border-border bg-card p-2 shadow-lg [&_form]:flex [&_form]:w-full [&_form]:items-center [&_form]:gap-2 [&_input]:min-w-0 [&_input]:flex-1">
                        {children}
                    </div>
                )}
            </div>

            {/* Desktop : toujours visible, comportement inchangé */}
            <div className="hidden items-center gap-2 lg:flex">
                {children}
            </div>
        </div>
    );
}