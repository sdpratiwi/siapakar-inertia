import React, { useEffect, useState } from "react";
import * as IoIcons from "react-icons/io";
import { Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import toast, { Toaster } from "react-hot-toast";

export default function Register() {
    const [namaLengkap, setNamaLengkap] = useState();
    const [tanggallahir, setTanggalLahir] = useState();
    const [gender, setGender] = useState();
    const [alamat, setAlamat] = useState();
    const [email, setEmail] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [confPassword, setConfPassword] = useState();

    const [error, setError] = useState();

    const insertData = (e) => {
        e.preventDefault();

        let data = {
            name: namaLengkap,
            tanggallahir: tanggallahir,
            gender: gender,
            address: alamat,
            email: email,
            username: username,
            password: password,
            confPassword: confPassword,
        };

        Inertia.post("/register", data, {
            onError: (e) => {
                setError(e);
            },
            onSuccess: () => {
                toast.success("Pendaftaran berhasil!");
                setNamaLengkap("");
                setUsername("");
                setTanggalLahir("");
                setGender("");
                setAlamat("");
                setEmail("");
                setPassword("");
                setConfPassword("");
            },
        });
    };

    console.log(gender);

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-white relative overflow-hidden ">
            <Toaster />
            <div className="bg-white border-2 shadow-lg rounded-3xl sm:w-3/5 w-10/12 relative overflow-hidden">
                <Link href="/">
                    <a href="">
                        <div className="absolute z-30">
                            <IoIcons.IoMdArrowRoundBack
                                className="text-white opacity-70 ml-8 mt-8"
                                size={24}
                            />
                        </div>
                    </a>
                </Link>

                <form
                    className="z-40 px-10 py-3 pt-10 space-y-3"
                    onSubmit={insertData}
                >
                    <div className="text-center mb-7">
                        <h1 className="text-2xl font-bold text-rose-700">
                            Silahkan Daftar
                        </h1>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-10 px-10">
                        <div className="flex flex-col space-y-3">
                            <div className="py-1 border-b border-gray-500">
                                <input
                                    onChange={(e) => {
                                        setNamaLengkap(e.target.value);
                                    }}
                                    type="text"
                                    className="bg-white border-0 focus:outline-none focus:ring-white px-0 w-full "
                                    placeholder="Nama Lengkap"
                                    value={namaLengkap}
                                />
                            </div>
                            {error?.name && (
                                <span className="text-red-500 text-xs italic">
                                    {error?.name}
                                </span>
                            )}
                            <div className="py-1 border-b border-gray-500">
                                <input
                                    onChange={(e) => {
                                        setTanggalLahir(e.target.value);
                                    }}
                                    type="date"
                                    className="bg-white border-0 focus:outline-none focus:ring-white px-0 w-full"
                                    placeholder="Tanggal Lahir"
                                    value={tanggallahir}
                                />
                            </div>
                            {error?.tanggallahir && (
                                <span className="text-red-500 text-xs italic">
                                    {error?.tanggallahir}
                                </span>
                            )}
                            <div className="py-1 border-b border-gray-500">
                                <select
                                    onChange={(e) => {
                                        setGender(e.target.value);
                                    }}
                                    value={gender}
                                    type="text"
                                    name="gender"
                                    id="gender"
                                    placeholder="Jenis Kelamin"
                                    className="bg-white border-0 focus:outline-none focus:ring-white px-0 w-full text-black"
                                >
                                    <option value="" >Jenis Kelamin</option>
                                    <option value="Perempuan">
                                        Perempuan
                                    </option>
                                    <option value="Laki-laki">
                                        Laki-Laki
                                    </option>
                                </select>
                            </div>
                            {error?.gender && (
                                <span className="text-red-500 text-xs italic">
                                    {error?.gender}
                                </span>
                            )}
                            <div className="py-1 border-b border-gray-500">
                                <input
                                    onChange={(e) => {
                                        setAlamat(e.target.value);
                                    }}
                                    value={alamat}
                                    type="text"
                                    className="bg-white border-0 focus:outline-none focus:ring-white px-0 w-full"
                                    placeholder="Alamat"
                                />
                            </div>
                            {error?.address && (
                                <span className="text-red-500 text-xs italic">
                                    {error?.address}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col space-y-3">
                            <div className="py-1 border-b border-gray-500">
                                <input
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    value={email}
                                    type="email"
                                    className="bg-white border-0 focus:outline-none focus:ring-white px-0 w-full"
                                    placeholder="Email"
                                />
                            </div>
                            {error?.email && (
                                <span className="text-red-500 text-xs italic">
                                    {error?.email}
                                </span>
                            )}


                            <div className="py-1 border-b border-gray-500">
                                <input
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                    }}
                                    value={username}
                                    type="text"
                                    className="bg-white border-0 focus:outline-none focus:ring-white px-0 w-full"
                                    placeholder="Username"
                                />
                            </div>
                            {error?.username && (
                                <span className="text-red-500 text-xs italic">
                                    {error?.username}
                                </span>
                            )}
                            <div className="py-1 border-b border-gray-500">
                                <input
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    value={password}
                                    type="password"
                                    className="bg-white border-0 focus:outline-none focus:ring-white px-0 w-full"
                                    placeholder="Password"
                                />
                            </div>
                            {error?.password && (
                                <span className="text-red-500 text-xs italic">
                                    {error?.password}
                                </span>
                            )}

                            <div className="py-1 border-b border-gray-500">
                                <input
                                    onChange={(e) => {
                                        setConfPassword(e.target.value);
                                    }}
                                    value={confPassword}
                                    type="password"
                                    className="bg-white border-0 focus:outline-none focus:ring-white px-0 w-full"
                                    placeholder="Konfirmasi Password"
                                />
                            </div>
                            {error?.confPassword && (
                                <span className="text-red-500 text-xs italic">
                                    {error?.confPassword}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="pt-5 w-full flex justify-center">
                        <button
                            type="submit"
                            className="bg-rose-700 rounded-full text-white font-bold w-36 py-2"
                        >
                            Daftar
                        </button>
                    </div>
                    <div className="flex justify-center py-3">
                        Sudah memiliki akun?
                        <Link href="/login">
                            <a
                                href=""
                                className="text-rose-700 underline cursor-pointer"
                            >
                                Masuk!
                            </a>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
