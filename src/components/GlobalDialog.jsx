import {useDispatch, useSelector} from "react-redux";
import {closeModal} from "../feature/dialogSlice.js";
import {Description, Dialog, DialogPanel, DialogTitle} from "@headlessui/react";
import * as AuthSlice from "../feature/authSlice.js";
import {useNavigate} from "react-router-dom";
import Button from "./Button.jsx";

const GlobalDialog = () => {
    const { isOpen, title, content, redirectPath } = useSelector((state) => state.dialog);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    if (!isOpen) return null;

    console.log(content)

    const handleOnConfirm = () => {
        dispatch(AuthSlice.logout())
        navigate(redirectPath)
        dispatch(closeModal());
    }

    return (
        <Dialog open={isOpen} onClose={() => dispatch(closeModal())} className="relative z-50">
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
                    <DialogTitle className="font-bold text-center">{title}</DialogTitle>
                    <Description>{content}</Description>
                    <div className='flex justify-between'>
                        <Button styleType='w-14' onClick={() => dispatch(closeModal())}>취소</Button>
                        <Button styleType='w-14' onClick={handleOnConfirm}>확인</Button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}

export default GlobalDialog;