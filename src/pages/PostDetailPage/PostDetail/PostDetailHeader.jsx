import UserHeader from "../../../components/UserHeader.jsx";
import PostEditButton from "./PostEditButton.jsx";
import PostDeleteButton from "./PostDeleteButton.jsx";
import {useSelector} from "react-redux";


const PostDetailHeader = ({post}) => {
    const loginUsername = useSelector(state => state.auth.username)
    const isAdmin = useSelector(state => state.auth.isAdmin)

    return <div className='flex gap-2 my-1 border-b pb-2'>
        <UserHeader data={post}
                    dataTpye="POST"
                    textStyle='flex-col'
                    height='h-10'
        >
            {
                (post.username === loginUsername || isAdmin) &&
                <div className=' flex gap-1 text-sm mt-1 opacity-70'>
                    <PostEditButton post={post}/>
                    <PostDeleteButton id={post.id}/>
                </div>
            }
        </UserHeader>
    </div>
}

export default PostDetailHeader;