<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProjectResource;
use App\Models\Category;
use App\Models\Project;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Home/index', [
            'categories' => CategoryResource::collection(
                Category::with('technologies.media')->get()
            ),
            'Projects' => ProjectResource::collection(
                Project::where('status', '=', 'published')->get()
            ),
        ]);
    }
}