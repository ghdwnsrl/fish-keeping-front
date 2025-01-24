import {Link} from "react-router-dom";
import PostItemFooter from "../PostItemFooter.jsx";

function Card({options, username, page, id, thumbnailUrl,
                  title, createdAt, handleClick, like=0, commentCount = 0, views}) {
    const url = thumbnailUrl !== null ? thumbnailUrl : 'https://placehold.co/200x240?text=NO%20IMAGE'
    return <div className='border-b'>
        <Link to={`/${id}?page=${page}`}
              className={`${options} flex items-center h-20 my-1 gap-1 rounded-xl hover:bg-gray-50`}
              onClick={handleClick}>
            <img className='rounded h-16 w-16 mx-3' src={url} alt='thumbnail'/>
            <div className='flex justify-center flex-col  gap-1'>
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