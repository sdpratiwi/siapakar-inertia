import React from "react";
import { Head } from "@inertiajs/inertia-react";
import Navbar from "../Components/Navbar";

export default function Guest(props) {
    return (
        <div className="h-screen">
            <Head title={`${props.judul} | Sippen`} />
            <Navbar title={props.judul} users="Arsadi" />
            {props.children}
        </div>
    );
}
