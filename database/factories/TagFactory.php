<?php

namespace Database\Factories;

use App\Models\Tag;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tag>
 */
class TagFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->unique()->randomElement([
            'React', 'Laravel', 'Vue.js', 'PHP', 'JavaScript', 'TypeScript',
            'Python', 'Machine Learning', 'AI', 'Web Development', 'Mobile',
            'CSS', 'HTML', 'Node.js', 'Database', 'MySQL', 'PostgreSQL',
            'Tutorial', 'Tips', 'Best Practices', 'Guide', 'Review',
            'News', 'Update', 'Feature', 'Bug Fix', 'Performance'
        ]);

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'color' => fake()->hexColor(),
        ];
    }
}