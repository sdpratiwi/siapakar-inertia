<?php

namespace App\Http\Controllers;

use App\Models\Symptom;
use Illuminate\Http\Request;

class KonsultasiController extends Controller
{
    public function index()
    {
        return inertia(
            'Guest/Konsultasi',
            [
                'gejala' => Symptom::get(),
            ]
        );
    }

    public function hasilkonsultasi()
    {
        return inertia(
            'Guest/HasilKonsultasi',
        );
    }
}
