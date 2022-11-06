import React, { useEffect, useState } from "react";
import ModalRoot from "../ModalRoot";
import { Inertia } from "@inertiajs/inertia";
import toast from "react-hot-toast";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalData, modalToggle } from "../../Store/Modal";
import { data } from "autoprefixer";

export default function ModalPengguna() {
    const [showModal, setShowModal] = useRecoilState(modalToggle);
    const editData = useRecoilValue(modalData);

    const [dataPengguna, setdataPengguna] = useState({
        name: "",
        username: "",
        tanggallahir: "",
        address: "",
        email: "",
        gender: "",
        role: ""
    });

    const [error, setError] = useState();

    const submitUser = (e) => {
        e.preventDefault();

        if (editData) {
            Inertia.post("edit-pengguna", dataPengguna, {
                onError: (e) => {
                    e?.duplicate && toast.error(e?.duplicate);
                    setError(e);
                },
                onSuccess: () => {
                    setShowModal(false);
                    setdataPengguna((dataPengguna) => ({
                        ...dataPengguna,
                        name: "",
                        username: "",
                        tanggallahir: "",
                        address: "",
                        email: "",
                        gender: "",
                        role: ""
                    }));
                    toast.success("Pengguna berhasil diubah!");
                },
            });
        } else {
            Inertia.post("tambahpengguna", dataPengguna, {
                onError: (e) => {
                    setError(e);
                },
                onSuccess: () => {
                    setShowModal(false);
                    setdataPengguna((dataPengguna) => ({
                        ...dataPengguna,
                        name: "",
                        username: "",
                        tanggallahir: "",
                        address: "",
                        email: "",
                        gender: "",
                        role: ""
                    }));
                    toast.success("Pengguna berhasil ditambahkan!");
                },
            });
        }
    };

    useEffect(() => {
        setdataPengguna((dataPengguna) => ({
            ...dataPengguna,
            id: editData?.id,
            name: editData?.name,
            username: editData?.username,
            tanggallahir: editData?.tanggallahir,
            address: editData?.address,
            email: editData?.email,
            gender: editData?.gender,
            role: editData?.roles[0].name
        }));
    }, [editData]);

    return (
        <div>
            <ModalRoot
                title={
                    <h1 className="font-semibold text-gray-800 text-xl">
                        {`${editData ? "Edit" : "Tambah"} Pengguna`}
                    </h1>
                }
            >
                <form
                    onSubmit={submitUser}
                    className="flex flex-col space-y-3"
                >
                    <div className="flex flex-col space-y-1">
                        <h1 className="text-gray-500 text-sm">Nama</h1>
                        <input
                            onChange={(e) => {
                                setdataPengguna((dataPengguna) => ({
                                    ...dataPengguna,
                                    name: e.target.value,
                                }));
                            }}
                            value={dataPengguna?.name}
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
                        <h1 className="text-gray-500 text-sm">Username</h1>
                        <input
                            onChange={(e) => {
                                setdataPengguna((dataPengguna) => ({
                                    ...dataPengguna,
                                    username: e.target.value,
                                }));
                            }}
                            value={dataPengguna?.username}
                            type="text"
                            name="username"
                            id="username"
                            className="border-2 border-gray-200 focus:border-white focus:outline-none focus:ring focus:ring-gray-400 transition duration-200 rounded-lg"
                        />
                        {error?.username && (
                            <span className="text-xs text-red-500">
                                {error?.username}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col space-y-1">
                        <h1 className="text-gray-500 text-sm">Jenis Kelamin</h1>
                        <select
                            onChange={(e) => {
                                setdataPengguna((dataPengguna) => ({
                                    ...dataPengguna,
                                    gender: e.target.value,
                                }));
                            }}
                            value={dataPengguna?.gender}
                            type="text"
                            name="email"
                            id="email"
                            className="border-2 border-gray-200 focus:border-white focus:outline-none focus:ring focus:ring-gray-400 transition duration-200 rounded-lg"
                        >
                            <option value="">Pilih Jenis Kelamin</option>
                            <option value="Laki-laki">Laki-laki</option>
                            <option value="Perempuan">Perempuan</option>
                        </select>
                        {error?.gender && (
                            <span className="text-xs text-red-500">
                                {error?.gender}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col space-y-1">
                        <h1 className="text-gray-500 text-sm">Tanggal Lahir</h1>
                        <input
                            onChange={(e) => {
                                setdataPengguna((dataPengguna) => ({
                                    ...dataPengguna,
                                    tanggallahir: e.target.value,
                                }));
                            }}
                            value={dataPengguna?.tanggallahir}
                            type="date"
                            name="tanggallahir"
                            id="tanggallahir"
                            className="border-2 border-gray-200 focus:border-white focus:outline-none focus:ring focus:ring-gray-400 transition duration-200 rounded-lg"
                        />

                        {error?.tanggallahir && (
                            <span className="text-xs text-red-500">
                                {error?.tanggallahir}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col space-y-1">
                        <h1 className="text-gray-500 text-sm">Alamat</h1>
                        <textarea
                            onChange={(e) => {
                                setdataPengguna((dataPengguna) => ({
                                    ...dataPengguna,
                                    address: e.target.value,
                                }));
                            }}
                            value={dataPengguna?.address}
                            type="text"
                            name="address"
                            id="address"
                            className="border-2 border-gray-200 focus:border-white focus:outline-none focus:ring focus:ring-gray-400 transition duration-200 rounded-lg"
                        >
                            {dataPengguna?.address}
                        </textarea>
                        {error?.address && (
                            <span className="text-xs text-red-500">
                                {error?.address}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col space-y-1">
                        <h1 className="text-gray-500 text-sm">Email</h1>
                        <textarea
                            onChange={(e) => {
                                setdataPengguna((dataPengguna) => ({
                                    ...dataPengguna,
                                    email: e.target.value,
                                }));
                            }}
                            value={dataPengguna?.email}
                            type="text"
                            name="email"
                            id="email"
                            className="border-2 border-gray-200 focus:border-white focus:outline-none focus:ring focus:ring-gray-400 transition duration-200 rounded-lg"
                        >
                            {dataPengguna?.email}
                        </textarea>
                        {error?.email && (
                            <span className="text-xs text-red-500">
                                {error?.email}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col space-y-1">
                        <h1 className="text-gray-500 text-sm">Role</h1>
                        <select
                            onChange={(e) => {
                                setdataPengguna((dataPengguna) => ({
                                    ...dataPengguna,
                                    role: e.target.value,
                                }));
                            }}
                            value={dataPengguna?.role}
                            type="text"
                            name="email"
                            id="email"
                            className="border-2 border-gray-200 focus:border-white focus:outline-none focus:ring focus:ring-gray-400 transition duration-200 rounded-lg"
                        >
                            <option value="">Pilih Jenis Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">user</option>
                        </select>
                        {error?.gender && (
                            <span className="text-xs text-red-500">
                                {error?.gender}
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
