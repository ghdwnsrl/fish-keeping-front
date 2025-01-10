import {auth} from "./http.js";

export function login({username, password}) {
    const config = {
        headers: {
            "Content-Type": `application/json`,
        },
        withCredentials: true
    }

    return auth.post('/login', {username, password}, config)
}

export function join({username, password, confirmPassword}) {
    const config = {
        headers: {
            "Content-Type": `application/json`,
        },
        withCredentials: true
    }
    return auth.post('/join', {username, password, confirmPassword}, config)
}

export async function logout() {
    const config = {
        headers: {
            "Content-Type": `application/json`,
        },
        withCredentials: true
    }
    const response = await auth.get('/logout', config)
    return response.data;
}

export async function checkSessionState() {
    const config = {
        headers: {
            "Content-Type": `application/json`,
        },
        withCredentials: true
    }
    const response =  auth.get('/session/validate', config)
    return response.data;
}

export function getUerInfo({username}) {
    const config = {
        headers: {
            "Content-Type": `application/json`,
        },
        params: { username },
        withCredentials: true
    }
    return auth.get('/users', config)
}

export function updateUserInfo({ profileImageUrl, introText }) {
    const config = {
        headers: {
            "Content-Type": `application/json`,
        },
        withCredentials: true
    }
    return auth.put('/users', {profileImageUrl, introText}, config)
}

export async function deleteUser() {
    const config = {
        headers: {
            "Content-Type": `application/json`,
        },
        withCredentials: true
    }
    const response = await auth.delete('/users', config)
    return response.data
}