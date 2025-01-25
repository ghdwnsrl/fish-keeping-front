import {Outlet, useParams} from "react-router-dom";
import {useSuspenseQuery} from "@tanstack/react-query";
import {getUerInfo} from "../../api/user.js";
import UserProfile from "../../components/UserProfile.jsx";
import TabNavigation from "./TabNavigation.jsx";
import "react-loading-skeleton/dist/skeleton.css";

function UserPage() {
    const {username} = useParams();
    const {data} = useSuspenseQuery({
        queryKey: ["userInfo", username],
        queryFn: getUerInfo
    })
    return (
        <div className='flex-row container space-y-4'>
            <div className='flex-row justify-items-center'>
                <UserProfile profileImageUrl={data?.profileImageUrl}
                             username={data?.username}
                             introText={data?.introText}
                />
            </div>
            <div className='flex justify-center items-center w-full flex-col'>
                <TabNavigation username={username}/>
                <div className='w-full flex justify-center'>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default UserPage;