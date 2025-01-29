import {Link, useNavigate, useParams, useSearchParams} from "react-router-dom";
import CommentList from "../../components/comment/CommentList.jsx";
import {Suspense} from "react";
import 'react-quill/dist/quill.snow.css';
import './Quill.css'
import {FaAngleLeft} from "react-icons/fa";
import Board from "../../components/Board.jsx";
import {useSelector} from "react-redux";
import Title from "../../components/Title.jsx";
import CommentWriteForm from "./CommentWriteForm.jsx";
import PostDetail from "./PostDetail/PostDetail.jsx";
import PostSkeleton from "../HomePage/skeleton/PostSkeleton.jsx";
import PostDetailSkeleton from "./PostDetail/PostDetailSkeleton.jsx";

const PostDetailPage = () => {

    const {id} = useParams();
    const {isLogin} = useSelector(state => ({
        isLogin: state.auth.isAuthenticated,
    }))
    const [searchParams] = useSearchParams()
    const page = searchParams.get('page')
    const navigate = useNavigate();

    return (
        <div className='container'>
            <div className="flex cursor-pointer items-center mb-1 " onClick={() => navigate('/')}>
                <FaAngleLeft className="text-xl mr-1"/>
                <Title>전체 게시글</Title>
            </div>
            <Suspense fallback={<PostDetailSkeleton/>}>
                <PostDetail id={id}/>
            </Suspense>
            <div className='container pt-2'>
                <Suspense fallback={<></>}>
                    <CommentList postId={id} />
                </Suspense>
                {isLogin ?
                    <CommentWriteForm postId={id}/> :
                    <Link to={`/login?redirectPath=${id}?page=${page}`}><p className='text-center text-lg'><u>로그인</u> 후 이용 가능합니다.</p></Link>
                }
            </div>
            <div className='pt-4'>
                <p className='text-xl font-semibold'>다른 게시글</p>
                <Suspense fallback={<PostSkeleton/>}>
                    <Board initialPage={page ? parseInt(page) : 0}
                    >
                        <option value="title">제목</option>
                        <option value="all">제목 + 게시글</option>
                        <option value="username">작성자</option>
                    </Board>
                </Suspense>
            </div>
        </div>
    )
}

export default PostDetailPage;