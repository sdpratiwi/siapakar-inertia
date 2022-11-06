import { usePage } from '@inertiajs/inertia-react';
import { useForm } from 'react-hook-form';
import * as MdIcons from "react-icons/md";
import React, { useState } from 'react'
import Admin from '../../Layouts/Admin'
import { Inertia } from '@inertiajs/inertia';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const { auth, gejala } = usePage().props;
  const [cek, setCek] = useState(false);
  const [error, setError] = useState();

  const { register, handleSubmit } = useForm();

  const diagnosa = (data) => {
    console.log(data);
    Inertia.post("/diagnosas", data, {
      onSuccess: () => {
        toast.success("Diagnosa Berhasil!");
      },
      onError: (e) => {
        setError(e);
        e.type && toast[e.type](e.message);
      },
    });
  }

  return (
    <Admin judul="Dashboard">
      <div className="p-4 space-y-3">
        <div className={`space-y-3 ${cek == false ? "visible" : "hidden"}`}>
          <h3 className="font-semibold text-rose-700 italic text-xl">
            Hello, {auth.user.name}
          </h3>
          <h2 className="font-semibold text-rose-700 text-xl">
            Selamat Datang di SIPPen
          </h2>
          <div className="w-full flex items-center justify-center">
            <img className="flex justify-center items-center w-2/5"
              src="img/welcomes.svg"
            />
          </div>
          <h2 className="font-semibold text-gray-700 text-xl text-center">
            Punya Masalah Mengenai Gangguan Pencernaan?
          </h2>
          <div className='w-full flex justify-center'>
            <button
              onClick={(e) => {
                setCek(true);
              }}
              className="text-rose-700 border-2 border-rose-900 px-3 py-1 rounded-xl focus:ring focus:outline-none focus:ring-blue-200 hover:bg-rose-700 hover:text-white transition-all duration-200 flex items-center space-x-2"
            >
              <MdIcons.MdZoomIn size={16} />
              <h1>Cek Sekarang!</h1>
            </button>
          </div>
        </div>
        <form action="" onSubmit={handleSubmit(diagnosa)} className={`overflow-y-visible ${cek == true ? "visible" : "hidden"}`}>
          <div className="w-fit">
            <div className="font-semibold text-2xl text-rose-700 mb-4">
              Pilih Gejala Yang Sedang Dialami
            </div>
            {gejala?.map((gej, key) => {
              return (
                <div key={key} name="gejala" className="flex items-center mb-4  ">
                  <input id={"gejala-" + gej.id} type="checkbox" {...register("gejala")} value={gej.id} className="w-4 text-rose-700 bg-gray-100 rounded border-gray-300 outline-none " />
                  <label htmlFor={"gejala-" + gej.id} className="ml-2 text-sm font-medium leading-none text-gray-900"> {gej.nama_gejala}</label>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center items-center">
            <button
              className="text-rose-700 border-2 border-rose-900 px-3 py-1 rounded-xl focus:ring focus:outline-none focus:ring-blue-200 hover:bg-rose-700 hover:text-white transition-all duration-200 flex items-center space-x-2"
            >
              <h1>Diagnosa</h1>
              <MdIcons.MdCheck size={16} />
            </button>
          </div>
        </form>
      </div>
    </Admin >
  )
}
