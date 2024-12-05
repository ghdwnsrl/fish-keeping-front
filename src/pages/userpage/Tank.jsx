import TankCard from "../../components/TankCard.jsx";
import useApiRequest from "../../hooks/useApiRequest.js";
import {getArchivesByUsername} from "../../api/archive.js";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

function Tank() {
    const { username } = useParams()
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
        <div className='md:max-w-5xl w-full bg-gray-50 rounded grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4'>
            {datas.map(data => {
                {
                    console.log(data)}
                return <TankCard username={username} key={data.id} props={data}/>
            })}
        </div>
    )
}

export default Tank;