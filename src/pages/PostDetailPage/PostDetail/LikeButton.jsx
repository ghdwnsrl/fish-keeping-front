import {BiLike, BiSolidLike} from "react-icons/bi";
import {useMutation} from "@tanstack/react-query";
import {deleteLike, postLike} from "../../../api/likes.js";
import {useState} from "react";

const LikeButton = ({liked, id}) => {

    const { mutate: deleteLikeRq } = useMutation({
        mutationKey: [id],
        mutationFn: deleteLike
    })

    const { mutate: postLikeRq } = useMutation({
        mutationKey: [id],
        mutationFn: postLike
    })

    const [like, setLike] = useState(liked)

    const onLikeClick = () => {
        if (like) deleteLikeRq({id})
        else postLikeRq({id})
        setLike(!like)
    }

    return <>
        {like ? <BiSolidLike onClick={onLikeClick}/> : <BiLike onClick={onLikeClick}/>}
    </>
}

export default LikeButton;