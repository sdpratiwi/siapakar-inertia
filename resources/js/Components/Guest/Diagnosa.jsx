import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import toast from "react-hot-toast";
import * as MdIcons from "react-icons/md";

export default function Diagnosa() {
    const { gejala } = usePage().props;
    const [gender, setGender] = useState("");
    const [nama, setNama] = useState("");
    const [alamat, setAlamat] = useState("");
    const [umur, setUmur] = useState("");
    const [tab, setTab] = useState(1);

    const [error, setError] = useState({
        nama: "",
        alamat: "",
        gender: "",
        umur: "",
        age: ""
    });

    const { register, handleSubmit } = useForm();

    const validasiForm = (data) => {
        if (
            (nama == "") |
            (alamat == "") |
            (gender == "") |
            (umur == "")
        ) {
            if (nama == "") {
                setError((error) => ({
                    ...error,
                    nama: "Nama Lengkap Belum Diisi!",
                }));
            } else {
                setError((error) => ({
                    ...error,
                    nama: "",
                }));
            }
            if (gender == "") {
                setError((error) => ({
                    ...error,
                    gender: "Jenis Kelamin Belum Diisi!",
                }));
            } else {
                setError((error) => ({
                    ...error,
                    gender: "",
                }));
            }
            if (alamat == "") {
                setError((error) => ({
                    ...error,
                    alamat: "Alamat Belum Diisi!",
                }));
            } else {
                setError((error) => ({
                    ...error,
                    alamat: "",
                }));
            }
            if (umur == "") {
                setError((error) => ({
                    ...error,
                    umur: "Umur Belum Diisi!",
                }));
            } else {
                setError((error) => ({
                    ...error,
                    umur: "",
                }));
            }
        } else {
            setError((error) => ({
                ...error,
                nama: "",
                alamat: "",
                gender: "",
                umur: "",
            }));
            setTab(2);
        }
    }

    const diagnosa = (data) => {
        data["nama"] = nama;
        data["gender"] = gender;
        data["alamat"] = alamat;
        data["umur"] = umur;
        if (data.gejala.length < 2) {
            toast.error("Gejala Yang Dipilih Minimal 2!");
        } else {
            Inertia.post("/diagnosa2", data, {
                onSuccess: () => {
                    toast.success("Diagnosa Berhasil!");
                },
                onError: () => {
                    setError(e);
                    e.type && toast[e.type](e.message);
                },
            });
        }
    }

    return (
        <div className="w-full pt-[150px] px-20">
            <div className="w-full flex flex-col items-center sm:items-start justify-center space-y-5 row-start-1 sm:row-start-2">
                <h1 className="mt-2 sm:mt-0 text-xl sm:text-5xl text-center sm:text-left font-bold text-gray-800">
                    Ayo Periksa Kesehatanmu Sekarang!
                </h1>
                <form action="" onSubmit={handleSubmit(validasiForm)} className={`w-full flex flex-col items-center sm:items-start justify-center space-y-5 row-start-1 sm:row-start-2 ${tab == 1 ? "visible" : "hidden"}`}>
                    <div className="w-full flex">
                        <div className="w-2/5 flex flex-col">
                            <h1 className="text-gray-500 text-base pb-3">Nama Lengkap</h1>
                            <input
                                onChange={(e) => {
                                    setNama(e.target.value);
                                }}
                                value={nama}
                                type="text"
                                name="name"
                                id="name"
                                className="border-2 border-gray-200 focus:border-white focus:outline-none focus:ring focus:ring-gray-400 transition duration-200 rounded-lg"
                            />
                            {error?.nama && (
                                <span className="text-xs pt-2 text-red-500">
                                    {error?.nama}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex flex-col">
                            <h1 className="text-gray-500 text-base pb-3">Jenis Kelamin</h1>
                            <div className="flex">
                                <div className="w-full flex items-center mr-4">
                                    <input id="Laki-Laki" type="radio" checked={gender === "Laki-Laki"} onChange={(e) => {
                                        setGender(e.target.value);
                                    }} value="Laki-Laki" name="l" className="w-4 h-4 text-rose-700 bg-gray-100 border-gray-300 focus:ring-rose-700 dark:focus:ring-rose-700 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="Laki-Laki" className="ml-2 text-sm text-gray-900 dark:text-gray-500">Laki-Laki</label>
                                </div>
                                <div className="flex items-center mr-4">
                                    <input id="Perempuan" type="radio" checked={gender === "Perempuan"} onChange={(e) => {
                                        setGender(e.target.value);
                                    }} value="Perempuan" name="p" className="w-4 h-4 text-rose-700 bg-gray-100 border-gray-300 focus:ring-rose-700 dark:focus:ring-rose-700 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="Perempuan" className="ml-2 text-sm text-gray-900 dark:text-gray-500">Perempuan</label>
                                </div>
                            </div>
                            {error?.gender && (
                                <span className="text-xs pt-2 text-red-500">
                                    {error?.gender}
                                </span>
                            )}
                        </div>
                        <div className="w-full flex">
                            <div className="w-20 flex flex-col">
                                <h1 className="text-gray-500 text-base pb-3">Umur</h1>
                                <input
                                    onChange={(e) => {
                                        setUmur(e.target.value);
                                    }}
                                    value={umur}
                                    type="text"
                                    name="umur"
                                    id="umur"
                                    className="border-2 border-gray-200 focus:border-white focus:outline-none focus:ring focus:ring-gray-400 transition duration-200 rounded-lg"
                                />
                                {error?.umur && (
                                    <span className="text-xs pt-2 text-red-500">
                                        {error?.umur}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex">
                        <div className="w-2/5 flex flex-col">
                            <h1 className="text-gray-500 text-base pb-3">Alamat</h1>
                            <textarea
                                onChange={(e) => {
                                    setAlamat(e.target.value);
                                }}
                                value={alamat}
                                type="text"
                                name="alamat"
                                id="alamat"
                                className="border-2 border-gray-200 focus:border-white focus:outline-none focus:ring focus:ring-gray-400 transition duration-200 rounded-lg"
                            ></textarea>
                            {error?.alamat && (
                                <span className="text-xs pt-2 text-red-500">
                                    {error?.alamat}
                                </span>
                            )}
                        </div>
                    </div>
                    <button
                        className="text-rose-700 border-2 border-rose-900 px-3 py-1 rounded-xl focus:ring focus:outline-none focus:ring-blue-200 hover:bg-rose-700 hover:text-white transition-all duration-200 flex items-center space-x-2"
                    >

                        <h1>Berikutnya</h1>
                        <MdIcons.MdArrowRight size={16} />
                    </button>
                </form>
                <form action="" onSubmit={handleSubmit(diagnosa)} className={`overflow-y-visible ${tab == 2 ? "visible" : "hidden"}`}>
                    <div className="w-fit">
                        <div className="font-semibold text-2xl text-rose-700 mt-3">
                            Pilih Gejala Yang Sedang Dialami
                        </div>
                        {console.log("333 gejala : ", gejala)}

                        {gejala?.map((gej, key) => {
                            return (
                                <div key={key} name="gejala" className="flex items-center mb-4  ">
                                    <input id={"gejala-" + gej.id} type="checkbox" {...register("gejala")} value={gej.id} className="w-4 text-rose-700 bg-gray-100 rounded border-gray-300 outline-none " />
                                    <label htmlFor={"gejala-" + gej.id} className="ml-2 text-sm font-medium leading-none text-gray-900"> {gej.nama_gejala}</label>
                                </div>
                            );
                        })}
                        <div className="flex space-x-3 pt-4">
                            <button
                                className="text-rose-700 border-2 border-rose-900 px-3 py-1 rounded-xl focus:ring focus:outline-none focus:ring-blue-200 hover:bg-rose-700 hover:text-white transition-all duration-200 flex items-center space-x-2"
                            >
                                <MdIcons.MdArrowLeft size={16} />
                                <h1>Sebelumnya</h1>
                            </button>
                            <button
                                className="text-rose-700 border-2 border-rose-900 px-3 py-1 rounded-xl focus:ring focus:outline-none focus:ring-blue-200 hover:bg-rose-700 hover:text-white transition-all duration-200 flex items-center space-x-2"
                            >

                                <h1>Diagnosa</h1>
                                <MdIcons.MdCheck size={16} />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    );
}