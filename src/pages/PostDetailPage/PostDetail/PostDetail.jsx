import ReactQuill from "react-quill";
import {getByPostId} from "../../../api/posts.js";
import {useSuspenseQuery} from "@tanstack/react-query";
import LikeButton from "./LikeButton.jsx";
import PostDetailHeader from "./PostDetailHeader.jsx";

const PostDetail = ({id}) => {
    const { data : post } = useSuspenseQuery({
        queryKey: ["Post", id],
        queryFn: getByPostId
    })

    return <>
        <p className='text-2xl font-bold'>{post.title}</p>
        <PostDetailHeader post={post}/>
        <ReactQuill
            value={post.content}
            readOnly={true}
            theme="snow"
            modules={{toolbar: false}}
            style={{backgroundColor: 'white', minHeight: '10rem'}}
        />
        <div className='text-5xl flex justify-center items-center text-red-500'>
            <LikeButton liked={post.liked} id={id}/>
        </div>
    </>
}

export default PostDetail;