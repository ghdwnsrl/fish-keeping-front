import {useMutation, useQuery} from "@tanstack/react-query";
import {deleteUser, getUerInfo, updateUserInfo} from "../../api/user.js";
import {useSelector} from "react-redux";
import Button from "../../components/Button.jsx";
import {useEffect, useRef, useState} from "react";
import useImageUpload from "../../hooks/useImageUpload.jsx";
import ImageUtils from "../../utils/ImageUtils.js";
import HiddenFileInput from "./HiddenFileInput.jsx";
import Image from "../../components/Image.jsx";

const SettingPage = () => {
    const {username} = useSelector(state => state.auth)
    const fileInputRef = useRef(null);

    const {uploadImage} = useImageUpload();

    const {data, refetch} = useQuery({
        queryKey : ["userInfo", username],
        queryFn:getUerInfo
    })
    const { mutate : handleUserDelete } = useMutation({mutationFn : deleteUser});
    const { mutateAsync : handleUserUpdate } = useMutation({mutationFn : updateUserInfo})

    const [value, setValue] = useState(data?.introText)
    const [isEditing, setIsEditing] = useState(false)
    const valueRef = useRef(null)

    useEffect(() => {
        if (data?.introText !== undefined) {
            setValue(data.introText);
        }
    }, [data?.introText]);

    const onDeleteUserHandler = () => {
        handleUserDelete()
    }

    const onInputChange = (e) => {
        setValue(e.target.value);
    }

    const onEditIntroTextHandler = () => {
        setIsEditing(!isEditing)
        setTimeout(() => {
            if (valueRef.current) {
                valueRef.current.focus();
            }
        }, 0);
    }

    const handleFileChange = async (event) => {
        const file = event.target.files;
        if (!file) return;
        const resizedImage = await ImageUtils.resizeFile(file[0])
        const fileArray = Array.of(file[0], resizedImage)
        const { datas  } = await uploadImage(fileArray)
        await handleUserUpdate({
            profileImageUrl : datas[0]?.url,
            resizedProfileImageUrl : datas[1]?.url,
        })
        refetch()
    };

    const onEditProfileImageHandler = () => {
        fileInputRef.current.click()
    }

    const onSubmitIntroTextHandler = async () => {
        await handleUserUpdate({introText: value});
        setIsEditing(!isEditing)
        refetch()
    };

    return <div className='flex-row justify-items-center'>
        <Image alt='profileUrl' src={data?.profileImageUrl}/>
        <p className='text-6xl block text-center'>{data?.username}</p>
        <div className='w-64 h-64 flex-row space-y-2'>
            {!isEditing ?
                <p className='block w-full text-center h-5'>{data?.introText}</p> :
                <div className='flex w-full space-x-1 justify-around'>
                    <input ref={valueRef} value={value} className='' onChange={onInputChange}/>
                    <Button styleType='w-1/6' onClick={onSubmitIntroTextHandler}>완료</Button>
                </div>
            }
            <Button styleType='w-full' onClick={onEditProfileImageHandler}>프로필 사진 변경</Button>
            <HiddenFileInput ref={fileInputRef} onChange={handleFileChange}/>
            {!isEditing && <Button styleType='w-full' onClick={onEditIntroTextHandler}>한줄 소개 수정</Button>}
            <Button styleType='w-full bg-red-500 text-white hover:bg-red-400' onClick={onDeleteUserHandler}>회원
                탈퇴</Button>
        </div>
    </div>
}
export default SettingPage;