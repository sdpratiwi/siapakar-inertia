import React from "react";
import RiwayatKonsultasi from "../../Components/Admin/RiwayatKonsultasi";
import Statistic from "../../Components/Admin/Statistic";
import Admin from "../../Layouts/Admin";

export default function Dashboard() {
    return (
        <Admin judul="Dashboard">
            <div className="space-y-5">
                <Statistic />
                <RiwayatKonsultasi />
            </div>
        </Admin>
    );
}
