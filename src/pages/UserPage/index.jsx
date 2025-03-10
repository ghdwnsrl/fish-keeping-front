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
            <div className='flex justify-center w-full flex-col pt-4'>
                <TabNavigation username={username}/>
                <div className='w-full pt-6 flex'>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default UserPage;