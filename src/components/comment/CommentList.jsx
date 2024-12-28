import Comment from "./Comment.jsx";
import Paginate from "../Paginate.jsx";
import CommentWriteForm from "../../pages/PostDetailPage/CommentWriteForm.jsx";

function CommentList({comments, postId, handlePageChange, currentPage, setComments}) {

    const onPageChange = ({selected}) => {
        handlePageChange({selected});
    };

    const handleReply = (commentId) => {
        setComments((prevData) => ({
            ...prevData,
            content: prevData.content.map((comment) => {
                return comment.id === commentId ? {...comment, isReply: !comment.isReply} : comment;
            })
        }))
    }

    return (
        <div className='gap-2 container'>
            {comments.content && comments.content.map(comment => {
                return (
                    <>
                        {comment.id && <Comment
                            key={comment.id}
                            commentId={comment.id}
                            postId={postId}
                            username={comment.username}
                            content={comment.content}
                            createdAt={comment.createdAt}
                            handleReply={handleReply}
                            parentId={comment.id}
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
                                        createdAt={reply.createdAt}
                                        handleReply={handleReply}
                                        parentId={comment.id}
                                    />
                                );
                            })}
                            { comment.isReply && <CommentWriteForm postId={postId} commentId={comment.id} /> }
                        </div>
                </>
                )})}
            <Paginate totalPage={comments.totalPages} currentPage={currentPage} handlePageChange={onPageChange}/>
        </div>
    )
}

export default CommentList;