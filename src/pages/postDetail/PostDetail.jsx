import {Link, useParams, useSearchParams} from "react-router-dom";
import ReactQuill from "react-quill";
import CommentList from "../../components/CommentList.jsx";
import UserHeader from "../../components/UserHeader.jsx";
import { useEffect, useState} from "react";
import 'react-quill/dist/quill.snow.css';
import './Quill.css'
import TextArea from "../../components/TextArea.jsx";
import {FaAngleLeft} from "react-icons/fa";
import Board from "../../components/Board.jsx";
import useApiRequest from "../../hooks/useApiRequest.js";
import {deletePost, getByPostId} from "../../api/posts.js";
import {useSelector} from "react-redux";

function PostDetail() {

    const {id} = useParams();
    const isLogin = useSelector(state => state.auth.isAuthenticated)
    const [searchParams] = useSearchParams()
    const page = searchParams.get('page')
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const {execute: getPost} = useApiRequest(getByPostId);

    useEffect(() => {
        getPost({id}, {
            onSuccess: (response) => {
                setPost(response.data)
                setComments(response.data.comments)
            }
        })
    }, [id]);

    return (
        <div className='container p-1'>
            <div className="flex items-center mb-1">
                <FaAngleLeft className="text-xl mr-1"/>
                <h1 className="text-xl font-bold">전체 게시글</h1>
            </div>
            <p className='text-2xl font-bold'>{post.title}</p>
            <div className='flex gap-2 my-1 border-b pb-2'>
                <UserHeader profile={post.profile}
                            username={post.username}
                            createdAt={post.createdAt}
                            textStyle='flex-col'
                            height='h-10'
                            deleteHandler={deletePost}
                            deleteId={id}
                            title={post.title}
                            content={post.content}
                />
            </div>
            <ReactQuill
                value={post.content}
                readOnly={true}
                theme="snow"
                modules={{toolbar: false}}
                style={{backgroundColor: 'white', minHeight: '10rem'}}
            />
            {/* 댓글 리스트 */}

            <p className='font-semibold mb-2'>댓글 {comments.length}</p>
            <div className='container border-t pt-2'>
                <CommentList comments={comments}/>
                <div className='flex flex-col gap-2 items-center'>
                    {isLogin ?
                        <TextArea/> :
                        <Link to='/login'><p className='text-center text-lg'><u>로그인</u> 후 이용 가능합니다.</p></Link>
                    }
                </div>
            </div>
            {/* Pagination */}
            <div className='pt-4'>
                <p className='text-xl font-semibold'>다른 게시글</p>
                <Board initialPage={page}/>
            </div>
        </div>
    )
}

export default PostDetail;