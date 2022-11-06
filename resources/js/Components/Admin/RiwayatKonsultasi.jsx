import { Link, usePage } from "@inertiajs/inertia-react";
import moment from "moment";
import React from "react";
import * as ImIcons from "react-icons/im";

export default function RiwayatKonsultasi() {
    const { riwayatkonsultasi } = usePage().props;

    console.log(riwayatkonsultasi);
    return (
        <div>
            <h1 className='font-semibold ml-7 text-lg mt-3 mb-2'>Riwayat Konsultasi</h1>
            {riwayatkonsultasi?.length == 0
                ? <div className="mx-7 bg-white rounded-xl p-5 shadow-xl shadow-sky-500/10 flex justify-center">
                    <div className="h-40 w-40 rounded-full bg-gray-50 p-4 flex flex-col items-center justify-center">
                        <div className="flex items-center space-x-2">
                            <ImIcons.ImFilesEmpty size={40} className="text-gray-300" />
                        </div>
                        <div className='mt-3 text-center'>
                            <h1 className="text-gray-500 text-xs">Data Masih Kosong</h1>
                        </div>
                    </div>
                </div>
                : <div className="mx-7 grid gap-7 grid-cols-4">
                    {riwayatkonsultasi?.map((riwayat, key) => (
                        <Link href={"hasil-" + riwayat?.id} >
                            <div key={key} className="bg-white  rounded-xl p-5 shadow-xl shadow-fuchsia-700/10">
                                <div className="flex justify-center">
                                    <img className="w-20 h-20 rounded-full" src={riwayatkonsultasi[key]?.user == null || riwayatkonsultasi[key]?.user?.gambar == "default" ? "img/new.png" : `/storage/${riwayatkonsultasi[key]?.user?.gambar}`}></img>
                                </div>
                                <div className='mt-3 flex flex-col items-center justify-center'>
                                    {riwayat?.user?.name == null
                                        ? <h1 className="text-gray-500 text-sm">Guest</h1>
                                        : <h1 className="text-gray-500 text-sm">{riwayat?.user?.name}</h1>
                                    }
                                    <h1 className="text-sm font-bold text-rose-700 italic ">{moment(riwayat.waktudiagnosa).format("DD MMMM YYYY")}</h1>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            }

        </div >
    );
}