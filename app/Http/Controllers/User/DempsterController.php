<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use App\Models\Disease;
use App\Models\Gejala;
use App\Models\History;
use App\Models\Jenispenyakit;
use App\Models\Riwayat;
use App\Models\Symptom;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rules\NotIn;
use Illuminate\Validation\ValidationException;
use Prophecy\Argument\Token\NotInArrayToken;

class DempsterController extends Controller
{
    public $history = [];
    public $hipotesa = [];
    public $index = 0;
    public $indexM = 1;
    public $history_mass_function = [];
    public $history_procces = [];

    public function dempster(Request $request)
    {
        // return $request->gejala;
        if ($request->gejala == null) {
            throw ValidationException::withMessages([
                'type' => 'error',
                'message' => 'Pilihan Gejala Tidak Boleh Kosong!'
            ]);
        }

        $aturan_gejala = $this->getAturan($request->gejala);
        // $history["aturan_gejala"] = $aturan_gejala;
        // return $aturan_gejala[0][0]["penyakit"][0];
        // dd($aturan_gejala);

        if (count($aturan_gejala) < 2) {
            throw ValidationException::withMessages([
                'type' => 'error',
                'message' => 'Gejala Minimal Harus 2!'
            ]);
            // throw ValidationException::withMessages([
            //     'error' => 'Gejala Minimal Harus 2!'
            // ]);
        } else if (count($aturan_gejala) >= 2) {
            $this->indexM += 2;
            $resultMassFunction = $this->mass_function_1($aturan_gejala[0], $aturan_gejala[1]);
            $history["finalize_result"][0] = $resultMassFunction;
            // dd($resultMassFunction);
            $startGejala = 2;

            for ($i = $startGejala; $i < count($aturan_gejala); $i++) {
                $this->index += 1;
                $this->indexM += 2;
                $resultMassFunction = $this->mass_function_1($resultMassFunction, $aturan_gejala[$startGejala]);
                $history["finalize_result"][count($history["finalize_result"])] = $resultMassFunction;
                $startGejala += 1;
            }

            $result = $resultMassFunction;
        }
        $finalcek = $this->finalcek($result);
        // return $finalcek;
        // dd($result);
        // dd($penyakit[0]);
        $user = Auth::user();
        // return $finalcek["hasildiagnosa"];
        $riwayat = History::create([
            'id_client' => $user->id,
            // 'data_client' => json_encode($user),
            'age' => Carbon::parse($user->tanggallahir)->age,
            'hasil' => json_encode($finalcek["hasil"]),
            'hasildiagnosa' => json_encode($finalcek["hasildiagnosa"]),
            'hipotesa' => json_encode($this->hipotesa),
            'history' => json_encode($this->history),
            'waktudiagnosa' => date("Y-m-d"),
        ]);

        return redirect("/hasil-" . $riwayat->id);
        // return new RedirectResponse("http://127.0.0.1:8000/detailriwayat/" . $riwayat->id);
        // return back();
    }

    public function hasildiagnosa()
    {
        $id = Auth::user()->id;
        $riwayat = History::with('user')->orderBy('id_user', 'asc')->where('id_user', $id)->get();
        if ($riwayat->count() == null) {
            return redirect('/konsultasi');
        }
        return inertia('HasilKonsultasiApp', [
            'riwayat' => History::orderBy('id', 'desc')->first()
        ]);
    }

    /**
     * method getAturan
     * untuk mengambil data aturan di database
     * 
     * @param array $gejala
     * 
     * @return object $aturan_gejala
     */

    function getAturan($gejala)
    {
        foreach ($gejala as $index => $gejala_id) {
            $data_gejala = Symptom::where('id', $gejala_id)->with(['rule', 'rule.disease'])->first();
            // return $data_gejala->rule;
            // -------[$this->hipotesa] Simpan ke frontend di variabel Hipotesa------
            $this->hipotesa[$index]["kode_gejala"] = $data_gejala->kode_gejala;
            $this->hipotesa[$index]["gejala"] = $data_gejala->nama_gejala;

            $aturan[$index][0]["kode_gejala"] = $data_gejala->kode_gejala;
            $aturan[$index][0]["gejala"] = $data_gejala->nama_gejala;
            foreach ($data_gejala->rule as $index_penyakit => $data_aturan) {
                $aturan[$index][0]["penyakit"][$index_penyakit] = $data_aturan->disease->kode_penyakit;
                // $aturan[$index][0]["nama_penyakit"][$index_penyakit] =$data_aturan->disease->nama_penyakit;
                // $aturan[$index][0]["penyakit"][$index_penyakit] =$data_aturan->disease->id;

                $this->hipotesa[$index]["kode_penyakit"][$index_penyakit] = $data_aturan->disease->kode_penyakit;
                $this->hipotesa[$index]["penyakit"][$index_penyakit] = $data_aturan->disease->nama_penyakit;
            }

            $this->hipotesa[$index]["belief"] = $data_gejala->rule[0]->bobot;
            $this->hipotesa[$index]["plausibility"] = round(1 - $data_gejala->rule[0]->bobot, 2);

            $aturan[$index][0]["bobot"] = $data_gejala->rule[0]->bobot;
            $aturan[$index][0]["conflict"] = 0;

            $aturan[$index][1]["penyakit"] = ['θ'];
            $aturan[$index][1]["bobot"] = round(1 - $data_gejala->rule[0]->bobot, 2);
            $aturan[$index][1]["conflict"] = 0;
        }
        return $aturan;
    }

