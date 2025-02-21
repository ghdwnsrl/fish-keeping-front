import Form from "../../components/Form.jsx";
import Input from "../../components/Input.jsx";
import {IoLockClosed, IoMail} from "react-icons/io5";
import {join} from "../../api/user.js";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import Button from "../../components/Button.jsx";
import {useMutation} from "@tanstack/react-query";
import {openModal} from "../../feature/dialogSlice.js";

const JoinPage = () => {
    const { register, handleSubmit, getValues, setFocus, setError, reset, formState: { errors}} = useForm();
    const navigate = useNavigate();

    const { mutate : joinUser } = useMutation({
        mutationFn: join,
        onSuccess: () => navigate('/login'),
        onError : (error) => {
            console.log(error)
            if (error.response && error.response.status === 400) {
                setError('root.serverError', {
                    type: error.response.status,
                    message: error.response.data.message
                })
            }
        }
    })

    const onSubmit = (data) => {
        return;
        // joinUser(data);
    }

    useEffect(() => {
        setFocus('username')
    }, [setFocus]);

    return (
        <Form title='회 원 가 입'
              styleType='container flex flex-col h-56 items-center justify-center mt-36 gap-2'
              handleSubmit={handleSubmit(onSubmit)}
        >
            <h1 className='text-red-600'>개인정보 처리 방침 추가 후 회원가입 가능 예정입니다.</h1>
            <p className='text-red-600'>이용에 불편을 드려 죄송합니다.</p>
            <Input placeholder='아이디'
                   name='username'
                   register={register}
                   condition={{
                               required: true,
                               pattern: {
                                   value: /^[a-zA-Z0-9]+$/,
                                   message: '영문자와 숫자만 입력 가능합니다.'
                               }
            }}>
                <IoMail className="text-2xl mr-2"/>
            </Input>
            {errors.username && <p className='text-red-600 text-xs'>{errors.username.message}</p>}
            <Input placeholder='비밀번호'
                   name='password'
                   type='password'
                   register={register}
                   condition={{
                               required: '비밀번호를 입력해주세요.',
                               pattern: {
                                   value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,12}$/,
                                   message: '비밀번호는 8~12자 사이로, 영문자, 숫자, 특수문자가 모두 포함되어야 합니다.'
                               }
            }}>
                <IoLockClosed className="text-2xl mr-2"/>
            </Input>
            {errors.password && <p className='text-red-600 text-xs'>{errors.password.message}</p>}
            <Input placeholder='비밀번호 재확인'
                   name='confirmPassword'
                   type='password'
                   register={register}
                   condition={{required: '비밀번호를 다시 입력해주세요.',
                               validate: {
                                   matchesPassword: (value) => {
                                       const { password } = getValues();
                                       return value === password || '비밀번호와 일치하지 않습니다.'
                                   }
                               }}}
            >
                <IoLockClosed className="text-2xl mr-2"/>
            </Input>
            {errors.confirmPassword && <p className='text-red-600 text-xs'>{errors.confirmPassword.message}</p>}
            <Button type='submit' styleType='w-96 w-max:32'>확 인</Button>
            {errors.root?.serverError && (
                <p className='text-red-600 text-xs'>{errors.root.serverError.message}</p>
            )}
        </Form>
    )
}

export default JoinPage;