import {useParams} from "react-router-dom";
import Board from "../../components/Board.jsx";

function Post() {
    const {username} = useParams()
    return (
        <div className='container'>
            <Board username={username}>
                <option value="title">제목</option>
                <option value="all">제목 + 게시글</option>
            </Board>
        </div>
    )
}

export default Post;