    /**
     * method mass_function_1
     * adalah perhitungan mass_function dalam tabel, untuk mengetahui himpunan hasil get_irisan
     * @param  array $m_col [himpunan1]
     * @param  array $m_row [himpunan2]
     * 
     * @return array
     */

    function mass_function_1($m_col, $m_row)
    {
        // return $m_col;
        $result = [];
        $conf = [];
        $show_mass = [];
        $show_mass[0][0] = "skip";
        foreach ($m_col as $index_col => $data_col) {
            $show_mass[$index_col + 1][0] = $data_col;
            foreach ($m_row as $index_row => $data_row) {
                $irisan = $this->getIrisan($data_col, $data_row);

                if ($index_col == 0) {
                    $show_mass[$index_col][$index_row + 1] = $data_row;
                }

                $show_mass[$index_col + 1][$index_row + 1] = $irisan;

                // return $irisan;
                // array_push($result, $irisan);

                // ---------------Lanjut-----------
                if ($irisan["penyakit"] != ["konflik"]) {
                    array_push($result, $irisan);
                } else {
                    array_push($conf, $irisan);
                }
            }
        }

        // return $conf;
        // return $show_mass;

        // array_push($this->history, $show_mass);
        $this->history[$this->index]["tabel"] = $show_mass;
        array_push($this->history_mass_function, $show_mass);
        $conflict = $this->countConflict($conf);

        // return $conf;

        $result = $this->finalizeResult($result, $conflict, $conf);
        return $result;
    }

    /**
     * method getIrisan
     * untuk mencari irisan antara 2 himpunan
     * 
     * @param array $data1 [himpunan 1]
     * @param array $data2 [himpunan 2]
     * 
     * @return array $result [irisan antara 2 himpunan]
     */

    function getIrisan(array $data1, array $data2)
    {
        $irisan = [];
        for ($i = 0; $i < count($data1["penyakit"]); $i++) {
            for ($j = 0; $j < count($data2["penyakit"]); $j++) {
                if ($data1["penyakit"][$i] == $data2["penyakit"][$j]) {
                    array_push($irisan, $data1["penyakit"][$i]);
                }
            }
        }
        if (count($irisan) <= 0) {
            $result1 = $this->getNotTeta($data1["penyakit"]);
            $result2 = $this->getNotTeta($data2["penyakit"]);


            if (!in_array('θ', $data1["penyakit"]) && !in_array('θ', $data2["penyakit"])) {
                // $result["penyakit"] = $irisan;
                $result["penyakit"] = ["konflik"];
                // $result["bobot"] = 0;
                $result["bobot"] = $data1["bobot"] * $data2["bobot"];
                // $result["conflict"] = round($data1["bobot"] * $data2["bobot"], 2);
                // $result["conflict"] = $data1["bobot"] * $data2["bobot"];
            } else if (count($result1) > 0) {
                $result["penyakit"] = $result1;
                // $result["bobot"] = round($data1["bobot"] * $data2["bobot"], 2);
                $result["bobot"] = $data1["bobot"] * $data2["bobot"];
                // $result["conflict"] = 0;
            } else if (count($result2) > 0) {
                $result["penyakit"] = $result2;
                // $result["bobot"] = round($data1["bobot"] * $data2["bobot"], 2);
                $result["bobot"] = $data1["bobot"] * $data2["bobot"];
                // $result["conflict"] = 0;
            }
        } else {
            $result["penyakit"] = $irisan;
            // $result["bobot"] = round($data1["bobot"] * $data2["bobot"], 2);
            $result["bobot"] = $data1["bobot"] * $data2["bobot"];
            // $result["conflict"] = 0;
        }
        // $result["bobot"] = round($data1["bobot"] * $data2["bobot"], 2);
        // $result["conflict"] = 0;
        return $result;
    }

