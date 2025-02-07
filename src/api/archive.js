import {archives} from "./http.js";

export async function getArchivesByUsername({queryKey}) {
    const [, username] = queryKey;
    const config = {
        headers: {
            "Content-Type": `application/json`,
        },
        params: {
            username: username
        },
        withCredentials: true
    }
    const response = await archives.get(``, config)
    return response.data.data
}

export function addArchivesByUsername({name}) {
    const config = {
        headers: {
            "Content-Type": `application/json`,
        },
        withCredentials: true
    }
    return archives.post(``,{name}, config);
}

export function deleteArchive({name}) {
    const config = {
        headers: {
            "Content-Type": `application/json`,
        },
        withCredentials: true
    }
    return archives.delete(`${name}`, config);
}

export function updateArchive({name, changedName}) {
    const config = {
        headers: {
            "Content-Type": `application/json`,
        },
        withCredentials: true
    }
    return archives.put(`${name}`, {name:changedName}, config);
}