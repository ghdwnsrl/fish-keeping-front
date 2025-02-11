import {useNavigate} from "react-router-dom";

const PostEditButton = ({post}) => {
    const navigate = useNavigate();
    return <span onClick={() => navigate('/edit', {
        state: {
            type: "수정하기",
            initTitle: post.title,
            initContent: post.content,
            prevThumbnailUrl: post.postImageThumbnailUrl,
            id: post.id
        }
    })}>수정</span>
}

export default PostEditButton;