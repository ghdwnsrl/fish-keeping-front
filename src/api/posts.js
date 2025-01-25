import {posts} from "./http.js";

export async function getPosts({ queryKey }) {
    const [_, currentPage, username, archiveName, condition] = queryKey;
    let type, target;
    if (condition && condition.keyword) {
        type = condition.type;
        target = condition.keyword;
    }
    const config = {
        headers: {
            "Content-Type": `application/json`,
        },
        params: {
            page : currentPage,
            username,
            archiveName,
            type,
            target
        },
        withCredentials: true
    }
    const response = await posts.get(``, config)
    return response.data
}

export async function getByPostId({ queryKey }) {
    const [_, id] = queryKey
    const config = {
        headers: {
            "Content-Type": `application/json`,
        },
        withCredentials: true
    }
    const response = await posts.get(`/${id}`, config)
    return response.data;
}

export async function getPopularPosts() {
    const config = {
        headers: {
            "Content-Type": `application/json`,
        },
        withCredentials: true
    }
    const response = await posts.get('/popular', config)
    return response.data;
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

export function deleteByPostId({id}) {
    const config = {
        headers: {
            "Content-Type": `application/json`,
        },
        withCredentials: true
    }
    return posts.delete(`/${id}`, config)
}