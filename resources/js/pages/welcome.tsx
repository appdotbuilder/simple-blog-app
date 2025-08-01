import { Head, Link, usePage } from '@inertiajs/react';

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
        color: string;
    };
    tags: Array<{
        id: number;
        name: string;
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

interface Props {
    canLogin: boolean;
    canRegister: boolean;
    posts: Post[];
    categories: Category[];
    featuredPost?: Post;
    [key: string]: unknown;
}

export default function Welcome({ canLogin, canRegister, posts, categories, featuredPost }: Props) {
    const { auth } = usePage<{ auth?: { user?: { id: number; name: string; } } }>().props;

    return (
        <>
            <Head title="📝 Modern Blog - Share Your Stories">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 dark:bg-slate-900/80 dark:border-slate-700/60">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center space-x-2">
                                <span className="text-2xl">📝</span>
                                <h1 className="text-xl font-bold text-slate-900 dark:text-white">ModernBlog</h1>
                            </div>
                            <nav className="flex items-center space-x-4">
                                {auth?.user ? (
                                    <>
                                        <Link
                                            href={route('posts.index')}
                                            className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                                        >
                                            All Posts
                                        </Link>
                                        <Link
                                            href={route('dashboard')}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Dashboard
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href={route('posts.index')}
                                            className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                                        >
                                            Browse Posts
                                        </Link>
                                        {canLogin && (
                                            <Link
                                                href={route('login')}
                                                className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                                            >
                                                Log in
                                            </Link>
                                        )}
                                        {canRegister && (
                                            <Link
                                                href={route('register')}
                                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                            >
                                                Join Now
                                            </Link>
                                        )}
                                    </>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto text-center">
                        <h2 className="text-5xl font-bold text-slate-900 dark:text-white mb-6">
                            Share Your Stories with the World ✨
                        </h2>
                        <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
                            A modern blogging platform where creativity meets community. Write, share, and discover amazing content from writers around the globe.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {auth?.user ? (
                                <Link
                                    href={route('posts.create')}
                                    className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
                                >
                                    ✍️ Write Your First Post
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('register')}
                                        className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
                                    >
                                        🚀 Start Writing Today
                                    </Link>
                                    <Link
                                        href={route('posts.index')}
                                        className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors dark:hover:bg-blue-900/20"
                                    >
                                        📚 Explore Posts
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="py-16 bg-white/50 dark:bg-slate-800/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                                Everything You Need to Blog Successfully
                            </h3>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center p-6">
                                <div className="text-4xl mb-4">✍️</div>
                                <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Rich Editor</h4>
                                <p className="text-slate-600 dark:text-slate-300">
                                    Create beautiful posts with our intuitive editor. Add images, format text, and bring your ideas to life.
                                </p>
                            </div>
                            <div className="text-center p-6">
                                <div className="text-4xl mb-4">🏷️</div>
                                <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Smart Organization</h4>
                                <p className="text-slate-600 dark:text-slate-300">
                                    Organize your content with categories and tags. Help readers find exactly what they're looking for.
                                </p>
                            </div>
                            <div className="text-center p-6">
                                <div className="text-4xl mb-4">💬</div>
                                <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Engage Community</h4>
                                <p className="text-slate-600 dark:text-slate-300">
                                    Build meaningful connections through comments and discussions. Foster a thriving community around your content.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Post */}
                {featuredPost && (
                    <section className="py-16">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-12">
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                                    🔥 Most Popular Post
                                </h3>
                            </div>
                            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
                                <div className="flex flex-col md:flex-row gap-8">
                                    {featuredPost.featured_image && (
                                        <div className="md:w-1/3">
                                            <img
                                                src={featuredPost.featured_image}
                                                alt={featuredPost.title}
                                                className="w-full h-48 object-cover rounded-lg"
                                            />
                                        </div>
                                    )}
                                    <div className={featuredPost.featured_image ? 'md:w-2/3' : 'w-full'}>
                                        <div className="flex items-center gap-2 mb-4">
                                            {featuredPost.category && (
                                                <span
                                                    className="px-3 py-1 rounded-full text-sm font-medium text-white"
                                                    style={{ backgroundColor: featuredPost.category.color }}
                                                >
                                                    {featuredPost.category.name}
                                                </span>
                                            )}
                                            <span className="text-slate-500 dark:text-slate-400 text-sm">
                                                👁️ {featuredPost.views.toLocaleString()} views
                                            </span>
                                        </div>
                                        <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                                            {featuredPost.title}
                                        </h4>
                                        {featuredPost.excerpt && (
                                            <p className="text-slate-600 dark:text-slate-300 mb-4">
                                                {featuredPost.excerpt}
                                            </p>
                                        )}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                                                <span>By {featuredPost.author.name}</span>
                                                <span>•</span>
                                                <span>⏱️ {featuredPost.reading_time} min read</span>
                                            </div>
                                            <Link
                                                href={route('posts.show', featuredPost.slug)}
                                                className="text-blue-600 hover:text-blue-700 font-medium"
                                            >
                                                Read More →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Latest Posts */}
                <section className="py-16 bg-white/50 dark:bg-slate-800/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                                📖 Latest Stories
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300">
                                Discover fresh content from our community of writers
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <article key={post.id} className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                    {post.featured_image && (
                                        <img
                                            src={post.featured_image}
                                            alt={post.title}
                                            className="w-full h-48 object-cover"
                                        />
                                    )}
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 mb-3">
                                            {post.category && (
                                                <span
                                                    className="px-2 py-1 rounded-full text-xs font-medium text-white"
                                                    style={{ backgroundColor: post.category.color }}
                                                >
                                                    {post.category.name}
                                                </span>
                                            )}
                                            <span className="text-slate-500 dark:text-slate-400 text-sm">
                                                ⏱️ {post.reading_time} min
                                            </span>
                                        </div>
                                        <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                                            {post.title}
                                        </h4>
                                        {post.excerpt && (
                                            <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                                                {post.excerpt}
                                            </p>
                                        )}
                                        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                                            <span>By {post.author.name}</span>
                                            <Link
                                                href={route('posts.show', post.slug)}
                                                className="text-blue-600 hover:text-blue-700 font-medium"
                                            >
                                                Read →
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                        <div className="text-center mt-12">
                            <Link
                                href={route('posts.index')}
                                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
                            >
                                📚 View All Posts
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Categories */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                                🏷️ Explore by Category
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300">
                                Find content that matches your interests
                            </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {categories.map((category) => (
                                <Link
                                    key={category.id}
                                    href={route('categories.show', category.slug)}
                                    className="group"
                                >
                                    <div
                                        className="p-6 rounded-lg text-white text-center hover:scale-105 transition-transform"
                                        style={{ backgroundColor: category.color }}
                                    >
                                        <h4 className="font-semibold mb-1">{category.name}</h4>
                                        <p className="text-sm opacity-90">
                                            {category.posts_count} post{category.posts_count !== 1 ? 's' : ''}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-slate-900 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="flex items-center justify-center space-x-2 mb-4">
                            <span className="text-2xl">📝</span>
                            <h3 className="text-xl font-bold">ModernBlog</h3>
                        </div>
                        <p className="text-slate-400 mb-8">
                            Where stories come to life and communities thrive
                        </p>
                        <div className="flex justify-center space-x-8 text-sm">
                            <Link href={route('posts.index')} className="hover:text-blue-400 transition-colors">
                                All Posts
                            </Link>
                            <Link href={route('categories.index')} className="hover:text-blue-400 transition-colors">
                                Categories
                            </Link>
                            <Link href={route('tags.index')} className="hover:text-blue-400 transition-colors">
                                Tags
                            </Link>
                        </div>
                        <div className="mt-8 pt-8 border-t border-slate-800 text-slate-400 text-sm">
                            <p>Built with ❤️ using Laravel & React</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}