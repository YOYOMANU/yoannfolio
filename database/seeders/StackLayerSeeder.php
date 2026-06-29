<?php

namespace Database\Seeders;

use App\Models\StackLayer;
use App\Models\Technology;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class StackLayerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $layers = [
            [
                'key' => 'mobile',
                'label' => 'Mobile & natif',
                'description' => "Des applications natives ou cross-platform, du prototype jusqu'à la publication sur les stores.",
                'tags' => ['Flutter', 'React Native · Expo', 'Kotlin · Android'],
            ],
            [
                'key' => 'web',
                'label' => 'Web & interface',
                'description' => 'Des interfaces rapides et accessibles, construites composant par composant.',
                'tags' => ['React · TypeScript', 'Inertia.js', 'Vue', 'Next.js', 'Tailwind', 'shadcn/ui'],
            ],
            [
                'key' => 'backend',
                'label' => 'Backend & API',
                'description' => 'Des APIs robustes — authentification, autorisation, logique métier complexe.',
                'tags' => ['Laravel', 'NestJS', 'AdonisJS'],
            ],
            [
                'key' => 'data',
                'label' => 'Données & infra',
                'description' => 'Du schéma de base de données aux pipelines de déploiement automatisés.',
                'tags' => ['PostgreSQL', 'MongoDB', 'Docker', 'GitHub Actions'],
            ],
        ];

        foreach ($layers as $layerData) {
            $layer = StackLayer::updateOrCreate(
                ['key' => $layerData['key']],
                [
                    'label' => $layerData['label'],
                    'description' => $layerData['description'],
                ]
            );

            $slugs = array_map(fn ($tag) => Str::slug($tag), $layerData['tags']);
            $technologies = Technology::whereIn('slug', $slugs)->get()->keyBy('slug');

            foreach ($slugs as $index => $slug) {
                if (! isset($technologies[$slug])) {
                    throw new \RuntimeException(
                        "Technologie introuvable : « {$layerData['tags'][$index]} » (slug: {$slug}). As-tu bien lancé TechnologySeeder avant StackLayerSeeder ?"
                    );
                }
            }
        }
    }
}
