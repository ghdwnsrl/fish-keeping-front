import Image from "./Image.jsx";

const UserProfile = ({profileImageUrl, username, introText, isEditing}) => {
    return (
        <div className='w-full flex-row'>
            <Image alt='profileUrl' src={profileImageUrl}/>
            <h1 className='text-5xl text-center'>{username}</h1>
            {!isEditing && <p className='text-center'>{introText}</p>}
        </div>
    )
}
export default UserProfile;