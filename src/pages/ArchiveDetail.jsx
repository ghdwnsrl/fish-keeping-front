import {useParams} from "react-router-dom";
import Board from "../components/Board.jsx";
import {useSelector} from "react-redux";
import {useMutation} from "@tanstack/react-query";
import {deleteArchive} from "../api/archive.js";


function ArchiveDetail() {
    const { username, archiveName } = useParams()
    const {username: storedUsername} = useSelector(state => state.auth)

    const { mutate } = useMutation({mutationFn: deleteArchive})

    return (
        <div className='container'>
            <p className='font-bold text-2xl'>{archiveName}</p>
            { (username === storedUsername) ? <div className='flex justify-end space-x-2'>
                <span>수정</span>
                <span onClick={() => {mutate({name:archiveName})}}>삭제</span>
            </div> : <></>
            }
            <Board username={username}
                   archiveName={archiveName}
            >
                <option value="title">제목</option>
                <option value="all">제목 + 게시글</option>
            </Board>
        </div>
    )
}

export default ArchiveDetail;