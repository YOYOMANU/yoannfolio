<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ContactMessageController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TechnologyController;
use Illuminate\Support\Facades\Route;

// Route::inertia('/', 'welcome')->name('home');
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/projects', [ProjectController::class, 'projects'])->name('projects.listing');
Route::get('/projects/{id}/{slug}', [ProjectController::class, 'show'])
    ->name('projects.show');

Route::get('/contact', [ContactMessageController::class, 'create'])->name('contact.create');
Route::post('/contact', [ContactMessageController::class, 'store'])
    ->name('contact.store')
    ->middleware('throttle:5,1');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::resource('project', ProjectController::class)->except('show');
    Route::resource('technology', TechnologyController::class)->except('show');
    Route::resource('category', CategoryController::class)->except('show');
});

require __DIR__.'/settings.php';
