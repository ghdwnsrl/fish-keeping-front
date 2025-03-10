import Comment from "./Comment.jsx";
import Paginate from "../Paginate.jsx";
import CommentWriteForm from "../../pages/PostDetailPage/CommentWriteForm.jsx";
import {useSuspenseQuery} from "@tanstack/react-query";
import {getCommentByPage} from "../../api/comment.js";
import {useState} from "react";

function CommentList({postId}) {
    const [page, setPage] = useState(0)

    const {data: comments} = useSuspenseQuery({
        queryKey: ["comments", postId, page],
        queryFn:getCommentByPage
    })

    const [isReply, setIsReply] = useState(false)

    const onPageChange = ({selected}) => {
        setPage({selected});
    };

    const handleReply = () => {
        setIsReply(!isReply)
    }

    return (
        <div className='gap-2 container'>
            <p className='font-semibold border-b py-2  mb-2'>댓글 {comments.totalElements}</p>
            {comments.content.map(comment => {
                return (
                    <>
                        {comment.id && <Comment
                            key={comment.id}
                            commentId={comment.id}
                            postId={postId}
                            username={comment.username}
                            content={comment.content}
                            profileImageUrl={comment.profileImageUrl}
                            createdAt={comment.createdAt}
                            parentId={comment.id}
                            handleReply={handleReply}
                        />}
                        <div className="ml-10">
                            {comment.replies && comment.replies.length > 0 && comment.replies.map(reply => {
                                return (
                                    <Comment
                                        key={reply.id}
                                        commentId={reply.id}
                                        postId={postId}
                                        username={reply.username}
                                        content={reply.content}
                                        profileImageUrl={comment.profileImageUrl}
                                        createdAt={reply.createdAt}
                                        parentId={comment.id}
                                    />
                                );
                            })}
                            {isReply && <CommentWriteForm postId={postId} commentId={comment.id}/>}
                        </div>
                    </>
                )
            })
            }
            {comments.totalElements > 0 &&
                <Paginate totalPage={comments.totalPages} currentPage={page} handlePageChange={onPageChange}/>}
        </div>
    )
}

export default CommentList;