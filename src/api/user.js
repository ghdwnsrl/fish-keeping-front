import {auth} from "./http.js";

export async function loginUser({username, password}) {
    const config = {
        headers: {
            "Content-Type": `application/json`,
        },
        withCredentials: true
    }

    const response = await auth.post('/login', {username, password, loginType : "USER"}, config)
    return response.data
}

export async function loginAdmin({username, password}) {
    const config = {
        headers: {
            "Content-Type": `application/json`,
        },
        withCredentials: true
    }

    const response = await auth.post('/login', {username, password, loginType : "ADMIN"}, config)
    return response.data
}

export async function join({username, password, confirmPassword, ageAgree, privacyAgree, termsAgree}) {
    const config = {
        headers: {
            "Content-Type": `application/json`,
        },
        withCredentials: true
    }
    const response = await auth.post('/join', {username, password, confirmPassword, agreeReq : {ageAgree, privacyAgree, termsAgree}}, config)
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

export async function updateUserInfo({ profileImageUrl, resizedProfileImageUrl, introText }) {
    let profileImage;
    if (profileImageUrl && resizedProfileImageUrl) {
        profileImage = {profileImageUrl, resizedProfileImageUrl}
    }
    const config = {
        headers: {
            "Content-Type": `application/json`,
        },
        withCredentials: true
    }
    const response = await auth.put('/users', {profileImage, introText}, config)
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