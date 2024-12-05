import {images, preURL} from "./http.js";

export function upload({presignedURL, file}) {
    const config = {
        header: {
            'content-type': 'multipart/form-data'
        },
        withCredentials: true
    };

    return images.put(`${presignedURL}`,file, config)
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

export function getPreSignedURL({files}) {
    const config = {
        header: {
            'content-type': 'application/json'
        },
        withCredentials: true
    };
    return preURL.post('', {files}, config)
}