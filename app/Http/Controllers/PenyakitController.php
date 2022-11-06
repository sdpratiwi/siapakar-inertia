<?php

namespace App\Http\Controllers;

use App\Models\Disease;
use Illuminate\Http\Request;

class PenyakitController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'kode_penyakit' => 'required|unique:diseases',
            'nama_penyakit' => 'required',
            'keterangan' => 'required',
            'saran' => 'required',
        ], [
            'kode_penyakit.required' => 'Kode penyakit harus diisi!',
            'nama_penyakit.required' => 'Nama Penyakit harus diisi!',
            'keterangan.required' => 'Keterangan harus diisi!',
            'saran.required' => 'saran harus diisi!',
            'kode_penyakit.unique' => 'Kode penyakit sudah digunakan!',
        ]);

        Disease::create([
            'kode_penyakit' => $request->kode_penyakit,
            'nama_penyakit' => $request->nama_penyakit,
            'keterangan' => $request->keterangan,
            'saran' => $request->saran,
        ]);

        return back();
    }

    public function update(Request $request)
    {
        $request->validate([
            'kode_penyakit' => ['required'],
            'nama_penyakit' => ['required'],
            'keterangan' => ['required'],
            'saran' => ['required']
        ], [
            'kode_penyakit.required' => 'Kode Penyakit belum di isi!',
            'nama_penyakit.required' => 'Nama Penyakit belum di isi!',
            'keterangan.required' => 'Keterangan belum di isi!',
            'saran.required' => 'Saran belum di isi!',
        ]);
        $cek = Disease::where('id', $request->id)->first();
        if ($cek->kode_penyakit == $request->kode_penyakit && $cek->nama_penyakit == $request->nama_penyakit) {
            Disease::where('id', $request->id)->update([
                'kode_penyakit' => $request->kode_penyakit,
                'nama_penyakit' => $request->nama_penyakit,
                'keterangan' => $request->keterangan,
                'saran' => $request->saran,
            ]);
            return back();
        } else {
            $cek2 = Disease::where('nama_penyakit', $request->nama_penyakit)->where('kode_penyakit', $request->kode_penyakit)->first();

            if ($cek2) {
                $request->validate([
                    'nama_penyakit' => ['required', 'unique:diseases,nama_penyakit'],
                    'kode_penyakit' => ['required', 'unique:diseases,kode_penyakit'],
                ], [
                    'kode_penyakit.required' => 'kode Penyakit belum di isi!',
                    'kode_penyakit.unique' => 'kode Penyakit sudah ada!',
                    'nama_penyakit.required' => 'Nama Penyakit belum di isi!',
                    'nama_penyakit.unique' => 'Nama Penyakit sudah ada!',
                ]);
            } elseif ($cek->kode_penyakit == $request->kode_penyakit) {
                $request->validate([
                    'nama_penyakit' => ['required', 'unique:diseases,nama_penyakit'],
                ], [
                    'nama_penyakit.required' => 'Nama Penyakit belum di isi!',
                    'nama_penyakit.unique' => 'Nama Penyakit sudah ada!',
                ]);
            } elseif ($cek->nama_penyakit == $request->nama_penyakit) {
                $request->validate([
                    'kode_penyakit' => ['required', 'unique:diseases,kode_penyakit'],
                ], [
                    'kode_penyakit.required' => 'Kode Penyakit belum di isi!',
                    'kode_penyakit.unique' => 'Kode Penyakit sudah ada!',
                ]);
            } else {
                Disease::where('id', $request->id)->update([
                    'kode_penyakit' => $request->kode_penyakit,
                    'nama_penyakit' => $request->nama_penyakit,
                    'keterangan' => $request->keterangan,
                    'saran' => $request->saran,
                ]);
                return back();
            }
        }
        Disease::where('id', $request->id)->update([
            'kode_penyakit' => $request->kode_penyakit,
            'nama_penyakit' => $request->nama_penyakit,
            'keterangan' => $request->keterangan,
            'saran' => $request->saran,
        ]);
        return back();
    }

    public function delete(Request $request)
    {
        Disease::where('id', $request->id)->delete();

        return back();
    }

    public function index()
    {
        return inertia('Admin/Penyakit');
    }

    public function data()
    {
        return Disease::latest()->get();
    }
}
