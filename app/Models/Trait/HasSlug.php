<?php

namespace App\Models\Trait;

use Illuminate\Support\Str;

trait HasSlug
{
    protected static function bootHasSlug(): void
    {
        static::creating(function ($model) {
            $model->slug = $model->generateUniqueSlug();
        });

        static::updating(function ($model) {
            // Ne régénère que si le titre a changé et que le slug
            // n'a pas été modifié manuellement par ailleurs
            if ($model->isDirty('title') && ! $model->isDirty('slug')) {
                $model->slug = $model->generateUniqueSlug();
            }
        });
    }

    public function generateUniqueSlug(): string
    {
        $base = Str::slug($this->title);
        $slug = $base;
        $i = 2;

        while ($this->slugExists($slug)) {
            $slug = "{$base}-{$i}";
            $i++;
        }

        return $slug;
    }

    protected function slugExists(string $slug): bool
    {
        $query = static::where('slug', $slug);

        if ($this->exists) {
            $query->where($this->getKeyName(), '!=', $this->getKey());
        }

        return $query->exists();
    }
}
