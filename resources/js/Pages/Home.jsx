import React from "react";
import Hero from "../Components/Hero";
import Guest from "../Layouts/Guest";

export default function Home() {
    return (
        <Guest judul="Home" user="Fadli">
            <Hero />
        </Guest>
    );
}
