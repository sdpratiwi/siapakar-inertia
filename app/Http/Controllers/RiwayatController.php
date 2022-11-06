<?php

namespace App\Http\Controllers;

use App\Models\History;
use App\Models\User;
use Illuminate\Http\Request;

class RiwayatController extends Controller
{
    public function index()
    {
        return inertia('Admin/Riwayat');
    }

    public function data($id, $roles)
    {
        if ($roles == 'user') {
            return History::with('user')->orderBy('id', 'desc')->where('id_client', $id)->get();
        } else if ($roles == 'admin') {
            return History::with('user')->orderBy('id', 'desc')->get();
        }
    }

    public function hasildiagnosa(History $history)
    {
        $user = User::where('id', $history->id_client)->first();
        return inertia('User/HasilDiagnosa', [
            'user' => $user,
            'riwayat' => $history
        ]);
    }

    public function detaildiagnosa(History $history)
    {
        $user = User::where('id', $history->id_client)->first();
        return inertia('User/DetailDiagnosa', [
            'user' => $user,
            'riwayat' => $history
        ]);
    }

    public function delete(Request $request)
    {
        History::where('id', $request->id)->delete();

        return back();
    }
}
