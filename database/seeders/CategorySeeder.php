<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Frontend' => "Des interfaces modernes, accessibles et rapides, construites composant par composant avec une attention particulière portée au design system et à l'expérience développeur.",
            'Backend' => "Des APIs robustes et sécurisées — authentification, autorisation granulaire, logique métier complexe et architecture propre quand le projet l'exige.",
            'Mobile' => "Des applications natives ou cross-platform performantes, du prototype jusqu'à la publication sur les stores. Expérience utilisateur fluide et responsive sur iOS et Android.",
            'DevOps' => "Des pipelines d'intégration et de déploiement continus, automatisés et fiables. Conteneurisation et orchestration pour des mises en production sans friction.",
            'Base de données' => "Des schémas relationnels optimisés, des migrations propres et des requêtes performantes. De la modélisation à l'indexation, pensés pour scaler.",
            'UI/UX' => "Une conception centrée sur l'utilisateur, du wireframe à l'interface finale. Hiérarchie visuelle claire, micro-interactions soignées et cohérence du design system.",
        ];

        foreach ($categories as $name => $description) {
            Category::firstOrCreate(
                ['name' => $name],
                ['description' => $description]
            );
        }
    }
}
