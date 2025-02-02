import {IoLockClosed, IoMail} from "react-icons/io5";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Input from "../../components/Input.jsx";
import Form from "../../components/Form.jsx";
import { login } from "../../api/user.js";
import {useDispatch} from "react-redux";
import {loginSuccess} from "../../feature/authSlice.js";
import {useForm} from "react-hook-form";
import { useEffect } from "react";
import Button from "../../components/Button.jsx";
import {useMutation} from "@tanstack/react-query";

const LoginPage = () => {

    const {register, handleSubmit, setFocus, setError, reset, formState: {errors}} = useForm()

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const redirectPath = queryParams.get("redirectPath") ?? "/";

    const {mutate: loginUser} = useMutation({
        mutationFn: login,
        onSuccess: (data, variables) => {
            dispatch(loginSuccess(variables.username));
            navigate(redirectPath);
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

    const onSubmit = (loginValue) => {
        loginUser(loginValue)
    };

    useEffect(() => {
        setFocus('username')
    }, [setFocus]);

    return (
        <div className='flex flex-col items-center'>
            <Form title='LOGIN'
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
            <Link to='/join'>회원이 아니신가요? <u>회원가입</u></Link>
        </div>
    )
}

export default LoginPage;