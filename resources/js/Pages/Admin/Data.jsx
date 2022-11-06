import React, { useState } from "react";
import Admin from "../../Layouts/Admin";
import Disease from "./Disease";
import Symptom from "./Symptom";
import Rules from "./Rules";

export default function Data() {
    const [tab, setTab] = useState("penyakit");

    return (
        <Admin judul="Data">
            <div className="p-4 space-y-3">
                <div className="flex space-x-3">
                    <div
                        className={`px-4 py-2 cursor-pointer rounded-xl ${
                            tab == "penyakit"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 text-blue-500 border-blue-500"
                        } font-semibold`}
                        onClick={() => {
                            setTab("penyakit");
                        }}
                    >
                        Penyakit
                    </div>
                    <div
                        className={`px-4 py-2 cursor-pointer rounded-xl ${
                            tab == "gejala"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 text-blue-500 border-blue-500"
                        } font-semibold`}
                        onClick={() => {
                            setTab("gejala");
                        }}
                    >
                        Gejala
                    </div>
                    <div
                        className={`px-4 py-2 cursor-pointer rounded-xl ${
                            tab == "aturan"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 text-blue-500 border-blue-500"
                        } font-semibold`}
                        onClick={() => {
                            setTab("aturan");
                        }}
                    >
                        Aturan
                    </div>
          </div>
          {tab == "penyakit" && <Disease />}
          {tab == "gejala" && <Symptom />}
          {tab == "aturan" && <Rules />}
            </div>
        </Admin>
    );
}
