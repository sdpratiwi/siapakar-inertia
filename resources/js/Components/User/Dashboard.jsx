import React from "react";
import * as FaIcons from "react-icons/fa";

export default function Dashboard() {
    return (
        <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-5 shadow-xl shadow-blue-600/10">
                <h1 className="text-5xl text-blue-600">{jumlahdatapengguna}</h1>
                <div className="flex items-center space-x-2">
                    <FaIcons.FaUserMd size={16} className="text-blue-600" />
                    <h4 className="text-blue-600 text-lg">Jumlah Pengguna</h4>
                </div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-xl shadow-amber-600/10">
                <h1 className="text-5xl text-amber-300">{jumlahdatapenyakit}</h1>
                <div className="flex items-center space-x-2">
                    <FaIcons.FaUserInjured
                        size={16}
                        className="text-amber-300"
                    />
                    <h4 className="text-amber-300 text-lg">Jumlah Penyakit</h4>
                </div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-xl shadow-green-600/10">
                <h1 className="text-5xl text-green-300">{jumlahdatagejala}</h1>
                <div className="flex items-center space-x-2">
                    <FaIcons.FaBook size={16} className="text-green-300" />
                    <h4 className="text-green-300 text-lg">Jumlah Gejala</h4>
                </div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-xl shadow-rose-600/10">
                <h1 className="text-5xl text-rose-400">{jumlahdataaturan}</h1>
                <div className="flex items-center space-x-2">
                    <FaIcons.FaVirus size={16} className="text-rose-400" />
                    <h4 className="text-rose-400 text-lg">Jumlah Aturan</h4>
                </div>
            </div>
        </div>
    );
}