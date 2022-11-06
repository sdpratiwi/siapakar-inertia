import { atom } from "recoil";

export const modalToggle = atom({
    default: false,
    key: "modalToggle",
});

export const dialogToggle = atom({
    default: false,
    key: "dialogToggle",
});

export const modalData = atom({
    default: null,
    key: "modalData",
});
