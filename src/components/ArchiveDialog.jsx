import {Description, Dialog, DialogPanel, DialogTitle} from "@headlessui/react";
import { useState } from "react";
import { getArchivesByUsername} from "../api/archive.js";
import {useSelector} from "react-redux";
import {useQuery} from "@tanstack/react-query";
import Button from "./Button.jsx";
import ArchiveDialogForm from "./ArchiveDialogForm.jsx";

function ArchiveDialog({watch, setValue}) {
    const [isOpen, setIsOpen] = useState(false)
    const [isAdd, setIsAdd] = useState(false)
    const username  = useSelector(state => (state.auth.username))

    const {data} = useQuery({
        queryKey: ['archiveList', username],
        queryFn: getArchivesByUsername,
    });

    const selected = watch("selected");

    const handleClickTank = (tank) => {
        let selected = tank.name.trim();
        setValue("selected",selected)
        setIsOpen(false)
    }

    return (
        <>
            <button className='p-1 w-32 overflow-hidden text-ellipsis whitespace-nowrap font-semibold ' onClick={(e) => {
                e.preventDefault()
                setIsOpen(true)
            }}>{selected}</button>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="max-w-lg space-y-4 border rounded-lg bg-white p-12">
                        <DialogTitle className="font-bold">기록할 어항 선택</DialogTitle>
                        <Description>어항을 선택해서 추억을 남겨보세요.</Description>
                        <div className='flex flex-col'>
                            <Button block onClick={() => setIsAdd(!isAdd)}>{isAdd? '그만두기' : '새 어항 추가하기'}</Button>
                            {isAdd &&
                                <ArchiveDialogForm setIsAdd={setIsAdd}/>
                            }
                        </div>
                        <ul className='border rounded-lg p-2'>
                            {data && data.map((tank) => {
                                return <li className='hover:bg-gray-50' onClick={() => handleClickTank(tank)}
                                           key={tank.id}>{tank.name}</li>
                            })}
                        </ul>
                        <Button styleType='w-1/2' onClick={() => setIsOpen(false)}>취소</Button>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}

export default ArchiveDialog;