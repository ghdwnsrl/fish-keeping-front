import axios from "axios";

function create(baseURL, options) {
    // return axios.create(Object.assign({baseURL: "http://localhost:8080" + baseURL} ), options)
    return axios.create(Object.assign({baseURL} ), options)
}

export const posts = create("/api/posts")
export const auth = create("/api")
export const comments    = create("/api")
export const archives    = create("/api/archives")
export const images    = create("")
export const preURL    = create("/api/presigned-url")
export const likes    = create("/api")
export const terms    = create("/api/terms")
export const admins    = create("/api/admins")