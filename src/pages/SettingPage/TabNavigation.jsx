import {Link} from "react-router-dom";

const TabNavigation = ({username}) => {
    return (
        <div className='flex gap-2 text-xl font-bold'>
            <Link to={`/users/${username}/posts`}><span>모든 게시물</span></Link>
            <Link to={`/users/${username}/tanks`}><span>저장소</span></Link>
        </div>
    )
}

export default TabNavigation;