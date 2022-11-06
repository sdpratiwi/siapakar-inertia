import React from "react";
import TabelPengguna from "../../Components/Pengguna/TabelPengguna";
import Admin from "../../Layouts/Admin";
import ModalPengguna from "../../Components/Pengguna/ModalPengguna";
import * as MdIcons from "react-icons/md";
import { useRecoilState } from "recoil";
import { modalData, modalToggle } from "../../Store/Modal";

export default function Pengguna() {
    const [showModal, setShowModal] = useRecoilState(modalToggle);
    const [dataEdit, setDataEdit] = useRecoilState(modalData);
    return (
        <Admin judul="Pengguna">
            <div className="p-4 space-y-3">
                <div className="space-y-3 ">
                    <h1 className="font-semibold text-gray-700 text-xl">
                        Data Pengguna
                    </h1>
                    <ModalPengguna />
                    <button
                        onClick={() => {
                            setDataEdit(null);
                            setShowModal(true);
                        }}
                        className="text-rose-700 border-2 border-rose-900 px-3 py-1 rounded-xl 
        focus:ring focus:outline-none focus:ring-blue-200 hover:bg-rose-700
        hover:text-white transition-all duration-200 flex items-center space-x-2"
                    >
                        <MdIcons.MdAddCircle size={16} />
                        <h1>Tambah</h1>
                    </button>
                </div>
            </div>
            <TabelPengguna />
        </Admin>
    );
}
