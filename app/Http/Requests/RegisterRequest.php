<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;

class RegisterRequest extends Request
{
    protected function postRules(): array
    {
        return [
            'name' => ['required', 'string'],
            'email' => ['required', 'email', Rule::unique('users', 'email')],
            'password' => ['required', 'string'],
            'confirm_password' => ['required', 'same:password'],
        ];
    }
}
