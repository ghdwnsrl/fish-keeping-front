import {useNavigate, useParams} from "react-router-dom";
import Board from "../../components/Board.jsx";
import {useSelector} from "react-redux";
import {useMutation} from "@tanstack/react-query";
import {deleteArchive, updateArchive} from "../../api/archive.js";
import {Suspense, useState} from "react";
import PostSkeleton from "../HomePage/skeleton/PostSkeleton.jsx";
import Form from "../../components/Form.jsx";
import {useForm} from "react-hook-form";

function ArchiveDetailPage() {
    const {username, archiveName} = useParams()
    const {username: storedUsername} = useSelector(state => state.auth)
    const navigate = useNavigate()
    const [isEdit, setIsEdit] = useState(false);
    const {mutate} = useMutation({mutationFn: deleteArchive})
    const {mutate: update} = useMutation({
        mutationFn: updateArchive,
        onSuccess: (data, variables, context) => {
            setDisplayName(variables.changedName)
            setIsEdit(false)
            navigate(`/users/${username}/archives/${variables.changedName}`, { replace: true });
        }
    })

    const [displayName, setDisplayName] = useState(archiveName)

    const {handleSubmit, register, setFocus} = useForm({
        defaultValues: {
            changedName: displayName
        }
    })

    const onHandleSubmit = (value) => {
        const {changedName} = value
        update({name: archiveName, changedName})
    }

    console.log('archive detail page rendering')
    return (
        <div className='container'>
            {isEdit ? <Form handleSubmit={handleSubmit(onHandleSubmit)}>
                    <input className='font-bold text-2xl outline-none'
                           {...register("changedName", {required: true})}
                    />
                </Form>
                : <p className='font-bold text-2xl'>{displayName}</p>}
            {(username === storedUsername) ? <div className='flex justify-end space-x-2'>
                {isEdit ? <>
                    <button onClick={handleSubmit(onHandleSubmit)}>적용</button>
                </> : <>
                <span onClick={() => {
                    setIsEdit(!isEdit);
                    setTimeout(() => {
                        setFocus('changedName');
                    }, 100);
                }}>수정</span>
                    <span onClick={() => {
                        mutate({name: archiveName})
                    }}>삭제</span>
                </>
                }
            </div> : <></>
            }
            <Suspense fallback={<PostSkeleton/>}>
                <Board username={username}
                       archiveName={archiveName}
                >
                    <option value="title">제목</option>
                    <option value="all">제목 + 게시글</option>
                </Board>
            </Suspense>
        </div>
    )
}

export default ArchiveDetailPage;