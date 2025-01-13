import TankCard from "./TankCard.jsx";
import {getArchivesByUsername} from "../../api/archive.js";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";

function Tank() {
    const {username} = useParams()

    const { data, isLoading } = useQuery({
        queryKey: ['Archives', username],
        queryFn: getArchivesByUsername,
    })

    if(isLoading) {
        return (<div>로딩 중</div>)
    }

    return (
        <div className='grid grid-cols-2 mt-3 gap-1 sm:grid-cols-3'>
            {data.map(data => {
                return <TankCard username={username} key={data.id} props={data}/>
            })}
        </div>
    )
}

export default Tank;