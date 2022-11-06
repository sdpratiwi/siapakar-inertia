<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    public function index()
    {
        return inertia('Login');
    }

    public function register()
    {
        return inertia('Register');
    }

    public function insert(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'tanggallahir' => 'required',
            'gender' => 'required',
            'email' => ['required', 'unique:users'],
            'address' => 'required',
            'username' => ['required', 'unique:users'],
            'password' => 'required',
            'confPassword' => 'required'
        ]);
        if ($request->password != $request->confPassword) {
            throw ValidationException::withMessages([
                'confPassword' => 'Konfirmasi Password salah!',
            ]);
        } else {
            $user = User::create([
                'name' => $request->name,
                'tanggallahir' => $request->tanggallahir,
                'gender' => $request->gender,
                'email' => $request->email,
                'address' => $request->address,
                'username' => $request->username,
                'gambar' => 'default',
                'password' => Hash::make($request->password),
            ]);
            $user->assignRole('user');
        }
        return redirect('/login');
    }

    public function checklogin(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'password' => 'required'
        ]);

        $user = User::where('username', $request->username)->first();

        if (!$user) {
            throw ValidationException::withMessages([
                'failed' => 'Nama Pengguna tidak terdaftar!',
            ]);
        } else {
            if (Auth::attempt($request->only('username', 'password'))) {
                session()->regenerate();

                if ($user->hasRole('admin')) {
                    return redirect('/dashboard');
                } else {
                    return redirect('/dashboarduser');
                }
            } else {
                throw ValidationException::withMessages([
                    'failed' => 'Password salah!',
                ]);
            }
        };
    }

    public function logout()
    {
        Auth::logout();

        return redirect('/login');
    }
}
