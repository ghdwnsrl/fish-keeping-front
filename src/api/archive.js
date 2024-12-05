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