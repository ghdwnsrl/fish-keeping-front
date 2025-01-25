import {useMutation, useQuery, useSuspenseQuery} from "@tanstack/react-query";
import {getUerInfo, updateUserInfo} from "../../api/user.js";
import {useSelector} from "react-redux";
import Button from "../../components/Button.jsx";
import {useEffect, useRef, useState} from "react";
import UserProfile from "../../components/UserProfile.jsx";
import UserProfileSkeleton from "../../components/skeleton/UserProfileSkeleton.jsx";
import ProfileImageUpdateButton from "./ProfileImageUpdateButton.jsx";
import SecessionButton from "./SecessionButton.jsx";
import IntroTextEditButton from "./IntroTextEditButton.jsx";

const SettingPage = () => {
    const {username} = useSelector(state => state.auth)

    const {data, refetch, isLoading} = useQuery({
        queryKey: ["userInfo", username],
        queryFn: getUerInfo,
    })

    const {mutateAsync: handleUserUpdate} = useMutation({mutationFn: updateUserInfo})

    const [value, setValue] = useState(data?.introText)
    const [isEditing, setIsEditing] = useState(false)
    const valueRef = useRef(null)

    useEffect(() => {
        if (data?.introText !== undefined) {
            setValue(data.introText);
        }
    }, [data?.introText]);

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

    const onSubmitIntroTextHandler = async () => {
        await handleUserUpdate({introText: value});
        setIsEditing(!isEditing)
        refetch()
    };

    return <div className='w-full m-auto flex-row justify-items-center space-y-2'>
        {isLoading ? <UserProfileSkeleton/> :
            <UserProfile profileImageUrl={data?.profileImageUrl}
                         username={data?.username}
                         introText={data?.introText}
                         isEditing={isEditing}
            />
        }
        <div className='w-64 h-64 flex-row space-y-2'>
            {isEditing && <div className='flex w-full space-x-1 justify-around'>
                <input ref={valueRef} value={value} className='' onChange={onInputChange}/>
                <Button styleType='w-1/6' onClick={onSubmitIntroTextHandler}>완료</Button>
            </div>}
            <ProfileImageUpdateButton refetch={refetch}/>
            <IntroTextEditButton isEditing={isEditing} onEditIntroTextHandler={onEditIntroTextHandler}/>
            <SecessionButton />
        </div>
    </div>
}
export default SettingPage;