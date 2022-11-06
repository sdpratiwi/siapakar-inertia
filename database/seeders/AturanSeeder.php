<?php

namespace Database\Seeders;

use App\Models\Rule;
use Illuminate\Database\Seeder;

class AturanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $aturan = [
            // Input Aturan Gejala 1
            [
                'gejala_id' => '1',
                'penyakit_id' => '1',
                'bobot' => '0.9',
            ],
            [
                'gejala_id' => '1',
                'penyakit_id' => '2',
                'bobot' => '0.9',
            ],
            [
                'gejala_id' => '1',
                'penyakit_id' => '3',
                'bobot' => '0.9',
            ],

            // Input Aturan Gejala 2
            [
                'gejala_id' => '2',
                'penyakit_id' => '1',
                'bobot' => '0.5',
            ],
            [
                'gejala_id' => '2',
                'penyakit_id' => '2',
                'bobot' => '0.5',
            ],
            [
                'gejala_id' => '2',
                'penyakit_id' => '3',
                'bobot' => '0.5',
            ],

            // Input Aturan Gejala 3
            [
                'gejala_id' => '3',
                'penyakit_id' => '1',
                'bobot' => '0.8',
            ],

            // Input Aturan Gejala 4
            [
                'gejala_id' => '4',
                'penyakit_id' => '2',
                'bobot' => '0.8',
            ],
            [
                'gejala_id' => '4',
                'penyakit_id' => '3',
                'bobot' => '0.8',
            ],

            // Input Aturan Gejala 5
            [
                'gejala_id' => '5',
                'penyakit_id' => '3',
                'bobot' => '0.9',
            ],

            // Input Aturan Gejala 6
            [
                'gejala_id' => '6',
                'penyakit_id' => '3',
                'bobot' => '0.9',
            ],
            [
                'gejala_id' => '6',
                'penyakit_id' => '8',
                'bobot' => '0.9',
            ],
            [
                'gejala_id' => '6',
                'penyakit_id' => '9',
                'bobot' => '0.9',
            ],

            // Input Aturan Gejala 7
            [
                'gejala_id' => '7',
                'penyakit_id' => '3',
                'bobot' => '0.7',
            ],
            [
                'gejala_id' => '7',
                'penyakit_id' => '9',
                'bobot' => '0.7',
            ],

            // Input Aturan Gejala 8
            [
                'gejala_id' => '8',
                'penyakit_id' => '3',
                'bobot' => '0.5',
            ],

            // Input Aturan Gejala 9
            [
                'gejala_id' => '9',
                'penyakit_id' => '3',
                'bobot' => '0.6',
            ],

            // Input Aturan Gejala 10
            [
                'gejala_id' => '10',
                'penyakit_id' => '4',
                'bobot' => '0.5',
            ],
            [
                'gejala_id' => '10',
                'penyakit_id' => '5',
                'bobot' => '0.5',
            ],
            [
                'gejala_id' => '10',
                'penyakit_id' => '6',
                'bobot' => '0.5',
            ],
            [
                'gejala_id' => '10',
                'penyakit_id' => '7',
                'bobot' => '0.5',
            ],
            [
                'gejala_id' => '10',
                'penyakit_id' => '8',
                'bobot' => '0.5',
            ],
            [
                'gejala_id' => '10',
                'penyakit_id' => '9',
                'bobot' => '0.5',
            ],

            // Input Aturan Gejala 11
            [
                'gejala_id' => '11',
                'penyakit_id' => '4',
                'bobot' => '0.5',
            ],
            [
                'gejala_id' => '11',
                'penyakit_id' => '5',
                'bobot' => '0.5',
            ],
            [
                'gejala_id' => '11',
                'penyakit_id' => '6',
                'bobot' => '0.5',
            ],
            [
                'gejala_id' => '11',
                'penyakit_id' => '7',
                'bobot' => '0.5',
            ],

            // Input Aturan Gejala 12
            [
                'gejala_id' => '12',
                'penyakit_id' => '4',
                'bobot' => '0.5',
            ],
            [
                'gejala_id' => '12',
                'penyakit_id' => '5',
                'bobot' => '0.5',
            ],
            [
                'gejala_id' => '12',
                'penyakit_id' => '6',
                'bobot' => '0.5',
            ],
            [
                'gejala_id' => '12',
                'penyakit_id' => '7',
                'bobot' => '0.5',
            ],

            // Input Aturan Gejala 13
            [
                'gejala_id' => '13',
                'penyakit_id' => '4',
                'bobot' => '0.5',
            ],
            [
                'gejala_id' => '13',
                'penyakit_id' => '5',
                'bobot' => '0.5',
            ],
            [
                'gejala_id' => '13',
                'penyakit_id' => '6',
                'bobot' => '0.5',
            ],
            [
                'gejala_id' => '13',
                'penyakit_id' => '7',
                'bobot' => '0.5',
            ],

            // Input Aturan Gejala 14
            [
                'gejala_id' => '14',
                'penyakit_id' => '4',
                'bobot' => '0.5',
            ],
            [
                'gejala_id' => '14',
                'penyakit_id' => '5',
                'bobot' => '0.5',
            ],
            [
                'gejala_id' => '14',
                'penyakit_id' => '6',
                'bobot' => '0.5',
            ],
            [
                'gejala_id' => '14',
                'penyakit_id' => '7',
                'bobot' => '0.5',
            ],

            // Input Aturan Gejala 15
            [
                'gejala_id' => '15',
                'penyakit_id' => '4',
                'bobot' => '0.5',
            ],
            [
                'gejala_id' => '15',
                'penyakit_id' => '5',
                'bobot' => '0.5',
            ],
            [
                'gejala_id' => '15',
                'penyakit_id' => '6',
                'bobot' => '0.5',
            ],
            [
                'gejala_id' => '15',
                'penyakit_id' => '7',
                'bobot' => '0.5',
            ],

            // Input Aturan Gejala 16
            [
                'gejala_id' => '16',
                'penyakit_id' => '5',
                'bobot' => '0.6',
            ],
            [
                'gejala_id' => '16',
                'penyakit_id' => '6',
                'bobot' => '0.6',
            ],
            [
                'gejala_id' => '16',
                'penyakit_id' => '7',
                'bobot' => '0.6',
            ],

            // Input Aturan Gejala 17
            [
                'gejala_id' => '17',
                'penyakit_id' => '5',
                'bobot' => '0.9',
            ],

            // Input Aturan Gejala 18
            [
                'gejala_id' => '18',
                'penyakit_id' => '6',
                'bobot' => '0.9',
            ],

            // Input Aturan Gejala 19
            [
                'gejala_id' => '19',
                'penyakit_id' => '7',
                'bobot' => '0.9',
            ],

            // Input Aturan Gejala 20
            [
                'gejala_id' => '20',
                'penyakit_id' => '8',
                'bobot' => '0.8',
            ],
            [
                'gejala_id' => '20',
                'penyakit_id' => '9',
                'bobot' => '0.8',
            ],

            // Input Aturan Gejala 21
            [
                'gejala_id' => '21',
                'penyakit_id' => '8',
                'bobot' => '0.8',
            ],

            // Input Aturan Gejala 22
            [
                'gejala_id' => '22',
                'penyakit_id' => '8',
                'bobot' => '0.8',
            ],

            // Input Aturan Gejala 23
            [
                'gejala_id' => '23',
                'penyakit_id' => '8',
                'bobot' => '0.8',
            ],

            // Input Aturan Gejala 24
            [
                'gejala_id' => '24',
                'penyakit_id' => '8',
                'bobot' => '0.8',
            ],

            // Input Aturan Gejala 25
            [
                'gejala_id' => '25',
                'penyakit_id' => '8',
                'bobot' => '0.7',
            ],
            [
                'gejala_id' => '25',
                'penyakit_id' => '9',
                'bobot' => '0.7',
            ],

            // Input Aturan Gejala 26
            [
                'gejala_id' => '26',
                'penyakit_id' => '9',
                'bobot' => '0.8',
            ],

            // Input Aturan Gejala 27
            [
                'gejala_id' => '27',
                'penyakit_id' => '8',
                'bobot' => '0.7',
            ],
            [
                'gejala_id' => '27',
                'penyakit_id' => '9',
                'bobot' => '0.7',
            ],

            // Input Aturan Gejala 28
            [
                'gejala_id' => '28',
                'penyakit_id' => '9',
                'bobot' => '0.8',
            ],

            // Input Aturan Gejala 29
            [
                'gejala_id' => '29',
                'penyakit_id' => '9',
                'bobot' => '0.8',
            ],

            // Input Aturan Gejala 30
            [
                'gejala_id' => '30',
                'penyakit_id' => '9',
                'bobot' => '0.8',
            ],

            // Input Aturan Gejala 31
            [
                'gejala_id' => '31',
                'penyakit_id' => '8',
                'bobot' => '0.8',
            ],

            // Input Aturan Gejala 32
            [
                'gejala_id' => '32',
                'penyakit_id' => '8',
                'bobot' => '0.7',
            ],
            [
                'gejala_id' => '32',
                'penyakit_id' => '9',
                'bobot' => '0.7',
            ]

        ];
        Rule::insert($aturan);
    }
}
