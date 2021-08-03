<?php

namespace Tests\Feature;

use App\Models\User;
use Symfony\Component\HttpFoundation\Response;

class LoginTest extends BaseFeatureTestCase
{
    public function test422()
    {
        $response = $this->postJson(route('auth.login'));

        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY)->assertJsonStructure([
            'errors' => [
                'email', 'password',
            ],
        ]);
    }

    public function testSuccess()
    {
        $user = User::factory()->create([
            'password' => bcrypt($pass = $this->faker->password(5)),
        ]);

        $response = $this->postJson(route('auth.login'), [
            'email' => $user->email,
            'password' => $pass,
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
