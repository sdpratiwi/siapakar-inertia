<?php

use App\Http\Controllers\Admin\DoctorsController;
use App\Http\Controllers\Admin\PatientsController;
use App\Http\Controllers\AturanController;
use App\Http\Controllers\DiseaseController;
use App\Http\Controllers\GejalaController;
use App\Http\Controllers\PenggunaController;
use App\Http\Controllers\PenyakitController;
use App\Http\Controllers\RiwayatController;
use App\Http\Controllers\SymptomController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::get('/doctors-data', [DoctorsController::class, 'data'])->name('doctors.data');

// Route::get('/patients-data', [PatientsController::class, 'data'])->name('patients.data');

Route::get('/data-penyakit', [PenyakitController::class, 'data'])->name('data.penyakit');

Route::get('/data-gejala', [GejalaController::class, 'data'])->name('data.gejala');

Route::get('/data-aturan', [AturanController::class, 'data'])->name('data.aturan');

Route::get('/data-pengguna', [PenggunaController::class, 'data'])->name('data.pengguna');

Route::get('/riwayat-diagnosa/{id},{roles}', [RiwayatController::class, 'data'])->name('data.riwayat');


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
