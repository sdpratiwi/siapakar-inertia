import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import * as AiIcons from "react-icons/ai";
import { useRecoilState } from "recoil";
import { dialogToggle } from "../Store/Modal";

export default function ZenDialog({
    title,
    message,
    isConfirm = false,
    acceptHandler = null,
}) {
    const [showDialog, setShowDialog] = useRecoilState(dialogToggle);

    const closeDialog = () => {
        setShowDialog(false);
    };

    return (
        <Transition appear show={showDialog} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={closeDialog}
            >
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="inline-block w-full max-w-xs p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                            <Dialog.Title
                                as="h1"
                                className={
                                    "text-xl font-semibold text-gray-800 text-center"
                                }
                            >
                                {title}
                            </Dialog.Title>
                            <Dialog.Description
                                as="div"
                                className={"mt-2 space-y-2"}
                            >
                                <p className="text-sm text-gray-600 leading-relaxed text-center">
                                    {message}
                                </p>
                                {isConfirm && (
                                    <div className="flex justify-center space-x-2">
                                        <button
                                            onClick={() => {
                                                acceptHandler(false);
                                            }}
                                            className="bg-gray-100 rounded-full p-2"
                                        >
                                            <AiIcons.AiOutlineClose
                                                size={16}
                                                className="text-gray-400"
                                            />
                                        </button>
                                        <button
                                            onClick={() => {
                                                acceptHandler(true);
                                            }}
                                            className="bg-red-100 rounded-full p-2"
                                        >
                                            <AiIcons.AiOutlineCheck
                                                size={16}
                                                className="text-red-400"
                                            />
                                        </button>
                                    </div>
                                )}
                            </Dialog.Description>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}
