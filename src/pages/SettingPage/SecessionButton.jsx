import Button from "../../components/Button.jsx";
import {useMutation} from "@tanstack/react-query";
import {deleteUser} from "../../api/user.js";

const SecessionButton = () => {

    const {mutate: handleUserDelete} = useMutation({mutationFn: deleteUser});

    const onDeleteUserHandler = () => {
        handleUserDelete()
    }

    return <Button styleType='w-full bg-red-500 text-white hover:bg-red-400'
                   onClick={onDeleteUserHandler}>
        회원 탈퇴
    </Button>

}

export default SecessionButton;