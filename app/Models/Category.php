<?php

namespace App\Models;

use App\Models\Trait\HasSortable;
use Database\Factories\CategoryFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Category extends Model
{
    /** @use HasFactory<CategoryFactory> */
    use HasFactory, HasSortable;

    protected $fillable = [
        'name',
        'description',
    ];

    /** @var array<int, string> */
    protected $sortable = ['id', 'name'];

    /**
     * @return BelongsToMany<Technology, Category>
     */
    public function technologies(): BelongsToMany
    {
        return $this->belongsToMany(Technology::class);
    }
}