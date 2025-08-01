import { Head, router, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Category {
    id: number;
    name: string;
    color: string;
}

interface Tag {
    id: number;
    name: string;
    color: string;
}

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    featured_image?: string;
    status: string;
    category_id?: number;
    tags: Array<{ id: number; }>;
}

interface Props {
    post: Post;
    categories: Category[];
    tags: Tag[];
    [key: string]: unknown;
}

export default function PostEdit({ post, categories, tags }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        title: post.title,
        excerpt: post.excerpt || '',
        content: post.content,
        featured_image: post.featured_image || '',
        status: post.status,
        category_id: post.category_id?.toString() || '',
        tags: post.tags.map(tag => tag.id),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('posts.update', post.id));
    };

    const handleTagToggle = (tagId: number) => {
        const newTags = data.tags.includes(tagId)
            ? data.tags.filter(id => id !== tagId)
            : [...data.tags, tagId];
        setData('tags', newTags);
    };

    return (
        <AppShell>
            <Head title={`✏️ Edit ${post.title} - Modern Blog`} />
            
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg">
                        <div className="px-8 py-6 border-b border-slate-200 dark:border-slate-700">
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                                ✏️ Edit Post
                            </h1>
                            <p className="text-slate-600 dark:text-slate-300 mt-1">
                                Update your story
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            {/* Title */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Post Title *
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                                    required
                                />
                                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                            </div>

                            {/* Excerpt */}
                            <div>
                                <label htmlFor="excerpt" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Excerpt
                                </label>
                                <textarea
                                    id="excerpt"
                                    rows={3}
                                    value={data.excerpt}
                                    onChange={(e) => setData('excerpt', e.target.value)}
                                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                                />
                                {errors.excerpt && <p className="mt-1 text-sm text-red-600">{errors.excerpt}</p>}
                            </div>

                            {/* Content */}
                            <div>
                                <label htmlFor="content" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Content *
                                </label>
                                <textarea
                                    id="content"
                                    rows={15}
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                                    required
                                />
                                {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
                            </div>

                            {/* Featured Image */}
                            <div>
                                <label htmlFor="featured_image" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Featured Image URL
                                </label>
                                <input
                                    type="url"
                                    id="featured_image"
                                    value={data.featured_image}
                                    onChange={(e) => setData('featured_image', e.target.value)}
                                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                                />
                                {errors.featured_image && <p className="mt-1 text-sm text-red-600">{errors.featured_image}</p>}
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Category */}
                                <div>
                                    <label htmlFor="category_id" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Category
                                    </label>
                                    <select
                                        id="category_id"
                                        value={data.category_id}
                                        onChange={(e) => setData('category_id', e.target.value)}
                                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category_id && <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>}
                                </div>

                                {/* Status */}
                                <div>
                                    <label htmlFor="status" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Status *
                                    </label>
                                    <select
                                        id="status"
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                                        required
                                    >
                                        <option value="draft">📝 Draft</option>
                                        <option value="published">🚀 Published</option>
                                        <option value="archived">📦 Archived</option>
                                    </select>
                                    {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
                                </div>
                            </div>

                            {/* Tags */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Tags
                                </label>
                                <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-3 border border-slate-300 dark:border-slate-600 rounded-lg">
                                    {tags.map((tag) => (
                                        <button
                                            key={tag.id}
                                            type="button"
                                            onClick={() => handleTagToggle(tag.id)}
                                            className={`px-3 py-1 rounded-full text-sm font-medium transition-opacity ${
                                                data.tags.includes(tag.id)
                                                    ? 'text-white opacity-100'
                                                    : 'text-white opacity-60 hover:opacity-80'
                                            }`}
                                            style={{ backgroundColor: tag.color }}
                                        >
                                            {tag.name} {data.tags.includes(tag.id) ? '✓' : ''}
                                        </button>
                                    ))}
                                </div>
                                {errors.tags && <p className="mt-1 text-sm text-red-600">{errors.tags}</p>}
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-700">
                                <button
                                    type="button"
                                    onClick={() => router.get(route('posts.show', post.slug))}
                                    className="bg-slate-600 text-white px-6 py-3 rounded-lg hover:bg-slate-700 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Updating...' : '💾 Update Post'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}