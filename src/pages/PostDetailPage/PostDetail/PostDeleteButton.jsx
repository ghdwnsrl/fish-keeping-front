import {useMutation} from "@tanstack/react-query";
import {deleteByPostId} from "../../../api/posts.js";
import {useNavigate} from "react-router-dom";

const PostDeleteButton = ({id}) => {
    const navigate = useNavigate()
    const { mutate: postDeleteRq } = useMutation({
        mutationKey: [id],
        mutationFn: deleteByPostId,
        onSuccess: () => {
            navigate('/')
        }
    })

    const onDelete = () => {
        postDeleteRq({id})
    }

    return <span onClick={onDelete}>삭제</span>
}

export default PostDeleteButton;