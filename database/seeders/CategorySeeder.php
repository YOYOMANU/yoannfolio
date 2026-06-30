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
            'Frontend',
            'Backend',
            'Mobile',
            'DevOps',
            'Base de données',
            'Cloud',
            'Sécurité',
            'Intelligence Artificielle',
            'Testing',
            'UI/UX',
        ];

        foreach ($categories as $name) {
            Category::firstOrCreate(['name' => $name]);
        }
    }
}
