import {FaMagnifyingGlass} from "react-icons/fa6";
import {Select} from "@headlessui/react";
import {useState} from "react";
import useApiRequest from "../hooks/useApiRequest.js";
import {getPosts} from "../api/posts.js";

const SearchBar = ({setData, setTotalPage}) => {

    const {execute : getSearchPosts} = useApiRequest(getPosts)

    const [condition, setCondition] = useState({
        searchCondition : "title",
        searchValue : ""
    })

    const handleOnChangeCondition = (e) => {
        const { name, value } = e.target;
        setCondition((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleClick = () => {
        getSearchPosts({ condition }, {
            onSuccess : (response) => {
                console.log("성공")
                console.log(response.data.totalPages)
                setData(response.data.content)
                setTotalPage(response.data.totalPages)
            }
        })
    }

    return (<div className='flex gap-5 justify-center pt-5'>
            <Select name="searchCondition"
                    value={condition.searchCondition}
                    onChange={handleOnChangeCondition}
                    className='border rounded-xl px-1'
            >
                <option value="title">제목</option>
                <option value="all">제목 + 게시글</option>
                <option value="username">작성자</option>
            </Select>
            <div className='flex border p-2 rounded-xl'>
                <input className='outline-none' name='searchValue' onChange={handleOnChangeCondition}/>
                <button className='px-1' onClick={handleClick}>{<FaMagnifyingGlass/>}</button>
            </div>
        </div>
    )
}

export default SearchBar;