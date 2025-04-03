import {useMutation} from "@tanstack/react-query";
import {deleteLike, postLike} from "../../../api/likes.js";
import {useState} from "react";
import {BiLike, BiSolidLike} from "react-icons/bi";
import {useDispatch, useSelector} from "react-redux";
import {openModal} from "../../../feature/dialogSlice.js";

const LikeButton = ({liked, id}) => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const dispatch = useDispatch();

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
        // 클릭을 했을 때, 로그인 유무를 확인 ->
        if (!isAuthenticated) {
            dispatch(openModal({
                title: "로그인이 필요합니다.",
                content: "로그인 페이지로 이동할까요?",
                actionName: "로그인 페이지",
                redirectPath: '/login'
            }))
            return;
        }
        if (like) deleteLikeRq({id})
        else postLikeRq({id})
        setLike(!like)
    }

    return <>
        {like ? <BiSolidLike onClick={onLikeClick}/> : <BiLike onClick={onLikeClick}/>}
    </>
}

export default LikeButton;