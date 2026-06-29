<?php

namespace Database\Seeders;

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
            ['name' => 'Flutter'],
            ['name' => 'React Native · Expo'],
            ['name' => 'Kotlin · Android'],
            ['name' => 'React Native'],
            ['name' => 'Expo'],
            ['name' => 'Kotlin'],
            ['name' => 'Android'],

            // Web & interface
            ['name' => 'React · TypeScript'],
            ['name' => 'Inertia.js'],
            ['name' => 'Vue'],
            ['name' => 'Next.js'],
            ['name' => 'Tailwind'],
            ['name' => 'shadcn/ui'],
            ['name' => 'React'],
            ['name' => 'TypeScript'],

            // Backend & API
            ['name' => 'Laravel'],
            ['name' => 'NestJS'],
            ['name' => 'AdonisJS'],

            // Données & infra
            ['name' => 'PostgreSQL'],
            ['name' => 'MongoDB'],
            ['name' => 'Docker'],
            ['name' => 'GitHub Actions'],
        ];

        foreach ($technologies as $tech) {
            Technology::updateOrCreate(
                ['slug' => Str::slug($tech['name'])],
                [
                    'name' => $tech['name'],
                ]
            );
        }
    }
}
