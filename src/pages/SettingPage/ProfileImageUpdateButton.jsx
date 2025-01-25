import Button from "../../components/Button.jsx";
import HiddenFileInput from "../../components/HiddenFileInput.jsx";
import {useRef} from "react";
import ImageUtils from "../../utils/ImageUtils.js";
import {useMutation} from "@tanstack/react-query";
import {updateUserInfo} from "../../api/user.js";
import useImageUpload from "../../hooks/useImageUpload.jsx";

const ProfileImageUpdateButton = ({refetch}) => {

    const fileInputRef = useRef(null);

    const {mutateAsync: handleUserUpdate} = useMutation({mutationFn: updateUserInfo})
    const {uploadImage} = useImageUpload();


    const onEditProfileImageHandler = () => {
        fileInputRef.current.click()
    }

    const handleFileChange = async (event) => {
        const file = event.target.files;
        if (!file) return;
        const resizedImage = await ImageUtils.resizeFile(file[0])
        const fileArray = Array.of(file[0], resizedImage)
        const {datas} = await uploadImage(fileArray)
        await handleUserUpdate({
            profileImageUrl: datas[0]?.url,
            resizedProfileImageUrl: datas[1]?.url,
        })
        refetch()
    };

    return (
        <>
            <Button styleType='w-full' onClick={onEditProfileImageHandler}>프로필 사진 변경</Button>
            <HiddenFileInput ref={fileInputRef} onChange={handleFileChange}/>
        </>
    )
}

export default ProfileImageUpdateButton