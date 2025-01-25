import {useParams} from "react-router-dom";
import Board from "../../components/Board.jsx";
import {Suspense} from "react";
import PostSkeleton from "../HomePage/skeleton/PostSkeleton.jsx";

function Post() {
    const {username} = useParams()
    return (
        <div className='container'>
            <Suspense fallback={<PostSkeleton/>}>
                <Board username={username}>
                    <option value="title">제목</option>
                    <option value="all">제목 + 게시글</option>
                </Board>
            </Suspense>
        </div>
    )
}

export default Post;