<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\FormTechnologyRequest;
use App\Http\Resources\TechnologyResource;
use App\Models\Category;
use App\Models\Technology;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TechnologyController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Technology::class, 'technology');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Technology::with(['categories', 'media'])->orderFromRequest($request);
        $search = $request->get('q');
        if ($search) {
            $query->where('name', 'like', '%'.$search.'%');
        }

        return Inertia::render('technology/index', [
            'collection' => TechnologyResource::collection($query->paginate(10)->withQueryString()),
            'q' => $search,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('technology/form', [
            'Technology' => new Technology,
            'categories' => Category::orderBy('name', 'asc')->get(['id', 'name']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FormTechnologyRequest $request)
    {

        $technology = Technology::create($request->validated());
        $technology->categories()->sync($request->input('category_ids', []));
        $this->handleImages($technology, $request);

        return to_route('technology.index')->with('success', 'La technologie à été créée avec succès');

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Technology $technology)
    {
        return Inertia::render('technology/form', [
            'Technology' => new TechnologyResource($technology->load(['categories', 'media'])),
            'categories' => Category::orderBy('name', 'asc')->get(['id', 'name']),
        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FormTechnologyRequest $request, Technology $technology)
    {
        $technology->update($request->validated());
        $technology->categories()->sync($request->input('category_ids', []));
        $this->handleImages($technology, $request);

        return to_route('technology.index')->with('success', 'La technologie à été modifiée avec succès');
    }

    private function handleImages(Technology $technology, FormTechnologyRequest $request): void
    {
        // Ajout des nouvelles images
        if ($request->hasFile('image')) {
            $technology->addMediaFromRequest('image')->toMediaCollection('image');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Technology $technology)
    {
        $technology->delete();

        return to_route('technology.index')->with('success', 'La technologie à été supprimée avec succès');
    }
}
