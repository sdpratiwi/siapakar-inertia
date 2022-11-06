<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'name' => 'Admin',
            'username' => 'admin',
            'tanggallahir' => Carbon::parse('2000-04-25'),
            'gender' => 'Perempuan',
            'gambar' => 'default',
            'email' => 'admin@gmail.com',
            'address' => 'anywhere',
            'password' => Hash::make('1234')
        ]);

        $user->assignRole('admin');

        $user = User::create([
            'name' => 'user',
            'username' => 'user',
            'tanggallahir' => Carbon::parse('2000-05-20'),
            'gender' => 'Laki-Laki',
            'gambar' => 'default',
            'email' => 'user@gmail.com',
            'address' => 'anywhere',
            'password' => Hash::make('1234')
        ]);

        $user->assignRole('user');
    }
}
