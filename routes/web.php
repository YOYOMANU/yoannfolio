<?php

use App\Http\Controllers\ContactMessageController;
use App\Http\Controllers\Dashboard\CategoryController;
use App\Http\Controllers\Dashboard\ProjectController;
use App\Http\Controllers\Dashboard\TechnologyController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProjectController as PublicProjectController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/projets', [PublicProjectController::class, 'index'])->name('projets.listing');
Route::get('/projets/{id}/{slug}', [PublicProjectController::class, 'show'])
    ->name('projets.show');

Route::get('/contact', [ContactMessageController::class, 'create'])->name('contact.create');
Route::post('/contact', [ContactMessageController::class, 'store'])
    ->name('contact.store')
    ->middleware('throttle:5,1');

Route::middleware(['auth', 'verified', 'can:access-admin'])->group(function () {
    // Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::get('/dashboard', [TechnologyController::class, 'dashboard'])->name('dashboard');
    Route::resource('project', ProjectController::class)->except('show');
    Route::resource('technology', TechnologyController::class)->except('show');
    Route::resource('category', CategoryController::class)->except('show');
});

require __DIR__.'/settings.php';
