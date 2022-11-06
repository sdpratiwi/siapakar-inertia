import { Inertia } from "@inertiajs/inertia";
import { Grid, _ } from "gridjs-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import { useRecoilState, useRecoilValue } from "recoil";
import { baseUrlApi } from "../../Store/Global";
import { dialogToggle, modalData, modalToggle } from "../../Store/Modal";
import ZenDialog from "../ZenDialog";

export default function DoctorTable(props) {
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
                "doctor-delete",
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

    const deleteDoctor = (id, name) => {
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
                    url: url + "doctors-data",
                    then: (data) =>
                        data.map((doctor, index) => [
                            index + 1,
                            doctor.name,
                            doctor.no_str,
                            doctor.gender,
                            doctor.specialist,
                            doctor.hp,
                            doctor.address,
                            _(
                                <button
                                    onClick={() => {
                                        setEditData(doctor);
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
                                        deleteDoctor(doctor.id, doctor.name);
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
                    "No",
                    "Name",
                    "No. STR",
                    "Jenis Kelamin",
                    "Spesialis",
                    "No. HP",
                    "Alamat",
                    {name: "Aksi", width: "10px"},
                    {name: "", width: "10px"},
                ]}
                search={true}
                pagination={{
                    enabled: true,
                    limit: 2,
                }}
                sort={true}
                className={{
                    container:
                        "bg-white shadow-md rounded-lg overflow-hidden p-5 overflow-x-auto",
                    table: "mt-5 border-2 border-gray-200",
                    thead: "bg-gray-200",
                    th: "text-left text-sm font-medium text-gray-700 px-4 py-3",
                    tbody: "text-sm",
                    tr: "hover:bg-gray-100 border-b-2 border-gray-200",
                    td: "px-4 py-3",
                    footer: "text-gray-500 text-sm",
                    pagination:
                        "flex justify-between items-center mt-5 pl-4 text-gray-800 w-full",
                    paginationButton: "mr-4",
                    paginationButtonCurrent:
                        "text-white px-2 py-1 rounded bg-gray-800 hover:bg-gray-700",
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
