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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique(); // 'shoplite', 'techbook'...
            $table->string('title');
            $table->string('category'); // "Plateforme immobilière"
            $table->text('short_description');
            $table->text('long_description');
            $table->text('problem');
            $table->text('solution');
            $table->string('role');
            $table->string('context');
            $table->string('swatch_class'); // 'swatch-shoplite' (lié à ton CSS)
            $table->string('live_url')->nullable();
            $table->string('repo_url')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->enum('status', ['draft', 'published'])->default('draft');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
