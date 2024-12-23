import { Link } from "react-router-dom";

function UserHeader({textStyle, height = 'h-8', data, profile = 'https://via.placeholder.com/150', children}) {

    const { username, createdAt} = data

    return <div className='flex w-full justify-between'>
        <div className='flex gap-1.5'>
            <img src={profile} alt='profile' className={`mt-1 rounded-full ${height}`}/>
            <div className={`flex items-baseline ${textStyle}`}>
                <Link to={`/users/${username}/posts`}><span className='hover:underline'>{username}</span></Link>
                <span className='text-xs text-gray-700'>{createdAt}</span>
            </div>
        </div>
        { children }
    </div>
}

export default UserHeader;