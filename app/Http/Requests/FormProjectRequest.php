<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class FormProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'min:4'],
            'category' => ['required', 'string', 'min:4'],
            'short_description' => ['required', 'string', 'min:4'],
            'long_description' => ['required', 'string', 'min:4'],
            'problem' => ['required', 'string', 'min:4'],
            'solution' => ['required', 'string', 'min:4'],
            'role' => ['required', 'string', 'min:4'],
            'context' => ['required', 'string', 'min:4'],
            'swatch_class' => ['required', 'string', 'min:4'],
            'live_url' => ['nullable', 'string', 'min:4'],
            'repo_url' => ['nullable', 'string', 'min:4'],
            'is_featured' => ['required', 'boolean'],
            'status' => ['required', 'string'],
            'image' => ['nullable', 'image', 'mimes:png,jpg,jpeg,webp', 'max:5120'],
            'technology_ids' => ['nullable', 'array'],
            'technology_ids.*' => ['integer', 'exists:technologies,id'],
            'features' => ['array'],
            'features.*.id' => ['nullable', 'integer', 'exists:project_features,id'],
            'features.*.title' => ['required', 'string', 'max:255'],
            'features.*.description' => ['required', 'string'],
        ];
    }
}
