import UserHeader from "../../components/UserHeader.jsx";
import ReactQuill from "react-quill";
import useApiRequest from "../../hooks/useApiRequest.js";
import {deleteByPost} from "../../api/posts.js";
import {useNavigate} from "react-router-dom";
import {BiLike, BiSolidLike} from "react-icons/bi";
import {deleteLike, postLike} from "../../api/likes.js";

const PostDetail = ({id, post, isWriter, handleClickLike}) => {
    const {execute: deletePost} = useApiRequest(deleteByPost);
    const {execute: postLikes} = useApiRequest(postLike);
    const {execute: deleteLikes} = useApiRequest(deleteLike);
    const navigate = useNavigate();

    const onDelete = () => {
        deletePost({id}, {
            onSuccess: () => {
                navigate('/')
            }
        })
    }

    const onLikeClick = () => {
        if (post.liked) {
            deleteLikes({postId: id}, {
                onSuccess: () => {
                    handleClickLike()
                }
            })
        } else {
            postLikes({postId :id}, {
                onSuccess : () => {
                    handleClickLike()
                }
            })
        }
    }

    return <>
        <p className='text-2xl font-bold'>{post.title}</p>
        <div className='flex gap-2 my-1 border-b pb-2'>
            <UserHeader data={post}
                        dataTpye="POST"
                        textStyle='flex-col'
                        height='h-10'
            >
                {isWriter && <div className=' flex gap-1 text-sm mt-1 opacity-70'>
                        <span onClick={() => navigate('/edit', {
                            state: {
                                type: "수정하기",
                                initTitle: post.title,
                                initContent: post.content,
                                prevThumbnailUrl : post.thumbnailUrl,
                                id: id
                            }
                        })}>수정</span>
                    <span onClick={onDelete}>삭제</span>
                </div>
                }
            </UserHeader>
        </div>
        <ReactQuill
            value={post.content}
            readOnly={true}
            theme="snow"
            modules={{toolbar: false}}
            style={{backgroundColor: 'white', minHeight: '10rem'}}
        />
        <div className='text-5xl flex justify-center items-center text-red-500'>
            {post.liked ? <BiSolidLike onClick={onLikeClick}/> : <BiLike onClick={onLikeClick}/> }
        </div>
    </>
}

export default PostDetail;