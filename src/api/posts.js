import {posts} from "./http.js";

export function getPosts({params, username, archiveName}) {
    const config = {
        headers: {
            "Content-Type": `application/json`,
        },
        params: {
            page:params,
            username: username,
            archiveName: archiveName
        },
        withCredentials: true
    }
    return posts.get(``, config)
}

export function getByPostId({id}) {
    const config = {
        headers: {
            "Content-Type": `application/json`,
        },
        withCredentials: true
    }
    return posts.get(`/${id}`, config)
}

export function createPost({title, content, selected, urlArray, thumbnailUrl}) {
    const config = {
        headers: {
            "Content-Type": `application/json`,
        },
        withCredentials: true
    }
    return posts.post(``, {
            title: title,
            content: content,
            archiveName: selected,
            images: urlArray,
            thumbnailUrl : thumbnailUrl
        },
        config)
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

export function deleteByPost({id}) {
    const config = {
        headers: {
            "Content-Type": `application/json`,
        },
        withCredentials: true
    }
    return posts.delete(`/${id}`, config)
}