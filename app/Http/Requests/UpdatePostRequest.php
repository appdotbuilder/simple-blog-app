<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        if (!auth()->check()) {
            return false;
        }

        $user = auth()->user();
        $post = $this->route('post');
        
        return $user->id === $post->user_id;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:posts,slug,' . $this->route('post')->id,
            'excerpt' => 'nullable|string|max:500',
            'content' => 'required|string',
            'featured_image' => 'nullable|string|max:255',
            'status' => 'required|in:draft,published,archived',
            'published_at' => 'nullable|date',
            'category_id' => 'nullable|exists:categories,id',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Post title is required.',
            'content.required' => 'Post content is required.',
            'status.required' => 'Post status is required.',
            'status.in' => 'Post status must be draft, published, or archived.',
            'category_id.exists' => 'Selected category does not exist.',
            'tags.*.exists' => 'One or more selected tags do not exist.',
        ];
    }
}