<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        /** @var string $title */
        $title = (string) fake()->unique()->words(2, true);

        return [
            'slug' => Str::slug($title),
            'title' => ucfirst($title),
            'category' => fake()->randomElement([
                'Plateforme immobilière', 'Catalogue technologique', 'Application étudiante', 'Outil interne',
            ]),
            'short_description' => fake()->sentence(20),
            'long_description' => fake()->paragraph(4),
            'problem' => fake()->paragraph(3),
            'solution' => fake()->paragraph(3),
            'role' => fake()->randomElement(['Full-Stack Engineer', 'Solo Developer', 'Mobile Developer']),
            'context' => fake()->randomElement(['Projet Universitaire', 'Projet Open Source', 'Projet Principal (2026)']),
            'swatch_class' => 'swatch-'.Str::slug($title),
            'live_url' => fake()->boolean(60) ? fake()->url() : null,
            'repo_url' => fake()->boolean(80) ? 'https://github.com/yoann-emmanuel/'.Str::slug($title) : null,
            'is_featured' => false,
            'status' => 'published',
        ];
    }

    public function featured(): static
    {
        return $this->state(fn () => ['is_featured' => true]);
    }

    public function draft(): static
    {
        return $this->state(fn () => ['status' => 'draft']);
    }
}
