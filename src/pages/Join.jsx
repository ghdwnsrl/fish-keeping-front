import Form from "../components/Form.jsx";
import InputWithIcon from "../components/Input.jsx";
import {IoLockClosed, IoMail} from "react-icons/io5";
import {join} from "../api/user.js";
import useApiRequest from "../hooks/useApiRequest.js";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function Join() {
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')
    const navigate = useNavigate();
    const { execute : joinUser} = useApiRequest(join)

    const handleSubmit = (e) => {
        e.preventDefault();
        joinUser({username, password, confirmPassword}, {
            onSuccess: () => navigate('/login')
        })
    }
    return (
        <Form title='회 원 가 입'
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
            <InputWithIcon placeholder='CONFIRM PASSWORD'
                           label='confirmPassword'
                           name='confirmPassword'
                           type='password'
                           value={confirmPassword}
                           onChange={(e) => setConfirmPassword(e.target.value)}
            >
                <IoLockClosed className="text-2xl mr-2"/>
            </InputWithIcon>
            <button className='w-96 w-max:32 rounded-lg border p-1 text-xl font-semibold hover:bg-gray-50 '
                    type='submit'
            >
                확 인
            </button>
        </Form>
    )
}

export default Join;