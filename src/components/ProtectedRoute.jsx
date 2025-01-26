import {useDispatch, useSelector} from "react-redux";
import { Outlet } from "react-router-dom";
import {openModal} from "../feature/dialogSlice.js";
import * as AuthSlice from "../feature/authSlice.js";

const ProtectedRoute = ({ children }) => {

    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.auth)

    if (!isAuthenticated) {
        dispatch(
            dispatch(openModal({
                title :"로그인 후 이용 가능합니다",
                content: "로그인 페이지로 이동하시겠습니까?",
                redirectPath: '/login',
            }))
        )
        return;
    }

    return children ? <>{children}</> : <Outlet/>
}

export default ProtectedRoute;