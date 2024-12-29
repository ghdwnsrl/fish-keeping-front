import {Link, useNavigate, useParams, useSearchParams} from "react-router-dom";
import CommentList from "../../components/comment/CommentList.jsx";
import { useEffect, useState} from "react";
import 'react-quill/dist/quill.snow.css';
import './Quill.css'
import {FaAngleLeft} from "react-icons/fa";
import Board from "../../components/Board.jsx";
import useApiRequest from "../../hooks/useApiRequest.js";
import { getByPostId} from "../../api/posts.js";
import {useSelector} from "react-redux";
import Title from "../../components/Title.jsx";
import CommentWriteForm from "./CommentWriteForm.jsx";
import PostDetail from "./PostDetail.jsx";
import {getCommentByPage} from "../../api/comment.js";

const PostDetailPage = () => {

    const {id} = useParams();
    const {isLogin, loginUsername} = useSelector(state => ({
        isLogin: state.auth.isAuthenticated,
        loginUsername: state.auth.username,
    }))
    const [searchParams] = useSearchParams()
    const page = searchParams.get('page')
    const navigate = useNavigate();
    const [post, setPost] = useState({});
    const isWriter = loginUsername === post.username
    const [comments, setComments] = useState([]);
    const {execute: getPost} = useApiRequest(getByPostId);
    const {execute: fetch} = useApiRequest(getCommentByPage)
    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        getPost({id}, {
            onSuccess: (response) => {
                setPost(response.data)
            }
        })
    }, [getPost, id]);


    useEffect(() => {
        fetch({ currentPage, postId: id}, {
            onSuccess: response => {
                const transformedList = response.data.content.map(item => ({
                    ...item,
                    isReply: false,
                }));
                setComments({...response.data, content: transformedList})
            }
        });
    }, [currentPage, id]);

    const handleClickLike = () => {
        setPost((prevState) => ({
            ...prevState,
            liked: !prevState.liked
        }));
    }

    const handlePageChange = ({selected}) => {
        setCurrentPage(selected);
    };

    return (
        <div className='container'>
            <div className="flex cursor-pointer items-center mb-1 " onClick={() => navigate('/')}>
                <FaAngleLeft className="text-xl mr-1"/>
                <Title>전체 게시글</Title>
            </div>
            <PostDetail isWriter={isWriter} post={post} id={id} handleClickLike={handleClickLike}/>
            <p className='font-semibold mb-2'>댓글 {comments.totalElements}</p>
            <div className='container border-t pt-2'>
                <CommentList postId={id} comments={comments} setComments={setComments} currentPage={currentPage} handlePageChange={handlePageChange} />
                {isLogin ?
                    <CommentWriteForm postId={id}/> :
                    <Link to='/login'><p className='text-center text-lg'><u>로그인</u> 후 이용 가능합니다.</p></Link>
                }
            </div>
            <div className='pt-4'>
                <p className='text-xl font-semibold'>다른 게시글</p>
                <Board initialPage={page ? parseInt(page) : 0}/>
            </div>
        </div>
    )
}

export default PostDetailPage;