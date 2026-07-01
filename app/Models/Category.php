<?php

namespace App\Models;

use App\Models\Trait\HasSortable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Category extends Model
{
    /** @use HasFactory<CategoryTechnologyFactory> */
    use HasFactory, HasSortable;

    protected $fillable = [
        'name',
        'description',
    ];

    protected $sortable = ['id', 'name'];

    public function technologies(): BelongsToMany
    {
        return $this->belongsToMany(Technology::class);
    }
}
