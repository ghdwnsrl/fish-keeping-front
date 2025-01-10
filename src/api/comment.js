import {comments, posts} from "./http.js";

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

export function getCommentByPage({currentPage , postId}) {
    const config = {
        headers: {
            "Content-Type": `application/json`,
        },
        params: {
            page: currentPage,
        },
        withCredentials: true
    }
    return comments.get(`${postId}/comments`, config)
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

export function updatePost({id, title, content, selected, urlArray, thumbnailUrl}) {
    const config = {
        headers: {
            "Content-Type": `application/json`,
        },
        withCredentials: true
    }
    return posts.put(`${id}`, {
            title: title,
            content: content,
            archiveName: selected,
            images: urlArray,
            thumbnailUrl : thumbnailUrl
        },
        config)
}