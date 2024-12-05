import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import useApiRequest from "../hooks/useApiRequest.js";

function UserHeader({textStyle, height = 'h-8', username, createdAt, profile = 'https://via.placeholder.com/150', deleteHandler, deleteId, title, content}) {
    const loginUsername = useSelector(state => state.auth.username)
    const navigate = useNavigate()
    const {execute: deletePost} = useApiRequest(deleteHandler)
    const isWriter = username === loginUsername
    const onDelete = () => {
        deletePost({id:deleteId}, {
            onSuccess: () => {
                navigate('/')
            }
        })
    }
    return (
        <div className='flex w-full justify-between'>
            <div className='flex gap-1.5'>
                <img src={profile} alt='profile' className={`mt-1 rounded-full ${height}`}/>
                <div className={`flex items-baseline ${textStyle}`}>
                    <Link to={`/users/${username}/posts`}><span className='hover:underline'>{username}</span></Link>
                    <span className='text-xs text-gray-700'>{createdAt}</span>
                </div>
            </div>
            {isWriter &&
                <div className=' flex gap-1 text-sm mt-1 opacity-70'>
                    <span onClick={() => navigate('/edit', {state : { type: "수정하기", initTitle: title, initContent: content, id: deleteId}})}>수정</span>
                    <span onClick={onDelete}>삭제</span>
                </div>
            }
        </div>
    )
}

export default UserHeader;