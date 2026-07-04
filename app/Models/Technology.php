<?php

namespace App\Models;

use App\Models\Trait\HasSlug;
use App\Models\Trait\HasSortable;
use Database\Factories\TechnologyFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Override;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Technology extends Model implements HasMedia
{
    /** @use HasFactory<TechnologyFactory> */
    use HasFactory, HasSlug, HasSortable, InteractsWithMedia;

    protected $fillable = [
        'name',
        'slug',
    ];

    /** @var array<int, string> */
    protected $sortable = [
        'name',
        'id',
    ];

    /**
     * @return BelongsToMany<Category, $this>
     */
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class);
    }

    /**
     * @return BelongsToMany<Project, $this>
     */
    public function projects(): BelongsToMany
    {
        return $this->belongsToMany(Project::class);
    }

    #[Override]
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('image')->singleFile();
    }

    #[Override]
    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('thumb')->fit(Fit::Crop, 160, 160);
    }
}
