import UserHeader from "../UserHeader.jsx";
import useApiRequest from "../../hooks/useApiRequest.js";
import {deleteComment} from "../../api/comment.js";
import { useState} from "react";
import CommentEditForm from "../../pages/PostDetailPage/CommentEditForm.jsx";

// todo : 댓글에 대해 댓글 작성자인지 아닌지 확인
function Comment({commentId, content,  postId, handleReply, ...rest}) {
    const {execute: deleteCommentById} = useApiRequest(deleteComment);
    const [isEdit, setIsEdit] = useState(false)
    const {parentId} = {...rest}

    const onDeleteHandler = () => {
        deleteCommentById({commentId: commentId}, {
            onSuccess: () => {
                console.log('삭제 성공')
            }
        })
    }

    const onClickReply = () => {
        handleReply(parentId);
    }

    return (
        <div className='mb-2 pb-4 border-b w-full'>
            <UserHeader data={{...rest}}
                        textStyle='gap-1'
                        height='h-8 w-8'
            >
                <div className=' flex gap-1 text-sm mt-1 opacity-70'>
                    <span onClick={() => setIsEdit(!isEdit)}>수정</span>
                    <span onClick={onDeleteHandler}>삭제</span>
                    <span onClick={onClickReply}>댓글 달기</span>
                </div>
            </UserHeader>
            <div className='mx-10'>
                {isEdit ? <CommentEditForm initialContent={content} commentId={commentId}/>
                    : <p className='whitespace-pre-wrap'>{content}</p>}
            </div>
        </div>
    )
}

export default Comment;