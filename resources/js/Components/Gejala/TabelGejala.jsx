import { Inertia } from "@inertiajs/inertia";
import React, { useState } from "react";
import toast from "react-hot-toast";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import { useRecoilState, useRecoilValue } from "recoil";
import { dialogToggle, modalData, modalToggle } from "../../Store/Modal";
import ZenDialog from "../ZenDialog";
import { Grid, _ } from "gridjs-react";
import { baseUrlApi } from "../../Store/Global";

export default function TabelGejala(props) {
    const [showDialog, setShowDialog] = useRecoilState(dialogToggle);
    const [showModal, setShowModal] = useRecoilState(modalToggle);
    const [editData, setEditData] = useRecoilState(modalData);
    const url = useRecoilValue(baseUrlApi);

    const [dialogInfo, setDialogInfo] = useState({
        title: "",
        message: "",
        isConfirm: false,
        id: null,
    });

    const sureDelete = (confirm) => {
        if (confirm) {
            Inertia.post(
                "hapus-gejala",
                { id: dialogInfo.id },
                {
                    onSuccess: () => {
                        toast.success("Data terhapus!");
                        setShowDialog(false);
                    },
                    onError: () => {
                        toast.error("Data gagal dihapus!");
                    },
                }
            );
        } else {
            setShowDialog(false);
        }
    };

    const deleteSymptom = (id, name) => {
        setDialogInfo({
            title: "Yakin Menghapus?",
            message: "Data yang dihapus tidak dapat dikembalikan. Lanjutkan?",
            isConfirm: true,
            id: id,
        });
        setShowDialog(true);
    };

    return (
        <div className="flex flex-col">
            <ZenDialog
                title={dialogInfo.title}
                message={dialogInfo.message}
                isConfirm={dialogInfo.isConfirm}
                acceptHandler={sureDelete}
            />
            <Grid
                server={{
                    url: url + "data-gejala",
                    then: (data) =>
                        data.map((gejala, index) => [
                            index + 1,
                            gejala.kode_gejala,
                            gejala.nama_gejala,
                            _(
                                <button
                                    onClick={() => {
                                        setEditData(gejala);
                                        setShowModal(true);
                                    }}
                                    className="p-2 rounded-lg bg-yellow-100 hover:bg-yellow-200 transition duration-200"
                                >
                                    <MdIcons.MdEdit
                                        size={16}
                                        className="text-yellow-400"
                                    />
                                </button>
                            ),
                            _(
                                <button
                                    onClick={() => {
                                        deleteSymptom(gejala.id, gejala.kode_gejala);
                                    }}
                                    className="p-2 rounded-lg bg-red-100 hover:bg-red-200 transition duration-200"
                                >
                                    <FaIcons.FaTrash
                                        size={16}
                                        className="text-red-400"
                                    />
                                </button>
                            ),
                        ]),
                }}
                columns={[
                    { name: "No", width: "5%" }, { name: "Kode Gejala", width: "15%" }, { name: "Nama Gejala", width: "60%" }, "Edit", "Hapus"]}
                search={true}
                pagination={{
                    enabled: true,
                    limit: 10,
                }}
                sort={true}
                className={{
                    container:
                        "bg-white shadow-md rounded-lg overflow-hidden p-5 overflow-x-auto",
                    table: "mt-5",
                    thead: "bg-rose-700",
                    th: "text-left text-sm font-medium text-white px-4 py-3",
                    tbody: "text-sm",
                    tr: "border-b-2 border-gray-200",
                    td: "px-4 py-3",
                    footer: "text-gray-500 text-sm",
                    pagination:
                        "flex justify-between items-center text-sm mt-5 pl-4 text-gray-800 w-full",
                    paginationButton: "mr-4",
                    paginationButtonCurrent:
                        "text-white px-2 py-1 rounded bg-gray-800 hover:bg-gray-700 ",
                    paginationButtonPrev:
                        "text-gray-800 px-2 py-1 rounded bg-gray-100 hover:bg-gray-200",
                    paginationButtonNext:
                        "text-gray-800 px-2 py-1 rounded bg-gray-100 hover:bg-gray-200",
                }}
                language={{
                    search: {
                        placeholder: "🔍 Cari...",
                    },
                    pagination: {
                        previous: "Sebelumnya",
                        next: "Selanjutnya",
                        showing: "Menampilkan",
                        results: () => "Data",
                    },
                }}
            />
        </div>
    );
}
