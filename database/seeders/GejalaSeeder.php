<?php

namespace Database\Seeders;

use App\Models\Symptom;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class GejalaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $gejala = [
            [
                'kode_gejala' => 'GP01',
                'nama_gejala' => 'Munculnya benjolan di area lipatan paha kanan/kiri',
            ],
            [
                'kode_gejala' => 'GP02',
                'nama_gejala' => 'Munculnya benjolan di area lipatan paha atau kanan/kiriMunculnya benjolan di kantung buah zakar kanan/kiri/keduanya',
            ],
            [
                'kode_gejala' => 'GP03',
                'nama_gejala' => 'Benjolan timbul ketika batuk, bersin atau mengedan dan hilang pada saat berbaring (hilang timbul)',
            ],
            [
                'kode_gejala' => 'GP04',
                'nama_gejala' => 'Benjolan sudah tidak bisa masuk kembali',
            ],
            [
                'kode_gejala' => 'GP05',
                'nama_gejala' => 'Benjolan disertai rasa tidak nyaman dan nyeri',
            ],
            [
                'kode_gejala' => 'GP06',
                'nama_gejala' => 'Mual atau Muntah',
            ],
            [
                'kode_gejala' => 'GP07',
                'nama_gejala' => 'Demam',
            ],
            [
                'kode_gejala' => 'GP08',
                'nama_gejala' => 'Sulit buang gas atau sulit BAB',
            ],
            [
                'kode_gejala' => 'GP09',
                'nama_gejala' => 'Sakit perut atau kembung',
            ],
            [
                'kode_gejala' => 'GP10',
                'nama_gejala' => 'Sulit BAB.',
            ],
            [
                'kode_gejala' => 'GP11',
                'nama_gejala' => 'Nyeri pada anus saat BAB.',
            ],
            [
                'kode_gejala' => 'GP12',
                'nama_gejala' => 'BAB Berdarah.',
            ],
            [
                'kode_gejala' => 'GP13',
                'nama_gejala' => 'Rasa panas pada anus setelah BAB.',
            ],
            [
                'kode_gejala' => 'GP14',
                'nama_gejala' => 'Rasa tidak nyaman atau mengganjal pada anus.',
            ],
            [
                'kode_gejala' => 'GP15',
                'nama_gejala' => 'Rasa gatal pada anus.',
            ],
            [
                'kode_gejala' => 'GP16',
                'nama_gejala' => 'Benjolan pada anus',
            ],
            [
                'kode_gejala' => 'GP17',
                'nama_gejala' => 'Benjolan dapat masuk kembali ke anus dengan spontan/tanpa bantuan dorongan jari',
            ],
            [
                'kode_gejala' => 'GP18',
                'nama_gejala' => 'Benjolan dapat masuk dengan bantuan dorongan jari',
            ],
            [
                'kode_gejala' => 'GP19',
                'nama_gejala' => 'Benjolan tidak dapat masuk kembali walaupun dengan bantuan dorongan jari',
            ],
            [
                'kode_gejala' => 'GP20',
                'nama_gejala' => 'Nyeri ulu hati',
            ],
            [
                'kode_gejala' => 'GP21',
                'nama_gejala' => 'Nyeri samar dibagian pusar berpindah ke kanan bawah',
            ],
            [
                'kode_gejala' => 'GP22',
                'nama_gejala' => 'Nyeri perut bagian kanan yang hilang timbul',
            ],
            [
                'kode_gejala' => 'GP23',
                'nama_gejala' => 'Nyeri perut kanan bawah lebih dari dua minggu',
            ],
            [
                'kode_gejala' => 'GP24',
                'nama_gejala' => 'Demam timbul setelah nyeri perut',
            ],
            [
                'kode_gejala' => 'GP25',
                'nama_gejala' => 'Nyeri perut bagian kanan bawah',
            ],
            [
                'kode_gejala' => 'GP26',
                'nama_gejala' => 'Rasa sakit meningkat 1 x 24 jam',
            ],
            [
                'kode_gejala' => 'GP27',
                'nama_gejala' => 'Perut bagian kanan bawah terasa nyeri saat di tekan dan di lepas',
            ],
            [
                'kode_gejala' => 'GP28',
                'nama_gejala' => 'Perut bagian kanan terasa bengkak dan tegang saat di raba',
            ],
            [
                'kode_gejala' => 'GP29',
                'nama_gejala' => 'Perut bagian kanan terasa nyeri saat kaki kanan di tekuk menempel ke perut',
            ],
            [
                'kode_gejala' => 'GP30',
                'nama_gejala' => 'Nafsu makan menurun',
            ],
            [
                'kode_gejala' => 'GP31',
                'nama_gejala' => 'Lemas ',
            ],
            [
                'kode_gejala' => 'GP32',
                'nama_gejala' => 'Diare',
            ]
        ];
        Symptom::insert($gejala);
    }
}
