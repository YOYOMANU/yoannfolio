<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TechnologyController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::resource('project', ProjectController::class)->except('show');
    Route::resource('technology', TechnologyController::class)->except('show');
    Route::resource('category', CategoryController::class)->except('show');
});

require __DIR__.'/settings.php';
