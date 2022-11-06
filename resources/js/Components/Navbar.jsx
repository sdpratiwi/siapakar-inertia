import { Link } from "@inertiajs/inertia-react";
import React from "react";

export default function Navbar(props) {
    return (
        <div className="bg-white w-full h-fit flex flex-col sm:flex-row justify-between items-center py-5 px-20 fixed top-0 z-20">
            <Link href="/">
                <h1 className="text-2xl text-rose-700 font-bold">SIPPen</h1>
            </Link>
            <div className="space-x-10 py-2">
                <Link href="/konsultasi">
                    <button
                        className={`${props.title == "Konsultasi"
                            ? "text-rose-700"
                            : "text-gray-800"
                            } hover:text-rose-700 transition-all duration-300`}
                    >
                        Konsultasi
                    </button>
                </Link>
                <Link href="/">
                    <button
                        className={`${props.title == "Home"
                            ? "text-rose-700"
                            : "text-gray-800"
                            } hover:text-rose-700 transition-all duration-300`}
                    >
                        Home
                    </button>
                </Link>
                {/* <Link href="/about">
                    <button
                        className={`${props.title == "About"
                            ? "text-rose-700"
                            : "text-gray-800"
                            } hover:text-rose-700 transition-all duration-300`}
                    >
                        About
                    </button>
                </Link> */}
                <Link href="/login">
                    <button
                        className={`${props.title == "Login"
                            ? "text-rose-700"
                            : "text-rose-50"
                            } hover:text-rose-700 hover:bg-rose-50 border border-rose-700 transition-all duration-300 bg-rose-700 px-5 py-2 rounded-lg`}
                    >
                        Login
                    </button>
                </Link>
            </div>
        </div>
    );
}
