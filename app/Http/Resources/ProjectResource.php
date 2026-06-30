<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->resource->id,
            'slug' => $this->resource->slug,
            'title' => $this->resource->title,
            'category' => $this->resource->category,
            'short_description' => $this->resource->short_description,
            'long_description' => $this->resource->long_description,
            'problem' => $this->resource->problem,
            'solution' => $this->resource->solution,
            'role' => $this->resource->role,
            'context' => $this->resource->context,
            'swatch_class' => $this->resource->swatch_class,
            'live_url' => $this->resource->live_url,
            'repo_url' => $this->resource->repo_url,
            'is_featured' => $this->resource->is_featured,
            'status' => $this->resource->status,
            'image' => $this->resource->getFirstMediaUrl('image'),
            'technologies' => TechnologyResource::collection($this->resource->technologies),
        ];
    }
}
