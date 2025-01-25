import TankCard from "./TankCard.jsx";
import {useParams} from "react-router-dom";
import {useSuspenseQuery} from "@tanstack/react-query";
import {getArchivesByUsername} from "../../api/archive.js";

const TankCardList = () => {
    const {username} = useParams()

    const { data } = useSuspenseQuery({
        queryKey: ['Archives', username],
        queryFn: getArchivesByUsername,
    })
    return (
        <>
            {data.map(data => {
                return <TankCard username={username} key={data.id} props={data}/>
            })}
        </>
    )
}

export default TankCardList;