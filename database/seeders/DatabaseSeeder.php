<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Comment;
use App\Models\Post;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
        ]);

        // Create regular test user
        $testUser = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Create additional users
        $users = User::factory(8)->create();
        $allUsers = collect([$admin, $testUser])->concat($users);

        // Create categories
        $categories = Category::factory(10)->create();

        // Create tags
        $tags = Tag::factory(25)->create();

        // Create posts
        $posts = Post::factory(50)
            ->recycle($allUsers)
            ->recycle($categories)
            ->create();

        // Attach random tags to posts
        $posts->each(function ($post) use ($tags) {
            $randomTags = $tags->random(random_int(1, 5));
            $post->tags()->attach($randomTags);
        });

        // Create comments on published posts
        $publishedPosts = $posts->where('status', 'published');
        
        $publishedPosts->each(function ($post) use ($allUsers) {
            // Create 3-8 comments per post
            $commentCount = random_int(3, 8);
            
            Comment::factory($commentCount)
                ->recycle($allUsers)
                ->create([
                    'post_id' => $post->id,
                ]);
        });

        // Create some replies to existing comments
        $comments = Comment::all();
        
        $comments->random(min(20, $comments->count()))->each(function ($comment) use ($allUsers) {
            Comment::factory()
                ->recycle($allUsers)
                ->create([
                    'post_id' => $comment->post_id,
                    'parent_id' => $comment->id,
                ]);
        });
    }
}
