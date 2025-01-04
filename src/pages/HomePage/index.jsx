import useApiRequest from "../../hooks/useApiRequest.js";
import {getPopularPosts} from "../../api/posts.js";
import {useEffect, useState} from "react";
import PopularPostCard from "./PopularPostCard.jsx";
import Title from "../../components/Title.jsx";
import Board from "../../components/Board.jsx";
import {useNavigate} from "react-router-dom";


const HomePage = () => {

    const {execute : fetchPopularPosts} = useApiRequest(getPopularPosts);
    const [popularPosts, setPopularPosts] = useState();
    const navigate = useNavigate()

    useEffect(() => {
        fetchPopularPosts({}, {
            onSuccess : (response) => {
                setPopularPosts(response.data)
            }
        })
    }, []);

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