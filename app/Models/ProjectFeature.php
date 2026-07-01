<?php

namespace App\Models;

use App\Models\Trait\HasSortable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProjectFeature extends Model
{
    use HasFactory, HasSortable;

    protected $fillable = [
        'title',
        'description',
        'project_id',
    ];

    protected $sortable = [
        'title',
        'id',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }
}
