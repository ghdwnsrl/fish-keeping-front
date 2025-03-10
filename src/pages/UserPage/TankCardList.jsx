import TankCard from "./TankCard.jsx";
import {useParams} from "react-router-dom";
import {useSuspenseQuery} from "@tanstack/react-query";
import {getArchivesByUsername} from "../../api/archive.js";

const TankCardList = () => {
    const {username} = useParams()

    const {data} = useSuspenseQuery({
        queryKey: ['Archives', username],
        queryFn: getArchivesByUsername,
    })
    return (
        <div className='w-full flex flex-col gap-4 p-4'>
            {data.map(data =>
                <TankCard username={username} key={data.id} props={data}/>
            )}
        </div>
    )
}

export default TankCardList;