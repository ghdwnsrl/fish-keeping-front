import {Link} from "react-router-dom";
import PostItemFooter from "../PostItemFooter.jsx";

function Card({options, username, page, id, thumbnailUrl,
                  title, createdAt, handleClick, like=0, commentCount = 0, views}) {
    return <div className='border-b'>
        <Link to={`/${id}?page=${page}`}
              className={`${options} flex items-center h-20 my-1 gap-1 rounded-xl hover:bg-gray-50`}
              onClick={handleClick}>
            <img className='rounded-xl h-16 w-16 mx-3' src={thumbnailUrl} alt='thumbnail'/>
            <div className='flex justify-center flex-col'>
                <p className='font-semibold text-lg'>{title}</p>
                <PostItemFooter
                    username={username}
                    createdAt={createdAt}
                    like={like}
                    commentCount={commentCount}
                    views={views}
                />
            </div>
        </Link>
    </div>
}

export default Card;