import {useNavigate, useParams} from "react-router-dom";
import Board from "../../components/Board.jsx";
import {useMutation} from "@tanstack/react-query";
import {deleteArchive, updateArchive} from "../../api/archive.js";
import {Suspense, useState} from "react";
import PostSkeleton from "../HomePage/skeleton/PostSkeleton.jsx";
import Form from "../../components/Form.jsx";
import {useForm} from "react-hook-form";
import ArchiveNameUpdateButton from "./ArchiveNameUpdateButton.jsx";

function ArchiveDetailPage() {
    const {username, archiveName} = useParams()
    const navigate = useNavigate()
    const [isEdit, setIsEdit] = useState(false);
    const {mutate} = useMutation({mutationFn: deleteArchive})
    const [displayName, setDisplayName] = useState(archiveName)

    const {mutate: update} = useMutation({
        mutationFn: updateArchive,
        onSuccess: (data, variables) => {
            setDisplayName(variables.changedName)
            setIsEdit(false)
            navigate(`/users/${username}/archives/${variables.changedName}`, {replace: true});
        }
    })

    const {handleSubmit, register, setFocus} = useForm({
        defaultValues: {
            changedName: displayName
        }
    })

    const onHandleSubmit = (value) => {
        const {changedName} = value
        update({name: archiveName, changedName})
    }

    return (
        <div className='container'>
            {isEdit ? <Form handleSubmit={handleSubmit(onHandleSubmit)}>
                    <input className='font-bold text-2xl outline-none'
                           {...register("changedName", {required: true})}
                    />
                </Form>
                : <p className='font-bold text-2xl'>{displayName}</p>}
            <ArchiveNameUpdateButton
                isEdit={isEdit}
                username={username}
                setIsEdit={setIsEdit}
                setFocus={setFocus}
                mutate={mutate}
                onClick={handleSubmit(onHandleSubmit)}
                archiveName={displayName}
            />
            <Suspense fallback={<PostSkeleton/>}>
                <Board username={username}
                       archiveName={displayName}
                >
                    <option value="title">제목</option>
                    <option value="all">제목 + 게시글</option>
                </Board>
            </Suspense>
        </div>
    )
}

export default ArchiveDetailPage;