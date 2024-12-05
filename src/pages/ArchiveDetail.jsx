import {useParams} from "react-router-dom";
import Board from "../components/Board.jsx";


function ArchiveDetail() {
    const { username, archiveName } = useParams()
    console.log(archiveName)
    return (
        <div>
            <p className='font-bold text-2xl'>{archiveName}</p>
            <Board username={username}
                   archiveName={archiveName}
            />
        </div>
    )
}

export default ArchiveDetail;