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

export function logout() {
    const config = {
        headers: {
            "Content-Type": `application/json`,
        },
        withCredentials: true
    }
    return auth.get('/logout', config)
}

export function checkSessionState() {
    const config = {
        headers: {
            "Content-Type": `application/json`,
        },
        withCredentials: true
    }
    return auth.get('/session/validate', config)
}