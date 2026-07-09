import { useState } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

/**
 * VisitsAreaChart — évolution des visites du portfolio, avec
 * toggle 3M/6M. À brancher sur une table `page_views` /
 * `visits` groupée par mois côté Laravel.
 */

export interface VisitPoint {
    month: string;
    visits: number;
}

interface VisitsAreaChartProps {
    data: VisitPoint[];
    title?: string;
}

function CustomTooltip({ active, payload, label }: any) {
    if (!active || !payload?.length) {
return null;
}

    return (
        <div className="rounded-md border border-border bg-popover px-3 py-2 text-xs shadow-lg">
            <div className="mb-1 font-medium text-popover-foreground">{label}</div>
            <div className="font-mono text-primary">{payload[0].value} visites</div>
        </div>
    );
}

export default function VisitsAreaChart({
    data,
    title = "Visites du portfolio",
}: VisitsAreaChartProps) {
    const [timeframe, setTimeframe] = useState<"3m" | "6m">("6m");
    const shown = timeframe === "6m" ? data : data.slice(-3);

    return (
        <div className="relative flex aspect-video flex-col overflow-hidden rounded-xl border border-border bg-card p-4 transition-shadow duration-300 hover:shadow-[0_12px_30px_rgba(90,85,74,0.08)]">
            <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-medium tracking-wide text-foreground">
                    {title}
                </h3>
                <div className="flex gap-1 rounded-md bg-secondary p-1 text-[11px]">
                    {(["3m", "6m"] as const).map((tf) => (
                        <button
                            key={tf}
                            onClick={() => setTimeframe(tf)}
                            className={`rounded px-2 py-1 font-medium transition-colors ${timeframe === tf
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground"
                                }`}
                        >
                            {tf.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            <div className="min-h-0 flex-1">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={shown} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="visitsFill" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.35} />
                                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            stroke="var(--border)"
                            strokeDasharray="3 3"
                            vertical={false}
                        />
                        <XAxis
                            dataKey="month"
                            tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type="monotone"
                            dataKey="visits"
                            stroke="var(--primary)"
                            strokeWidth={2}
                            fill="url(#visitsFill)"
                            animationDuration={800}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export const mockVisits: VisitPoint[] = [
    { month: "Fév", visits: 320 },
    { month: "Mar", visits: 480 },
    { month: "Avr", visits: 410 },
    { month: "Mai", visits: 610 },
    { month: "Juin", visits: 740 },
    { month: "Juil", visits: 890 },
];