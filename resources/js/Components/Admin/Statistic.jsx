import { usePage } from "@inertiajs/inertia-react";
import React from "react";
import * as FaIcons from "react-icons/fa";

export default function Statistic() {
    const { jumlahdatapengguna, jumlahdatapenyakit, jumlahdatagejala, jumlahdataaturan } = usePage().props;
    return (
        <div className=''>
            <h1 className='font-semibold ml-7 text-lg mt-3 mb-2'>Statistik</h1>
            <div className="ml-7 mr-7 grid grid-cols-1 sm:grid-cols-4 gap-7">
                <div className="bg-white rounded-xl p-5 shadow-xl shadow-fuchsia-700/10">
                    <div className="flex">
                        <FaIcons.FaUsers size={40} className="text-fuchsia-700" />
                    </div>
                    <div className='mt-3'>
                        <h1 className="text-gray-500 text-sm">Jumlah Pengguna</h1>
                        <h1 className="text-2xl font-bold text-fuchsia-700  ">{jumlahdatapengguna}</h1>
                    </div>

                </div>
                <div className="bg-white rounded-xl p-5 shadow-xl shadow-sky-500/10">

                    <div className="flex items-center space-x-2">
                        <FaIcons.FaVirus size={40} className="text-sky-500" />
                    </div>
                    <div className='mt-3'>
                        <h1 className="text-gray-500 text-sm">Jumlah Penyakit</h1>
                        <h1 className="text-2xl font-bold text-sky-500">{jumlahdatapenyakit}</h1>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-xl shadow-pink-400/10">

                    <div className="flex items-center space-x-2">
                        <FaIcons.FaHeadSideCough size={40} className="text-pink-400" />
                    </div>
                    <div className='mt-3'>
                        <h1 className="text-gray-500 text-sm">Jumlah Gejala</h1>
                        <h1 className="text-2xl font-bold text-pink-400">{jumlahdatagejala}</h1>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-xl shadow-amber-400/10">
                    <div className="flex items-center space-x-2">
                        <FaIcons.FaListUl size={40} className="text-amber-400" />
                    </div>
                    <div className='mt-3'>
                        <h4 className="text-gray-500 text-sm">Jumlah Aturan</h4>
                        <h1 className="text-2xl font-bold text-amber-400">{jumlahdataaturan}</h1>

                    </div>

                </div>

            </div>
        </div>
    );
}