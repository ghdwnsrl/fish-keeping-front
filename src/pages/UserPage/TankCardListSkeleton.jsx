import Skeleton from "react-loading-skeleton";
import {Link} from "react-router-dom";

const TankCardListSkeleton = () => {
    return (
        <>
            {Array.from({length: 3}).map((_, index) => <>
                    <div key={index}>
                        <Skeleton borderRadius={8} className='w-48 h-48 sm:h-64 sm:w-64'/>
                        <dl className='m-1'>
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
                </>
            )}
        </>
    )
}

export default TankCardListSkeleton;
