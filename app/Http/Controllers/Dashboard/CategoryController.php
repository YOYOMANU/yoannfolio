<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\FormCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Category::class, 'category');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Category::query()->orderFromRequest($request);
        $search = $request->get('q');
        if ($search) {
            $query->where('name', 'like', '%'.$search.'%');
        }

        return Inertia::render('category/index', [
            'collection' => CategoryResource::collection($query->paginate(10)->withQueryString()),
            'q' => $search,
        ]);
    }

    public function create()
    {
        $category = new Category;

        return Inertia::render('category/form', [
            'Category' => new CategoryResource($category),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FormCategoryRequest $request)
    {
        $category = Category::create($request->validated());

        return to_route('category.index')->with('success', 'La categorie à été créée avec succès');

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {

        return Inertia::render('category/form', [
            'Category' => new CategoryResource($category),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FormCategoryRequest $request, Category $category)
    {
        $category->update($request->validated());

        return to_route('category.index')->with('success', 'La categorie à été modifiée avec succès');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $category->delete();

        return to_route('category.index')->with('success', 'La categorie à été supprimée avec succès');
    }
}
