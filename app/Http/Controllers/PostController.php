<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::with(['author', 'category', 'tags'])
            ->published()
            ->latest('published_at')
            ->paginate(12);

        $categories = Category::withCount('posts')->get();
        $tags = Tag::withCount('posts')->get();

        return Inertia::render('posts/index', [
            'posts' => $posts,
            'categories' => $categories,
            'tags' => $tags,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        $tags = Tag::all();

        return Inertia::render('posts/create', [
            'categories' => $categories,
            'tags' => $tags,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id();

        if ($data['status'] === 'published' && !isset($data['published_at'])) {
            $data['published_at'] = now();
        }

        $post = Post::create($data);

        if (isset($data['tags'])) {
            $post->tags()->sync($data['tags']);
        }

        return redirect()->route('posts.show', $post)
            ->with('success', 'Post created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        $post->load(['author', 'category', 'tags', 'comments.author', 'comments.replies.author']);
        $post->increment('views');

        $relatedPosts = Post::published()
            ->where('id', '!=', $post->id)
            ->where(function ($query) use ($post) {
                if ($post->category_id) {
                    $query->where('category_id', $post->category_id);
                }
            })
            ->orWhereHas('tags', function ($query) use ($post) {
                $query->whereIn('tags.id', $post->tags->pluck('id'));
            })
            ->limit(3)
            ->get();

        return Inertia::render('posts/show', [
            'post' => $post,
            'relatedPosts' => $relatedPosts,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        $categories = Category::all();
        $tags = Tag::all();
        $post->load(['tags']);

        return Inertia::render('posts/edit', [
            'post' => $post,
            'categories' => $categories,
            'tags' => $tags,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        $data = $request->validated();

        if ($data['status'] === 'published' && !$post->published_at && !isset($data['published_at'])) {
            $data['published_at'] = now();
        }

        $post->update($data);

        if (isset($data['tags'])) {
            $post->tags()->sync($data['tags']);
        }

        return redirect()->route('posts.show', $post)
            ->with('success', 'Post updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();

        return redirect()->route('posts.index')
            ->with('success', 'Post deleted successfully.');
    }
}