<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence(random_int(3, 8));
        $content = fake()->paragraphs(random_int(5, 15), true);
        $publishedAt = fake()->boolean(80) ? fake()->dateTimeBetween('-6 months', 'now') : null;

        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'excerpt' => fake()->paragraph(3),
            'content' => $content,
            'featured_image' => fake()->boolean(60) ? fake()->imageUrl(800, 400, 'technology') : null,
            'status' => $publishedAt ? 'published' : fake()->randomElement(['draft', 'published']),
            'published_at' => $publishedAt,
            'user_id' => User::factory(),
            'category_id' => Category::factory(),
            'views' => fake()->numberBetween(0, 10000),
            'reading_time' => fake()->numberBetween(1, 15),
            'meta_data' => null,
        ];
    }

    /**
     * Indicate that the post is published.
     */
    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'published',
            'published_at' => fake()->dateTimeBetween('-6 months', 'now'),
        ]);
    }

    /**
     * Indicate that the post is a draft.
     */
    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'draft',
            'published_at' => null,
        ]);
    }
}