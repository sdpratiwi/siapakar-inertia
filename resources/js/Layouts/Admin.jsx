import React from "react";
import { Head } from "@inertiajs/inertia-react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";

export default function Admin(props) {
    return (
        <div className="h-screen w-full sm:flex sm:flex-row flex-col-reverse bg-gray-100">
            <Head title={`${props.judul} | Sippen`} />
            <Sidebar active={props.judul} />
            <div className="flex-1 overflow-y-auto">
                <Header title={props.judul} />
                {props.children}
            </div>
        </div>
    );
}
