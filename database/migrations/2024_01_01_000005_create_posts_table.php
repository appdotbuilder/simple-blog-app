<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title')->comment('Post title');
            $table->string('slug')->unique()->comment('Post slug for URLs');
            $table->text('excerpt')->nullable()->comment('Post excerpt/summary');
            $table->longText('content')->comment('Post content');
            $table->string('featured_image')->nullable()->comment('Featured image path');
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft')->comment('Post status');
            $table->timestamp('published_at')->nullable()->comment('Post published date');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->nullable()->constrained()->onDelete('set null');
            $table->integer('views')->default(0)->comment('Post view count');
            $table->integer('reading_time')->default(0)->comment('Estimated reading time in minutes');
            $table->json('meta_data')->nullable()->comment('Additional meta data');
            $table->timestamps();
            
            // Add indexes for performance
            $table->index('slug');
            $table->index('status');
            $table->index('published_at');
            $table->index(['status', 'published_at']);
            $table->index(['user_id', 'status']);
            $table->index('category_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};