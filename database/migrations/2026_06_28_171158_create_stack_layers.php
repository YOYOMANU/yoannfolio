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
        Schema::create('stack_layers', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique(); // 'mobile', 'web', 'backend', 'data'
            $table->string('label'); // "Mobile & natif"
            $table->text('description');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stack_layers');
    }
};
