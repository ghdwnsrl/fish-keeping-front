import {FaMagnifyingGlass} from "react-icons/fa6";
import {Select} from "@headlessui/react";
import {useState} from "react";
import Button from "./Button.jsx";

const SearchBar = ({condition, children, onSearchBarClickHandler}) => {

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

    const handleClick = () => {
        onSearchBarClickHandler(value);
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.nativeEvent.isComposing) {
            onSearchBarClickHandler(value);
        }
    }

    return <div className='flex gap-5 justify-center pt-5'>
        <Select name="type"
                value={value.type}
                onChange={handleOnChangeCondition}
                className='border rounded-xl px-1'
        >
            {children}
        </Select>
        <div className='flex border p-2 rounded-xl'>
            <input className='outline-none' name='keyword' onKeyDown={handleKeyDown} value={value.keyword} onChange={handleOnChangeCondition}/>
            <Button styleType='px-1 border-none' onClick={handleClick}>{<FaMagnifyingGlass/>}</Button>
        </div>
    </div>

}

export default SearchBar;