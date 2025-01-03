import {timeago} from "../utils/timeagoUtils.js";
import {BiCommentDots, BiLike, BiShow} from "react-icons/bi";
import {Link} from "react-router-dom";


const Card = ({ header, data = [], footer }) => {
    return (
        <div>
            {header && <header>{header}</header>}
            <div className='grid grid-cols-3 mt-3 gap-1 mx-auto'>
                {data.map(({id, title, description, createdAt, thumbnailUrl, views, likeCount, commentCount}) => (
                    <Link key={id} to={`/${id}`}>
                    <div key={id}>
                        <img className='object-cover w-48 h-48 sm:h-64 sm:w-64 rounded-lg' src={thumbnailUrl} alt='thumbnail'/>
                        <dl key={title} className='m-1'>
                            <dt className='font-bold'>{title}</dt>
                            <dd>{description}</dd>
                            <div className='flex flex-grow gap-1'>
                                <p className='text-xs text-gray-500'>{timeago(createdAt)}</p>
                                <BiLike/>
                                <p className='text-xs'>{likeCount}</p>
                                <BiCommentDots/>
                                <p className='text-xs'>{commentCount}</p>
                                <BiShow/>
                                <p className='text-xs'>{views}</p>
                            </div>
                        </dl>
                    </div>
                    </Link>
                ))}
            </div>
            {footer && <footer>{footer}</footer>}
        </div>
    );
};

export default Card;