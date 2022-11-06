<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class ProfilController extends Controller
{
    public function index()
    {
        return inertia('User/Profil');
    }
    public function ubah(request $request)
    {
        // dd($request->id, $request->name, $request->tanggallahir, $request->gender, $request->email, $request->address, $request->username);
        $validated = $request->validate([
            'name' => 'required',
            'tanggallahir' => 'required',
            'gender' => 'required',
            'email' => ['required', 'unique:users,email,' . $request->id],
            'address' => 'required',
            'username' => ['required', 'unique:users,username,' . $request->id],
        ]);

        // $lama = User::where('id', $request->id)->first()->gambar;
        if ($request->file('gambar')) {
            $oldimage = User::where('id', $request->id)->first()->gambar;
            Storage::delete($oldimage);
            // if ($lama) {
            //     Storage::delete($lama);
            // }
            $foto = $request->file('gambar');
            $nama = $foto->hashName();
            $validated['gambar'] = $request->file('gambar')->storeAs('profile', $nama);

            User::where('id', $request->id)->update($validated);
            return redirect('/profil');
        }


        User::where('id', $request->id)->update($validated);


        return redirect('/profil');
    }
}
