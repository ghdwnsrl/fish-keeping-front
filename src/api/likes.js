import { likes } from "./http.js";

export async function postLike({id}) {
    console.log(id)
    const config = {
        headers: {
            "Content-Type": `application/json`,
        },
        withCredentials: true
    }
    const response = await likes.post(`${id}/like`, {}, config)
    return response.data;
}

export async function deleteLike({id}) {
    const config = {
        headers: {
            "Content-Type": `application/json`,
        },
        withCredentials: true
    }
    const response = await likes.delete(`${id}/like`, config)
    return response.data;
}