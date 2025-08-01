import { Head, Link, usePage } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt?: string;
    featured_image?: string;
    published_at: string;
    reading_time: number;
    views: number;
    author: {
        id: number;
        name: string;
    };
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
}

interface Category {
    id: number;
    name: string;
    slug: string;
    color: string;
    posts_count: number;
}

interface Tag {
    id: number;
    name: string;
    slug: string;
    color: string;
    posts_count: number;
}

interface Props {
    posts: {
        data: Post[];
        links: Array<{ url: string | null; label: string; active: boolean; }>;
        meta: { total: number; };
    };
    categories: Category[];
    tags: Tag[];
    [key: string]: unknown;
}

export default function PostsIndex({ posts, categories, tags }: Props) {
    const { auth } = usePage<{ auth: { user?: { id: number; name: string; } } }>().props;

    return (
        <AppShell>
            <Head title="📚 All Blog Posts - Modern Blogging Platform" />
            
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
                {/* Header */}
                <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                                    📚 All Blog Posts
                                </h1>
                                <p className="text-slate-600 dark:text-slate-300">
                                    Discover {posts.meta.total} amazing stories from our community
                                </p>
                            </div>
                            {auth?.user && (
                                <div className="mt-4 md:mt-0">
                                    <Link
                                        href={route('posts.create')}
                                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
                                    >
                                        ✍️ Write New Post
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid lg:grid-cols-4 gap-8">
                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="space-y-6">
                                {/* Categories */}
                                <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                                        🏷️ Categories
                                    </h3>
                                    <div className="space-y-2">
                                        {categories.map((category) => (
                                            <Link
                                                key={category.id}
                                                href={route('categories.show', category.slug)}
                                                className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <div
                                                        className="w-3 h-3 rounded-full"
                                                        style={{ backgroundColor: category.color }}
                                                    />
                                                    <span className="text-slate-700 dark:text-slate-300">
                                                        {category.name}
                                                    </span>
                                                </div>
                                                <span className="text-sm text-slate-500 dark:text-slate-400">
                                                    {category.posts_count}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                    <Link
                                        href={route('categories.index')}
                                        className="block mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
                                    >
                                        View all categories →
                                    </Link>
                                </div>

                                {/* Popular Tags */}
                                <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                                        🏷️ Popular Tags
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {tags.slice(0, 15).map((tag) => (
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
                                    <Link
                                        href={route('tags.index')}
                                        className="block mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
                                    >
                                        View all tags →
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Posts Grid */}
                        <div className="lg:col-span-3">
                            {posts.data.length > 0 ? (
                                <>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        {posts.data.map((post) => (
                                            <article
                                                key={post.id}
                                                className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                                            >
                                                {post.featured_image && (
                                                    <Link href={route('posts.show', post.slug)}>
                                                        <img
                                                            src={post.featured_image}
                                                            alt={post.title}
                                                            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                                                        />
                                                    </Link>
                                                )}
                                                <div className="p-6">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        {post.category && (
                                                            <Link
                                                                href={route('categories.show', post.category.slug)}
                                                                className="px-2 py-1 rounded-full text-xs font-medium text-white hover:opacity-80 transition-opacity"
                                                                style={{ backgroundColor: post.category.color }}
                                                            >
                                                                {post.category.name}
                                                            </Link>
                                                        )}
                                                        <span className="text-slate-500 dark:text-slate-400 text-sm">
                                                            ⏱️ {post.reading_time} min read
                                                        </span>
                                                        <span className="text-slate-500 dark:text-slate-400 text-sm">
                                                            👁️ {post.views}
                                                        </span>
                                                    </div>
                                                    
                                                    <Link href={route('posts.show', post.slug)}>
                                                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 hover:text-blue-600 transition-colors">
                                                            {post.title}
                                                        </h2>
                                                    </Link>
                                                    
                                                    {post.excerpt && (
                                                        <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                                                            {post.excerpt}
                                                        </p>
                                                    )}
                                                    
                                                    {post.tags.length > 0 && (
                                                        <div className="flex flex-wrap gap-1 mb-4">
                                                            {post.tags.slice(0, 3).map((tag) => (
                                                                <Link
                                                                    key={tag.id}
                                                                    href={route('tags.show', tag.slug)}
                                                                    className="px-2 py-1 rounded text-xs font-medium text-white hover:opacity-80 transition-opacity"
                                                                    style={{ backgroundColor: tag.color }}
                                                                >
                                                                    {tag.name}
                                                                </Link>
                                                            ))}
                                                            {post.tags.length > 3 && (
                                                                <span className="px-2 py-1 rounded text-xs text-slate-500 dark:text-slate-400">
                                                                    +{post.tags.length - 3} more
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                    
                                                    <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                                                        <span>By {post.author.name}</span>
                                                        <span>
                                                            {new Date(post.published_at).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </article>
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    {posts.links && posts.links.length > 3 && (
                                        <div className="mt-12 flex justify-center">
                                            <nav className="flex items-center space-x-2">
                                                {posts.links.map((link, index) => (
                                                    link.url ? (
                                                        <Link
                                                            key={index}
                                                            href={link.url}
                                                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                                                link.active
                                                                    ? 'bg-blue-600 text-white'
                                                                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                                                            }`}
                                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                                        />
                                                    ) : (
                                                        <span
                                                            key={index}
                                                            className="px-4 py-2 rounded-lg text-slate-400 dark:text-slate-600"
                                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                                        />
                                                    )
                                                ))}
                                            </nav>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">📝</div>
                                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                                        No posts found
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-300 mb-6">
                                        Be the first to share your story with the community!
                                    </p>
                                    {auth?.user && (
                                        <Link
                                            href={route('posts.create')}
                                            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                                        >
                                            ✍️ Write First Post
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}