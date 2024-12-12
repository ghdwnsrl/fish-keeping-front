import {useParams} from "react-router-dom";
import Board from "../../components/Board.jsx";

function Post() {
    const {username} = useParams()
    console.log(username)
    return (
        <div className='container'>
            <Board username={username}/>
        </div>
    )
}

export default Post;