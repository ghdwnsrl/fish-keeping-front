import {Description, Dialog, DialogPanel, DialogTitle} from "@headlessui/react";
import { useState } from "react";
import {addArchivesByUsername, getArchivesByUsername} from "../api/archive.js";
import {useSelector} from "react-redux";
import {useMutation, useQuery} from "@tanstack/react-query";

function ComboBox({selected, setSelected}) {
    const [isOpen, setIsOpen] = useState(false)
    const [isAdd, setIsAdd] = useState(false)
    const { username } = useSelector(state => ({username: state.auth.username}))
    const [newArchive, setNewArchive] = useState("")

    const {data, refetch} = useQuery({
        queryKey: ['archiveList', username],
        queryFn: getArchivesByUsername,
    });

    const {mutate} = useMutation({
        mutationFn: addArchivesByUsername,
        onSuccess: () => {
            refetch()
        }
    })

    const handleClickTank = (tank) => {
        setSelected(tank.name)
        setIsOpen(false)
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.nativeEvent.isComposing) {
            e.preventDefault()
        }
    }

    const handleClickAddBtn = () => {
        mutate({newArchive})
    };

    return (
        <>
            <button className='p-1 w-32 overflow-hidden text-ellipsis whitespace-nowrap font-semibold ' onClick={(e) => {
                e.preventDefault()
                setIsOpen(true)
            }}>{selected}</button>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
                        <DialogTitle className="font-bold">기록할 어항 선택</DialogTitle>
                        <Description>어항을 선택해서 추억을 남겨보세요.</Description>
                        <div className='flex flex-col'>
                            <button onClick={() => setIsAdd(!isAdd)}>새 어항 추가하기</button>
                            {isAdd &&
                                <div>
                                    <input onChange={(e)=> setNewArchive(e.target.value)}
                                           className='border-b outline-none border-gray-300 p-2'
                                           value={newArchive}
                                           onKeyDown={handleKeyDown}
                                    />
                                    <button onClick={handleClickAddBtn}>추가</button>
                                </div>

                            }
                        </div>
                        <ul>
                            <li className='py-1' onClick={() => handleClickTank({name: "선택 안함"})}>선택 안함</li>
                            {data && data.map((tank) => {
                            return <li className='py-1' onClick={() => handleClickTank(tank)}
                                       key={tank.id}>{tank.name}</li>
                        })}
                        </ul>
                        <button onClick={() => setIsOpen(false)}>취소</button>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}

export default ComboBox;