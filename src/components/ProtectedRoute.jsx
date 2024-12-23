import { useSelector } from "react-redux";
import {useEffect} from "react";
import { Outlet, useNavigate} from "react-router-dom";

const ProtectedRoute = ({ children, redirectPath}) => {

    const navigate = useNavigate()
    const { isAuthenticated } = useSelector(state => state.auth)

    useEffect(() => {
        if (!isAuthenticated) {
            navigate(redirectPath)
        }
    }, [isAuthenticated, redirectPath, navigate]);

    return children ? <>{children}</> : <Outlet/>
}

export default ProtectedRoute;