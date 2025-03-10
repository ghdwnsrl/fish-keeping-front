import Button from "../../components/Button.jsx";
import {useSelector} from "react-redux";

const ArchiveNameUpdateButton = ({...rest}) => {
    const {username: storedUsername} = useSelector(state => state.auth)
    const {
        isEdit,
        username,
        setIsEdit,
        setFocus,
        mutate,
        onClick,
        archiveName
    } = rest

    if (username !== storedUsername) return;
    if (isEdit) return <Button onClick={onClick}>적용</Button>
    return <div className='flex justify-end space-x-2'>
        <span onClick={() => {
                    setIsEdit(!isEdit);
                    setTimeout(() => {
                        setFocus('changedName');
                    }, 100);
                }}>수정</span>
        <span onClick={() => {
            mutate({name: archiveName})
        }}>삭제</span>
    </div>
}

export default ArchiveNameUpdateButton;