<?php

namespace App\Models;

use App\Models\Trait\HasSlug;
use App\Models\Trait\HasSortable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Technology extends Model
{
    /** @use HasFactory<TechnologyFactory> */
    use HasFactory, HasSlug, HasSortable;

    protected $fillable = [
        'name',
        'slug',
    ];

    protected $sortable = [
        'name',
        'id',
    ];

    public function stackLayers()
    {
        return $this->belongsToMany(StackLayer::class);
    }

    public function projects()
    {
        return $this->belongsToMany(Project::class);
    }
}
