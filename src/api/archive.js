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

export function addArchivesByUsername({newArchive}) {
    const config = {
        headers: {
            "Content-Type": `application/json`,
        },
        withCredentials: true
    }
    return archives.post(``,{name:newArchive}, config);
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