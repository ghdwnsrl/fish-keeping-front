import {timeago} from "../utils/timeagoUtils.js";
import {BiCommentDots, BiLike, BiShow} from "react-icons/bi";

const PostItemFooter = ({...props}) => {
    const {username, like, createdAt, commentCount, views} = props;
    return <div className='flex flex-wrap gap-1'>
        <div className='flex items-baseline space-x-1'>
            <p className=' text-gray-500'>{username}</p>
            <p className='text-xs text-gray-500'>{timeago(createdAt)}</p>
        </div>
        <div className='flex items-center mt-0.5 space-x-0.5 w-full sm:w-auto'>
            <BiLike/>
            <p className='text-xs'>{like}</p>
            <BiCommentDots/>
            <p className='text-xs'>{commentCount}</p>
            <BiShow/>
            <p className='text-xs'>{views}</p>
        </div>
    </div>
}

export default PostItemFooter;