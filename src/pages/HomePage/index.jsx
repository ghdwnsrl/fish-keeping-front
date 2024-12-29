import Board from "../../components/Board.jsx";
import Title from "../../components/Title.jsx";
import Card from "../../components/Card.jsx";
import PopularPostCard from "./PopularPostCard.jsx";


const HomePage = () => {
    return (
        <div className='container'>
            <div>
                <PopularPostCard/>
            </div>
            <Title>전체 게시글</Title>
            <Board/>
        </div>
    )
}

export default HomePage;