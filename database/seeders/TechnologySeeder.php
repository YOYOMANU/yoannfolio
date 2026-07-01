<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Technology;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TechnologySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $technologies = [
            // Mobile & natif
            ['name' => 'Flutter', 'categories' => ['Mobile']],
            ['name' => 'React Native', 'categories' => ['Mobile']],
            ['name' => 'Expo', 'categories' => ['Mobile']],
            ['name' => 'Kotlin', 'categories' => ['Mobile']],

            // Web & interface
            ['name' => 'React · TypeScript', 'categories' => ['Frontend']],
            ['name' => 'Inertia.js', 'categories' => ['Frontend']],
            ['name' => 'Vue', 'categories' => ['Frontend']],
            ['name' => 'Next.js', 'categories' => ['Frontend']],
            ['name' => 'Tailwind', 'categories' => ['Frontend', 'UI/UX']],
            ['name' => 'shadcn/ui', 'categories' => ['Frontend', 'UI/UX']],
            ['name' => 'React', 'categories' => ['Frontend']],
            ['name' => 'TypeScript', 'categories' => ['Frontend', 'Backend']],

            // Backend & API
            ['name' => 'Laravel', 'categories' => ['Backend']],
            ['name' => 'NestJS', 'categories' => ['Backend']],
            ['name' => 'AdonisJS', 'categories' => ['Backend']],

            // Données & infra
            ['name' => 'PostgreSQL', 'categories' => ['Base de données']],
            ['name' => 'MongoDB', 'categories' => ['Base de données']],
            ['name' => 'Docker', 'categories' => ['DevOps']],
            ['name' => 'GitHub Actions', 'categories' => ['DevOps']],
        ];

        foreach ($technologies as $tech) {
            $technology = Technology::updateOrCreate(
                ['slug' => Str::slug($tech['name'])],
                [
                    'name' => $tech['name'],
                ]
            );

            $categoryIds = Category::whereIn('name', $tech['categories'])->pluck('id');

            $technology->categories()->sync($categoryIds);
        }
    }
}
