import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

const PostDetailSkeleton = () => {
    return (
        <>
            <Skeleton width={200} height={32}/>
            <div className='flex gap-2 my-1 border-b pb-2'>
                <Skeleton width={40} height={40} circle/>
                <div>
                    <Skeleton width={80} height={19}/>
                    <Skeleton width={50} height={16}/>
                </div>
            </div>
            <Skeleton  height={26} count={5}/>
        </>
    )
}

export default PostDetailSkeleton;