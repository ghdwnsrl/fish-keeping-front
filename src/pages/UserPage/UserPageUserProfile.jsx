import UserProfile from "../../components/UserProfile.jsx";
import {useSuspenseQuery} from "@tanstack/react-query";
import {getUerInfo} from "../../api/user.js";
import {useParams} from "react-router-dom";

const UserPageUserProfile = () => {
    const {username} = useParams();
    const {data} = useSuspenseQuery({
        queryKey: ["userInfo", username],
        queryFn: getUerInfo
    })
    return (
        <UserProfile profileImageUrl={data?.profileImageUrl}
                     username={data?.username}
                     introText={data?.introText}
        />
    )
}

export default UserPageUserProfile;