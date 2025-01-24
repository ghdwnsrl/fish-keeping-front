import Image from "./Image.jsx";

const UserProfile = (data) => {
    return (
        <>
            <Image alt='profileUrl' src={data.profileImageUrl}/>
            <h1 className='text-6xl'>{data.username}</h1>
            <p>{data.introText}</p>
        </>
    )
}
export default UserProfile;