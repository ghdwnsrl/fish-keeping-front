import {auth} from "./http.js";

export async function login({username, password}) {
    const config = {
        headers: {
            "Content-Type": `application/json`,
        },
        withCredentials: true
    }

    const response = await auth.post('/login', {username, password}, config)
    return response.data
}

export async function join({username, password, confirmPassword}) {
    const config = {
        headers: {
            "Content-Type": `application/json`,
        },
        withCredentials: true
    }
    const response = await auth.post('/join', {username, password, confirmPassword}, config)
    return response.data
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
    return auth.get('/session/validate', config)
}

export async function getUerInfo({queryKey}) {
    const [_, username] = queryKey;
    const config = {
        headers: {
            "Content-Type": `application/json`,
        },
        params: { username },
        withCredentials: true
    }
    const response =  await auth.get('/users', config)
    return response.data.data;
}

export async function updateUserInfo({ profileImageUrl, introText }) {
    console.log(profileImageUrl, introText)
    const config = {
        headers: {
            "Content-Type": `application/json`,
        },
        withCredentials: true
    }
    const response = await auth.put('/users', {profileImageUrl, introText}, config)
    return response.data;
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