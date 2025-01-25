import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PostSkeleton = () => {
    return (
        <>
            {Array.from({length: 10}).map((_, index) =>
                    <div key={index} className='h-20 my-1 gap-1 flex items-center border-b'>
                        <Skeleton className='mx-3' width={64} height={64}/>
                        <div className='flex justify-center flex-col  gap-1'>
                            <Skeleton width={50} height={20}/>
                            <div className='flex flex-wrap gap-1'>
                                <div className='flex items-baseline space-x-1'>
                                    <Skeleton width={70} height={20}/>
                                </div>
                                <div className='flex items-center mt-0.5 space-x-0.5 w-full sm:w-auto'>
                                    <Skeleton width={100} height={16}/>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </>)
}

export default PostSkeleton;