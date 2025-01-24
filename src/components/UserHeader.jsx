import { Link } from "react-router-dom";
import {timeago} from "../utils/timeagoUtils.js";

function UserHeader({textStyle, height, data, children}) {

    const { username, createdAt, profileImageUrl} = data
    return <div className='flex w-full justify-between'>
        <div className='flex gap-1.5'>
            <img src={profileImageUrl ? profileImageUrl : 'https://placehold.co/150x150?text=NO%20IMAGE' } alt='profile' className={`w-10 h-10 mt-1 rounded-full ${height}`}/>
            <div className={`flex items-baseline ${textStyle}`}>
                <Link to={`/users/${username}/posts`}><span className='hover:underline'>{username}</span></Link>
                <span className='text-xs text-gray-700'>{timeago(createdAt)}</span>
            </div>
        </div>
        { children }
    </div>
}

export default UserHeader;