<?php

namespace App\Models;

use Database\Factories\StackLayerFactory;
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

    /**
     * @return BelongsToMany<Technology, $this>
     */
    public function technologies(): BelongsToMany
    {
        return $this->belongsToMany(Technology::class);
    }
}
