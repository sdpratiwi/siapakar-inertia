import React, { useEffect, useState } from "react";
import ModalRoot from "../ModalRoot";
import { Inertia } from "@inertiajs/inertia";
import toast from "react-hot-toast";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalData, modalToggle } from "../../Store/Modal";

export default function DiseaseForm() {
    const [showModal, setShowModal] = useRecoilState(modalToggle);
    const editData = useRecoilValue(modalData);

    const [diseaseData, setDiseaseData] = useState({
        name: "",
        detail: "",
        solution: "",
        image: "",
    });

    const [error, setError] = useState();

    const submitDisease = (e) => {
        e.preventDefault();

        if (editData) {
            Inertia.post("disease-update", diseaseData, {
                onError: (e) => {
                    e?.duplicate && toast.error(e?.duplicate);
                    setError(e);
                },
                onSuccess: () => {
                    setShowModal(false);
                    setDiseaseData((diseaseData) => ({
                        ...diseaseData,
                        name: "",
                        detail: "",
                        solution: "",
                        image: "",
                    }));
                    toast.success("Penyakit berhasil diubah!");
                },
            });
        } else {
            Inertia.post("disease", diseaseData, {
                onError: (e) => {
                    setError(e);
                },
                onSuccess: () => {
                    setShowModal(false);
                    setDiseaseData((diseaseData) => ({
                        ...diseaseData,
                        name: "",
                        detail: "",
                        solution: "",
                        image: "",
                    }));
                    toast.success("Penyakit berhasil ditambahkan!");
                },
            });
        }
    };

    useEffect(() => {
        setDiseaseData((diseaseData) => ({
            ...diseaseData,
            id: editData?.id,
            name: editData?.name,
            detail: editData?.detail,
            solution: editData?.solution,
            image: editData?.image,
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
                        <h1 className="text-gray-500 text-sm">Nama Penyakit</h1>
                        <input
                            onChange={(e) => {
                                setDiseaseData((diseaseData) => ({
                                    ...diseaseData,
                                    name: e.target.value,
                                }));
                            }}
                            value={diseaseData.name}
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
                        <h1 className="text-gray-500 text-sm">Detail</h1>
                        <textarea
                            onChange={(e) => {
                                setDiseaseData((diseaseData) => ({
                                    ...diseaseData,
                                    detail: e.target.value,
                                }));
                            }}
                            value={diseaseData.detail}
                            type="text"
                            name="str"
                            id="str"
                            className="border-2 border-gray-200 focus:border-white focus:outline-none focus:ring focus:ring-gray-400 transition duration-200 rounded-lg"
                        >
                            {diseaseData.detail}
                        </textarea>
                        {error?.detail && (
                            <span className="text-xs text-red-500">
                                {error?.detail}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col space-y-1">
                        <h1 className="text-gray-500 text-sm">Solution</h1>
                        <textarea
                            onChange={(e) => {
                                setDiseaseData((diseaseData) => ({
                                    ...diseaseData,
                                    solution: e.target.value,
                                }));
                            }}
                            value={diseaseData.solution}
                            type="text"
                            name="str"
                            id="str"
                            className="border-2 border-gray-200 focus:border-white focus:outline-none focus:ring focus:ring-gray-400 transition duration-200 rounded-lg"
                        >
                            {diseaseData.solution}
                        </textarea>
                        {error?.solution && (
                            <span className="text-xs text-red-500">
                                {error?.solution}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col space-y-1">
                        <h1 className="text-gray-500 text-sm">Gambar</h1>
                        <input
                            onChange={(e) => {
                                setDiseaseData((diseaseData) => ({
                                    ...diseaseData,
                                    image: e.target.files,
                                }));
                            }}
                            type="file"
                            name="image"
                            id="image"
                            className="border-2 border-gray-200 focus:border-white focus:outline-none focus:ring focus:ring-gray-400 transition duration-200 rounded-lg"
                        />
                        {error?.image && (
                            <span className="text-xs text-red-500">
                                {error?.image}
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
