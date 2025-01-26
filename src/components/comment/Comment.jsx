import UserHeader from "../UserHeader.jsx";
import {deleteComment} from "../../api/comment.js";
import { useState} from "react";
import CommentEditForm from "../../pages/PostDetailPage/CommentEditForm.jsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useSelector} from "react-redux";

function Comment({commentId, content,  postId, handleReply, ...rest}) {
    const client = useQueryClient()
    const [isEdit, setIsEdit] = useState(false)
    const {parentId, username: writer} = {...rest}
    const {username} = useSelector(state => ({
        username: state.auth.username,
    }))
    const isWriter = writer === username

    const {mutate : deleteCommentById } = useMutation({
        mutationFn : deleteComment,
        onSuccess : () => {
            client.invalidateQueries(["comments"])
        }}
    );

    const onDeleteHandler = () => {
        deleteCommentById({commentId})
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
                    {isWriter && <>
                        <span onClick={() => setIsEdit(!isEdit)}>수정</span>
                        <span onClick={onDeleteHandler}>삭제</span>
                    </>}
                    {handleReply && <span onClick={onClickReply}>댓글 달기</span>}
                </div>
            </UserHeader>
            <div className='mx-10'>
                {isEdit ? <CommentEditForm initialContent={content} setIsEdit={setIsEdit} commentId={commentId}/>
                    : <p className='whitespace-pre-wrap'>{content}</p>}
            </div>
        </div>
    )
}

export default Comment;