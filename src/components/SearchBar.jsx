import {FaMagnifyingGlass} from "react-icons/fa6";
import {Select} from "@headlessui/react";
import {useState} from "react";
import Button from "./Button.jsx";
import {useNavigate} from "react-router-dom";

const SearchBar = ({condition, children, onSearchBarClickHandler}) => {

    const navigate = useNavigate()

    const [value, setValue] = useState({
        type: condition ? condition.type : "title",
        keyword: condition ? condition.keyword : ""
    })

    const handleOnChangeCondition = (e) => {
        const {name, value} = e.target;
        setValue((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const updateStateAndNavigate = (value) => {
        onSearchBarClickHandler(value);
        navigate(`/search?type=${value.type}&keyword=${value.keyword}`)
    }

    const handleClick = () => {
        updateStateAndNavigate(value)
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.nativeEvent.isComposing) {
            updateStateAndNavigate(value)
        }
    }

    return <div className='flex gap-5 justify-center pt-5 flex-wrap'>
        <Select name="type"
                value={value.type}
                onChange={handleOnChangeCondition}
                className='border rounded-xl px-1 w-55 h-10'
        >
            {children}
        </Select>
        <div className='flex border p-2 rounded-xl w-55 h-10'>
            <input className='outline-none' name='keyword' onKeyDown={handleKeyDown} value={value.keyword} onChange={handleOnChangeCondition}/>
            <Button styleType='px-1 border-none' onClick={handleClick}>{<FaMagnifyingGlass/>}</Button>
        </div>
    </div>

}

export default SearchBar;