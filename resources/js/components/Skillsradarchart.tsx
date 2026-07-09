import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Tooltip,
} from "recharts";
import type { Skill } from "@/types";

/**
 * SkillsRadarChart — niveau de maîtrise par techno.
 * Dynamique: passe n'importe quelle liste de skills en props.
 */


interface SkillsRadarChartProps {
    skills: Skill[];
    title?: string;
}

function CustomTooltip({ active, payload }: any) {
    if (!active || !payload?.length) {
        return null;
    }

    const item = payload[0].payload;

    return (
        <div className="rounded-md border border-border bg-popover px-3 py-2 text-xs shadow-lg">
            <div className="font-medium text-popover-foreground">{item.name}</div>
            <div className="font-mono text-primary">{item.level}/100</div>
        </div>
    );
}

export default function SkillsRadarChart({
    skills,
    title = "Stack technique",
}: SkillsRadarChartProps) {
    return (
        <div className="relative flex aspect-video flex-col overflow-hidden rounded-xl border border-border bg-card p-4 transition-shadow duration-300 hover:shadow-[0_12px_30px_rgba(90,85,74,0.08)]">
            <h3 className="mb-1 text-sm font-medium tracking-wide text-foreground">
                {title}
            </h3>

            <div className="min-h-0 flex-1">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={skills} outerRadius="75%">
                        <PolarGrid stroke="var(--border)" />
                        <PolarAngleAxis
                            dataKey="name"
                            tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                        />
                        <PolarRadiusAxis
                            angle={90}
                            domain={[0, 100]}
                            tick={{ fill: "var(--muted-foreground)", fontSize: 9 }}
                            axisLine={false}
                        />
                        <Radar
                            name="Niveau"
                            dataKey="level"
                            stroke="var(--primary)"
                            fill="var(--primary)"
                            fillOpacity={0.2}
                            strokeWidth={2}
                            animationDuration={900}
                            animationEasing="ease-out"
                        />
                        <Tooltip content={<CustomTooltip />} />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

// Exemple de data à passer en prop Inertia (statique ou depuis une table `skills`)
export const mockSkills: Skill[] = [
    { name: "Laravel", level: 92 },
    { name: "React/TS", level: 88 },
    { name: "PostgreSQL", level: 80 },
    { name: "Inertia.js", level: 90 },
    { name: "Mobile (RN/Kotlin)", level: 70 },
    { name: "DevOps/Docker", level: 65 },
];