import * as IoIcons from "react-icons/io";
import { Link } from "@inertiajs/inertia-react";
import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const [error, setError] = useState();

    const login = (e) => {
        e.preventDefault();
        let data = {
            username: username,
            password: password
        };

        Inertia.post("login", data, {
            onError: (e) => {
                e?.failed && toast.error(e?.failed);
                setError(e);
            },
        });
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
            <Toaster />
            <div className="bg-white xl:w-1/4 w-full relative overflow-hidden">
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
                    onSubmit={login}
                    className="z-40 px-10 py-5 pt-10 space-y-6"
                >
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-rose-700">
                            Selamat Datang
                        </h1>
                        <h2 className="flex justify-center text-gray-400 text-base italic">
                            Silahkan Masuk
                        </h2>
                    </div>
                    <div className="flex flex-col space-y-3">
                        <div className="py-1 border-b border-gray-500">
                            <input
                                type="text"
                                className="bg-white border-0 focus:outline-none focus:ring-white px-0 w-full"
                                placeholder="Username"
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                                value={username}
                            />
                        </div>
                        {error?.username && (
                            <span className="text-red-700 italic text-xs">
                                {error?.username}
                            </span>
                        )}
                        <div className="py-1 border-b border-gray-500">
                            <input
                                type="password"
                                className="bg-white border-0 focus:outline-none focus:ring-white px-0 w-full"
                                placeholder="Password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                value={password}
                            />
                        </div>
                        {error?.password && (
                            <span className="text-red-500 italic text-xs">
                                {error?.password}
                            </span>
                        )}
                        <div className="pt-5 justify-center flex">
                            <button
                                type="submit"
                                className="bg-rose-700 rounded-full w-28 text-white font-semibold py-2"
                            >
                                Masuk
                            </button>
                        </div>
                        <div className="flex justify-center flex-row-reverse py-3">
                            <Link href="/register">
                                <a
                                    href=""
                                    className="text-red-700 underline cursor-pointer"
                                >
                                    Daftar Akun
                                </a>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
            <div className="xl:w-2/5 xl:block hidden justify-center items-center">
                <div className="flex justify-center items-center">
                    <img className="flex justify-center items-center h-auto"
                        src="img/gambar1.svg"
                    />
                </div>
            </div>
        </div>
    );
}
