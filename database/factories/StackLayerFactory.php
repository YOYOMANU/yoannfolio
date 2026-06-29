<?php

namespace Database\Factories;

use App\Models\StackLayer;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<StackLayer>
 */
class StackLayerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $label = fake()->unique()->words(2, true);

        return [
            'key' => Str::slug($label, '_'),
            'label' => ucfirst($label),
            'description' => fake()->sentence(20),
        ];
    }
}
