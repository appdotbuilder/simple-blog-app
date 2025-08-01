<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->unique()->randomElement([
            'Technology', 'Travel', 'Food & Cooking', 'Lifestyle', 'Health & Fitness',
            'Business', 'Education', 'Entertainment', 'Sports', 'Fashion',
            'Photography', 'Art & Design', 'Music', 'Books', 'Science'
        ]);

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'description' => fake()->sentence(12),
            'color' => fake()->hexColor(),
        ];
    }
}