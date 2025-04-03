import axios from "axios";
import {openModal} from "../feature/dialogSlice.js";
import * as AuthSlice from "../feature/authSlice.js";
import {store} from '../feature/store';

function create(baseURL, options) {
    const instance = axios.create(Object.assign({baseURL} ), options)
    instance.interceptors.response.use(
        respose => respose,
        (error) => {
            if (error.response && error.response.status === 403) {
                store.dispatch(AuthSlice.logout())
                store.dispatch(openModal({
                    title: "로그인 만료",
                    content: "로그인 페이지로 이동할까요?",
                    actionName: "로그아웃",
                    redirectPath: '/login'
                }))
            }
            return Promise.reject(error);
        }
    )
    return instance;
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