<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StackLayer extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'label',
        'description',
    ];

    public function technologies()
    {
        return $this->belongsToMany(Technology::class);
    }
}
