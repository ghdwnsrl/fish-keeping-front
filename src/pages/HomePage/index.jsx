import Board from "../../components/Board.jsx";
import Title from "../../components/Title.jsx";

const HomePage = () => {
    return (
        <div className='container'>
            <Title>전체 게시글</Title>
            <Board/>
        </div>
    )
}

export default HomePage;