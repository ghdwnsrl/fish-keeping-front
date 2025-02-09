import {FaMagnifyingGlass} from "react-icons/fa6";
import {Select} from "@headlessui/react";
import Button from "./Button.jsx";
import {useNavigate} from "react-router-dom";
import {Controller, useForm} from "react-hook-form";
import Form from "./Form.jsx";

const SearchBar = ({condition, children, onSearchBarClickHandler}) => {

    const { handleSubmit, control, register} = useForm({
        defaultValues: {
            type: condition ? condition.type : "title",
            keyword: condition ? condition.keyword : ""
        }});
    const navigate = useNavigate()

    const handleClick = (value) => {
        onSearchBarClickHandler(value);
        navigate(`/search?type=${value.type}&keyword=${value.keyword}`)
    }

    return <Form styleType='flex gap-5 justify-center pt-5 flex-wrap' handleSubmit={handleSubmit(handleClick)}>
        <Controller control={control} name="type"
            render={({field: {value, onChange}}) => {
                return (
                    <Select name="type"
                            className='border rounded-xl px-1 w-55 h-10'
                            onChange={onChange}
                            value={value}
                            aria-label="검색 타입 선택"
                    >
                        {children}
                    </Select>
                )
        }}
        />
        <div className='flex border p-2 rounded-xl w-55 h-10'>
            <input className='outline-none' aria-label="검색어" name='keyword' {...register("keyword", {required: true})}/>
            <Button aria-label='검색' styleType='px-1 border-none'>{<FaMagnifyingGlass/>}</Button>
        </div>
    </Form>

}

export default SearchBar;