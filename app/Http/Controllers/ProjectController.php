<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('project/listing', [
            'Projects' => ProjectResource::collection(Project::all()),
        ]);
    }

    public function show(int $id, string $slug): Response
    {
        $project = Project::findOrFail($id);

        return Inertia::render('project/show', [
            'project' => new ProjectResource(
                $project->load(['technologies', 'features', 'media'])
            ),
        ]);
    }
}