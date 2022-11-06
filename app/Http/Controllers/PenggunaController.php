<?php

namespace App\Http\Controllers;

use App\Models\History;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class PenggunaController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required'],
            'username' => ['required', 'unique:users,username'],
            'tanggallahir' => 'required',
            'gender' => 'required',
            'address' => 'required',
            'email' => ['required', 'unique:users,email'],
            'role' => ['required'],
        ], [
            'name.required' => 'Nama harus diisi!',
            'username.required' => 'Username harus diisi!',
            'username.unique' => 'Username sudah ada!',
            'tanggallahir.required' => 'Tanggal Lahir harus diisi!',
            'address.required' => 'Alamat harus diisi!',
            'email.required' => 'Email harus diisi!',
            'gender.required' => 'Jenis Kelamin harus diisi!',
            'email.unique' => 'Email sudah ada!',
        ]);

        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'tanggallahir' => $request->tanggallahir,
            'gender' => $request->gender,
            'address' => $request->address,
            'email' => $request->email,
            'password' => Hash::make('1234'),
            'gambar' => 'default',
        ]);
        $user->assignrole($request->role);
        return back();
    }

    public function update(Request $request)
    {
        $user = User::where('id', $request->id)->first();
        $request->validate([
            'name' => ['required'],
            'username' => ['required', 'unique:users,username,' . $request->id],
            'tanggallahir' => 'required',
            'gender' => 'required',
            'address' => 'required',
            'email' => ['required', 'unique:users,email,' . $request->id],
            'role' => ['required'],
        ], [
            'name.required' => 'Nama harus diisi!',
            'username.required' => 'Username harus diisi!',
            'username.unique' => 'Username sudah ada!',
            'tanggallahir.required' => 'Tanggal Lahir harus diisi!',
            'address.required' => 'Alamat harus diisi!',
            'email.required' => 'Email harus diisi!',
            'gender.required' => 'Jenis Kelamin harus diisi!',
            'email.unique' => 'Email sudah ada!',
        ]);

        User::where('id', $request->id)->update([
            'name' => $request->name,
            'username' => $request->username,
            'tanggallahir' => $request->tanggallahir,
            'gender' => $request->gender,
            'address' => $request->address,
            'email' => $request->email,
            'password' => Hash::make('1234'),

        ]);
        $user->syncRoles($request->role);
        return back();
    }

    public function index()
    {
        return inertia('Admin/Pengguna');
    }

    public function data()
    {
        return User::with('roles')->latest()->get();
    }

    public function delete(Request $request)
    {
        User::where('id', $request->id)->delete();
        History::where('id_Client', $request->id)->delete();

        return back();
    }
}
