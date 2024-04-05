<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUpdateJobRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'format' => 'required',
            'type' => 'required',
            'status' => [
                'required',
                Rule::in(['pending', 'approving', 'changing', 'approved'])
            ],
            'files' => 'array',
            'files.*' => 'mimes:jpeg,png,jpg,gif,pdf,doc,docx,csv,xlsx,txt|max:3500',
        ];
    }
}
