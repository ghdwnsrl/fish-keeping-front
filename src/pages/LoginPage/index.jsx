import {IoLockClosed, IoMail} from "react-icons/io5";
import {Link, useNavigate} from "react-router-dom";
import InputWithIcon from "../../components/Input.jsx";
import Form from "../../components/Form.jsx";
import useApiRequest from "../../hooks/useApiRequest.js";
import {login} from "../../api/user.js";
import { useState } from "react";
import {useDispatch} from "react-redux";
import {loginSuccess} from "../../feature/authSlice.js";

const LoginPage = () => {
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const { execute : loginUser} = useApiRequest(login)
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser({username, password}, {
            onSuccess: () => {
                dispatch(loginSuccess(username));
                navigate('/');
            }
        })
    }
    return (
        <Form title='LOGIN'
              handleSubmit={handleSubmit}
        >
            <InputWithIcon placeholder='ID'
                           label='username'
                           name='username'
                           value={username}
                           onChange={(e) => setUsername(e.target.value)}
            >
                <IoMail className="text-2xl mr-2"/>
            </InputWithIcon>
            <InputWithIcon placeholder='PASSWORD'
                           label='password'
                           name='password'
                           type='password'
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
            >
                <IoLockClosed className="text-2xl mr-2"/>
            </InputWithIcon>
            <button type='submit' className='w-96 w-max:32 rounded-lg border p-1 text-xl font-semibold hover:bg-gray-50 '>확 인</button>
            <Link to='/join'>회원이 아니신가요? <u>회원가입</u></Link>
        </Form>
    )
}

export default LoginPage;