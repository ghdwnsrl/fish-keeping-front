import {archives} from "./http.js";

export function getArchivesByUsername({username}) {
    const config = {
        headers: {
            "Content-Type": `application/json`,
        },
        params: {
            username: username
        },
        withCredentials: true
    }
    return archives.get(``, config)
}

export function addArchivesByUsername({archiveName}) {
    const config = {
        headers: {
            "Content-Type": `application/json`,
        },
        withCredentials: true
    }
    return archives.post(``,{name:archiveName}, config);
}