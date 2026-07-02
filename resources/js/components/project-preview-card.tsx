import { motion } from "framer-motion";
import { ExternalLinkIcon, GithubIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PreviewState } from "@/types";

const STATUS_META: Record<string, { label: string; dot: string }> = {
    draft: { label: 'Brouillon', dot: 'bg-zinc-500' },
    published: { label: 'Publié', dot: 'bg-emerald-500' },
    archived: { label: 'Archivé', dot: 'bg-red-500' },
};


export default function ProjectPreviewCard({ data }: { data: PreviewState }) {
    const status = STATUS_META[data.status] ?? STATUS_META.draft;

    return (
        <motion.div
            layout
            className="w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-xl shadow-black/20"
        >
            {/* Visuel */}
            <div
                className={cn(
                    'relative h-44 w-full overflow-hidden',
                    !data.image && (data.swatch_class || 'bg-gradient-to-br from-zinc-800 via-zinc-900 to-black'),
                )}
            >
                {data.image && (
                    <img
                        src={data.image}
                        alt={data.title || 'Aperçu du projet'}
                        className="h-full w-full object-cover"
                    />
                )}

                {data.is_featured && (
                    <span className="absolute right-3 top-3 z-10 rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-black shadow-sm">
                        En vedette
                    </span>
                )}

                {/* fondu pour raccorder l'image au contenu */}
                <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-zinc-950 to-transparent" />
            </div>

            <div className="flex flex-col gap-3 p-5">
                <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] uppercase tracking-wide text-emerald-400">
                        {data.category || 'Catégorie'}
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                        <span className={cn('h-1.5 w-1.5 rounded-full', status.dot)} />
                        {status.label}
                    </span>
                </div>

                <h3 className="text-lg font-semibold leading-snug text-white">
                    {data.title || 'Titre du projet'}
                </h3>

                <p className="line-clamp-3 text-sm leading-relaxed text-zinc-400">
                    {data.short_description || 'La description courte apparaîtra ici.'}
                </p>

                {(data.role || data.context) && (
                    <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-zinc-800 pt-3 text-[12px] text-zinc-500">
                        {data.role && <span>{data.role}</span>}
                        {data.context && <span>{data.context}</span>}
                    </div>
                )}

                {(data.live_url || data.repo_url) && (
                    <div className="flex items-center gap-4 pt-1 text-sm text-zinc-300">
                        {data.live_url && (
                            <span className="inline-flex items-center gap-1.5">
                                <ExternalLinkIcon className="h-3.5 w-3.5" />
                                Démo
                            </span>
                        )}
                        {data.repo_url && (
                            <span className="inline-flex items-center gap-1.5">
                                <GithubIcon className="h-3.5 w-3.5" />
                                Dépôt
                            </span>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
}