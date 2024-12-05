import Comment from "./Comment.jsx";

function CommentList({comments}) {
    return (
        <div className='gap-2'>
            {comments.map(comment => {
                return (
                    <Comment key={comment.id}
                             username={comment.username}
                             content={comment.content}
                             createdAt={comment.createdAt}
                    />
                )})}
        </div>
    )
}

export default CommentList;