import { likes } from "./http.js";

export function postLike({postId}) {
    const config = {
        headers: {
            "Content-Type": `application/json`,
        },
        withCredentials: true
    }
    return likes.post(`${postId}/like`, {}, config)
}

export function deleteLike({postId}) {
    const config = {
        headers: {
            "Content-Type": `application/json`,
        },
        withCredentials: true
    }
    return likes.delete(`${postId}/like`, config)
}