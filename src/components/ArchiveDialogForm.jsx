import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addArchivesByUsername} from "../api/archive.js";
import Form from "./Form.jsx";
import {useForm} from "react-hook-form";
import Input from "./Input.jsx";

const ArchiveDialogForm = () => {

    const client = useQueryClient()
    const {register, handleSubmit, formState: { errors }} = useForm()

    const {mutate} = useMutation({
        mutationFn: addArchivesByUsername,
        onSuccess: () => {
            client.invalidateQueries(['archiveList'])
        }
    })

    const onSubmit = (value) => {
        let name = value.archive;
        mutate({name})
    };

    console.log(errors)

    return <Form handleSubmit={handleSubmit(onSubmit)}>
        <Input placeholder='어항을 추가해보세요'
               name='archive'
               type='archive'
               register={register}
               condition={{required: true}}
        />
        {errors.archive && <p>{errors.archive.message}</p>}
        <button>추가</button>
    </Form>
}

export default ArchiveDialogForm;