<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactRequest extends FormRequest
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
            'first_name' => 'required|min:2',
            'last_name' => 'required|min:2',
            'email' => 'required|email:rfc,dns|unique:contacts',
            'phone_number' => 'required|numeric|unique:contacts',
        ];
    }

    public function messages(): array
    {
        return [
            'first_name.required' => 'First name name is required',
            'first_name.min' => 'First name should be at least 2 characters long',

            'last_name.required' => 'Last name name is required',
            'first_namelast_name.min' => 'Last name should be at least 2 characters long',

            'email.required' => 'Email date is required',
            'email.email' => 'Email should have a valid format',
            'email.unique' => 'A contact with the same email already exists',

            'phone_number.required' => 'Phone number is required',
            'phone_number.numeric' => 'Phone number should be a number',
            'phone_number.unique' => 'A contact with the same number already exists',

        ];
    }
}