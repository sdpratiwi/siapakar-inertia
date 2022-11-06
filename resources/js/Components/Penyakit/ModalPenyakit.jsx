import React, { useEffect, useState } from "react";
import ModalRoot from "../ModalRoot";
import { Inertia } from "@inertiajs/inertia";
import toast from "react-hot-toast";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalData, modalToggle } from "../../Store/Modal";

export default function ModalPenyakit() {
    const [showModal, setShowModal] = useRecoilState(modalToggle);
    const editData = useRecoilValue(modalData);

    const [dataPenyakit, setdataPenyakit] = useState({
        kode_penyakit: "",
        nama_penyakit: "",
        keterangan: "",
        saran: "",
    });

    const [error, setError] = useState();

    const submitDisease = (e) => {
        e.preventDefault();

        if (editData) {
            Inertia.post("edit-penyakit", dataPenyakit, {
                onError: (e) => {
                    e?.duplicate && toast.error(e?.duplicate);
                    setError(e);
                },
                onSuccess: () => {
                    setShowModal(false);
                    setdataPenyakit((dataPenyakit) => ({
                        ...dataPenyakit,
                        kode_penyakit: "",
                        nama_penyakit: "",
                        keterangan: "",
                        saran: "",
                    }));
                    toast.success("Penyakit berhasil diubah!");
                },
            });
        } else {
            Inertia.post("tambahpenyakit", dataPenyakit, {
                onError: (e) => {
                    setError(e);
                },
                onSuccess: () => {
                    setShowModal(false);
                    setdataPenyakit((dataPenyakit) => ({
                        ...dataPenyakit,
                        kode_penyakit: "",
                        nama_penyakit: "",
                        keterangan: "",
                        saran: "",
                    }));
                    toast.success("Penyakit berhasil ditambahkan!");
                },
            });
        }
    };

    useEffect(() => {
        setdataPenyakit((dataPenyakit) => ({
            ...dataPenyakit,
            id: editData?.id,
            kode_penyakit: editData?.kode_penyakit,
            nama_penyakit: editData?.nama_penyakit,
            keterangan: editData?.keterangan,
            saran: editData?.saran,
        }));
    }, [editData]);

    return (
        <div>
            <ModalRoot
                title={
                    <h1 className="font-semibold text-gray-800 text-xl">
                        {`${editData ? "Edit" : "Tambah"} Penyakit`}
                    </h1>
                }
            >
                <form
                    onSubmit={submitDisease}
                    className="flex flex-col space-y-3"
                >
                    <div className="flex flex-col space-y-1">
                        <h1 className="text-gray-500 text-sm">Kode Penyakit</h1>
                        <input
                            onChange={(e) => {
                                setdataPenyakit((dataPenyakit) => ({
                                    ...dataPenyakit,
                                    kode_penyakit: e.target.value,
                                }));
                            }}
                            value={dataPenyakit.kode_penyakit}
                            type="text"
                            name="kode_penyakit"
                            id="kode_penyakit"
                            className="border-2 border-gray-200 focus:border-white focus:outline-none focus:ring focus:ring-gray-400 transition duration-200 rounded-lg"
                        />
                        {error?.kode_penyakit && (
                            <span className="text-xs text-red-500">
                                {error?.kode_penyakit}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col space-y-1">
                        <h1 className="text-gray-500 text-sm">Nama Penyakit</h1>
                        <textarea
                            onChange={(e) => {
                                setdataPenyakit((dataPenyakit) => ({
                                    ...dataPenyakit,
                                    nama_penyakit: e.target.value,
                                }));
                            }}
                            value={dataPenyakit.nama_penyakit}
                            type="text"
                            name="nama_penyakit"
                            id="nama_penyakit"
                            className="border-2 border-gray-200 focus:border-white focus:outline-none focus:ring focus:ring-gray-400 transition duration-200 rounded-lg"
                        >
                            {dataPenyakit.nama_penyakit}
                        </textarea>
                        {error?.nama_penyakit && (
                            <span className="text-xs text-red-500">
                                {error?.nama_penyakit}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col space-y-1">
                        <h1 className="text-gray-500 text-sm">keterangan</h1>
                        <textarea
                            onChange={(e) => {
                                setdataPenyakit((dataPenyakit) => ({
                                    ...dataPenyakit,
                                    keterangan: e.target.value,
                                }));
                            }}
                            value={dataPenyakit.keterangan}
                            type="text"
                            name="keterangan"
                            id="keterangan"
                            className="border-2 border-gray-200 focus:border-white focus:outline-none focus:ring focus:ring-gray-400 transition duration-200 rounded-lg"
                        >
                            {dataPenyakit.keterangan}
                        </textarea>
                        {error?.keterangan && (
                            <span className="text-xs text-red-500">
                                {error?.keterangan}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col space-y-1">
                        <h1 className="text-gray-500 text-sm">saran</h1>
                        <textarea
                            onChange={(e) => {
                                setdataPenyakit((dataPenyakit) => ({
                                    ...dataPenyakit,
                                    saran: e.target.value,
                                }));
                            }}
                            value={dataPenyakit.saran}
                            type="text"
                            name="saran"
                            id="saran"
                            className="border-2 border-gray-200 focus:border-white focus:outline-none focus:ring focus:ring-gray-400 transition duration-200 rounded-lg"
                        >
                            {dataPenyakit.saran}
                        </textarea>
                        {error?.saran && (
                            <span className="text-xs text-red-500">
                                {error?.saran}
                            </span>
                        )}
                    </div>
                    
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
