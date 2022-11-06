import React, { useState } from "react";
import Admin from "../../Layouts/Admin";
import * as MdIcons from "react-icons/md";
import { usePage } from "@inertiajs/inertia-react";
import { useForm } from "react-hook-form";
import { Inertia } from "@inertiajs/inertia";
import toast from "react-hot-toast";

export default function Profil() {
    const [selectedImage, setSelectedImage] = useState();
    const { auth } = usePage().props;

    const [error, setError] = useState();

    const [name, setName] = useState(auth?.user.name);
    const [username, setUsername] = useState(auth?.user.username);
    const [tanggallahir, setTanggallahir] = useState(auth?.user.tanggallahir);
    const [gender, setGender] = useState(auth?.user.gender);
    const [address, setAddress] = useState(auth?.user.address);
    const [email, setEmail] = useState(auth?.user.email);

    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const { handleSubmit } = useForm();

    const ubahprofil = () => {
        let formData = new FormData();
        if (selectedImage) {
            formData.append("gambar", selectedImage);
        }
        name && formData.append("name", name);
        username && formData.append("username", username);
        tanggallahir && formData.append("tanggallahir", tanggallahir);
        gender && formData.append("gender", gender);
        address && formData.append("address", address);
        email && formData.append("email", email);
        formData.append("id", auth?.user.id);
        Inertia.post("/ubahprofil", formData, {
            onSuccess: () => {
                toast.success("Data Berhasil Disimpan!");
            },
            onError: (e) => {
                setError(e);
                toast.error("Data Gagal Disimpan!");
            }
        });
    };

    const cekgambar = (gambar) => {
        if (gambar == "default") {
            return "/img/new.png"
        } else {
            return `/storage/${gambar}`
        };
    }

    return (
        <Admin judul="Profil">
            <div className="p-4 space-y-3 ">
                <div className="space-y-3 ">
                    <div class="w-full bg-white rounded-lg border border-gray-200 shadow-md ">
                        <h2 className="pt-5 font-bold text-rose-700 text-2xl text-center">
                            Profil Saya
                        </h2>
                        <form onSubmit={handleSubmit(ubahprofil)} class="flex flex-col items-center pb-10">
                            <div className="flex flex-row justify-center items-center space-x-5">
                                <div className="flex flex-col my-5">
                                    {selectedImage ? (
                                        <img class="my-2 w-32 h-32 rounded-full shadow-lg" src={URL.createObjectURL(selectedImage)} alt="Fadli" />
                                    ) : (
                                        <img class="my-2 w-32 h-32 rounded-full shadow-lg" src={cekgambar(auth.user.gambar)} alt="Fadli" />
                                    )}
                                    <span class="text-sm text-gray-500 text-center">Ukuran Foto</span>
                                    <span class="text-sm text-gray-500 text-center">Maksimal 3MB</span>
                                </div>
                                <div className=" flex flex-col">
                                    <h5 class="-mt-10 mb-1 text-xl font-medium text-gray-500 italic">Hello !</h5>
                                    <button
                                        className="text-rose-700 border-2 border-rose-900 px-3 py-1 rounded-xl focus:ring focus:outline-none focus:ring-blue-200 hover:bg-rose-700 hover:text-white transition-all duration-200 flex items-center space-x-2"
                                    >
                                        <input
                                            accept="image/*"
                                            id="gambar"
                                            name="gambar"
                                            type="file"
                                            onChange={imageChange}
                                        />
                                    </button>
                                </div>
                            </div>
                            <div class="w-full pb-2 flex flex-col items-center space-y-3">
                                <div className="w-3/6 flex flex-col">
                                    <h1 className="text-rose-700 font-semibold text-base pb-2">Nama Lengkap</h1>
                                    <input
                                        onChange={(e) => {
                                            setName(e.target.value);
                                        }}
                                        value={name}
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="border-2 border-gray-200 focus:border-white focus:outline-none focus:ring focus:ring-gray-400 transition duration-200 rounded-lg"
                                    />
                                    {error?.name && (
                                        <span className="text-xs text-red-500 pt-1">
                                            {error?.name}
                                        </span>
                                    )}
                                </div>
                                <div className="w-3/6 flex flex-col">
                                    <h1 className="text-rose-700 font-semibold text-base pb-2">Nama Pengguna</h1>
                                    <input
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                        }}
                                        value={username}
                                        type="text"
                                        name="username"
                                        id="username"
                                        className="border-2 border-gray-200 focus:border-white focus:outline-none focus:ring focus:ring-gray-400 transition duration-200 rounded-lg"
                                    />
                                    {error?.username && (
                                        <span className="text-xs text-red-500 pt-1">
                                            {error?.username}
                                        </span>
                                    )}
                                </div>
                                <div className="w-3/6 flex flex-col">
                                    <h1 className="text-rose-700 font-semibold text-base pb-2">Tanggal Lahir</h1>
                                    <input
                                        onChange={(e) => {
                                            setTanggallahir(e.target.value);
                                        }}
                                        value={tanggallahir}
                                        type="date"
                                        name="tanggallahir"
                                        id="tanggallahir"
                                        className="border-2 border-gray-200 focus:border-white focus:outline-none focus:ring focus:ring-gray-400 transition duration-200 rounded-lg"
                                    />
                                    {error?.tanggallahir && (
                                        <span className="text-xs text-red-500 pt-1">
                                            {error?.tanggallahir}
                                        </span>
                                    )}
                                </div>
                                <div className="w-3/6 flex flex-col">
                                    <h1 className="text-rose-700 font-semibold text-base pb-2">Jenis Kelamin</h1>
                                    <select
                                        onChange={(e) => {
                                            setGender(e.target.value);
                                        }}
                                        value={gender}
                                        type=""
                                        name="gender"
                                        id="gender"
                                        className="border-2 border-gray-200 focus:border-white focus:outline-none focus:ring focus:ring-gray-400 transition duration-200 rounded-lg"
                                    >
                                        <option value="" disabled>Jenis Kelamin</option>
                                        <option value="Perempuan">Perempuan</option>
                                        <option value="Laki-Laki">Laki-Laki</option>

                                    </select>
                                    {error?.gender && (
                                        <span className="text-xs text-red-500 pt-1">
                                            {error?.gender}
                                        </span>
                                    )}
                                </div>
                                <div className="w-3/6 flex flex-col">
                                    <h1 className="text-rose-700 font-semibold text-base pb-2">Alamat</h1>
                                    <input
                                        onChange={(e) => {
                                            setAddress(e.target.value);
                                        }}
                                        value={address}
                                        type="text"
                                        name="address"
                                        id="address"
                                        className="border-2 border-gray-200 focus:border-white focus:outline-none focus:ring focus:ring-gray-400 transition duration-200 rounded-lg"
                                    />
                                    {error?.address && (
                                        <span className="text-xs text-red-500 pt-1">
                                            {error?.address}
                                        </span>
                                    )}
                                </div>
                                <div className="w-3/6 flex flex-col">
                                    <h1 className="text-rose-700 font-semibold text-base pb-2">Email</h1>
                                    <input
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                        value={email}
                                        type="text"
                                        name="email"
                                        id="email"
                                        className="border-2 border-gray-200 focus:border-white focus:outline-none focus:ring focus:ring-gray-400 transition duration-200 rounded-lg"
                                    />
                                    {error?.email && (
                                        <span className="text-xs text-red-500 pt-1">
                                            {error?.email}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className='w-full flex justify-center'>
                                <button
                                    className="text-white border-2 border-rose-900 bg-rose-700 px-3 py-1 rounded-xl 
                focus:ring focus:outline-none focus:ring-gray-200 hover:bg-white
                hover:text-rose-700 transition-all duration-200 flex items-center space-x-2 mt-5"
                                >
                                    <MdIcons.MdSave size={16} />
                                    <h1>Simpan</h1>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </Admin >
    );
}