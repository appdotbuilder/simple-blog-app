<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Tag;
use Inertia\Inertia;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tags = Tag::withCount('posts')->get();

        return Inertia::render('tags/index', [
            'tags' => $tags,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Tag $tag)
    {
        $posts = Post::with(['author', 'category', 'tags'])
            ->whereHas('tags', function ($query) use ($tag) {
                $query->where('tags.id', $tag->id);
            })
            ->published()
            ->latest('published_at')
            ->paginate(12);

        return Inertia::render('tags/show', [
            'tag' => $tag,
            'posts' => $posts,
        ]);
    }
}