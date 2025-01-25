import {Suspense} from "react";
import TankCardList from "./TankCardList.jsx";
import TankCardListSkeleton from "./TankCardListSkeleton.jsx";

function Tank() {
    return (
        <div className='grid grid-cols-2 mt-3 gap-1 sm:grid-cols-3'>
            <TankCardListSkeleton/>
            <Suspense fallback={<TankCardListSkeleton/>}>
                <TankCardList />
            </Suspense>
        </div>
    )
}

export default Tank;