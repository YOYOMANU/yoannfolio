<?php

namespace App\Models;

use App\Models\Trait\HasSortable;
use Database\Factories\ProjectFeatureFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProjectFeature extends Model
{
    /** @use HasFactory<ProjectFeatureFactory> */
    use HasFactory, HasSortable;

    protected $fillable = [
        'title',
        'description',
        'project_id',
    ];

    /** @var array<int, string> */
    protected $sortable = [
        'title',
        'id',
    ];

    /**
     * @return BelongsTo<Project, ProjectFeature>
     */
    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }
}