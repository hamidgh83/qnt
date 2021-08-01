<?php

namespace App\Http\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserService
{
    public function register(array $data): User
    {
        $data['password'] = bcrypt($data['password']); 

        return User::create($data);
    }

    public function login(array $credentials): ?User
    {
        if (!Auth::attempt($credentials)) {
            return null;
        }

        $accessToken = Auth::user()->createToken('authToken')->accessToken;

        return Auth::user()->withAccessToken($accessToken);
    }
}