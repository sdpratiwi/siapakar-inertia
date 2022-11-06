import React, { useEffect, useState } from "react";
import ModalRoot from "../ModalRoot";
import { Inertia } from "@inertiajs/inertia";
import toast from "react-hot-toast";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalData, modalToggle } from "../../Store/Modal";

export default function PatientForm() {
    const [showModal, setShowModal] = useRecoilState(modalToggle);
    const editData = useRecoilValue(modalData);

    const [patientData, setPatientData] = useState({
        nik: "",
        name: "",
        born_place: "",
        born_date: "",
        gender: "",
        address: "",
        hp: "",
        job: "",
    });

    const [error, setError] = useState();

    const submitPatient = (e) => {
        e.preventDefault();

        if (editData) {
            Inertia.post("patient-update", patientData, {
                onError: (e) => {
                    e?.duplicate && toast.error(e?.duplicate);
                    setError(e);
                },
                onSuccess: () => {
                    setShowModal(false);
                    setPatientData((patientData) => ({
                        ...patientData,
                        nik: "",
                        name: "",
                        born_place: "",
                        born_date: "",
                        gender: "",
                        address: "",
                        hp: "",
                        job: "",
                    }));
                    toast.success("Pasien berhasil diubah!");
                },
            });
        } else {
            Inertia.post("patients", patientData, {
                onError: (e) => {
                    setError(e);
                },
                onSuccess: () => {
                    setShowModal(false);
                    setPatientData((patientData) => ({
                        ...patientData,
                        nik: "",
                        name: "",
                        born_place: "",
                        born_date: "",
                        gender: "",
                        address: "",
                        hp: "",
                        job: "",
                    }));
                    toast.success("Pasien berhasil ditambahkan!");
                },
            });
        }
    };

    useEffect(() => {
        setPatientData((patientData) => ({
            ...patientData,
            id: editData?.id,
            name: editData?.name,
            nik: editData?.nik,
            born_place: editData?.born_place,
            born_date: editData?.born_date,
            gender: editData?.gender,
            address: editData?.address,
            job: editData?.job,
            hp: editData?.hp,
        }));
    }, [editData]);

    return (
        <div>
            <ModalRoot
                title={
                    <h1 className="font-semibold text-gray-800 text-xl">
                        {`${editData ? "Edit" : "Tambah"} Pasien`}
                    </h1>
                }
            >
                <form
                    onSubmit={submitPatient}
                    className="flex flex-col space-y-3"
                >
                    <div className="flex flex-col space-y-1">
                        <h1 className="text-gray-500 text-sm">Nama Pasien</h1>
                        <input
                            onChange={(e) => {
                                setPatientData((patientdata) => ({
                                    ...patientdata,
                                    name: e.target.value,
                                }));
                            }}
                            value={patientData.name}
                            type="text"
                            name="name"
                            id="name"
                            className="border-2 border-gray-200 focus:border-white focus:outline-none focus:ring focus:ring-gray-400 transition duration-200 rounded-lg"
                        />
                        {error?.name && (
                            <span className="text-xs text-red-500">
                                {error?.name}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col space-y-1">
                        <h1 className="text-gray-500 text-sm">Nik</h1>
                        <input
                            onChange={(e) => {
                                setPatientData((patientdata) => ({
                                    ...patientdata,
                                    nik: e.target.value,
                                }));
                            }}
                            value={patientData.nik}
                            type="text"
                            name="nik"
                            id="nik"
                            className="border-2 border-gray-200 focus:border-white focus:outline-none focus:ring focus:ring-gray-400 transition duration-200 rounded-lg"
                        />
                        {error?.nik && (
                            <span className="text-xs text-red-500">
                                {error?.nik}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col space-y-1">
                        <h1 className="text-gray-500 text-sm">Tempat Lahir</h1>
                        <input
                            onChange={(e) => {
                                setPatientData((patientdata) => ({
                                    ...patientdata,
                                    born_place: e.target.value,
                                }));
                            }}
                            value={patientData.born_place}
                            type="text"
                            name="born_place"
                            id="born_place"
                            className="border-2 border-gray-200 focus:border-white focus:outline-none focus:ring focus:ring-gray-400 transition duration-200 rounded-lg"
                        />
                        {error?.born_place && (
                            <span className="text-xs text-red-500">
                                {error?.born_place}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col space-y-1">
                        <h1 className="text-gray-500 text-sm">Tanggal Lahir</h1>
                        <input
                            onChange={(e) => {
                                setPatientData((patientdata) => ({
                                    ...patientdata,
                                    born_date: e.target.value,
                                }));
                            }}
                            value={patientData.born_date}
                            type="date"
                            name="born_date"
                            id="born_date"
                            className="border-2 border-gray-200 focus:border-white focus:outline-none focus:ring focus:ring-gray-400 transition duration-200 rounded-lg"
                        />
                        {error?.born_date && (
                            <span className="text-xs text-red-500">
                                {error?.born_date}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col space-y-1">
                        <h1 className="text-gray-500 text-sm">Jenis Kelamin</h1>
                        <select
                            onChange={(e) => {
                                setPatientData((patientdata) => ({
                                    ...patientdata,
                                    gender: e.target.value,
                                }));
                            }}
                            value={patientData.gender}
                            name="gender"
                            id="gender"
                            className="border-2 border-gray-200 focus:border-white focus:outline-none focus:ring focus:ring-gray-400 transition duration-200 rounded-lg"
                        >
                            <option value="">-Pillih-</option>
                            <option value="L">Laki-Laki</option>
                            <option value="P">Perempuan</option>
                        </select>
                        {error?.gender && (
                            <span className="text-xs text-red-500">
                                {error?.gender}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col space-y-1">
                        <h1 className="text-gray-500 text-sm">Alamat</h1>
                        <input
                            onChange={(e) => {
                                setPatientData((patientdata) => ({
                                    ...patientdata,
                                    address: e.target.value,
                                }));
                            }}
                            value={patientData.address}
                            type="text"
                            name="address"
                            id="address"
                            className="border-2 border-gray-200 focus:border-white focus:outline-none focus:ring focus:ring-gray-400 transition duration-200 rounded-lg"
                        />
                        {error?.address && (
                            <span className="text-xs text-red-500">
                                {error?.address}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col space-y-1">
                        <h1 className="text-gray-500 text-sm">Pekerjaan</h1>
                        <input
                            onChange={(e) => {
                                setPatientData((patientdata) => ({
                                    ...patientdata,
                                    job: e.target.value,
                                }));
                            }}
                            value={patientData.job}
                            type="text"
                            name="job"
                            id="job"
                            className="border-2 border-gray-200 focus:border-white focus:outline-none focus:ring focus:ring-gray-400 transition duration-200 rounded-lg"
                        />
                        {error?.job && (
                            <span className="text-xs text-red-500">
                                {error?.job}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col space-y-1">
                        <h1 className="text-gray-500 text-sm">No. Handphone</h1>
                        <input
                            onChange={(e) => {
                                setPatientData((patientdata) => ({
                                    ...patientdata,
                                    hp: e.target.value,
                                }));
                            }}
                            value={patientData.hp}
                            type="text"
                            name="hp"
                            id="hp"
                            className="border-2 border-gray-200 focus:border-white focus:outline-none focus:ring focus:ring-gray-400 transition duration-200 rounded-lg"
                        />
                        {error?.hp && (
                            <span className="text-xs text-red-500">
                                {error?.hp}
                            </span>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white font-bold text-center py-2 rounded-lg mt-2"
                    >
                        Simpan
                    </button>
                </form>
            </ModalRoot>
        </div>
    );
}
