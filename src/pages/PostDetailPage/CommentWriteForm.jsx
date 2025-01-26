import Form from "../../components/Form.jsx";
import {createComment} from "../../api/comment.js";
import {useState} from "react";
import Button from "../../components/Button.jsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";

const CommentWriteForm = ({postId, commentId=null}) => {
    const [content, setContent] = useState()
    const client= useQueryClient()

    const handleSubmit = (e) => {
        e.preventDefault()
        create({postId, content, commentId})
    }

    const {mutate: create} = useMutation({
        mutationFn: createComment,
        onSuccess: () => {
            client.invalidateQueries(["comments"])
        }
    })

    return <Form
        handleSubmit={handleSubmit}
        styleType='grid'
    >
        <textarea
            className={`h-20 border rounded-lg resize-none p-2 m-2`}
            onChange={(e) => {
                setContent(e.target.value);
            }}
            value={content}
        />
        <Button type='submit' styleType="h-8 w-16 mt-2 justify-self-end">작성</Button>
    </Form>
}

export default CommentWriteForm;