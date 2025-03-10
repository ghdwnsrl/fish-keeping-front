import {useSelector} from "react-redux";
import {Outlet, useNavigate} from "react-router-dom";
import {useLayoutEffect} from "react";

const ProtectedRoute = ({ children }) => {

    const { isAuthenticated } = useSelector(state => state.auth)
    const navigate = useNavigate();

    useLayoutEffect(() => {
        if (!isAuthenticated) {
            navigate('/login')
        }
    }, []);

    return children ? <>{children}</> : <Outlet/>
}

export default ProtectedRoute;