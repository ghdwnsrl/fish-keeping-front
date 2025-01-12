import {Link, Outlet, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getUerInfo} from "../../api/user.js";

function UserPage() {
    const {username} = useParams();
    const {data} = useQuery({
        queryKey : ["userInfo", username],
        queryFn: getUerInfo
    })
    return (
        <>
            <div className='flex-row justify-items-center'>
                <img alt='profileUrl' className='w-52 h-52 bg-gray-100 rounded-full p-5' src={data?.profileImageUrl}/>
                <h1 className='text-6xl'>{data?.username}</h1>
                <p>{data?.introText}</p>
            </div>
            <div className='flex justify-center w-full flex-col'>
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