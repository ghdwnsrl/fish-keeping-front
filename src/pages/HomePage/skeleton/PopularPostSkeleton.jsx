import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import Title from "../../../components/Title.jsx";

const PopularPostSkeleton = () => {
    return (
        <>
            <Title>인기 게시글</Title>
            <div className='grid grid-cols-3 mt-3 gap-1 mx-auto'>
                {Array.from({length: 3}).map((_, index) =>
                    <div>
                        <Skeleton className='w-48 h-48 sm:h-64 sm:w-64'/>
                        <dl className='flex-row m-1'>
                            <Skeleton width={50} height={20}/>
                            <div className='flex flex-wrap gap-1'>
                                <div className='flex items-baseline space-x-1'>
                                    <Skeleton width={70} height={20}/>
                                </div>
                                <div className='flex items-center mt-0.5 space-x-0.5 w-full sm:w-auto'>
                                    <Skeleton width={100} height={16}/>
                                </div>
                            </div>
                        </dl>
                    </div>
                )}
            </div>
        </>
    )
}

export default PopularPostSkeleton;