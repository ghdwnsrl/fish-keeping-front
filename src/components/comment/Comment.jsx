import UserHeader from "../UserHeader.jsx";
import useApiRequest from "../../hooks/useApiRequest.js";
import {deleteComment} from "../../api/comment.js";
import { useState} from "react";
import CommentEditForm from "../../pages/PostDetailPage/CommentEditForm.jsx";
import CommentWriteForm from "../../pages/PostDetailPage/CommentWriteForm.jsx";
import Button from "../Button.jsx";

function Comment({commentId, content, postId, ...rest}) {
    const {execute: deleteCommentById} = useApiRequest(deleteComment);
    const [isEdit, setIsEdit] = useState(false)
    const [isReply, setIsReply] = useState(false)

    const onDeleteHandler = () => {
        deleteCommentById({commentId: commentId}, {
            onSuccess: () => {
                console.log('삭제 성공')
            }
        })
    }

    console.log('comment', commentId, postId)
    return (
        <div className='mb-2 pb-4 border-b w-full'>
            <UserHeader data={{...rest}}
                        textStyle='gap-1'
            >
                <div className=' flex gap-1 text-sm mt-1 opacity-70'>
                    <span onClick={() => setIsEdit(!isEdit)}>수정</span>
                    <span onClick={onDeleteHandler}>삭제</span>
                    <span onClick={()=> setIsReply(!isReply)}>댓글 달기</span>
                </div>
            </UserHeader>
            <div className='mx-10'>
                {isEdit ? <CommentEditForm initialContent={content} commentId={commentId}/>
                    : <p className='whitespace-pre-wrap'>{content}</p>}
                {
                    isReply ? <>
                        <CommentWriteForm postId={postId} commentId={commentId} />
                    </> : <></>
                }
            </div>
        </div>
    )
}

export default Comment;