    /**
     * method countConflict
     * untuk menghitung jumlah konflik
     * 
     * @param array $array [array data]
     * @return int $result
     */

    public function countConflict($array)
    {
        $result = 0;
        foreach ($array as $data) {
            $result = $result + $data["bobot"];
        }

        return $result;
    }

    /**
     * method finalizeResult
     * untuk menghitung himpunan akhir dari Mass mass_function_1
     * 
     * @param array $dataSet [himpunan data]
     * @param int $conflict [nilai konflik]
     * 
     * @return array $result
     */

    public function finalizeResult($dataSet, $conflict, $conf)
    {
        $result = null;
        $var = [];
        $show_process = [];

        array_push($var, $dataSet[0]["penyakit"]);
        // $show_process[0]["penyakit"] = $dataSet[0]["penyakit"];

        foreach ($dataSet as $index => $data) {
            if (!in_array($data["penyakit"], $var)) {
                array_push($var, $data["penyakit"]);
            }
        }

        // return $var;

        $hasil_akhir = [];

        $penyakit = [];

        foreach ($var as $index => $v) {
            $total_bobot = 0;
            $indextes = 0;
            foreach ($dataSet as $indexb => $data) {
                if ($data["penyakit"] == $v) {
                    $total_bobot += $data["bobot"];
                    $show_process[$index]["bobot"][$indextes] = $data["bobot"];
                    $indextes += 1;
                }
                if (!in_array($data["penyakit"], $penyakit)) {
                    array_push($penyakit, $data["penyakit"]);
                    // $show_process[$index]["penyakit"] = $data["penyakit"];
                }
            }
            foreach ($conf as $indexc => $c) {
                $show_process[$index]["konflik"][$indexc] = $c["bobot"];
            }
            $show_process[$index]["penyakit"] = $penyakit[$index];
            $show_process[$index]["densitas"] = $total_bobot / (1 - $conflict);
            $show_process[$index]["nilaiM"] = "M" . $this->indexM;
            // $show_process[$index]["bobot"] = $total_bobot / (1 - $conflict);

            $hasil_akhir[$index]["penyakit"] = $penyakit[$index];
            $hasil_akhir[$index]["bobot"] = $total_bobot / (1 - $conflict);
            // $hasil_akhir[$index]["bobot"] = round($total_bobot / (1 - $conflict), 2);
            $hasil_akhir[$index]["conflict"] = 0;
        }
        // return $show_process;
        // $this->history[$this->index]["proses"]["nilaiM"] = "M" . $this->indexM;

        $this->history[$this->index]["proses"] = $show_process;
        array_push($this->history_procces, $show_process);
        return $hasil_akhir;


        // foreach ($dataSet as $index => $data) {
        //     $result[$index]["penyakit"] = $data["penyakit"];
        //     $result[$index]["bobot"] = $data["bobot"] / (1 - $conflict);
        //     $result[$index]["conflict"] = 0;
        // }

        // return $result;
    }

    public function finalcek(array $data)
    {

        // ---------------Lanjut-----------
        // return $data;
        $x = $data[0];
        $hasil = [];
        foreach ($data as $d) {
            if ($d["penyakit"] != ['θ']) {
                if ($x["bobot"] == $d["bobot"]) {
                    foreach ($d["penyakit"] as $indexp => $p) {
                        if (!in_array($p, $x["penyakit"])) {
                            array_push($x["penyakit"], $p);
                        }
                    }
                } elseif ($x["bobot"] <= $d["bobot"]) {
                    $x = $d;
                }
            }
        }
        // dd($x);
        // $cek = Penyakit::where('kode', $data[0]["penyakit"][0])->first();
        // return $cek->nama_penyakit;
        // return $data[0]["penyakit"];
        foreach ($data as $indexa => $d) {
            // return $data;
            foreach ($d["penyakit"] as $indexb => $b) {
                $cek = Disease::where('kode_penyakit', $b)->first();
                if ($cek) {
                    $hasil[$indexa]["nama_penyakit"][$indexb] = $cek->nama_penyakit;
                    $hasil[$indexa]["bobot"] = $data[$indexa]["bobot"] * 100;
                }
            }
            // $data[$indexa]["bobot"] = round($data[$indexa]["bobot"] * 100, 2);
        }
        // return $hasil;
        $penyakit = $this->hasil($x);
        $hasildiagnosa = $penyakit;
        $hasildiagnosa["bobot"] = $x["bobot"] * 100;
        return [
            "hasildiagnosa" => $hasildiagnosa,
            "hasil" => $hasil
            // "penyakit" => $penyakit,
            // "penyakit" => $penyakit,
            // "bobot" => $x["bobot"]
        ];
    }

