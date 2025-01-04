import Form from "../../components/Form.jsx";
import Button from "../../components/Button.jsx";
import useApiRequest from "../../hooks/useApiRequest.js";
import {updateComment} from "../../api/comment.js";
import {useRef, useState} from "react";


const CommentEditForm = ({initialContent, commentId}) => {
    const [content, setContent] = useState(initialContent.replace("\r\n", "<br>"))
    const {execute: updateCommentById} = useApiRequest(updateComment);
    const textareaRef = useRef();
    const onSubmit = () => {
        updateCommentById({commentId, content}, {
            onSuccess: () => {
                console.log('성공')
            }
        })
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