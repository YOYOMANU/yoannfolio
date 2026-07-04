<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class StackLayer extends Model
{
    /** @use HasFactory<StackLayerFactory> */
    use HasFactory;

    protected $fillable = [
        'key',
        'label',
        'description',
    ];

    public function technologies(): BelongsToMany
    {
        return $this->belongsToMany(Technology::class);
    }
}
