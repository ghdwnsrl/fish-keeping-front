import {Link} from "react-router-dom";
import {BiCommentDots, BiLike, BiShow} from "react-icons/bi";

function Card({options, page, id, thumbnailUrl,
                  title, createdAt, handleClick, like=0, commentCount = 0, views}) {
    const url = thumbnailUrl !== null ? thumbnailUrl : 'https://via.placeholder.com/150'
    return (
        <Link to={`/${id}?page=${page}`} className={`${options} flex items-center h-20 bg-gray-50 my-4 gap-1 rounded-xl`} onClick={handleClick}>
            <img className='rounded h-16 w-16 mx-3' src={url} alt='thumbnail'/>
            <div className='flex justify-center flex-col  gap-1'>
                <p className='font-semibold text-lg'>{title}</p>
                <div className='flex flex-grow gap-1'>
                    <p className='text-xs text-gray-500'>{createdAt}</p>
                    <BiLike/>
                    <p className='text-xs'>{like}</p>
                    <BiCommentDots/>
                    <p className='text-xs'>{commentCount}</p>
                    <BiShow/>
                    <p className='text-xs'>{views}</p>
                </div>
            </div>
        </Link>
    )
}

export default Card;