import React from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { modalData, modalToggle } from "../../Store/Modal";
import * as MdIcons from "react-icons/md";
import RulesForm from "../../Components/Rules/RulesForm";
import Admin from "../../Layouts/Admin";
import ModalAturan from "../../Components/Aturan/ModalAturan";
import TabelAturan from "../../Components/Aturan/TabelAturan";
// import DiseaseTable from "../../Components/Disease/DiseaseTable";

export default function Rules() {
    const [showModal, setShowModal] = useRecoilState(modalToggle);
    const [editData, setEditData] = useRecoilState(modalData);
    return (
        <Admin judul="Aturan">
            <div className="p-4 space-y-3">
        <div className="space-y-3">
            <h1 className="font-semibold text-gray-700 text-xl">
                Data Aturan
            </h1>
            <ModalAturan />
            <button
                onClick={() => {
                    setEditData(null);
                    setShowModal(true);
                }}
                className="text-rose-700 border-2 border-rose-900 px-3 py-1 rounded-xl 
                focus:ring focus:outline-none focus:ring-blue-200 hover:bg-rose-700
                hover:text-white transition-all duration-200 flex items-center space-x-2"
            >
                <MdIcons.MdAddCircle size={16} />
                <h1>Tambah</h1>
            </button>
            <TabelAturan />
        </div>
        </div>
        </Admin>
    );
}
