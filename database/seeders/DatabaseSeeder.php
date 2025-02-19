<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Trajet;
use App\Models\Reviews;
use App\Models\Posts;
use App\Models\Messages;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Ahmed Errebache',
            'email' => 'Ahmed@example.com',
            'password' => bcrypt('123.321A'),
            'email_verified_at' => now(),
        ]);

        Trajet::factory()->count(20)->create();
        Reviews::factory()->count(20)->create();
        Posts::factory()->count(20)->create();
        Messages::factory()->count(20)->create();
    }
}
