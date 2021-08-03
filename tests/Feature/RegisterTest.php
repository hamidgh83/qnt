<?php

namespace Tests\Feature;

use App\Http\Resources\UserResource;
use App\Models\User;
use Symfony\Component\HttpFoundation\Response;

class RegisterTest extends BaseFeatureTestCase
{
    public function test422()
    {
        $response = $this->postJson(route('auth.register'));

        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY)->assertJsonStructure([
            'errors' => [
                'name', 'email', 'password', 'confirm_password'
            ],
        ]);
    }

    public function testSuccess()
    {
        $response = $this->postJson(route('auth.register'), [
            'name' => $this->faker->name,
            'email' => $this->faker->email,
            'password' => $confirm = $this->faker->password,
            'confirm_password' => $confirm,
        ]);

        $response->assertSuccessful()->assertJsonStructure([
            "data" => [
                "name",
                "email",
                "registered_at",
                "access_token",
            ]
        ]);
    }
}
