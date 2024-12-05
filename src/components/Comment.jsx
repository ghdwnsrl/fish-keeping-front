import UserHeader from "./UserHeader.jsx";

function Comment({username, profile = 'https://via.placeholder.com/150', content, createdAt}) {
    return (
        <div className='mb-2 pb-4 flex-col border-b'>
            <UserHeader username={username}
                        createdAt={createdAt}
                        textStyle='gap-1'
            />
            <p className='mx-10'>{content}</p>
        </div>
    )
}

export default Comment;