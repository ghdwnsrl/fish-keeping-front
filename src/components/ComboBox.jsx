import {Description, Dialog, DialogPanel, DialogTitle} from "@headlessui/react";
import {useState} from "react";

function ComboBox({selected, setSelected}) {
    const [isOpen, setIsOpen] = useState(false)
    const [isAdd, setIsAdd] = useState(false)

    const [newTank, setNewTank] = useState('')
    {/* 전체 카테고리 통신은 콤보박스 내에서 함*/}
    const [tanks, setTanks] = useState([
        { id: 0, title: '선택 안함'},
        { id: 1, title: '첫번째 어항'},
        { id: 2, title: '두번째 어항'},
        { id: 3, title: '세번째 어항'},
        { id: 4, title: '네번째 어항'},
    ])
    const handleClickTank = (tank) => {
        console.log(tank)
        setSelected(tank.title)
        setIsOpen(false)
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.nativeEvent.isComposing) {
            e.preventDefault()
            tanks.push({id: tanks.length , title : newTank})
            setNewTank('')
        }
    }

    const handleClickAddBtn = () => {
        tanks.push({id: tanks.length , title : newTank})
        setNewTank('')
    };
    return (
        <>
            <button className='border-l p-1 font-semibold' onClick={(e) => {
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
                                    <input onChange={(e)=> setNewTank(e.target.value)}
                                           className='border-b outline-none border-gray-300 p-2'
                                           value={newTank}
                                           onKeyDown={handleKeyDown}
                                    />
                                    <button onClick={handleClickAddBtn}>추가</button>
                                </div>

                            }
                        </div>
                        <ul>{tanks.map((tank) => {
                            return <li className='py-1' onClick={() => handleClickTank(tank)}
                                       key={tank.id}>{tank.title}</li>
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