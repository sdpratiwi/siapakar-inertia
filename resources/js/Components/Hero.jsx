import React from "react";
import { Link } from "@inertiajs/inertia-react";

export default function Hero(props) {
    return (
        <div className="h-fit pt-[150px] px-20 grid grid-cols-1 sm:grid-cols-2">
            <div className="space-y-2 row-start-2 sm:row-start-1">
                <h1 className="text-3xl sm:text-5xl text-center sm:text-left font-bold text-gray-800">
                    Sistem Pakar Penyakit Pada Pencernaan
                </h1>
                <p className="leading-8 text-center sm:text-left py-5">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Minima magnam facere quos distinctio. Voluptate eos,
                    reprehenderit quam iste cum illo modi eveniet, praesentium
                    error, debitis quidem sunt neque. Aperiam, ipsa?
                </p>
                <Link href="/konsultasi">
                    <button className={`${props.title == "Konsultasi"
                        ? "text-rose-700"
                        : "text-gray-800"
                        } hover:text-rose-700 hover:bg-rose-50 border border-rose-700 transition-all duration-300 bg-rose-700 rounded-lg text-white font-bold text-xl px-5 py-2 `}>

                        Diagnosa Sekarang
                    </button>
                </Link>
            </div>
            <div className="w-full flex items-center row-start-1 sm:col-start-2">
                <img src="/img/gambar0.svg" alt="" />
            </div>
        </div>
    );
}
