import Image from "./Image.jsx";

const UserProfile = ({profileImageUrl, username, introText, isEditing}) => {
    return (
        <>
            <Image alt='profileUrl' src={profileImageUrl}/>
            <h1 className='text-6xl'>{username}</h1>
            {!isEditing && <p>{introText}</p>}
        </>
    )
}
export default UserProfile;