<?php

namespace App\Http\Controllers\Auth;

use App\Http\Requests\LoginRequest;
use App\Http\Resources\UserResource;
use App\Http\Services\UserService;
use App\Models\User;
use Symfony\Component\HttpFoundation\Response;

class LoginController
{
    protected UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function __invoke(LoginRequest $request)
    {
        $user = $this->userService->login($request->validated());

        if ($user instanceof User) {
            return UserResource::make($user);
        }

        return response(['error' => 'Invalid login credentials!'], Response::HTTP_FORBIDDEN);
    }
}
