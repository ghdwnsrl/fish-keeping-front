import Button from "../../components/Button.jsx";
import {useMutation} from "@tanstack/react-query";
import {deleteUser} from "../../api/user.js";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import * as AuthSlice from "../../feature/authSlice.js";

const SecessionButton = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {mutate: handleUserDelete} = useMutation({
        mutationFn: deleteUser,
        onSuccess : () => {
            navigate("/")
            dispatch(AuthSlice.logout())
        }
    });

    const onDeleteUserHandler = () => {
        handleUserDelete()
    }

    return <Button styleType='w-full bg-red-500 text-white hover:bg-red-400'
                   onClick={onDeleteUserHandler}>
        회원 탈퇴
    </Button>

}

export default SecessionButton;