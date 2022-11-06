import React from "react";
import { render } from "react-dom";
import { createInertiaApp } from "@inertiajs/inertia-react";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";

createInertiaApp({
    resolve: (name) => require(`./Pages/${name}`),
    setup({ el, App, props }) {
        render(
            <RecoilRoot>
                <Toaster />
                <App {...props} />
            </RecoilRoot>,
            el
        );
    },
});