    public function hasil(array $penyakit)
    {
        $diagnosa = [];
        foreach ($penyakit["penyakit"] as $index => $p) {
            $penyakit = Disease::where('kode_penyakit', $p)->first();
            $diagnosa["penyakit"][$index] = $penyakit->nama_penyakit;
            $diagnosa["keterangan"][$index] = $penyakit->keterangan;
            $diagnosa["saran"][$index] = $penyakit->saran;
            // array_push($diagnosa, $penyakit);
        }
        return $diagnosa;
    }

    /**
     * method isTeta
     * untuk mengecek apakah ada teta atau tidak
     * 
     * @param array $data [himpunan yang ingin dicek]
     * @return boolean
     */

    public function isTeta($data)
    {
        if (in_array('θ', $data)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * method getNotTeta
     * untuk mengambil data yang bukan teta
     * 
     * @param array $data [himpunan yang ingin dicek]
     * @return array
     */

    public function getNotTeta($data)
    {
        $not_teta = [];
        foreach ($data as $index => $penyakit) {
            if ($penyakit != 'θ') {
                array_push($not_teta, $penyakit);
            }
        }

        return $not_teta;
    }


    public function dempster2(Request $request)
    {
        // return $request;

        // if ($request->gejala == null) {
        //     throw ValidationException::withMessages([
        //         'type' => 'error',
        //         'message' => 'Pilihan Gejala Tidak Boleh Kosong!'
        //     ]);
        // }

        // $request->gejala = [2, 1, 5];


        $aturan_gejala = $this->getAturan($request->gejala);
        // $history["aturan_gejala"] = $aturan_gejala;
        // return $aturan_gejala[0][0]["penyakit"][0];
        // dd($aturan_gejala);

        if (count($aturan_gejala) < 2) {
            throw ValidationException::withMessages([
                'type' => 'error',
                'message' => 'Gejala Minimal Harus 2!'
            ]);
            // throw ValidationException::withMessages([
            //     'error' => 'Gejala Minimal Harus 2!'
            // ]);
        } else if (count($aturan_gejala) >= 2) {
            $this->indexM += 2;
            $resultMassFunction = $this->mass_function_1($aturan_gejala[0], $aturan_gejala[1]);
            $history["finalize_result"][0] = $resultMassFunction;
            // dd($resultMassFunction);
            $startGejala = 2;

            for ($i = $startGejala; $i < count($aturan_gejala); $i++) {
                $this->index += 1;
                $this->indexM += 2;
                $resultMassFunction = $this->mass_function_1($resultMassFunction, $aturan_gejala[$startGejala]);
                $history["finalize_result"][count($history["finalize_result"])] = $resultMassFunction;
                $startGejala += 1;
            }

            $result = $resultMassFunction;
        }
        $finalcek = $this->finalcek($result);
        // return $finalcek;
        // dd($result);
        // dd($penyakit[0]);
        // return date("Y-m-d");

        // $user = Auth::user();
        // $riwayat = History::create([
        //     'id_client' => $user->id,
        //     'data_client' => json_encode($user),
        //     'age' => Carbon::parse($user->tanggallahir)->age,
        //     'hasil' => json_encode($finalcek["hasil"]),
        //     'hasildiagnosa' => json_encode($finalcek["hasildiagnosa"]),
        //     'hipotesa' => json_encode($this->hipotesa),
        //     'history' => json_encode($this->history),
        //     'waktudiagnosa' => Carbon::parse(date("Y-m-d")),
        // ]);

        // return Redirect::away("http://127.0.0.1:8000/detailriwayat/" . $riwayat->id);

        $user = [
            'name' => $request->nama,
            'gender' => $request->gender,
            'adress' => $request->alamat,
            'tanggallahir' => $request->tanggallahir,
            'gambar' => 'default',
            'age' => $request->umur,
        ];

        // $user = [
        //     'name' => "request->nama",
        //     'gender' => "request->gender",
        //     'alamat' => "request->alamat",
        //     'tanggallahir' => date("Y-m-d"),
        //     'profil' => 'default',
        // ];
        $riwayat = History::create([
            // 'id_client' => $user->id,
            'data_client' => json_encode($user),
            'age' => $request->umur,
            'hasil' => json_encode($finalcek["hasil"]),
            'hasildiagnosa' => json_encode($finalcek["hasildiagnosa"]),
            'hipotesa' => json_encode($this->hipotesa),
            'history' => json_encode($this->history),
            'waktudiagnosa' => Carbon::parse(date("Y-m-d")),
        ]);
        // dd($user, $riwayat);
        return inertia('Guest/HasilKonsultasi', [
            // 'auth' => $user,
            'user' => $user, 'riwayat' => $riwayat
        ]);
    }
}
