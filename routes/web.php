<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\DoctorsController;
use App\Http\Controllers\Admin\PatientsController;
use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\AturanController;
use App\Http\Controllers\DataController;
use App\Http\Controllers\DiseaseController;
use App\Http\Controllers\GejalaController;
use App\Http\Controllers\KonsultasiController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\PenggunaController;
use App\Http\Controllers\PenyakitController;
use App\Http\Controllers\ProfilController;
use App\Http\Controllers\RiwayatController;
use App\Http\Controllers\SymptomController;
use App\Http\Controllers\RuleController;
use App\Http\Controllers\User\DashboardUserController;
use App\Http\Controllers\User\DempsterController;
use App\Models\User;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// default localhost:8000

Route::get('/', function () {
    return inertia('Home');
});

Route::get('/about', function () {
    return inertia('About');
});

Route::get('/login', [LoginController::class, 'index'])->name('login');
Route::post('/login', [LoginController::class, 'checklogin']);

Route::get('/register', [LoginController::class, 'register']);
Route::post('/register', [LoginController::class, 'insert']);

Route::get('/konsultasi', [KonsultasiController::class, 'index']);
Route::get('/hasilkonsultasi', [KonsultasiController::class, 'hasilkonsultasi']);

Route::post('/diagnosa2', [DempsterController::class, 'dempster2']);


Route::middleware('auth')->group(function () {
    Route::middleware('role:user||admin')->group(function () {
        Route::post('/ubahprofil', [ProfilController::class, 'ubah']);
        Route::get('/riwayat', [RiwayatController::class, 'index']);
        Route::get('/hasil-{history}', [RiwayatController::class, 'hasildiagnosa']);
        Route::get('/detail-{history}', [RiwayatController::class, 'detaildiagnosa']);
        Route::get('/profil', [ProfilController::class, 'index']);
    });
    Route::middleware('role:admin')->group(
        function () {

            Route::get('/dashboard', [DashboardController::class, 'index']);

            Route::get('/penyakit', [PenyakitController::class, 'index']);
            Route::post('/tambahpenyakit', [PenyakitController::class, 'store']);
            Route::post('/edit-penyakit', [PenyakitController::class, 'update']);
            Route::post('/hapus-penyakit', [PenyakitController::class, 'delete']);

            Route::get('/gejala', [GejalaController::class, 'index']);
            Route::post('/tambahgejala', [GejalaController::class, 'store']);
            Route::post('/edit-gejala', [GejalaController::class, 'update']);
            Route::get('/hapus-gejala', [GejalaController::class, 'delete']);

            Route::get('/aturan', [AturanController::class, 'index']);
            Route::post('/tambahaturan', [AturanController::class, 'store']);
            Route::post('/hapus-aturan', [AturanController::class, 'delete']);
            Route::post('/edit-aturan', [AturanController::class, 'update']);

            Route::get('/doctors', [DoctorsController::class, 'index']);
            Route::post('/doctors', [DoctorsController::class, 'insert']);
            Route::post('/doctor-delete', [DoctorsController::class, 'delete']);
            Route::post('/doctor-update', [DoctorsController::class, 'update']);

            Route::get('/patients', [PatientsController::class, 'index']);
            Route::post('/patients', [PatientsController::class, 'insert']);
            Route::post('/patient-delete', [PatientsController::class, 'delete']);
            Route::post('/patient-update', [PatientsController::class, 'update']);


            Route::post('/rules', [RuleController::class, 'store']);

            Route::post('/hapus-riwayat', [RiwayatController::class, 'delete']);

            Route::get('/data', [DataController::class, 'index']);
            Route::get('/settings', [SettingsController::class, 'index']);
            // Route::get('/profile', [ProfileController::class, 'index']);
            Route::get('/pengguna', [PenggunaController::class, 'index']);
            Route::post('/tambahpengguna', [PenggunaController::class, 'store']);
            Route::post('/edit-pengguna', [PenggunaController::class, 'update']);
            Route::post('/hapus-pengguna', [PenggunaController::class, 'delete']);
        }



    );
    Route::middleware('role:user')->group(function () {
        Route::get('/dashboarduser', [DashboardUserController::class, 'index']);
        Route::post('/diagnosas', [DempsterController::class, 'dempster']);


        // Route::post('/diagnosas', function () {
        //     return "Hello diagnosas";
        // });
    });
    Route::post('/logout', [LoginController::class, 'logout']);
});
