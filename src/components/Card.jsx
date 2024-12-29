import {timeago} from "../utils/timeagoUtils.js";
import {BiCommentDots, BiLike, BiShow} from "react-icons/bi";


const Card = ({ header, data = [], footer }) => {
    console.log(data)
    return (
        <div>
            {header && <header>{header}</header>}
            <div className='grid grid-cols-3 mt-1'>
                {data.map(({id, title, description, createdAt, imageUrl, views, like, commentCount}) => (
                    <div key={id} className='p-2'>
                        <img className='rounded-2xl md:w-full' src={imageUrl} alt='thumbnail'/>
                        <dl key={title} className='m-1'>
                            <dt className='font-bold'>{title}</dt>
                            <dd>{description}</dd>
                            <div className='flex flex-grow gap-1'>
                                <p className='text-xs text-gray-500'>{timeago(createdAt)}</p>
                                <BiLike/>
                                <p className='text-xs'>{like}</p>
                                <BiCommentDots/>
                                <p className='text-xs'>{commentCount}</p>
                                <BiShow/>
                                <p className='text-xs'>{views}</p>
                            </div>
                        </dl>
                    </div>
                ))}
            </div>
            {footer && <footer>{footer}</footer>}
        </div>
    );
};

export default Card;