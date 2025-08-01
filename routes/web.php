<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\TagController;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Home page - display latest blog posts
Route::get('/', function () {
    $posts = Post::with(['author', 'category', 'tags'])
        ->published()
        ->latest('published_at')
        ->take(6)
        ->get();

    $categories = Category::withCount('posts')->take(8)->get();
    $featuredPost = Post::published()
        ->with(['author', 'category'])
        ->orderBy('views', 'desc')
        ->first();

    return Inertia::render('welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'posts' => $posts,
        'categories' => $categories,
        'featuredPost' => $featuredPost,
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $userPosts = Post::where('user_id', auth()->id())
            ->with(['category', 'tags'])
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('dashboard', [
            'userPosts' => $userPosts,
        ]);
    })->name('dashboard');
});

// Blog routes
Route::resource('posts', PostController::class);
Route::resource('categories', CategoryController::class)->only(['index', 'show']);
Route::resource('tags', TagController::class)->only(['index', 'show']);

// Comment routes
Route::post('/comments', [CommentController::class, 'store'])->name('comments.store')->middleware('auth');
Route::delete('/comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy')->middleware('auth');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';