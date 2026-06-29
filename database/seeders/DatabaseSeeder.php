<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Yoann Emmanuel',
            'email' => 'emmanuelyoann19@gmail.com',
            'password' => Hash::make('Azerty123'),
        ]);

        $this->call([
            TechnologySeeder::class,
            StackLayerSeeder::class,
            ProjectSeeder::class,
        ]);
    }
}
