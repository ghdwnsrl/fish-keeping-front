import TankCard from "./TankCard.jsx";
import useApiRequest from "../../hooks/useApiRequest.js";
import {getArchivesByUsername} from "../../api/archive.js";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

function Tank() {
    const {username} = useParams()
    const {execute: getArchives} = useApiRequest(getArchivesByUsername)
    const [datas, setDatas] = useState([]);
    useEffect(() => {
        getArchives({username}, {
            onSuccess: response => {
                setDatas(response.data.data)
            }
        })
    }, []);

    return (
        <div className='grid grid-cols-2 mt-3 gap-1 sm:grid-cols-3'>
            {datas.map(data => {
                return <TankCard username={username} key={data.id} props={data}/>
            })}
        </div>
    )
}

export default Tank;