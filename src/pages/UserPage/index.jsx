import {Outlet, useParams} from "react-router-dom";
import TabNavigation from "./TabNavigation.jsx";
import UserPageUserProfile from "./UserPageUserProfile.jsx";
import {Suspense} from "react";
import UserProfileSkeleton from "../../components/skeleton/UserProfileSkeleton.jsx";

function UserPage() {
    const {username} = useParams();

    return (
        <div className='flex-row container space-y-4'>
            <Suspense fallback={<UserProfileSkeleton/>}>
                <UserPageUserProfile/>
            </Suspense>
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