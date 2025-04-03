import LoginForm from "../../../components/LoginForm.jsx";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {loginAdmin} from "../../../api/user.js";
import {loginAdminSuccess, loginSuccess} from "../../../feature/authSlice.js";

const AdminPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSuccess = (data, variables) => {
        dispatch(loginSuccess(variables.username));
        dispatch(loginAdminSuccess());
        navigate('/');
    }
    return (
        <div>
            <LoginForm onSuccess={onSuccess} loginFn={loginAdmin}/>
        </div>
    )
};

export default AdminPage;