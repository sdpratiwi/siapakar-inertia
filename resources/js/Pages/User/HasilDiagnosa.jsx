import { Link, usePage } from '@inertiajs/inertia-react';
import moment from 'moment/moment';
import React from 'react'
import * as MdIcons from "react-icons/md";
import Admin from '../../Layouts/Admin'
import Riwayat from '../Admin/Riwayat';

export default function HasilDiagnosa() {
  const { user, riwayat } = usePage().props;
  console.log(user?.id_client);

  const { auth } = usePage().props;

  const hipotesa = JSON.parse(riwayat?.hipotesa);
  const data_client = JSON.parse(riwayat?.data_client);
  const client = riwayat?.id_client ? user : data_client;
  const hasildiagnosa = JSON.parse(riwayat?.hasildiagnosa);

  const showhasil = (data) => {
    let length = data.length;

    return data?.map((data, key) => (
      <span key={key}>
        {" "}
        {key + 1}{". "}{data}
        {key == length - 1 ? " " : <br />}
      </span>
    ));

  };

  const showwithnumber = (data) => {
    let length = data.length;

    return data?.map((data, key) => (
      <span key={key}>
        {key + 1}.
        {data}
        {key == length - 1 ? " " : <br />}
      </span>
    ));

  };
  const showhipotesa = (data) => {
    let length = data.length;

    return data?.map((gej, key) => (
      <span key={key}>
        {" "}
        {gej?.gejala}
        {key == length - 1 ? " " : <br />}
      </span>
    ));

  };

  const cekgambar = (gambar) => {
    if (gambar == "default") {
      return "/img/new.png"
    } else {
      return `/storage/${user?.gambar}`
    };
  }

  return (
    <Admin judul="Riwayat">
      <div className="p-4 space-y-3">
        <div className="bg-rose-700 p-3 rounded-xl space-y-2">
          <h2 className="flex justify-center font-bold text-white text-2xl">
            Laporan Diagnosa
          </h2>
          <h2 className="flex justify-center font-semibold text-gray-300 text-base italic">
            {moment(riwayat?.waktudiagnosa).format("DD MMMM yy")}
          </h2>
          <div className='flex justify-center font-semibold text-gray-700'>
            <div className='items-center w-4/5 bg-gray-100 p-5 rounded-xl space-y-5'>
              <div className='flex justify-between'>
                <div className="flex flex-row space-x-4 items-center">
                  <img className="rounded-full w-28 h-28"
                    src={cekgambar(riwayat?.id_client ? user.gambar : data_client?.gambar)}
                  />
                  <div className='flex flex-col'>
                    <div className='text-lg'>{client?.name}</div>
                    <div className='text-lg'>{riwayat?.age} Tahun</div>
                    <div className='text-lg'>{client?.gender}</div>
                    <div className='text-lg'>{client?.address}</div>
                  </div>
                </div>
                <div className='flex flex-row space-x-4'>
                  <div className=' justify-center bg-white text-rose-700 border-rose-700 border p-2 flex flex-col items-start rounded-xl'>
                    {showwithnumber(hasildiagnosa?.penyakit)}
                  </div>
                  <div className='bg-rose-700 text-white p-2 flex items-center rounded-xl text-5xl'>
                    {hasildiagnosa?.bobot.toFixed(0)}%
                  </div>
                </div>
              </div>
              <div className='p-3 bg-white rounded-xl'>
                <div className="relative flex items-center">
                  <div className="flex-grow border-t border-gray-400"></div>
                  <span className="flex-shrink mx-4 text-gray-400">Judul</span>
                  <div className="flex-grow border-t border-gray-400"></div>
                </div>
                <div className='bg-white p-2 text-left'>{showhasil(hasildiagnosa?.keterangan)}</div>
                <div className='bg-white p-2 text-left'>{showhasil(hasildiagnosa?.saran)}</div>
              </div>
              <div className='p-3 bg-white rounded-xl'>
                <div className="relative flex items-center">
                  <div className="flex-grow border-t border-gray-400"></div>
                  <span className="flex-shrink mx-4 text-gray-400">Gejala Yang Dipilih</span>
                  <div className="flex-grow border-t border-gray-400"></div>
                </div>
                <div className='p-3 bg-white text-left rounded-xl'>{showhipotesa(hipotesa)}</div>
              </div>
              <div className="flex justify-center items-center space-x-3">
                <button
                  className="text-rose-700 border-2 border-rose-900 px-3 py-1 rounded-xl focus:ring focus:outline-none focus:ring-blue-200 hover:bg-rose-700 hover:text-white transition-all duration-200 flex items-center space-x-2"
                >
                  <div>Cetak</div>
                  <MdIcons.MdPrint size={16} />
                </button>
                <Link href={'detail-' + riwayat.id}
                  className="text-rose-700 border-2 border-rose-900 px-3 py-1 rounded-xl focus:ring focus:outline-none focus:ring-blue-200 hover:bg-rose-700 hover:text-white transition-all duration-200 flex items-center space-x-2"
                >
                  <div>Detail</div>
                  <MdIcons.MdBook size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Admin >
  )
}