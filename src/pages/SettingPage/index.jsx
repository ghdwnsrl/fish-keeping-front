import {useMutation, useQuery} from "@tanstack/react-query";
import {deleteUser, getUerInfo, updateUserInfo} from "../../api/user.js";
import {useSelector} from "react-redux";
import Button from "../../components/Button.jsx";
import {useEffect, useRef, useState} from "react";
import useApiRequest from "../../hooks/useApiRequest.js";
import {getPreSignedURL, upload} from "../../api/image.js";

const SettingPage = () => {
    const {username} = useSelector(state => state.auth)
    const {execute: getPreSignedUrl }  = useApiRequest(getPreSignedURL);
    const {execute: imageUpload }  = useApiRequest(upload);
    const {execute: updateUser }  = useApiRequest(updateUserInfo);
    const fileInputRef = useRef(null); // 파일 입력 필드를 참조하기 위한 ref

    const {data, refetch} = useQuery({
        queryKey : ["userInfo"],
        queryFn: async () =>  {
            const res = await getUerInfo({username})
            return res.data.data;
        }
    })

    const { mutate } = useMutation({mutationFn : deleteUser, onSuccess: () => {
            console.log('삭제 요청 성공')
        }}
    );

    const fetch = async (img) => {
        let thumbnailUrl;
        await getPreSignedUrl({files: [{fileName: "profile.jpg"}]}, {
            onSuccess: (response) => {
                console.log('성공')
                thumbnailUrl = response.data[0].split("?")[0]
                console.log(thumbnailUrl)
            }
        })
        await imageUpload({presignedURL: thumbnailUrl, file: img, contentType: img.contentType}, {
            onSuccess: () => {
                console.log('thumbnailUrl', thumbnailUrl)
                console.log('resized 된 이미지 전송 완료..')
            }
        })

        await updateUser({profileImageUrl : thumbnailUrl}, {
            onSuccess: () => {
                console.log('서버로 요청 성공')
            }
        })

        return thumbnailUrl
    }

    const updateUserData = async (data) => {
        console.log(data)
        const {profileImageUrl, introText} = data
        const res = await updateUser({profileImageUrl, introText}, {
            onSuccess: () => {
                console.log('성공')
                refetch()
                setIsEditing(!isEditing)
            }
        })
    }

    const [value, setValue] = useState(data?.introText)
    const [isEditing, setIsEditing] = useState(false)
    const valueRef = useRef(null)

    const onDeleteUserHandler = () => {
        mutate()
    }

    const onInputChange = (e) => {
        setValue(e.target.value);
        console.log(value)
    }

    const onEditIntroTextHandler = () => {
        setIsEditing(!isEditing)
        setTimeout(() => {
            if (valueRef.current) {
                valueRef.current.focus();
            }
        }, 0);
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // s3 서버에 업로드
        const profileImageUrl = fetch(file)

        // spring 서버에 수정
        updateUserData({profileImageUrl})
        console.log(profileImageUrl)
    };

    const onEditProfileImageHandler = () => {
        fileInputRef.current.click()
    }

    const onSubmitIntroTextHandler = () => {
        updateUserData({introText: value});
    };

    useEffect(() => {
        if (data?.introText !== undefined) {
            setValue(data.introText);
        }
    }, [data?.introText]);

    return <div className='flex-row justify-items-center'>
        <img alt='profileUrl m-auto' className='m-auto w-52 h-52 bg-gray-100 rounded-full p-5' src={data?.profileImageUrl} />
        <div className='w-64 h-64 flex-row space-y-2'>
            <p className='text-6xl block text-center'>{data?.username}</p>
            {!isEditing ?
                <p className='block w-full text-center h-5'>{data?.introText}</p> :
                <div className='flex w-full space-x-1 justify-around'>
                    <input ref={valueRef} value={value} className='' onChange={onInputChange}/>
                    <Button styleType='w-1/6' onClick={onSubmitIntroTextHandler}>완료</Button>
                </div>
            }
            <Button styleType='w-full' onClick={onEditProfileImageHandler}>프로필 사진 변경</Button>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                style={{display: 'none'}}
            />
            {!isEditing && <Button styleType='w-full' onClick={onEditIntroTextHandler}>한줄 소개 수정</Button>}
            <Button styleType='w-full bg-red-500 text-white hover:bg-red-400' onClick={onDeleteUserHandler}>회원 탈퇴</Button>
        </div>
    </div>
}
export default SettingPage;