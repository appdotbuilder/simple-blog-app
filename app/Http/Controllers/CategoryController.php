<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::withCount('posts')->get();

        return Inertia::render('categories/index', [
            'categories' => $categories,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        $posts = Post::with(['author', 'category', 'tags'])
            ->where('category_id', $category->id)
            ->published()
            ->latest('published_at')
            ->paginate(12);

        return Inertia::render('categories/show', [
            'category' => $category,
            'posts' => $posts,
        ]);
    }
}