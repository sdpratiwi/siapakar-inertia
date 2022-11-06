import React, { useEffect, useState } from "react";
import ModalRoot from "../ModalRoot";
import { Inertia } from "@inertiajs/inertia";
import toast from "react-hot-toast";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalData, modalToggle } from "../../Store/Modal";

export default function SymptomForm() {
    const [showModal, setShowModal] = useRecoilState(modalToggle);
    const editData = useRecoilValue(modalData);

    const [symptomData, setSymptomData] = useState({
        name: "",
        code: "",
    });

    const [error, setError] = useState();

    const submitCode = (e) => {
        e.preventDefault();

        if (editData) {
            Inertia.post("symptom-update", symptomData, {
                onError: (e) => {
                    e?.duplicate && toast.error(e?.duplicate);
                    setError(e);
                },
                onSuccess: () => {
                    setShowModal(false);
                    setSymptomData((symptomData) => ({
                        ...symptomData,
                        name: "",
                        code: "",
                    }));
                    toast.success("Gejala berhasil diubah!");
                },
            });
        } else {
            Inertia.post("symptom", symptomData, {
                onError: (e) => {
                    setError(e);
                },
                onSuccess: () => {
                    setShowModal(false);
                    setSymptomData((symptomData) => ({
                        ...symptomData,
                        name: "",
                        code: "",
                    }));
                    toast.success("Gejala berhasil ditambahkan!");
                },
            });
        }
    };

    useEffect(() => {
        setSymptomData((symptomData) => ({
            ...symptomData,
            id: editData?.id,
            name: editData?.name,
            code: editData?.code,
        }));
    }, [editData]);

    return (
        <div>
            <ModalRoot
                title={
                    <h1 className="font-semibold text-gray-800 text-xl">
                        {`${editData ? "Edit" : "Tambah"} Gejala`}
                    </h1>
                }
            >
                <form
                    onSubmit={submitCode}
                    className="flex flex-col space-y-3"
                >
                    <div className="flex flex-col space-y-1">
                        <h1 className="text-gray-500 text-sm">Gejala</h1>
                        <input
                            onChange={(e) => {
                                setSymptomData((symptomData) => ({
                                    ...symptomData,
                                    name: e.target.value,
                                }));
                            }}
                            value={symptomData.name}
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
                        <h1 className="text-gray-500 text-sm">Kode Gejala</h1>
                        <input
                            onChange={(e) => {
                                setSymptomData((symptomData) => ({
                                    ...symptomData,
                                    code: e.target.value,
                                }));
                            }}
                            value={symptomData.code}
                            type="text"
                            name="code"
                            id="code"
                            className="border-2 border-gray-200 focus:border-white focus:outline-none focus:ring focus:ring-gray-400 transition duration-200 rounded-lg"
                        />
                        {error?.code && (
                            <span className="text-xs text-red-500">
                                {error?.code}
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
