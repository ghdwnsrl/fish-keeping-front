import {Link} from "react-router-dom";
import PostItemFooter from "./PostItemFooter.jsx";


const Card = ({ header, data = [], footer }) => {
    return (
        <>
            {header && <header>{header}</header>}
            <div className='grid grid-cols-3 mt-3 gap-1'>
                {data?.map(({id, username, title, description, createdAt, thumbnailUrl, views, likeCount, commentCount}) => (
                    <Link key={id} to={`/${id}`}>
                    <div key={id} className='hover:bg-gray-50'>
                        <img className='object-cover w-48 h-48 mx-auto sm:h-64 sm:w-64 rounded-lg' src={thumbnailUrl} alt='thumbnail'/>
                        <dl key={title} className='flex-row m-1 mx-auto'>
                            <dt className='font-bold'>{title}</dt>
                            <dd>{description}</dd>
                            <PostItemFooter
                                username={username}
                                createdAt={createdAt}
                                like={likeCount}
                                commentCount={commentCount}
                                views={views}
                            />
                        </dl>
                    </div>
                    </Link>
                ))}
            </div>
            {footer && <footer>{footer}</footer>}
        </>
    );
};

export default Card;