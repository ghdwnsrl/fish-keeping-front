import LoginForm from "../../../components/LoginForm.jsx";
import {loginSuccess} from "../../../feature/authSlice.js";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loginAdmin} from "../../../api/user.js";

const AdminPage = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const onSuccess = (data, variables) => {
        dispatch(loginSuccess(variables.username));
        navigate('/admin/dashboard');
    }
    return (
        <div>
            <LoginForm onSuccess={onSuccess} loginFn={loginAdmin}/>
        </div>
    )
};

export default AdminPage;