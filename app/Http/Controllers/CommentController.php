<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCommentRequest;
use App\Models\Comment;
use App\Models\Post;
use Inertia\Inertia;

class CommentController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCommentRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id();

        $comment = Comment::create($data);

        $post = Post::find($data['post_id']);

        return redirect()->route('posts.show', $post)
            ->with('success', 'Comment added successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        $post = $comment->post;
        
        // Only allow the comment author to delete
        if (auth()->user()->id !== $comment->user_id) {
            abort(403);
        }

        $comment->delete();

        return redirect()->route('posts.show', $post)
            ->with('success', 'Comment deleted successfully.');
    }
}