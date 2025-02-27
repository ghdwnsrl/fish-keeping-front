import {Link, useLocation, useNavigate} from "react-router-dom";
import { loginUser } from "../../api/user.js";
import {useDispatch} from "react-redux";
import {loginSuccess} from "../../feature/authSlice.js";
import LoginForm from "../../components/LoginForm.jsx";

const LoginPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const redirectPath = queryParams.get("redirectPath") ?? "/";

    const onSuccess = (data, variables) => {
        dispatch(loginSuccess(variables.username));
        navigate(redirectPath);
    }

    return (
        <div className='flex flex-col items-center'>
            <LoginForm loginFn={loginUser} onSuccess={onSuccess}/>
            <Link to='/join'>회원이 아니신가요? <u>회원가입</u></Link>
        </div>
    )
}

export default LoginPage;