<?php

namespace App\Models;

use App\Models\Trait\HasSlug;
use App\Models\Trait\HasSortable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Override;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Project extends Model implements HasMedia
{
    /** @use HasFactory<ProjectFactory> */
    use HasFactory, HasSlug, HasSortable, InteractsWithMedia;

    protected $fillable = [
        'title',
        'category',
        'short_description',
        'long_description',
        'problem',
        'solution',
        'role',
        'context',
        'swatch_class',
        'live_url',
        'repo_url',
        'is_featured',
        'status',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
    ];

    protected $sortable = [
        'name',
        'id',
        'status',
    ];

    public function technologies()
    {
        return $this->belongsToMany(Technology::class)->orderBy('sort_order');
    }

    public function features(): HasMany
    {
        return $this->hasMany(ProjectFeature::class)->orderBy('sort_order');
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
