<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTrajetRequest extends FormRequest
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
            'departure_station' => 'required|string|max:255',
            'arrival_station' => 'required|string|max:255',
            'departure_date' => 'required|date',
            'departure_time' => 'required',
            'message' => 'nullable|string',
            'available_seats' => 'required|integer|min:1',
        ];
    }
}
