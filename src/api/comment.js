import {comments} from "./http.js";

export function createComment({postId, content}) {
    const config = {
        headers: {
            "Content-Type": `application/json`,
        },
        withCredentials: true
    }
    return comments.post(`${postId}/comments`, {
        content: content
    }, config)
}