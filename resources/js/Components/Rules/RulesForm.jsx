import React, { useEffect, useState } from "react";
import ModalRoot from "../ModalRoot";
import { Inertia } from "@inertiajs/inertia";
import toast from "react-hot-toast";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalData, modalToggle } from "../../Store/Modal";
import { baseUrlApi } from "../../Store/Global";
import axios from "axios";

export default function RulesForm() {
    const [showModal, setShowModal] = useRecoilState(modalToggle);
    const editData = useRecoilValue(modalData);
    const [symptoms, setSymptoms] = useState([]);
    const [diseases, setDiseases] = useState([]);

    const urlApi = useRecoilValue(baseUrlApi);

    const [rulesData, setRulesData] = useState({
        symptom_id: "",
        disease_id: "",
        value: "",
    });

    const [error, setError] = useState();

    const submitRules = (e) => {
        e.preventDefault();

        if (editData) {
            Inertia.post("rules-update", rulesData, {
                onError: (e) => {
                    e?.duplicate && toast.error(e?.duplicate);
                    setError(e);
                },
                onSuccess: () => {
                    setShowModal(false);
                    setRulesData((rulesData) => ({
                        ...rulesData,
                        symptom_id: "",
                        disease_id: "",
                        value: "",
                    }));
                    toast.success("Gejala berhasil diubah!");
                },
            });
        } else {
            Inertia.post("rules", rulesData, {
                onError: (e) => {
                    setError(e);
                },
                onSuccess: () => {
                    setShowModal(false);
                    setRulesData((rulesData) => ({
                        ...rulesData,
                        symptom_id: "",
                        disease_id: "",
                        value: "",
                    }));
                    toast.success("Rules berhasil ditambahkan!");
                },
            });
        }
    };

    useEffect(() => {
        setRulesData((rulesData) => ({
            ...rulesData,
            id: editData?.id,
            symptom_id: editData?.symptom_id,
            disease_id: editData?.disease_id,
            value: editData?.value,
        }));

        const getSymptoms = async () => {
            await axios.get(urlApi + "symptom-data").then((res) => {
                setSymptoms(res.data);
            });
        };
        const getDiseases = async () => {
            await axios.get(urlApi + "disease-data").then((res) => {
                setDiseases(res.data);
            });
        };
        getSymptoms();
        getDiseases();
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
                    onSubmit={submitRules}
                    className="flex flex-col space-y-3"
                >
                    <div className="flex flex-col space-y-1">
                        <h1 className="text-gray-500 text-sm">Gejala</h1>
                        <select
                            onChange={(e) => {
                                setRulesData((rulesData) => ({
                                    ...rulesData,
                                    symptom_id: e.target.value,
                                }));
                            }}
                            value={rulesData.symptom_id}
                            type="text"
                            name="symptom_id"
                            id="symptom_id"
                            className="border-2 border-gray-200 focus:border-white focus:outline-none focus:ring focus:ring-gray-400 transition duration-200 rounded-lg"
                        >
                            <option value="">Pilih Gejala</option>
                            {symptoms.map((symp, key) => {
                                return (
                                    <option key={key} value={symp.id}>
                                        {symp.name}
                                    </option>
                                );
                            })}
                        </select>
                        {error?.symptom_id && (
                            <span className="text-xs text-red-500">
                                {error?.symptom_id}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col space-y-1">
                        <h1 className="text-gray-500 text-sm">Penyakit</h1>
                        <select
                            onChange={(e) => {
                                setRulesData((rulesData) => ({
                                    ...rulesData,
                                    disease_id: e.target.value,
                                }));
                            }}
                            value={rulesData.disease_id}
                            type="text"
                            name="disease_id"
                            id="disease_id"
                            className="border-2 border-gray-200 focus:border-white focus:outline-none focus:ring focus:ring-gray-400 transition duration-200 rounded-lg"
                        >
                            <option value="">Pilih Penyakit</option>
                            {diseases.map((symp, key) => {
                                return (
                                    <option key={key} value={symp.id}>
                                        {symp.name}
                                    </option>
                                );
                            })}
                        </select>
                        {error?.disease_id && (
                            <span className="text-xs text-red-500">
                                {error?.disease_id}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col space-y-1">
                        <h1 className="text-gray-500 text-sm">Bobot</h1>
                        <input
                            onChange={(e) => {
                                setRulesData((rulesData) => ({
                                    ...rulesData,
                                    value: e.target.value,
                                }));
                            }}
                            value={rulesData.value}
                            type="number"
                            min="0"
                            name="value"
                            step=".01"
                            id="value"
                            className="border-2 border-gray-200 focus:border-white focus:outline-none focus:ring focus:ring-gray-400 transition duration-200 rounded-lg"
                        />
                        {error?.value && (
                            <span className="text-xs text-red-500">
                                {error?.value}
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
