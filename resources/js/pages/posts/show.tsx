import { Head, Link, router, usePage } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { useState } from 'react';

interface User {
    id: number;
    name: string;
}

interface Comment {
    id: number;
    content: string;
    created_at: string;
    author: User;
    parent_id?: number;
    replies: Comment[];
}

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    featured_image?: string;
    published_at: string;
    reading_time: number;
    views: number;
    author: User;
    category?: {
        id: number;
        name: string;
        slug: string;
        color: string;
    };
    tags: Array<{
        id: number;
        name: string;
        slug: string;
        color: string;
    }>;
    comments: Comment[];
}

interface Props {
    post: Post;
    relatedPosts: Post[];
    [key: string]: unknown;
}

export default function PostShow({ post, relatedPosts }: Props) {
    const { auth } = usePage<{ auth: { user?: { id: number; name: string; } } }>().props;
    const [commentContent, setCommentContent] = useState('');
    const [replyTo, setReplyTo] = useState<number | null>(null);
    const [replyContent, setReplyContent] = useState('');

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        router.post(route('comments.store'), {
            content: commentContent,
            post_id: post.id,
        }, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setCommentContent('');
            }
        });
    };

    const handleReplySubmit = (e: React.FormEvent, parentId: number) => {
        e.preventDefault();
        
        router.post(route('comments.store'), {
            content: replyContent,
            post_id: post.id,
            parent_id: parentId,
        }, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setReplyContent('');
                setReplyTo(null);
            }
        });
    };

    const handleDeleteComment = (commentId: number) => {
        if (confirm('Are you sure you want to delete this comment?')) {
            router.delete(route('comments.destroy', commentId), {
                preserveState: true,
                preserveScroll: true,
            });
        }
    };

    const canEdit = auth?.user && auth.user.id === post.author.id;

    return (
        <AppShell>
            <Head title={`${post.title} - Modern Blog`} />
            
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
                <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Post Header */}
                    <header className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                            {post.category && (
                                <Link
                                    href={route('categories.show', post.category.slug)}
                                    className="px-3 py-1 rounded-full text-sm font-medium text-white hover:opacity-80 transition-opacity"
                                    style={{ backgroundColor: post.category.color }}
                                >
                                    {post.category.name}
                                </Link>
                            )}
                            <span className="text-slate-500 dark:text-slate-400 text-sm">
                                ⏱️ {post.reading_time} min read
                            </span>
                            <span className="text-slate-500 dark:text-slate-400 text-sm">
                                👁️ {post.views.toLocaleString()} views
                            </span>
                        </div>
                        
                        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            {post.title}
                        </h1>
                        
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div>
                                    <p className="text-slate-900 dark:text-white font-medium">
                                        By {post.author.name}
                                    </p>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                                        {new Date(post.published_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                            
                            {canEdit && (
                                <div className="flex items-center space-x-2">
                                    <Link
                                        href={route('posts.edit', post.id)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        ✏️ Edit
                                    </Link>
                                </div>
                            )}
                        </div>
                    </header>

                    {/* Featured Image */}
                    {post.featured_image && (
                        <div className="mb-8">
                            <img
                                src={post.featured_image}
                                alt={post.title}
                                className="w-full h-64 md:h-96 object-cover rounded-lg"
                            />
                        </div>
                    )}

                    {/* Post Content */}
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-8 mb-8">
                        <div 
                            className="prose prose-slate dark:prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </div>

                    {/* Tags */}
                    {post.tags.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                                🏷️ Tags
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <Link
                                        key={tag.id}
                                        href={route('tags.show', tag.slug)}
                                        className="px-3 py-1 rounded-full text-sm font-medium text-white hover:opacity-80 transition-opacity"
                                        style={{ backgroundColor: tag.color }}
                                    >
                                        {tag.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Comments Section */}
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-8 mb-8">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                            💬 Comments ({post.comments.length})
                        </h3>

                        {/* Comment Form */}
                        {auth?.user ? (
                            <form onSubmit={handleCommentSubmit} className="mb-8">
                                <div className="mb-4">
                                    <label htmlFor="comment" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Leave a comment
                                    </label>
                                    <textarea
                                        id="comment"
                                        rows={4}
                                        value={commentContent}
                                        onChange={(e) => setCommentContent(e.target.value)}
                                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                                        placeholder="What are your thoughts?"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Post Comment
                                </button>
                            </form>
                        ) : (
                            <div className="mb-8 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                                <p className="text-slate-600 dark:text-slate-300">
                                    Please{' '}
                                    <Link href={route('login')} className="text-blue-600 hover:text-blue-700">
                                        log in
                                    </Link>{' '}
                                    to leave a comment.
                                </p>
                            </div>
                        )}

                        {/* Comments List */}
                        <div className="space-y-6">
                            {post.comments.filter(comment => !comment.parent_id).map((comment) => (
                                <div key={comment.id} className="border-b border-slate-200 dark:border-slate-700 pb-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                                                {comment.author.name.charAt(0).toUpperCase()}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <h4 className="font-semibold text-slate-900 dark:text-white">
                                                    {comment.author.name}
                                                </h4>
                                                <span className="text-slate-500 dark:text-slate-400 text-sm">
                                                    {new Date(comment.created_at).toLocaleDateString()}
                                                </span>
                                                {auth?.user && auth.user.id === comment.author.id && (
                                                    <button
                                                        onClick={() => handleDeleteComment(comment.id)}
                                                        className="text-red-600 hover:text-red-700 text-sm"
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </div>
                                            <p className="text-slate-700 dark:text-slate-300 mb-3">
                                                {comment.content}
                                            </p>
                                            {auth?.user && (
                                                <button
                                                    onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                                                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                                >
                                                    Reply
                                                </button>
                                            )}

                                            {/* Reply Form */}
                                            {replyTo === comment.id && (
                                                <form onSubmit={(e) => handleReplySubmit(e, comment.id)} className="mt-4">
                                                    <textarea
                                                        rows={3}
                                                        value={replyContent}
                                                        onChange={(e) => setReplyContent(e.target.value)}
                                                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white mb-3"
                                                        placeholder="Write a reply..."
                                                        required
                                                    />
                                                    <div className="flex space-x-2">
                                                        <button
                                                            type="submit"
                                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                                                        >
                                                            Reply
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => setReplyTo(null)}
                                                            className="bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors text-sm"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </form>
                                            )}

                                            {/* Replies */}
                                            {comment.replies.length > 0 && (
                                                <div className="mt-4 space-y-4">
                                                    {comment.replies.map((reply) => (
                                                        <div key={reply.id} className="flex items-start space-x-4 pl-4 border-l-2 border-blue-100 dark:border-blue-900">
                                                            <div className="flex-shrink-0">
                                                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                                                    {reply.author.name.charAt(0).toUpperCase()}
                                                                </div>
                                                            </div>
                                                            <div className="flex-1">
                                                                <div className="flex items-center space-x-2 mb-2">
                                                                    <h5 className="font-medium text-slate-900 dark:text-white text-sm">
                                                                        {reply.author.name}
                                                                    </h5>
                                                                    <span className="text-slate-500 dark:text-slate-400 text-xs">
                                                                        {new Date(reply.created_at).toLocaleDateString()}
                                                                    </span>
                                                                    {auth?.user && auth.user.id === reply.author.id && (
                                                                        <button
                                                                            onClick={() => handleDeleteComment(reply.id)}
                                                                            className="text-red-600 hover:text-red-700 text-xs"
                                                                        >
                                                                            Delete
                                                                        </button>
                                                                    )}
                                                                </div>
                                                                <p className="text-slate-700 dark:text-slate-300 text-sm">
                                                                    {reply.content}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {post.comments.length === 0 && (
                            <div className="text-center py-8">
                                <div className="text-4xl mb-2">💬</div>
                                <p className="text-slate-600 dark:text-slate-300">
                                    No comments yet. Be the first to share your thoughts!
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <div className="bg-white dark:bg-slate-800 rounded-lg p-8">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                                📖 Related Posts
                            </h3>
                            <div className="grid md:grid-cols-3 gap-6">
                                {relatedPosts.map((relatedPost) => (
                                    <article key={relatedPost.id} className="group">
                                        {relatedPost.featured_image && (
                                            <Link href={route('posts.show', relatedPost.slug)}>
                                                <img
                                                    src={relatedPost.featured_image}
                                                    alt={relatedPost.title}
                                                    className="w-full h-32 object-cover rounded-lg mb-3 group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </Link>
                                        )}
                                        <Link href={route('posts.show', relatedPost.slug)}>
                                            <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors mb-2">
                                                {relatedPost.title}
                                            </h4>
                                        </Link>
                                        <p className="text-slate-600 dark:text-slate-300 text-sm">
                                            By {relatedPost.author.name} • {relatedPost.reading_time} min read
                                        </p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    )}
                </article>
            </div>
        </AppShell>
    );
}