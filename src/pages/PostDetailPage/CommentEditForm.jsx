import Form from "../../components/Form.jsx";
import Button from "../../components/Button.jsx";
import {updateComment} from "../../api/comment.js";
import {useRef, useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";


const CommentEditForm = ({initialContent, setIsEdit, commentId}) => {
    const [content, setContent] = useState(initialContent.replace("\r\n", "<br>"))
    const textareaRef = useRef();
    const client = useQueryClient();
    const {mutate : updateCommentById} = useMutation({
        mutationFn:updateComment,
        onSuccess: () => {
            client.invalidateQueries(["comments"])
            setIsEdit(false);
        }
    })

    const onSubmit = (e) => {
        e.preventDefault()
        updateCommentById({commentId, content})
    }

    return <Form styleType={'grid'}
                 handleSubmit={onSubmit}
    >
        <textarea
            ref={textareaRef}
            className={`h-20 border rounded-lg resize-none`}
            onChange={(e) => {
                setContent(e.target.value);
            }}
            value={content}
        />
        <Button type='submit' styleType="h-8 w-16 mt-2 justify-self-end">수정</Button>
    </Form>
}

export default CommentEditForm;