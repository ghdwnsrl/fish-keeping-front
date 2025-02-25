import Input from "./Input.jsx";
import {IoLockClosed, IoMail} from "react-icons/io5";
import Button from "./Button.jsx";
import Form from "./Form.jsx";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {useMutation} from "@tanstack/react-query";

const LoginForm = ({loginFn, onSuccess}) => {

    const {register, handleSubmit, setFocus, setError, reset, formState: {errors}} = useForm()

    const {mutate: login} = useMutation({
        mutationFn: loginFn,
        onSuccess: (data, variables) => {
            onSuccess(data, variables)
        },
        onError: (err) => {
            if (err.response) {
                setFocus('username')
                reset()
                setError('root.serverError', {
                    type: err.response.status,
                    message: err.response.data.message
                })
            }
        }
    })

    useEffect(() => {
        setFocus('username')
    }, [setFocus]);

    const onSubmit = (loginValue) => {
        login(loginValue)
    };

    return <Form title='LOGIN'
                 handleSubmit={handleSubmit(onSubmit)}
                 styleType='container flex flex-col h-56 items-center justify-center mt-36 gap-2'
    >
        <Input placeholder='ID'
               name='username'
               type='text'
               register={register}
               condition={{required: true}}
        >
            <IoMail className="text-2xl mr-2"/>
        </Input>
        <Input placeholder='PASSWORD'
               name='password'
               type='password'
               register={register}
               condition={{required: true}}
        >
            <IoLockClosed className="text-2xl mr-2"/>
        </Input>
        {(errors.username || errors.password) && <p className='text-red-600 text-xs'>아이디 또는 비밀번호를 입력하세요.</p>}
        {errors.root?.serverError && (
            <p className='text-red-600 text-xs'>{errors.root.serverError.message}</p>
        )}
        <Button type='submit' styleType='w-96 text-xl w-max:32'>확 인</Button>
    </Form>
}

export default LoginForm;