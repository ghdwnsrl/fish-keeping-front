import {useDispatch, useSelector} from "react-redux";
import {closeModal} from "../feature/dialogSlice.js";
import {Description, Dialog, DialogPanel, DialogTitle} from "@headlessui/react";
import * as AuthSlice from "../feature/authSlice.js";
import {useNavigate} from "react-router-dom";
import Button from "./Button.jsx";
import {useCallback, useEffect, useState} from "react";
import {CiClock1} from "react-icons/ci";

const GlobalDialog = () => {
    const { isOpen, title, content, actionName, redirectPath } = useSelector((state) => state.dialog);
    const [countdown, setCountdown] = useState(3);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const redirectPage = useCallback(() => {
        dispatch(AuthSlice.logout())
        navigate(redirectPath)
        dispatch(closeModal());
    },[redirectPath])

    useEffect(() => {
        if (!isOpen) return;
        setCountdown(3);
        const interval = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    redirectPage();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <Dialog open={true} onClose={redirectPage} className="relative z-50">
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
                    <DialogTitle className="font-bold text-center">{title}</DialogTitle>
                    <Description>{content}</Description>
                    <div className='flex gap-1'>
                        <div className='flex gap-0.5 items-center'>
                            <CiClock1/>
                            <p className='font-semibold'>{actionName}까지 {countdown}초 남았습니다.</p>
                        </div>
                        <Button styleType='w-12' onClick={redirectPage}>확인</Button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}

export default GlobalDialog;