<?php

namespace App\Http\Controllers;

use App\Http\Requests\FormProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Project::query()->orderFromRequest($request);
        $search = $request->get('q');
        if ($search) {
            $query->where('name', 'like', '%'.$search.'%');
        }

        return Inertia::render('project/index', [
            'collection' => ProjectResource::collection($query->paginate(10)->withQueryString()),
            'q' => $search,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $project = new Project;

        return Inertia::render('project/form', [
            'Project' => new ProjectResource($project),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FormProjectRequest $request)
    {
        //
        $project = Project::create($request->validated());
        $this->handleImages($project, $request);

        return to_route('project.index')->with('success', 'Le projet à été créé avec succès');

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {

        return Inertia::render('project/form', [
            'Project' => new ProjectResource($project),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FormProjectRequest $request, Project $project)
    {
        $project->update($request->validated());
        $this->handleImages($project, $request);

        return to_route('project.index')->with('success', 'Le projet à été modifié avec succès');

    }

    private function handleImages(Project $project, FormProjectRequest $request): void
    {
        // Ajout des nouvelles images
        if ($request->hasFile('image')) {
            $project->addMediaFromRequest('image')->toMediaCollection('image');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $project->delete();

        return to_route('project.index')->with('success', 'Le projet à été supprimé avec succès');
    }
}
