<?php

namespace Database\Seeders;

use App\Models\Disease;
use Illuminate\Database\Seeder;

class PenyakitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $penyakit = [
            [
                'kode_penyakit' => 'P01',
                'nama_penyakit' => 'Hernia Inguinalis Lateralis Reponibilis',
                'keterangan' => 'Benjolan pada area lipatan paha yang hilang timbul',
                'saran' => '-',
            ],
            [
                'kode_penyakit' => 'P02',
                'nama_penyakit' => 'Hernia Inguinalis Lateralis Irreponibilis',
                'keterangan' => 'Benjolan pada area lipatan paha yang sudah tidak bisa masuk kembali',
                'saran' => '-',
            ],
            [
                'kode_penyakit' => 'P03',
                'nama_penyakit' => 'Hernia Inguinalis Lateralis Inkarserata',
                'keterangan' => 'Benjolan pada area lipatan paha yang sudah tidak bisa masuk kembali disertai adanya gangguan pencernaan',
                'saran' => '-',
            ],
            [
                'kode_penyakit' => 'P04',
                'nama_penyakit' => 'Hemoroid Grade 1',
                'keterangan' => 'Hemoroid Tingkat 1',
                'saran' => '-',
            ],
            [
                'kode_penyakit' => 'P05',
                'nama_penyakit' => 'Hemoroid Grade 2',
                'keterangan' => 'Hemoroid Tingkat 2',
                'saran' => '-',
            ],
            [
                'kode_penyakit' => 'P06',
                'nama_penyakit' => 'Hemoroid Grade 3',
                'keterangan' => 'Hemoroid Tingkat 3',
                'saran' => '-',
            ],
            [
                'kode_penyakit' => 'P07',
                'nama_penyakit' => 'Hemoroid Grade 4',
                'keterangan' => 'Hemoroid Tingkat 4',
                'saran' => '-',
            ],
            [
                'kode_penyakit' => 'P08',
                'nama_penyakit' => 'Apendisitis Kronis',
                'keterangan' => 'Apendisitis kronis terjadi saat gejala penyakit itu datang dan pergi dalam waktu yang lama',
                'saran' => '-',
            ],
            [
                'kode_penyakit' => 'P09',
                'nama_penyakit' => 'Apendisitis Akut',
                'keterangan' => 'Apendisitis akut terjadi ketika seseorang tiba-tiba mengalami rasa sakit yang parah akibat peradangan usus buntu',
                'saran' => '-',
            ]
        ];
        Disease::insert($penyakit);
    }
}
