import {Link, Outlet, useParams} from "react-router-dom";

function UserPage() {
    const {username} = useParams();
    return (
        <>
            <div className='flex justify-center w-full flex-col'>
                <p className='font-semibold text-4xl mb-5'>{username}</p>
                <div className='flex gap-2 text-xl font-bold'>
                    <Link to={`/users/${username}/posts`}><span>모든 게시물</span></Link>
                    <Link to={`/users/${username}/tanks`}><span>저장소</span></Link>
                </div>
                <div className='w-full flex justify-center'>
                    <Outlet/>
                </div>
            </div>
        </>
    )
}

export default UserPage;