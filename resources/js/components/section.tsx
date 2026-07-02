import type { LucideIcon } from "lucide-react";

export default function Section({
    title,
    description,
    icon: Icon,
    children,
}: {
    title: string;
    description?: string;
    icon: LucideIcon;
    children: React.ReactNode;
}) {
    return (
        <section className="space-y-4 rounded-2xl border border-border/60 bg-card/40 p-5 sm:p-6">
            <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                    <Icon className="h-4 w-4" />
                </span>
                <div>
                    <h2 className="text-sm font-semibold leading-none text-foreground">{title}</h2>
                    {description && (
                        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
                    )}
                </div>
            </div>
            <div className="space-y-4">{children}</div>
        </section>
    );
}