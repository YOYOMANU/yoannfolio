<?php

namespace App\Models\Trait;

use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

trait HasSortable
{
    /**
     * @param  Builder<self>  $builder
     * @return Builder<self>
     */
    #[Scope]
    protected function orderFromRequest(Builder $builder, Request $request)
    {
        // Aucun champ sortable
        if (empty($this->sortable ?? [])) {
            return $builder;
        }

        // Valider les paramètres
        $validated = $request->validate([
            'dir' => ['nullable', Rule::in(['asc', 'desc'])],
            'sort' => ['nullable', Rule::in($this->sortable)],
        ]);

        // Si aucun champ 'sort' n'est demandé → tri par défaut
        if (empty($validated['sort'])) {
            return $builder->orderByDesc('created_at');
        }

        // Tri selon la requête
        return $builder->orderBy(
            $validated['sort'],
            $validated['dir'] ?? 'desc'
        );
    }
}
