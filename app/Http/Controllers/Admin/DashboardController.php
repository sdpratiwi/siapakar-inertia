<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Disease;
use App\Models\History;
use App\Models\Rule;
use App\Models\Symptom;
use App\Models\User;
use Illuminate\Http\Request;
use phpDocumentor\Reflection\DocBlock\Tags\Uses;

class DashboardController extends Controller
{
    public function index()
    {
        return inertia('Admin/Dashboard', [
            'jumlahdatagejala' => Symptom::count(),
            'jumlahdataaturan' => Rule::count(),
            'jumlahdatapengguna' => User::role('user')->count(),
            'jumlahdatapenyakit' => Disease::count(),
            'riwayatkonsultasi' => History::with('user')->orderBy('id', 'desc')->take(4)->get(),
        ]);
    }
}
