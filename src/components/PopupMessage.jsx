import {Dialog} from "@headlessui/react";

const PopupMessage = ({message, isOpen, openModal, closeModal}) => {
    return (
        <>
            <Dialog as="div" className="relative z-10" open={isOpen} onClose={closeModal}>
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel
                        className="w-full max-w-md p-6 overflow-hidden text-center align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                        <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900"
                        >
                            Popup Title
                        </Dialog.Title>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                {message}
                            </p>
                        </div>
                        <div className="mt-4">
                            <button
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    )
}

export default PopupMessage;