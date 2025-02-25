import {useQuery} from "@tanstack/react-query";
import {getTerm} from "../../api/terms.js";

const TermPage = () => {
    const {data} = useQuery({
        queryKey: ["term", "서비스 이용약관"],
        queryFn: getTerm
    })
    return <div className='text-lg'>
        <h1 className='text-xl font-bold'>서비스 이용약관</h1><br/>
        <p style={{whiteSpace: 'pre-line'}}>{data} </p>
    </div>
}

export default TermPage;