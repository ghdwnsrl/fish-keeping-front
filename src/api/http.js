import axios from "axios";

function create(baseURL, options) {
    return axios.create(Object.assign({baseURL} ), options)
}

export const posts = create("http://localhost:8080/api/posts")
export const auth = create("http://localhost:8080/api")
export const comments    = create("http://localhost:8080/api")
export const archives    = create("http://localhost:8080/api/archives")
export const images    = create("")
export const preURL    = create("http://localhost:8080/api/presigned-url")