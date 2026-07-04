import { Head } from '@inertiajs/react';
import SkillsRadarChart, { mockSkills } from '@/components/Skillsradarchart';
import TrafficSourceChart, { mockTrafficSources } from '@/components/Trafficsourcechart';
import VisitsAreaChart, { mockVisits } from '@/components/Visitsareachart';
import { dashboard } from '@/routes';
import TechStackChart, { mockTechStack } from '@/components/TechStackChart';


export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <SkillsRadarChart skills={mockSkills} />
                    <TrafficSourceChart data={mockTrafficSources} />
                    <TechStackChart data={mockTechStack} />
                </div>
                <div className="relative  flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <VisitsAreaChart data={mockVisits} />
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};