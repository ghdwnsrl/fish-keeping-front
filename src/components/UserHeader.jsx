import { Link } from "react-router-dom";

function UserHeader({textStyle, height = 'h-8', data, children}) {

    const { username, createdAt, profileImageUrl} = data
    return <div className='flex w-full justify-between'>
        <div className='flex gap-1.5'>
            <img src={profileImageUrl ? profileImageUrl : 'https://via.placeholder.com/150' } alt='profile' className={`mt-1 rounded-full ${height}`}/>
            <div className={`flex items-baseline ${textStyle}`}>
                <Link to={`/users/${username}/posts`}><span className='hover:underline'>{username}</span></Link>
                <span className='text-xs text-gray-700'>{createdAt}</span>
            </div>
        </div>
        { children }
    </div>
}

export default UserHeader;