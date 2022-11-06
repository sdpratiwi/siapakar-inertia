import React, { useState } from "react";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import * as BsIcons from "react-icons/bs";
import { Transition } from "@headlessui/react";
import { Inertia } from "@inertiajs/inertia";
import toast from "react-hot-toast";
import { usePage } from "@inertiajs/inertia-react";

export default function Header(props) {
    const { auth } = usePage().props;
    const [showLogout, setShowLogout] = useState(false);

    const logout = () => {
        Inertia.post("logout");
    };
    const cekgambar = (gambar) => {
        if (gambar == "default") {
            return "/img/new.png"
        } else {
            return `/storage/${gambar}`
        };
    }
    return (
        <div className="w-full bg-white h-16 flex items-center p-3 justify-between relative">
            <h1 className="text-gray-700 text-xl font-bold">{props.title}</h1>
            <div className="flex items-center justify-end flex-grow">
                <div className="flex space-x-2 text-gray-700 mr-2">
                    {auth.user.name}
                </div>
                <div
                    onClick={() => {
                        setShowLogout(!showLogout);
                    }}
                    className="w-10 h-10 overflow-hidden rounded-full"
                >
                    <img
                        src={cekgambar(auth?.user?.gambar)}
                        alt=""
                        className="w-full"
                    />
                </div>
            </div>

            <div className="absolute top-16 right-5">
                <Transition
                    show={showLogout}
                    enter="transition-opacity duration-75"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="bg-white rounded-lg shadow-lg p-2 flex flex-col items-end space-y-2">
                        <h2 className="font-semibold text-sm">{auth.user.name}</h2>
                        <button
                            onClick={() => {
                                logout();
                            }}
                            className="text-sm p-2 rounded-md bg-red-100 text-red-400"
                        >
                            Logout
                        </button>
                    </div>
                </Transition>
            </div>
        </div>
    );
}
