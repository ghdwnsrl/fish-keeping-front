import PopularPostCard from "./PopularPostCard.jsx";
import Title from "../../components/Title.jsx";
import Board from "../../components/Board.jsx";
import {Suspense} from "react";
import PostSkeleton from "./skeleton/PostSkeleton.jsx";
import PopularPostSkeleton from "./skeleton/PopularPostSkeleton.jsx";

const HomePage = () => {
    return (
        <div className='container'>
            <div className='mb-5'>
                <Suspense fallback={<PopularPostSkeleton/>}>
                    <PopularPostCard/>
                </Suspense>
            </div>
            <Title>전체 게시글</Title>
            <Suspense fallback={<PostSkeleton/>} >
                <Board>
                    <option value="title">제목</option>
                    <option value="all">제목 + 게시글</option>
                    <option value="username">작성자</option>
                </Board>
            </Suspense>
        </div>
    )
}

export default HomePage;