import {FaMagnifyingGlass} from "react-icons/fa6";
import {Select} from "@headlessui/react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const SearchBar = ({searchParams}) => {
    const navigate = useNavigate()
    const [condition, setCondition] = useState({
        type : searchParams ? searchParams.type : "title",
        keyword : searchParams ? searchParams.keyword : ""
    })
    console.log(searchParams)
    const handleOnChangeCondition = (e) => {
        const { name, value } = e.target;
        setCondition((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleClick = () => {
        navigate(`/search?type=${condition.type}&keyword=${condition.keyword}`)
    }

    return (<div className='flex gap-5 justify-center pt-5'>
            <Select name="type"
                    value={condition.type}
                    onChange={handleOnChangeCondition}
                    className='border rounded-xl px-1'
            >
                <option value="title">제목</option>
                <option value="all">제목 + 게시글</option>
                <option value="username">작성자</option>
            </Select>
            <div className='flex border p-2 rounded-xl'>
                <input className='outline-none' name='keyword' value={condition.keyword} onChange={handleOnChangeCondition}/>
                <button className='px-1' onClick={handleClick}>{<FaMagnifyingGlass/>}</button>
            </div>
        </div>
    )
}

export default SearchBar;