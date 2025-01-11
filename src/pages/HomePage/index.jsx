import {getPopularPosts} from "../../api/posts.js";
import PopularPostCard from "./PopularPostCard.jsx";
import Title from "../../components/Title.jsx";
import Board from "../../components/Board.jsx";
import {useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";


const HomePage = () => {
    const navigate = useNavigate()

    const { data : popularPosts } = useQuery({
        queryKey: ['PopularPosts'],
        queryFn: getPopularPosts
    } )

    const moveToPage = (condition) => {
        navigate(`/search?type=${condition.type}&keyword=${condition.keyword}`)
    }

    return (
        <div className='container'>
            <div className='mb-5'>
                <PopularPostCard data={popularPosts}/>
            </div>
            <Title>전체 게시글</Title>
            <Board moveToPage={moveToPage}/>
        </div>
    )
}

export default HomePage;