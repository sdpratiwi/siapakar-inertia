<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Symptom;

class DashboardUserController extends Controller
{
    public function index()
    {
        // return inertia('User/Dashboard');
        return inertia('User/Dashboard', [
            'gejala' => Symptom::get(),
        ]);
    }
}
