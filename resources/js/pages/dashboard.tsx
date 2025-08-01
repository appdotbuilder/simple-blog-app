import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

interface Post {
    id: number;
    title: string;
    slug: string;
    status: string;
    views: number;
    reading_time: number;
    created_at: string;
    category?: {
        name: string;
        color: string;
    };
    tags: Array<{
        name: string;
        color: string;
    }>;
}

interface Props {
    userPosts: Post[];
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ userPosts }: Props) {
    const { auth } = usePage<{ auth: { user: { id: number; name: string; } } }>().props;

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'published': return '🚀';
            case 'draft': return '📝';
            default: return '📄';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'published': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
            case 'draft': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20';
            default: return 'text-slate-600 bg-slate-100 dark:text-slate-400 dark:bg-slate-700';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="📊 Dashboard - Modern Blog" />
            
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                {/* Header */}
                <div className="mb-4">
                    <h1 className="text-2xl font-bold text-sidebar-foreground mb-2">
                        📊 Welcome back, {auth?.user?.name}!
                    </h1>
                    <p className="text-sidebar-foreground/70">
                        Manage your blog posts and track your progress
                    </p>
                </div>

                {/* Quick Stats */}
                <div className="grid md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-sidebar/50 border border-sidebar-border rounded-lg p-4 text-center">
                        <div className="text-2xl mb-2">📝</div>
                        <h3 className="text-xl font-bold text-sidebar-foreground">
                            {userPosts.length}
                        </h3>
                        <p className="text-sidebar-foreground/70 text-sm">Total Posts</p>
                    </div>
                    <div className="bg-sidebar/50 border border-sidebar-border rounded-lg p-4 text-center">
                        <div className="text-2xl mb-2">🚀</div>
                        <h3 className="text-xl font-bold text-sidebar-foreground">
                            {userPosts.filter(post => post.status === 'published').length}
                        </h3>
                        <p className="text-sidebar-foreground/70 text-sm">Published</p>
                    </div>
                    <div className="bg-sidebar/50 border border-sidebar-border rounded-lg p-4 text-center">
                        <div className="text-2xl mb-2">📄</div>
                        <h3 className="text-xl font-bold text-sidebar-foreground">
                            {userPosts.filter(post => post.status === 'draft').length}
                        </h3>
                        <p className="text-sidebar-foreground/70 text-sm">Drafts</p>
                    </div>
                    <div className="bg-sidebar/50 border border-sidebar-border rounded-lg p-4 text-center">
                        <div className="text-2xl mb-2">👁️</div>
                        <h3 className="text-xl font-bold text-sidebar-foreground">
                            {userPosts.reduce((total, post) => total + post.views, 0).toLocaleString()}
                        </h3>
                        <p className="text-sidebar-foreground/70 text-sm">Total Views</p>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-sidebar/50 border border-sidebar-border rounded-lg p-4 mb-6">
                    <h2 className="text-lg font-semibold text-sidebar-foreground mb-4">
                        ⚡ Quick Actions
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href={route('posts.create')}
                            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center text-sm"
                        >
                            ✍️ Write New Post
                        </Link>
                        <Link
                            href={route('posts.index')}
                            className="bg-muted text-muted-foreground px-4 py-2 rounded-lg hover:bg-muted/80 transition-colors inline-flex items-center text-sm"
                        >
                            📚 Browse All Posts
                        </Link>
                        <Link
                            href={route('home')}
                            className="border border-sidebar-border text-sidebar-foreground px-4 py-2 rounded-lg hover:bg-sidebar/30 transition-colors inline-flex items-center text-sm"
                        >
                            🏠 View Site
                        </Link>
                    </div>
                </div>

                {/* Recent Posts */}
                <div className="bg-sidebar/50 border border-sidebar-border rounded-lg p-4 flex-1">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-sidebar-foreground">
                            📖 Your Recent Posts
                        </h2>
                        <Link
                            href={route('posts.index')}
                            className="text-primary hover:text-primary/80 text-sm font-medium"
                        >
                            View all posts →
                        </Link>
                    </div>

                    {userPosts.length > 0 ? (
                        <div className="space-y-3">
                            {userPosts.map((post) => (
                                <div
                                    key={post.id}
                                    className="flex items-center justify-between p-3 border border-sidebar-border rounded-lg hover:bg-sidebar/30 transition-colors"
                                >
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}
                                            >
                                                {getStatusIcon(post.status)} {post.status}
                                            </span>
                                            {post.category && (
                                                <span
                                                    className="px-2 py-1 rounded-full text-xs font-medium text-white"
                                                    style={{ backgroundColor: post.category.color }}
                                                >
                                                    {post.category.name}
                                                </span>
                                            )}
                                        </div>
                                        <Link
                                            href={route('posts.show', post.slug)}
                                            className="font-semibold text-sidebar-foreground hover:text-primary transition-colors block truncate"
                                        >
                                            {post.title}
                                        </Link>
                                        <div className="flex items-center space-x-3 mt-1 text-xs text-sidebar-foreground/70">
                                            <span>👁️ {post.views}</span>
                                            <span>⏱️ {post.reading_time}m</span>
                                            <span>{new Date(post.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-1 ml-3">
                                        <Link
                                            href={route('posts.edit', post.id)}
                                            className="text-primary hover:text-primary/80 p-1 rounded transition-colors"
                                            title="Edit post"
                                        >
                                            ✏️
                                        </Link>
                                        <Link
                                            href={route('posts.show', post.slug)}
                                            className="text-sidebar-foreground/70 hover:text-sidebar-foreground p-1 rounded transition-colors"
                                            title="View post"
                                        >
                                            👁️
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <div className="text-4xl mb-3">✍️</div>
                            <h3 className="text-lg font-semibold text-sidebar-foreground mb-2">
                                No posts yet
                            </h3>
                            <p className="text-sidebar-foreground/70 mb-4 text-sm">
                                Start sharing your stories with the world!
                            </p>
                            <Link
                                href={route('posts.create')}
                                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center text-sm"
                            >
                                ✍️ Write Your First Post
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}