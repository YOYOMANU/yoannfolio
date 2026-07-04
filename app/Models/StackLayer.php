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

<<<<<<< HEAD
    /**
     * @return BelongsToMany<Technology, StackLayer>
     */
    public function technologies(): BelongsToMany
||||||| parent of c9888eb (CI/CD)
    public function technologies()
=======
    /**
     * @return BelongsToMany<Technology, static>
     */
    public function technologies(): BelongsToMany
>>>>>>> c9888eb (CI/CD)
    {
        return $this->belongsToMany(Technology::class);
    }
}