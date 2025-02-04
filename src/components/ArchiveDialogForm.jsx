import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addArchivesByUsername} from "../api/archive.js";
import Form from "./Form.jsx";
import {useForm} from "react-hook-form";
import Button from "./Button.jsx";
import {useEffect} from "react";

const ArchiveDialogForm = ({setIsAdd}) => {

    const client = useQueryClient()
    const {register, handleSubmit, setFocus, reset, formState: { errors }} = useForm()

    const {mutate} = useMutation({
        mutationFn: addArchivesByUsername,
        onSuccess: () => {
            client.invalidateQueries(['archiveList'])
            reset()
            setIsAdd(false)
        }
    })

    useEffect(() => {
        setFocus('archive')
    }, []);

    const onSubmit = (value) => {
        let name = value.archive;
        mutate({name})
    };

    return <Form styleType='flex justify-between pt-3' handleSubmit={handleSubmit(onSubmit)}>
        <input placeholder='어항을 추가해보세요'
               name='archive'
               type='archive'
               className='m-2 outline-none'
               {...register('archive', {required : true})}
        />
        {errors.archive && <p>{errors.archive.message}</p>}
        <Button>추가</Button>
    </Form>
}

export default ArchiveDialogForm;