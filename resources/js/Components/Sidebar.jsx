import { Link, usePage } from "@inertiajs/inertia-react";
import React from "react";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

export default function Sidebar(props) {
    const { auth } = usePage().props;
    const role = auth.user.roles[0].name;

    return (
        <div className="sm:h-screen h-fit p-5 bg-white shadow-xl w-full sm:w-fit md:w-64 fixed sm:relative bottom-0">
            <div className="hidden sm:flex space-x-4 py-5 justify-center items-center">
                <FaIcons.FaLaptopMedical
                    size={32}
                    className="text-rose-700"
                />
                <h1 className="font-bold text-3xl text-rose-700 hidden md:block sm:hidden">
                    SIPPen
                </h1>
            </div>
            <div className="mt-0 sm:mt-10 flex flex-row sm:flex-col space-y-0 sm:space-y-2 items-center sm:items-start justify-evenly sm:justify-start">
                {/* -----------------------Sidebar Admin--------------------- */}
                <Link className={`w-auto sm:w-full ${role == "admin" ? "visible" : "hidden"}`} href="dashboard">
                    <div
                        className={`flex ${props.active == "Dashboard"
                            ? "bg-gray-100 border-rose-900 text-rose-700 font-bold"
                            : "bg-white text-gray-500 border-white hover:bg-gray-100 hover:border-gray-300"
                            }  space-x-3 p-3 rounded-md border-l-8 transition-all duration-300 w-full`}
                    >
                        <MdIcons.MdHomeWork size={24} className="" />
                        <h1 className="hidden sm:hidden md:block">Beranda</h1>
                    </div>
                </Link>
                <Link className={`w-auto sm:w-full ${role == "admin" ? "visible" : "hidden"}`} href="penyakit">
                    <div
                        className={`flex ${props.active == "Penyakit"
                            ? "bg-gray-100 border-rose-900 text-rose-700 font-bold"
                            : "bg-white text-gray-500 border-white hover:bg-gray-100 hover:border-gray-300"
                            }  space-x-3 p-3 rounded-md border-l-8 transition-all duration-300 w-full`}
                    >
                        <FaIcons.FaViruses size={24} className="" />
                        <h1 className="hidden sm:hidden md:block">Penyakit</h1>
                    </div>
                </Link>
                <Link className={`w-auto sm:w-full ${role == "admin" ? "visible" : "hidden"}`} href="gejala">
                    <div
                        className={`flex ${props.active == "Gejala"
                            ? "bg-gray-100 border-rose-900 text-rose-700 font-bold"
                            : "bg-white text-gray-500 border-white hover:bg-gray-100 hover:border-gray-300"
                            }  space-x-3 p-3 rounded-md border-l-8 transition-all duration-300 w-full`}
                    >
                        <FaIcons.FaHeadSideCough size={24} className="" />
                        <h1 className="hidden sm:hidden md:block">Gejala</h1>
                    </div>
                </Link>
                <Link className={`w-auto sm:w-full ${role == "admin" ? "visible" : "hidden"}`} href="aturan">
                    <div
                        className={`flex ${props.active == "Aturan"
                            ? "bg-gray-100 border-rose-900 text-rose-700 font-bold"
                            : "bg-white text-gray-500 border-white hover:bg-gray-100 hover:border-gray-300"
                            }  space-x-3 p-3 rounded-md border-l-8 transition-all duration-300 w-full`}
                    >
                        <FaIcons.FaListUl size={24} className="" />
                        <h1 className="hidden sm:hidden md:block">Aturan</h1>
                    </div>
                </Link>
                <Link className={`w-auto sm:w-full ${role == "admin" ? "visible" : "hidden"}`} href="pengguna">
                    <div
                        className={`flex ${props.active == "Pengguna"
                            ? "bg-gray-100 border-rose-900 text-rose-700 font-bold"
                            : "bg-white text-gray-500 border-white hover:bg-gray-100 hover:border-gray-300"
                            }  space-x-3 p-3 rounded-md border-l-8 transition-all duration-300 w-full`}
                    >
                        <FaIcons.FaUsers size={24} className="" />
                        <h1 className="hidden sm:hidden md:block">Pengguna</h1>
                    </div>
                </Link>
                <Link className={`w-auto sm:w-full ${role == "admin" ? "visible" : "hidden"}`} href="riwayat">
                    <div
                        className={`flex ${props.active == "Riwayat"
                            ? "bg-gray-100 border-rose-900 text-rose-700 font-bold"
                            : "bg-white text-gray-500 border-white hover:bg-gray-100 hover:border-gray-300"
                            }  space-x-3 p-3 rounded-md border-l-8 transition-all duration-300 w-full`}
                    >
                        <FaIcons.FaBookMedical size={24} className="" />
                        <h1 className="hidden sm:hidden md:block">Riwayat</h1>
                    </div>
                </Link>

                {/* -----------------------Sidebar User--------------------- */}
                <Link className={`w-auto sm:w-full ${role == "user" ? "visible" : "hidden"}`} href="dashboarduser">
                    <div
                        className={`flex ${props.active == "Dashboard"
                            ? "bg-gray-100 border-rose-900 text-rose-700 font-bold"
                            : "bg-white text-gray-500 border-white hover:bg-gray-100 hover:border-gray-300"
                            }  space-x-3 p-3 rounded-md border-l-8 transition-all duration-300 w-full`}
                    >
                        <MdIcons.MdHomeWork size={24} className="" />
                        <h1 className="hidden sm:hidden md:block">Beranda</h1>
                    </div>
                </Link>
                <Link className={`w-auto sm:w-full `} href="profil">
                    <div
                        className={`flex ${props.active == "Profil"
                            ? "bg-gray-100 border-rose-900 text-rose-700 font-bold"
                            : "bg-white text-gray-500 border-white hover:bg-gray-100 hover:border-gray-300"
                            }  space-x-3 p-3 rounded-md border-l-8 transition-all duration-300 w-full`}
                    >
                        <AiIcons.AiOutlineUser size={24} className="" />
                        <h1 className="hidden sm:hidden md:block">Profil</h1>
                    </div>
                </Link>
                <Link className={`w-auto sm:w-full ${role == "user" ? "visible" : "hidden"}`} href="riwayat">
                    <div
                        className={`flex ${props.active == "Riwayat"
                            ? "bg-gray-100 border-rose-900 text-rose-700 font-bold"
                            : "bg-white text-gray-500 border-white hover:bg-gray-100 hover:border-gray-300"
                            }  space-x-3 p-3 rounded-md border-l-8 transition-all duration-300 w-full`}
                    >
                        <FaIcons.FaBookMedical size={24} className="" />
                        <h1 className="hidden sm:hidden md:block">Riwayat</h1>
                    </div>
                </Link>
            </div>
        </div>
    );
}