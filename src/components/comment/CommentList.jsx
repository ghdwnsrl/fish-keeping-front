import Comment from "./Comment.jsx";

function CommentList({comments, postId}) {
    console.log('commentList',comments)
    return (
        <div className='gap-2 container'>
            {comments && comments.map(comment => {
                return (<>
                        <Comment
                            key={comment.id}
                            commentId={comment.id}
                            postId={postId}
                            username={comment.username}
                            content={comment.content}
                            createdAt={comment.createdAt}
                        />
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
                                    />
                                );
                            })}
                        </div>
                </>
                )})}
        </div>
    )
}

export default CommentList;