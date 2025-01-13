import {images, preURL} from "./http.js";

export async function upload({presignedURL, file}) {
    const config = {
        header: {
            'content-type': 'multipart/form-data'
        },
        withCredentials: true
    };
    const response = await images.put(`${presignedURL}`,file, config)
    return response.data
}

export function deleteImage({fileName}) {
    const config = {
        header: {
            'content-type': 'application/json'
        },
        withCredentials: true
    };
    return images.delete(`http://localhost:8080/api/images/${fileName}`, config)
}

export async function getPreSignedURL({filenames}) {
    const config = {
        header: {
            'content-type': 'application/json'
        },
        withCredentials: true
    };
    const response = await preURL.post('', {filenames}, config)
    return response.data;
}