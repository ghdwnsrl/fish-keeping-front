import {Link, useParams} from "react-router-dom";
import ReactQuill from "react-quill";
import Comment from "../Component/Comment.jsx";
import CommentList from "../Component/CommentList.jsx.jsx";
import UserHeader from "../Component/UserHeader.jsx";
import {useState} from "react";

function ArticleDetail() {

    const {id} = useParams();
    const {isLogin, setIsLogin} = useState(false);

    const dummy = {
        nickname: 'user01',
        profile: 'https://via.placeholder.com/150',
        title: '첫 번째 게시글',
        createdDate: '2024-10-20'
    }

    return (
        <div className='container p-1'>
            <h1 className='text-2xl font-bold mb-5'>전체 게시글</h1>
            <p className='text-4xl font-bold'>{dummy.title}</p>
            <div className='flex flex-grow gap-2 my-4'>
                <UserHeader profile={dummy.profile}
                            nickname={dummy.nickname}
                            createdDate={dummy.createdDate}
                            textStyle='flex-col'
                            height='h-10'
                />
            </div>
            <ReactQuill
                value="<h2>hi</h2>"
                readOnly={true}
                theme="snow"
                modules={{toolbar: false}}
            />
            {/* 댓글 리스트 */}
            <div className='container'>
                <CommentList/>
                {isLogin ?
                    <p className=''> 댓글을 달아주세요</p> :
                    <Link to='/login'><p className='text-center text-lg'><u>로그인</u> 후 이용 가능합니다.</p></Link>
                }
            </div>
        </div>
    )
}

export default ArticleDetail;