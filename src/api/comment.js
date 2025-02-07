import {comments} from "./http.js";

export function createComment({postId, content, commentId}) {
    const config = {
        headers: {
            "Content-Type": `application/json`,
        },
        withCredentials: true
    }
    return comments.post(`${postId}/comments`, {
        content,
        parentId: commentId
    }, config)
}

export async function getCommentByPage({queryKey}) {
    const [_, postId, page] = queryKey
    const config = {
        headers: {
            "Content-Type": `application/json`,
        },
        params: {page,},
        withCredentials: true
    }
    const response = await comments.get(`${postId}/comments`, config)
    return response.data
}

export function deleteComment({commentId}) {
    const config = {
        headers: {
            "Content-Type": `application/json`,
        },
        withCredentials: true
    }
    return comments.delete(`${commentId}`, config)
}

export function updateComment({commentId, content }) {
    const config = {
        headers: {
            "Content-Type": `application/json`,
        },
        withCredentials: true
    }
    return comments.put(`${commentId}`,{content}, config)
}