import { Inertia } from "@inertiajs/inertia";
import React, { useState } from "react";
import toast from "react-hot-toast";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import { dialogToggle, modalData, modalToggle } from "../../Store/Modal";
import ZenDialog from "../ZenDialog";
import { Grid, _ } from "gridjs-react";
import { Link, usePage } from "@inertiajs/inertia-react";
import moment from "moment";

export default function HistoryTable(props) {
    const [showDialog, setShowDialog] = useRecoilState(dialogToggle);
    const [showModal, setShowModal] = useRecoilState(modalToggle);
    const [editData, setEditData] = useRecoilState(modalData);

    const { auth } = usePage().props;
    const showName = (data) => {
        const data_client = JSON.parse(data?.data_client);
        return data?.id_client ? data?.user?.name : data_client?.name
    };
    const showPenyakit = (hasil) => {
        let length = hasil.penyakit.length;

        return hasil.penyakit?.map((peny, key) => (
            <span key={key}>
                {" "}
                {peny}
                {key == length - 1 ? " " : ", "}
            </span>
        ));
    };
    const showisi = (user, data) => {
        if (user == "user") {
            return data.map((riwayat, index) => [
                index + 1,
                moment(riwayat?.waktudiagnosa).format("DD-MM-yy"),
                _(
                    <div>
                        {showPenyakit(JSON.parse(riwayat?.hasildiagnosa))}
                    </div>
                ),
                _(
                    <div className="flex items-center space-x-2 sm:text-sm text-xs">
                        <Link
                            href={"hasil-" + riwayat?.id}
                            className="p-2 rounded-lg bg-green-100 hover:bg-green-200 transition duration-200"
                        >
                            <FaIcons.FaListUl
                                size={16}
                                className="text-green-400"
                            />
                        </Link>
                        <button
                            onClick={() => {
                                hapus(riwayat?.id);
                            }}
                            aria-label="delete"
                            className="p-2 rounded-lg bg-red-100 hover:bg-red-200 transition duration-200 ml-2"
                        >
                            <FaIcons.FaTrash
                                size={16}
                                className="text-red-400"
                            />
                        </button>
                    </div>
                ),
            ]);
        } else if (user == "admin") {
            return data.map((riwayat, index) => [
                index + 1,
                moment(riwayat?.waktudiagnosa).format("DD-MM-yy"),
                _(<div className="">{showName(riwayat)}</div>),
                riwayat?.age,
                _(
                    <div>
                        {showPenyakit(JSON.parse(riwayat?.hasildiagnosa))}
                    </div>
                ),
                _(
                    <div className="flex items-center space-x-2 sm:text-sm text-xs">
                        <Link
                            href={"hasil-" + riwayat?.id}
                            className="p-2 rounded-lg bg-green-100 hover:bg-green-200 transition duration-200"
                        >
                            <FaIcons.FaListUl
                                size={16}
                                className="text-green-400"
                            />
                        </Link>
                        <button
                            onClick={() => {
                                hapusRiwayat(riwayat?.id);
                            }}
                            aria-label="delete"
                            className="p-2 rounded-lg bg-red-100 hover:bg-red-200 transition duration-200 ml-2"
                        >
                            <FaIcons.FaTrash
                                size={16}
                                className="text-red-400"
                            />
                        </button>
                    </div>
                ),
            ]);
        }
    };
    const showlabel = (user) => {
        if (user == "user") {
            return [
                { name: "No", width: "10%" },
                { name: "Tanggal Diagnosa", width: "30%" },
                { name: "Diagnosis", width: "40%" },
                { name: "Aksi", width: "20%" },
            ];
        } else if (user == "admin") {
            return [
                { name: "No", width: "5%" },
                { name: "Tanggal Diagnosa", width: "20%" },
                { name: "Nama", width: "20%" },
                { name: "Umur", width: "10%" },
                { name: "Diagnosis", width: "35%" },
                { name: "Aksi", width: "10%" },
            ];
        }
    };

    const [dialogInfo, setDialogInfo] = useState({
        title: "",
        message: "",
        isConfirm: false,
        id: null,
    });

    const sureDelete = (confirm) => {
        if (confirm) {
            Inertia.post(
                "hapus-riwayat",
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

    const hapusRiwayat = (id, name) => {
        setDialogInfo({
            title: "Yakin Menghapus?",
            message: "Data yang dihapus tidak dapat dikembalikan. Lanjutkan?",
            isConfirm: true,
            id: id,
        });
        setShowDialog(true);
    };

    return (
        <div className="">
            <ZenDialog
                title={dialogInfo.title}
                message={dialogInfo.message}
                isConfirm={dialogInfo.isConfirm}
                acceptHandler={sureDelete}
            />
            <div className=" bg-white sm:p-8 p-3 w-full">
                <Grid
                    server={{
                        url: `http://localhost:8000/api/riwayat-diagnosa/${auth.user.id},${auth.user.roles[0].name}`,
                        then: (data) => showisi(auth.user.roles[0].name, data),
                    }}
                    columns={showlabel(auth.user.roles[0].name)}
                    search={true}
                    pagination={{
                        enabled: true,
                        limit: 10,
                    }}
                    sort={true}
                    className={{
                        container:
                            "bg-white shadow-md rounded-lg overflow-hidden p-5 overflow-x-auto",
                        table: "mt-5 min-w-full",
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
        </div>
    );
}
