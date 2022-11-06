import React, { useEffect, useRef } from "react";
import { Grid } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import { Link, usePage } from "@inertiajs/inertia-react";
import Admin from '../../Layouts/Admin'

export default function DetailDiagnosa() {
    // const { auth } = usePage().props;
    const { auth, riwayat } = usePage().props;
    const tableGejala = useRef(null);
    const wrapperGejala = useRef(null);

    const tableHipotesa = useRef(null);
    const wrapperHipotesa = useRef(null);


    const hipotesa = JSON.parse(riwayat.hipotesa);
    const hasil = JSON.parse(riwayat.hasil);
    const hasildiagnosa = JSON.parse(riwayat.hasildiagnosa);
    const history = JSON.parse(riwayat.history);

    useEffect(() => {
        const gejala = new Grid({
            from: tableGejala.current,
        }).render(wrapperGejala.current);

        const hipotesa = new Grid({
            from: tableHipotesa.current,
        }).render(wrapperHipotesa.current);
    });

    const showBobot = (bobot) => {
        let length = bobot.length;

        return bobot?.map((bot, key) => (
            <span key={key}>
                {" "}
                {bot.toFixed(3)} {key == length - 1 ? " " : "+ "}
            </span>
        ));
    };
    const showKonflik = (konflik) => {
        let length = konflik.length;
        return konflik?.map((conf, key) => (
            <span key={key}>
                {" "}
                {conf.toFixed(3)} {key == length - 1 ? " " : "+ "}
            </span>
        ));
    };

    const showPenyakit = (penyakit) => {
        let length = penyakit.length;

        return penyakit?.map((peny, key) => (
            <span key={key}>
                {" "}
                {peny}
                {key == length - 1 ? " " : ", "}
            </span>
        ));
    };

    const showKodeHipo = (kode_penyakit) => {
        let length = kode_penyakit.length;

        return kode_penyakit?.map((hipo, key) => (
            <span key={key}>
                {" "}
                {hipo}
                {key == length - 1 ? " " : <br />}
            </span>
        ));
    };

    const showPenyHipo = (penyakit) => {
        let length = penyakit.length;

        return penyakit?.map((pen, key) => (
            <span key={key}>
                {" "}
                {pen}
                {key == length - 1 ? " " : <br />}
            </span>
        ));
    };

    const showhasil = (data) => {
        let length = data.length;

        return data?.map((data, key) => (
            <span key={key}>
                {" "}
                {data}
                {key == length - 1 ? " " : ", "}
            </span>
        ));
    };
    console.log(riwayat);
    return (
        <Admin judul="Riwayat">
            <div className="flex p-5 flex-col justify-center w-full space-y-8">
                <div className="bg-white shadow-xl rounded-xl space-y-8 p-10">
                    <div className="bg-indigo-300 rounded-xl p-5 flex flex-col space-y-4">
                        <h1 className="text-xl">Gejala Yang Dipilih : </h1>
                        <div className="lg:container">
                            <table ref={tableGejala}>
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                    </tr>
                                    <tr>
                                        <th>Kode Gejala</th>
                                    </tr>
                                    <tr>
                                        <th>Nama Gejala</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {hipotesa?.map((hipotesa, key) => (
                                        <tr key={key}>
                                            <td>{1 + key}.</td>
                                            <td>{hipotesa.kode_gejala}</td>
                                            <td>{hipotesa.gejala}.</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div ref={wrapperGejala} />
                        </div>
                    </div>

                    <div className="bg-rose-300 rounded-xl p-5 flex flex-col space-y-4">
                        <h1 className="text-xl">Hipotesa : </h1>
                        <div className="lg:container">
                            <table ref={tableHipotesa}>
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                    </tr>
                                    <tr>
                                        <th>Gejala</th>
                                    </tr>
                                    <tr>
                                        <th>Kode Penyakit</th>
                                    </tr>
                                    <tr>
                                        <th>Penyakit</th>
                                    </tr>
                                    <tr>
                                        <th>Belief</th>
                                    </tr>
                                    <tr>
                                        <th>Plausibility</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {hipotesa?.map((hipotesa, key) => (
                                        <tr key={key}>
                                            <td>{1 + key}.</td>
                                            <td>{hipotesa?.gejala} </td>
                                            <td>
                                                {showKodeHipo(
                                                    hipotesa?.kode_penyakit
                                                )}
                                            </td>
                                            <td>
                                                {showPenyHipo(
                                                    hipotesa?.penyakit
                                                )}
                                            </td>
                                            <td>{hipotesa?.belief}</td>
                                            <td>{hipotesa?.plausibility}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div ref={wrapperHipotesa} />
                        </div>
                    </div>

                    <div className="bg-sky-300 rounded-xl p-5 flex flex-col space-y-4">
                        <h1 className="text-xl">Mass Function : </h1>
                        {history?.map((history, key) => (
                            <div
                                key={key}
                                className="xl:container items-center space-y-5"
                            >
                                <div className="bg-black bg-opacity-25 rounded-xl space-y-4 p-5">
                                    <div className="font-semibold text-white text-lg text-center">
                                        {"Kombinasi Densitas Ke-" + (key + 1)}
                                    </div>
                                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                        <table className="sm:min-w-fit w-full text-sm text-center text-white">
                                            {history?.tabel?.map(
                                                (data, key) => (
                                                    <tbody
                                                        key={key}
                                                        className="text-sm text-white uppercase border-2 border-gray-200"
                                                    >
                                                        <tr className="border-b hover:bg-gray-400 transition-all divide-y-2 divide-x-2 divide-gray-200">
                                                            {data?.map(
                                                                (data, key) => (
                                                                    <th
                                                                        key={
                                                                            key
                                                                        }
                                                                        scope="row"
                                                                        className="px-6 py-4 font-medium whitespace-nowrap"
                                                                    >
                                                                        {data?.penyakit !=
                                                                            null && (
                                                                                <div>
                                                                                    (
                                                                                    {showPenyakit(
                                                                                        data?.penyakit
                                                                                    )}
                                                                                    )
                                                                                    <br />
                                                                                    {data?.bobot.toFixed(
                                                                                        3
                                                                                    )}
                                                                                </div>
                                                                            )}
                                                                    </th>
                                                                )
                                                            )}
                                                        </tr>
                                                    </tbody>
                                                )
                                            )}
                                        </table>
                                    </div>
                                </div>
                                <div className="bg-black bg-opacity-25 rounded-xl space-y-4 p-5">
                                    <div className="font-semibold text-white text-lg text-center">
                                        Perhitungan Dempster-Shafer
                                    </div>
                                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                        <table className="sm:min-w-fit w-full text-sm text-left text-white">
                                            <tbody className="text-sm text-white uppercase border-2 border-gray-200">
                                                {history?.proses?.map(
                                                    (data, key) => (
                                                        <tr
                                                            className="border-b hover:bg-gray-400 transition-all divide-y-2 divide-x-2 divide-gray-200"
                                                            key={key}
                                                        >
                                                            <th className="px-6 py-4 font-medium whitespace-nowrap">
                                                                <span>
                                                                    {
                                                                        data?.nilaiM
                                                                    }
                                                                </span>
                                                                <span>
                                                                    (
                                                                    {showPenyakit(
                                                                        data?.penyakit
                                                                    )}
                                                                    )
                                                                </span>
                                                            </th>
                                                            <th className="px-6 py-4 font-medium whitespace-nowrap">
                                                                = (
                                                                {showBobot(
                                                                    data?.bobot
                                                                )}
                                                                ) / ( 1 -{" "}
                                                                {data.konflik !=
                                                                    null
                                                                    ? showKonflik(
                                                                        data?.konflik
                                                                    )
                                                                    : "0 "}
                                                                )
                                                                <br />={" "}
                                                                {data?.densitas.toFixed(
                                                                    3
                                                                )}
                                                            </th>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-teal-200 rounded-xl p-5 flex flex-col space-y-4">
                        <h1 className="text-xl">Hasil : </h1>
                        {hasil.map((h, key) => (
                            <div key={key}>
                                <div className="flex">
                                    <div className="text-lg">
                                        {1 + key}. Penyakit
                                        {h.nama_penyakit?.map(
                                            (nama_penyakit, key) => (
                                                <span key={key}>
                                                    {" "}
                                                    {nama_penyakit},{" "}
                                                </span>
                                            )
                                        )}
                                        dengan presentasi sebesar{" "}
                                        <span className="font-semibold">
                                            {h.bobot.toFixed(3)}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-teal-200 rounded-xl p-5 flex flex-col space-y-4">
                        <h1 className="text-xl">Hasil Diagnosa: </h1>
                        <div className="">
                            <h1 className="font-bold">Penyakit</h1>
                            {showhasil(hasildiagnosa?.penyakit)}
                        </div>
                        <div className="">
                            <h1 className="font-bold">Keterangan</h1>
                            {showhasil(hasildiagnosa?.keterangan)}
                        </div>
                        <div className="">
                            <h1 className="font-bold">Saran</h1>
                            {showhasil(hasildiagnosa?.saran)}
                        </div>
                        <div className="">
                            <span className="font-bold">Bobot : </span>
                            {hasildiagnosa?.bobot.toFixed(3)}%
                        </div>
                    </div>
                    <div className="w-full flex justify-center space-x-4">
                        <Link
                            href={`${auth?.user.roles[0].name == "user"
                                ? "/hasil-" + riwayat.id
                                : "/hasil-" + riwayat.id
                                }`}
                            className="p-3 rounded-lg text-white bg-red-400 text-center"
                        >
                            Kembali
                        </Link>
                    </div>
                </div>
            </div>
        </Admin>
    )
}
