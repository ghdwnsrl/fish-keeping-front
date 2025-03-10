import {Suspense} from "react";
import TankCardList from "./TankCardList.jsx";
import TankCardListSkeleton from "./TankCardListSkeleton.jsx";

function Tank() {
    return (
        <Suspense fallback={<TankCardListSkeleton/>}>
            <TankCardList/>
        </Suspense>
    )
}

export default Tank;