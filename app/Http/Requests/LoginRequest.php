<?php

namespace App\Http\Requests;

class LoginRequest extends Request
{
    protected function postRules(): array
    {
        return [
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ];
    }
}
