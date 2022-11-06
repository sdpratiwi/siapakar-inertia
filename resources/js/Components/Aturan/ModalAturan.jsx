import React, { useEffect, useState } from "react";
import ModalRoot from "../ModalRoot";
import { Inertia } from "@inertiajs/inertia";
import toast from "react-hot-toast";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalData, modalToggle } from "../../Store/Modal";
import { baseUrlApi } from "../../Store/Global";
import axios from "axios";

export default function ModalAturan() {
    const [showModal, setShowModal] = useRecoilState(modalToggle);
    const editData = useRecoilValue(modalData);
    const [gejala, setGejala] = useState([]);
    const [penyakit, setPenyakit] = useState([]);

    const urlApi = useRecoilValue(baseUrlApi);

    const [dataAturan, setdataAturan] = useState({
        gejala_id: "",
        penyakit_id: "",
        bobot: "",
    });

    const [error, setError] = useState();

    const submitRules = (e) => {
        e.preventDefault();

        if (editData) {
            console.log(editData);
            Inertia.post("edit-aturan", dataAturan, {
                onError: (e) => {
                    e?.type && toast.error(e?.message);
                    setError(e);
                },
                onSuccess: () => {
                    setShowModal(false);
                    setdataAturan((dataAturan) => ({
                        ...dataAturan,
                        gejala_id: "",
                        penyakit_id: "",
                        bobot: "",
                    }));
                    toast.success("Gejala berhasil diubah!");
                },
            });
        } else {
            Inertia.post("tambahaturan", dataAturan, {
                onError: (e) => {
                    setError(e);
                },
                onSuccess: () => {
                    setShowModal(false);
                    setdataAturan((dataAturan) => ({
                        ...dataAturan,
                        gejala_id: "",
                        penyakit_id: "",
                        bobot: "",
                    }));
                    toast.success("Aturan berhasil ditambahkan!");
                },
            });
        }
    };

    useEffect(() => {
        setdataAturan((dataAturan) => ({
            ...dataAturan,
            id: editData?.id,
            gejala_id: editData?.gejala_id,
            penyakit_id: editData?.penyakit_id,
            bobot: editData?.bobot,
        }));

        const getGejala = async () => {
            await axios.get(urlApi + "data-gejala").then((res) => {
                setGejala(res.data);
            });
        };
        const getPenyakit = async () => {
            await axios.get(urlApi + "data-penyakit").then((res) => {
                setPenyakit(res.data);
            });
        };
        getGejala();
        getPenyakit();
    }, [editData]);

    return (
        <div>
            <ModalRoot
                title={
                    <h1 className="font-semibold text-gray-800 text-xl">
                        {`${editData ? "Edit" : "Tambah"} Aturan`}
                    </h1>
                }
            >
                <form
                    onSubmit={submitRules}
                    className="flex flex-col space-y-3"
                >
                    <div className="flex flex-col space-y-1">
                        <h1 className="text-gray-500 text-sm">Gejala</h1>
                        <select
                            onChange={(e) => {
                                setdataAturan((dataAturan) => ({
                                    ...dataAturan,
                                    gejala_id: e.target.value,
                                }));
                            }}
                            value={dataAturan.gejala_id}
                            type="text"
                            name="gejala_id"
                            id="gejala_id"
                            className="border-2 border-gray-200 focus:border-white focus:outline-none focus:ring focus:ring-gray-400 transition duration-200 rounded-lg"
                        >
                            <option value="">Pilih Gejala</option>
                            {gejala.map((gej, key) => {
                                return (
                                    <option key={key} value={gej.id}>
                                        {gej.nama_gejala}
                                    </option>
                                );
                            })}
                        </select>
                        {error?.gejala_id && (
                            <span className="text-xs text-red-500">
                                {error?.gejala_id}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col space-y-1">
                        <h1 className="text-gray-500 text-sm">Penyakit</h1>
                        <select
                            onChange={(e) => {
                                setdataAturan((dataAturan) => ({
                                    ...dataAturan,
                                    penyakit_id: e.target.value,
                                }));
                            }}
                            value={dataAturan.penyakit_id}
                            type="text"
                            name="penyakit_id"
                            id="penyakit_id"
                            className="border-2 border-gray-200 focus:border-white focus:outline-none focus:ring focus:ring-gray-400 transition duration-200 rounded-lg"
                        >
                            <option value="">Pilih Penyakit</option>
                            {penyakit.map((peny, key) => {
                                return (
                                    <option key={key} value={peny.id}>
                                        {peny.nama_penyakit}
                                    </option>
                                );
                            })}
                        </select>
                        {error?.penyakit_id && (
                            <span className="text-xs text-red-500">
                                {error?.penyakit_id}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col space-y-1">
                        <h1 className="text-gray-500 text-sm">Bobot</h1>
                        <select
                            onChange={(e) => {
                                setdataAturan((dataAturan) => ({
                                    ...dataAturan,
                                    bobot: e.target.value,
                                }));
                            }}
                            value={dataAturan.bobot}
                            type="text"
                            name="bobot"
                            id="bobot"
                            className="border-2 border-gray-200 focus:border-white focus:outline-none focus:ring focus:ring-gray-400 transition duration-200 rounded-lg"
                        >
                            <option value="">Nilai Bobot</option>
                            <option value="0.1">
                                        0.1
                            </option>
                            <option value="0.2">
                                        0.2
                            </option>
                            <option value="0.3">
                                        0.3
                            </option>
                            <option value="0.4">
                                        0.4
                            </option>
                            <option value="0.5">
                                        0.5
                            </option>
                            <option value="0.6">
                                        0.6
                            </option>
                            <option value="0.7">
                                        0.7
                            </option>
                            <option value="0.8">
                                        0.8
                            </option>
                            <option value="0.9">
                                        0.9
                            </option>
                        </select>
                        {error?.bobot && (
                            <span className="text-xs text-red-500">
                                {error?.bobot}
                            </span>
                        )}
                    </div>
                    {/* <div className="flex flex-col space-y-1">
                        <h1 className="text-gray-500 text-sm">Bobot</h1>
                        <input
                            onChange={(e) => {
                                setdataAturan((dataAturan) => ({
                                    ...dataAturan,
                                    bobot: e.target.bobot,
                                }));
                            }}
                            value={dataAturan.bobot}
                            type="number"
                            min="0"
                            name="bobot"
                            step=".01"
                            id="bobot"
                            className="border-2 border-gray-200 focus:border-white focus:outline-none focus:ring focus:ring-gray-400 transition duration-200 rounded-lg"
                        />
                        {error?.bobot && (
                            <span className="text-xs text-red-500">
                                {error?.bobot}
                            </span>
                        )}
                    </div> */}
                    <button
                        type="submit"
                        className="bg-rose-700 text-white font-bold text-center py-2 rounded-lg mt-2"
                    >
                        Simpan
                    </button>
                </form>
            </ModalRoot>
        </div>
    );
}
