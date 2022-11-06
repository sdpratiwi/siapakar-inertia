<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(RoleSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(GejalaSeeder::class);
        $this->call(PenyakitSeeder::class);
        $this->call(AturanSeeder::class);
        // \App\Models\User::factory(10)->create();
    }
}