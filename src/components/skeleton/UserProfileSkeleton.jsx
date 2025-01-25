import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UserProfileSkeleton = () => {
    return <div className="flex justify-center items-center">
        <div className="flex-col items-center">
            <Skeleton width={208} height={208} circle/>
            <Skeleton width={208} height={60}/>
            <Skeleton width={208} height={24}/>
        </div>
    </div>
}

export default UserProfileSkeleton;