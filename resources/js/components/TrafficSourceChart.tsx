import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { DashboardkChartProps, TrafficSource } from "@/types";

/**
 * TrafficSourceChart — répartition des sources de trafic du portfolio.
 * Source possible: colonne `referrer` sur ta table `page_views`,
 * classée en catégories (Direct, GitHub, LinkedIn, Google, Réseaux sociaux).
 */


const COLORS = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
    "var(--muted-foreground)",
];

function CustomTooltip({ active, payload }: any) {
    if (!active || !payload?.length) {
        return null;
    }

    const item = payload[0];

    return (
        <div className="rounded-md border border-border bg-popover px-3 py-2 text-xs shadow-lg">
            <div className="font-medium text-popover-foreground">{item.name}</div>
            <div className="font-mono" style={{ color: item.payload.fill }}>
                {item.value} visites
            </div>
        </div>
    );
}

export default function TrafficSourceChart({
    data,
    title = "Sources de trafic",
}: DashboardkChartProps<TrafficSource>) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const total = data.reduce((acc, d) => acc + d.value, 0);

    return (
        <div className="relative flex aspect-video flex-col overflow-hidden rounded-xl border border-border bg-card p-4 transition-shadow duration-300 hover:shadow-[0_12px_30px_rgba(90,85,74,0.08)]">
            <h3 className="mb-1 text-sm font-medium tracking-wide text-foreground">
                {title}
            </h3>

            <div className="flex min-h-0 flex-1 items-center gap-4">
                <div className="relative h-full w-1/2 shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                innerRadius="55%"
                                outerRadius="85%"
                                paddingAngle={2}
                                animationDuration={700}
                                onMouseEnter={(_, i) => setActiveIndex(i)}
                                onMouseLeave={() => setActiveIndex(null)}
                            >
                                {data.map((_, i) => (
                                    <Cell
                                        key={i}
                                        fill={COLORS[i % COLORS.length]}
                                        opacity={activeIndex === null || activeIndex === i ? 1 : 0.35}
                                    />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                        <span className="font-mono text-lg font-semibold text-foreground">
                            {total}
                        </span>
                        <span className="text-[9px] uppercase tracking-wide text-muted-foreground">
                            visites
                        </span>
                    </div>
                </div>

                <ul className="flex flex-1 flex-col gap-1.5 text-xs">
                    {data.map((d, i) => (
                        <li
                            key={d.name}
                            className="flex items-center justify-between"
                            onMouseEnter={() => setActiveIndex(i)}
                            onMouseLeave={() => setActiveIndex(null)}
                        >
                            <span className="flex items-center gap-2">
                                <span
                                    className="h-2 w-2 rounded-full"
                                    style={{ backgroundColor: COLORS[i % COLORS.length] }}
                                />
                                <span className="text-foreground">{d.name}</span>
                            </span>
                            <span className="font-mono text-muted-foreground">
                                {Math.round((d.value / total) * 100)}%
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export const mockTrafficSources: TrafficSource[] = [
    { name: "Direct", value: 340 },
    { name: "GitHub", value: 210 },
    { name: "LinkedIn", value: 180 },
    { name: "Google", value: 110 },
    { name: "Réseaux sociaux", value: 50 },
];