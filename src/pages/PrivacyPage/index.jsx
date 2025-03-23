import {useQuery} from "@tanstack/react-query";
import {getTerm} from "../../api/terms.js";

const PrivacyPage = () => {
    const {data} = useQuery({
        queryKey: ["term", "개인정보 처리방침"],
        queryFn: getTerm
    })
    return (
        <div className='text-lg'>
            <h1 className='text-xl font-bold'>개인정보 처리방침</h1><br/>
            <p style={{whiteSpace: 'pre-line'}}>{data} </p>
        </div>)
}

export default PrivacyPage;