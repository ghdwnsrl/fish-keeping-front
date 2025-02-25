import { terms} from "./http.js";

export async function getTerm({ queryKey }) {
    const config = {
        headers: {
            "Content-Type": `application/json`,
        },
        withCredentials: true
    }
    const response = await terms.get(`/${queryKey[1]}`, config)
    return response.data.data
}